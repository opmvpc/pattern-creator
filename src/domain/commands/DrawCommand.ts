import type { AppState } from "@/domain/types/AppState";
import { CompositeCommand } from "./CompositeCommand";
import { ToggleCellCommand } from "./ToggleCellCommand";

export class DrawCommand extends CompositeCommand {
  private state: AppState;

  constructor(points: number[], state: AppState) {
    super();
    this.state = state;
    this.createAndAddSubCommands(points);
  }

  private createAndAddSubCommands(points: number[]) {
    for (const point of points) {
      const command = new ToggleCellCommand(point, this.state);
      this.commands.push(command);
    }
  }
}
