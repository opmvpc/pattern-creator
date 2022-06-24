import { Storage } from "../Storage";
import type { Command } from "./Contracts/Command";

export class SaveCommand implements Command {
  private name: string;
  private board: string;

  constructor(name: string, board: string) {
    this.name = name;
    this.board = board;
  }

  execute(): void {
    if (this.name === "") {
      this.name = "untitled" + Date.now();
    }
    Storage.addBoard(this.name, this.board);
  }
}
