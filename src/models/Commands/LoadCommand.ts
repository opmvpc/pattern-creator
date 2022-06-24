import type { Ref } from "vue";
import { Board } from "../Board";
import { Storage } from "../Storage";
import { AbstractCommand } from "./AbstractCommand";

export class LoadCommand extends AbstractCommand {
  private name: string;
  private board: Ref<Board>;
  private size: Ref<number>;

  constructor(name: string, board: Ref<Board>, size: Ref<number>) {
    super();
    this.name = name;
    this.board = board;
    this.size = size;
  }

  execute(): void {
    const board = Storage.getBoard(this.name);
    this.size.value = Math.sqrt(board?.length ?? 0);
    this.board.value = new Board(this.size.value).load(board);
  }
}
