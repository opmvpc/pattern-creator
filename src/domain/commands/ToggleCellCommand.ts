import type { AppState } from "../AppState";
import type { Board } from "../Board";
import { AbstractUndoableCommand } from "./AbstractUndoableCommand";

export class ToggleCellCommand extends AbstractUndoableCommand {
  private board: Board;
  private index: number;
  undoable: boolean;

  constructor(index: number, state: AppState) {
    super();
    this.board = state.board;
    this.index = index;
    this.undoable = true;
  }

  execute(): void {
    this.board.toggleCell(this.index);
  }

  undo(): void {
    this.board.toggleCell(this.index);
  }
}
