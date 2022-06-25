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
      this.name = "untitled_" + this.getDateTime();
    }
    Storage.addBoard(this.name, this.board);
  }

  private getDateTime(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = this.formatDatePart(date.getMonth() + 1);
    const day = this.formatDatePart(date.getDate());
    const hour = this.formatDatePart(date.getHours());
    const minute = this.formatDatePart(date.getMinutes());
    const second = this.formatDatePart(date.getSeconds());

    return `${year}-${month}-${day}_${hour}:${minute}:${second}`;
  }

  private formatDatePart(part: number): string {
    return part < 10 ? "0" + part : part.toString();
  }
}
