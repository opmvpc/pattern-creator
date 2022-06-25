import type { AppState } from "@/models/AppState";
import { Board } from "@/models/Board";
import { ClearBoardCommand } from "@/models/Commands/ClearBoardCommand";
import { DrawCommand } from "@/models/Commands/DrawCommand";
import { InverseBoardCommand } from "@/models/Commands/InverseBoardCommand";
import { Invoker } from "@/models/Commands/Invoker";
import { LoadCommand } from "@/models/Commands/LoadCommand";
import { SaveCommand } from "@/models/Commands/SaveCommand";
import { UpdateBoardFromCodeCommand } from "@/models/Commands/UpdateBoardFromCodeCommand";
import { Storage } from "@/models/Storage";
import { reactive } from "vue";

export const init = (): AppState => {
  return reactive({
    commandInvoker: new Invoker(),
    size: { width: 10 },
    board: new Board(10),
    savedBoardsNames: Storage.getBoardNames(),
    currentBoardName: "",
  });
};

export const commandsInit = (state: AppState) => {
  return {
    clearBoard: () => {
      state.commandInvoker.execute(new ClearBoardCommand(state));
    },

    saveBoard: (name: string) => {
      state.currentBoardName = name;
      state.commandInvoker.execute(new SaveCommand(name, state));
      state.savedBoardsNames = Storage.getBoardNames();
    },

    loadBoard: (name: string) => {
      state.currentBoardName = name;
      state.commandInvoker.execute(new LoadCommand(state));
      state.commandInvoker.clear();
    },

    updateSize: (newSize: string) => {
      state.size = { width: parseInt(newSize) };
      state.commandInvoker.clear();
      state.board.updateSize(state.size);
    },

    invert: () => {
      state.commandInvoker.execute(new InverseBoardCommand(state));
    },

    draw: (points: number[]) => {
      state.commandInvoker.execute(new DrawCommand(points, state));
    },

    updateBoardFromCode: (newCode: string) => {
      state.commandInvoker.execute(
        new UpdateBoardFromCodeCommand(newCode, state)
      );
    },
  };
};
