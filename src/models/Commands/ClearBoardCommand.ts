import { Board } from "../Board";
import type { Cell } from "../Cell";
import { AbstractUndoableCommand } from "./AbstractUndoableCommand";

export class ClearBoardCommand extends AbstractUndoableCommand {
  private board: Board;
  private size: number;
  private savedBoard: Cell[];

  constructor(board: Board, size: number) {
    super();
    this.board = board;
    this.size = size;
    this.savedBoard = board.cells;
  }

  execute(): void {
    const cells = document.querySelectorAll(".cell") as NodeListOf<HTMLElement>;
    for (const cell of cells) {
      cell.style.backgroundColor = "white";
    }

    this.board.cells = new Board(this.size).cells;
  }

  undo(): void {
    this.board.cells = this.savedBoard;
  }
}
