import type { AppState } from "@/domain/types/AppState";
import type { Board } from "@/domain/models/Board";
import type { PatternName } from "@/domain/types/PatternName";
import type { Size } from "@/domain/types/Size";
import { Storage } from "@/domain/services/Storage";
import { AbstractCommand } from "./AbstractCommand";

export class LoadCommand extends AbstractCommand {
  private name: PatternName;
  private board: Board;
  private size: Size;

  constructor(state: AppState) {
    super();
    this.name = state.currentBoardName;
    this.board = state.board;
    this.size = state.size;
  }

  execute(): void {
    const board = Storage.getBoard(this.name.name);

    this.board = this.board.load(board);
    this.size.width = Math.sqrt(board?.length ?? 0);
  }

  getBoard(): Board {
    return this.board;
  }
}
