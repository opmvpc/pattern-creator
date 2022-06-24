import type { CommandContract } from "./CommandContract";

export interface UndoableCommandContract extends CommandContract {
  undo(): void;
}
