import type { UndoableCommand } from "./Contracts/UndoableCommand";

export abstract class CompositeCommand implements UndoableCommand {
  protected commands: UndoableCommand[];

  constructor() {
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
