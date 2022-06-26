import type { AppError } from "../types/AppError";
import type { CommandContract } from "./Contracts/CommandContract";
import type { UndoableCommandContract } from "./Contracts/UndoableCommandContract";
import { OriginalBoardCommand } from "./OriginalBoardCommand";

export class Invoker {
  public commandsHistory: CommandContract[];
  public errorsHistory: AppError[];
  public currentCommandIndex: number;
  public error: AppError;

  constructor() {
    this.commandsHistory = [];
    this.errorsHistory = [];
    this.currentCommandIndex = -1;
    this.error = { message: "" };
    this.execute(new OriginalBoardCommand());
  }

  public execute(command: CommandContract): void {
    if (!this.isLast) {
      this.commandsHistory.splice(this.currentCommandIndex + 1);
      this.errorsHistory.splice(this.currentCommandIndex + 1);
    }

    if (command.undoable === true) {
      this.commandsHistory.push(command);
      this.currentCommandIndex = this.commandsHistory.length - 1;
    }

    command.execute();

    if (command.undoable === true) {
      const errorMessage = (command as UndoableCommandContract).getSavedError();
      this.errorsHistory.push({
        message: errorMessage,
      });
      this.error.message = errorMessage;
    }
  }

  public clear(): void {
    this.commandsHistory = [];
    this.errorsHistory = [];
    this.currentCommandIndex = -1;
    this.execute(new OriginalBoardCommand());
  }

  public get current(): CommandContract | undefined {
    return this.commandsHistory[this.currentCommandIndex];
  }

  public undo(): void {
    if (this.current !== undefined && this.hasPrevious) {
      (this.current as UndoableCommandContract).undo();
      this.previous();
      this.error.message = this.errorsHistory[this.currentCommandIndex].message;
    }
  }

  public get hasPrevious(): boolean {
    return this.currentCommandIndex > 0;
  }

  public previous(): void {
    if (this.hasPrevious) {
      this.currentCommandIndex--;
    }
  }

  public redo(): void {
    if (this.hasNext) {
      this.next();
      if (this.current !== undefined) {
        (this.current as UndoableCommandContract).execute();
        this.error.message =
          this.errorsHistory[this.currentCommandIndex].message;
      }
    }
  }

  public next(): void {
    if (this.hasNext) {
      this.currentCommandIndex++;
    }
  }

  public get isLast(): boolean {
    return this.currentCommandIndex === this.commandsHistory.length - 1;
  }

  public get hasNext(): boolean {
    return this.currentCommandIndex < this.commandsHistory.length - 1;
  }
}
