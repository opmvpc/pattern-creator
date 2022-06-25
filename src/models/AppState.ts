import type { AppError } from "./AppError";
import type { Board } from "./Board";
import type { Invoker } from "./Commands/Invoker";

export interface AppState {
  commandInvoker: Invoker;
  size: number;
  board: Board;
  savedBoardsNames: string[];
  currentBoardName: string;
  error: AppError;
}
