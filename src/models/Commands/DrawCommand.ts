import type { Board } from "../Board";
import { CompositeCommand } from "./CompositeCommand";
import { ToggleCellCommand } from "./ToggleCellCommand";

export class DrawCommand extends CompositeCommand {
  private board: Board;

  constructor(board: Board, points: number[]) {
    super();
    this.board = board;
    this.createAndAddSubCommands(points);
  }

  private createAndAddSubCommands(points: number[]) {
    for (const point of points) {
      const command = new ToggleCellCommand(this.board, point);
      this.commands.push(command);
    }
  }

  execute(): void {
    for (const command of this.commands) {
      command.execute();
    }
  }
}
