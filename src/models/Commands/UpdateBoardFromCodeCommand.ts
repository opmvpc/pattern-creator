import type { AppState } from "../AppState";
import type { Board } from "../Board";
import type { Cell } from "../Cell";
import { AbstractUndoableCommand } from "./AbstractUndoableCommand";

export class UpdateBoardFromCodeCommand extends AbstractUndoableCommand {
  private board: Board;
  private newCode: string;
  private savedOldCode: string;
  private savedNewCode: string;
  private savedOldBoard: Cell[];
  private savedNewBoard: Cell[];
  private savedError: string;

  constructor(newCode: string, state: AppState) {
    super();
    this.board = state.board;
    this.newCode = newCode;
    this.savedOldCode = "";
    this.savedNewCode = "";
    this.savedOldBoard = [];
    this.savedNewBoard = [];
    this.savedError = "";
  }

  execute(): void {
    if (this.savedOldBoard.length > 0) {
      this.board.code.body = this.savedNewCode;
      this.board.cells = this.savedNewBoard;
      return;
    }

    this.savedOldBoard = this.board.cells;
    this.savedNewCode = this.newCode;
    this.savedOldCode = this.board.code.body;

    try {
      this.board.fromCode(this.newCode);
    } catch (error: any) {
      this.savedError = (error as Error).message;
      this.savedNewBoard = this.savedOldBoard;
      this.board.code.body = this.newCode;
      return;
    }
    this.savedNewBoard = this.board.cells;
    this.board.code.body = this.newCode;
  }

  undo(): void {
    this.board.cells = this.savedOldBoard;
    if (this.savedError.length > 0) {
      this.board.code.body = this.savedOldCode;
    } else {
      this.board.code.body = this.savedOldCode;
    }
  }

  public getSavedError(): string {
    return this.savedError;
  }
}
