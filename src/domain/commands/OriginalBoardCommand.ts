import { AbstractUndoableCommand } from "./AbstractUndoableCommand";

export class OriginalBoardCommand extends AbstractUndoableCommand {
  constructor() {
    super();
  }

  execute(): void {}

  undo(): void {}
}
