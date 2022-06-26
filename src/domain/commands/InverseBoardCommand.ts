import type { AppState } from "@/domain/types/AppState";
import type { Board } from "@/domain/models/Board";
import { AbstractUndoableCommand } from "./AbstractUndoableCommand";

export class InverseBoardCommand extends AbstractUndoableCommand {
  private board: Board;

  constructor(state: AppState) {
    super();
    this.board = state.board;
  }

  execute(): void {
    this.board.invert();
  }

  undo(): void {
    this.board.invert();
  }
}
