import type { AppState } from "../AppState";
import { Storage } from "../Storage";
import { AbstractCommand } from "./AbstractCommand";

export class SaveCommand extends AbstractCommand {
  private name: string;
  private board: string;

  constructor(name: string, state: AppState) {
    super();
    this.name = name;
    this.board = state.board.getCellsJSON();
  }

  execute(): void {
    if (this.name === "") {
      this.name = "untitled" + Date.now();
    }
    Storage.addBoard(this.name, this.board);
  }
}
