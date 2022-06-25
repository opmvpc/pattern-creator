import type { AppState } from "../AppState";
import type { Board } from "../Board";
import type { Cell } from "../Cell";
import { AbstractUndoableCommand } from "./AbstractUndoableCommand";

export class ClearBoardCommand extends AbstractUndoableCommand {
  private board: Board;
  private size: number;
  private savedBoard: Cell[];

  constructor(state: AppState) {
    super();
    this.board = state.board;
    this.size = state.size;
    this.savedBoard = state.board.cells;
  }

  execute(): void {
    const cells = document.querySelectorAll(".cell") as NodeListOf<HTMLElement>;
    for (const cell of cells) {
      cell.style.backgroundColor = "white";
    }

    this.board.clear();
  }

  undo(): void {
    this.board.cells = this.savedBoard;
  }
}
