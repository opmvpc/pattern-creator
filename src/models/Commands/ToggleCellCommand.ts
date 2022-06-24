import type { Board } from "../Board";
import { AbstractUndoableCommand } from "./AbstractUndoableCommand";

export class ToggleCellCommand extends AbstractUndoableCommand {
  private board: Board;
  private index: number;
  undoable: boolean;

  constructor(board: Board, index: number) {
    super();
    this.board = board;
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
