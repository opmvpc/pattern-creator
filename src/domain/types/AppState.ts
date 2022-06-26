import type { Board } from "@/domain/models/Board";
import type { Invoker } from "@/domain/commands/Invoker";
import type { PatternName } from "@/domain/types/PatternName";
import type { Size } from "./Size";

export interface AppState {
  commandInvoker: Invoker;
  size: Size;
  board: Board;
  savedBoardsNames: string[];
  currentBoardName: PatternName;
}
