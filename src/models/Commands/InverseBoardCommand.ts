import type { Board } from "../Board";
import type { Command } from "./Contracts/Command";

export class InverseBoardCommand implements Command {
  private board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  execute(): void {
    this.board.invert();
  }

  undo(): void {
    this.board.invert();
  }
}
