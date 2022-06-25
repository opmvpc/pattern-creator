import type { CommandContract } from "./Contracts/CommandContract";
import type { UndoableCommandContract } from "./Contracts/UndoableCommandContract";

export class Invoker {
  private commandsHistory: CommandContract[];
  private currentCommandIndex: number;

  constructor() {
    this.commandsHistory = [];
    this.currentCommandIndex = -1;
  }

  public execute(command: CommandContract): void {
    if (!this.isLast) {
      this.commandsHistory.splice(this.currentCommandIndex + 1);
    }

    if (command.undoable === true) {
      this.commandsHistory.push(command);
      this.currentCommandIndex = this.commandsHistory.length - 1;
    }

    command.execute();
  }

  public clear(): void {
    this.commandsHistory = [];
    this.currentCommandIndex = -1;
  }

  private get current(): CommandContract | undefined {
    return this.commandsHistory[this.currentCommandIndex];
  }

  public undo(): void {
    if (this.current !== undefined && this.hasPrevious) {
      (this.current as UndoableCommandContract).undo();
      this.previous();
    }
  }

  private get hasPrevious(): boolean {
    return this.currentCommandIndex >= 0;
  }

  private previous(): void {
    if (this.hasPrevious) {
      this.currentCommandIndex--;
    }
  }

  public redo(): void {
    if (this.hasNext) {
      this.next();
      if (this.current !== undefined) {
        (this.current as UndoableCommandContract).execute();
      }
    }
  }

  private next(): void {
    if (this.hasNext) {
      this.currentCommandIndex++;
    }
  }

  private get isLast(): boolean {
    return this.currentCommandIndex === this.commandsHistory.length - 1;
  }

  private get hasNext(): boolean {
    return this.currentCommandIndex < this.commandsHistory.length - 1;
  }
}
