import { Board } from "../Board";
import type { Cell } from "../Cell";
import type { UndoableCommand } from "./Contracts/UndoableCommand";

export class ClearBoardCommand implements UndoableCommand {
  private board: Board;
  private size: number;
  private savedBoard: Cell[];

  constructor(board: Board, size: number) {
    this.board = board;
    this.size = size;
    this.savedBoard = board.cells;
  }

  execute(): void {
    this.board.cells = new Board(this.size).cells;
  }

  undo(): void {
    this.board.cells = this.savedBoard;
  }
}
