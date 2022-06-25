import type { AppState } from "../AppState";
import type { Board } from "../Board";
import { CompositeCommand } from "./CompositeCommand";
import { ToggleCellCommand } from "./ToggleCellCommand";

export class DrawCommand extends CompositeCommand {
  private board: Board;

  constructor(points: number[], state: AppState) {
    super();
    this.board = state.board;
    this.createAndAddSubCommands(points);
  }

  private createAndAddSubCommands(points: number[]) {
    for (const point of points) {
      const command = new ToggleCellCommand(this.board, point);
      this.commands.push(command);
    }
  }
}
