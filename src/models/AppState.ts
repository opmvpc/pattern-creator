import type { Board } from "./Board";
import type { Invoker } from "./Commands/Invoker";
import type { PatternName } from "./PatternName";
import type { Size } from "./Size";

export interface AppState {
  commandInvoker: Invoker;
  size: Size;
  board: Board;
  savedBoardsNames: string[];
  currentBoardName: PatternName;
}
