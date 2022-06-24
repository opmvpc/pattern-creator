import type { Command } from "./Contracts/Command";
import type { UndoableCommand } from "./Contracts/UndoableCommand";

export class Invoker {
  private commandsHistory: Command[];
  private currentCommandIndex: number;

  constructor() {
    this.commandsHistory = [];
    this.currentCommandIndex = 0;
  }

  public execute(command: Command): void {
    if (!this.isLast) {
      this.commandsHistory.splice(this.currentCommandIndex + 1);
    }

    if (command.hasOwnProperty("undo")) {
      this.commandsHistory.push(command as UndoableCommand);
      this.currentCommandIndex++;
    }

    command.execute();
  }

  public clear(): void {
    this.commandsHistory = [];
    this.currentCommandIndex = 0;
  }

  private get current(): Command {
    return this.commandsHistory[this.currentCommandIndex];
  }

  public undo(): void {
    if (
      this.current &&
      this.commandsHistory.length > 0 &&
      this.current.hasOwnProperty("undo")
    ) {
      (this.current as UndoableCommand).undo();
      this.previous();
    }
  }

  private previous(): void {
    this.currentCommandIndex = this.commandsHistory.length - 1;
  }

  private next(): void {
    if (this.isLast) {
      this.currentCommandIndex++;
    }
  }

  private get isLast(): boolean {
    return this.currentCommandIndex === this.commandsHistory.length - 1;
  }

  public redo(): void {
    if (this.current && this.commandsHistory.length > 0 && !this.isLast) {
      this.current.execute();
      this.next();
    }
  }
}
