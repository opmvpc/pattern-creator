import type { CommandContract } from "./Contracts/CommandContract";

export abstract class AbstractUndoableCommand implements CommandContract {
  public undoable: boolean = true;

  abstract execute(): void;
  abstract undo(): void;
  getSavedError(): string {
    return "";
  }
}
