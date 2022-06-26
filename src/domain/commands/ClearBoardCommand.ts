import type { AppState } from "@/domain/types/AppState";
import type { Board } from "@/domain/models/Board";
import type { Cell } from "@/domain/models/Cell";
import { AbstractUndoableCommand } from "./AbstractUndoableCommand";

export class ClearBoardCommand extends AbstractUndoableCommand {
  private board: Board;
  private savedBoard: Cell[];

  constructor(state: AppState) {
    super();
    this.board = state.board;
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
