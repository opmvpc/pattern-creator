import type { Ref } from "vue";
import type { Board } from "../Board";
import type { Cell } from "../Cell";
import { AbstractUndoableCommand } from "./AbstractUndoableCommand";

export class UpdateBoardFromCodeCommand extends AbstractUndoableCommand {
  private board: Board;
  private code: Ref<string>;
  private newCode: string;
  private savedCode: string;
  private errorMessage: Ref<string>;
  private savedBoard: Cell[];

  constructor(
    board: Board,
    code: Ref<string>,
    newCode: string,
    errorMessage: Ref<string>
  ) {
    super();
    this.board = board;
    this.code = code;
    this.newCode = newCode;
    this.savedCode = this.code.value;
    this.errorMessage = errorMessage;
    this.savedBoard = board.cells;
  }

  execute(): void {
    try {
      this.board.fromCode(this.newCode);
    } catch (error: any) {
      this.errorMessage.value = (error as Error).message;
      this.savedCode = this.newCode;
      return;
    }
    this.errorMessage.value = "";
    this.code.value = this.newCode;
  }

  undo(): void {
    this.board.cells = this.savedBoard;
    this.code.value = this.savedCode;
  }
}
