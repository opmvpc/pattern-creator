import type { AppState } from "../AppState";
import { Board } from "../Board";
import { Storage } from "../Storage";
import { AbstractCommand } from "./AbstractCommand";

export class LoadCommand extends AbstractCommand {
  private name: string;
  private board: Board;
  private size: number;

  constructor(name: string, state: AppState) {
    super();
    this.name = name;
    this.board = state.board;
    this.size = state.size;
  }

  execute(): void {
    const board = Storage.getBoard(this.name);
    this.size = Math.sqrt(board?.length ?? 0);
    this.board = new Board(this.size).load(board);
  }
}
