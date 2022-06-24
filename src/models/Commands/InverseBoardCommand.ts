import type { Board } from "../Board";
import { AbstractUndoableCommand } from "./AbstractUndoableCommand";

export class InverseBoardCommand extends AbstractUndoableCommand {
  private board: Board;

  constructor(board: Board) {
    super();
    this.board = board;
  }

  execute(): void {
    this.board.invert();
  }

  undo(): void {
    this.board.invert();
  }
}
