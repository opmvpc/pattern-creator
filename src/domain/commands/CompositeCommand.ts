import { AbstractUndoableCommand } from "./AbstractUndoableCommand";
import type { UndoableCommandContract } from "./Contracts/UndoableCommandContract";

export abstract class CompositeCommand extends AbstractUndoableCommand {
  protected commands: UndoableCommandContract[];

  constructor() {
    super();
    this.commands = [];
  }

  execute(): void {
    for (const command of this.commands) {
      command.execute();
    }
  }

  undo(): void {
    for (const command of this.commands) {
      command.undo();
    }
  }
}
