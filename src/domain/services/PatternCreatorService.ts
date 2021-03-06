import type { AppState } from "@/domain/types/AppState";
import { Board } from "@/domain/models/Board";
import { ClearBoardCommand } from "@/domain/commands/ClearBoardCommand";
import { DrawCommand } from "@/domain/commands/DrawCommand";
import { InverseBoardCommand } from "@/domain/commands/InverseBoardCommand";
import { Invoker } from "@/domain/commands/Invoker";
import { LoadCommand } from "@/domain/commands/LoadCommand";
import { SaveCommand } from "@/domain/commands/SaveCommand";
import { UpdateBoardFromCodeCommand } from "@/domain/commands/UpdateBoardFromCodeCommand";
import { Storage } from "@/domain/services/Storage";
import { onMounted, onUnmounted, reactive } from "vue";

export const init = (): AppState => {
  return reactive({
    commandInvoker: new Invoker(),
    size: { width: 10 },
    board: new Board(10),
    savedBoardsNames: Storage.getBoardNames(),
    currentBoardName: { name: "" },
  });
};

export const commandsInit = (state: AppState): any => {
  return {
    clearBoard: () => {
      state.currentBoardName.name = "";
      state.commandInvoker.execute(new ClearBoardCommand(state));
    },

    saveBoard: (name: string) => {
      state.currentBoardName.name = name;
      state.commandInvoker.execute(new SaveCommand(name, state));
      state.savedBoardsNames = Storage.getBoardNames();
    },

    loadBoard: (name: string) => {
      state.currentBoardName.name = name;
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

export const registerKeyboardShortcuts = (
  state: AppState,
  commands: any
): void => {
  const handler = (event: KeyboardEvent) => {
    if (
      (event.key === "z" && event.ctrlKey) ||
      (event.key === "Z" && event.ctrlKey)
    ) {
      state.commandInvoker.undo();
    } else if (
      (event.key === "y" && event.ctrlKey) ||
      (event.key === "Y" && event.ctrlKey)
    ) {
      state.commandInvoker.redo();
    } else if (
      (event.key === "s" && event.ctrlKey) ||
      (event.key === "S" && event.ctrlKey)
    ) {
      event.preventDefault();
      const name = (
        document.querySelector("input[name=pattern-name]") as HTMLInputElement
      ).value;
      commands.saveBoard(name);
    } else if (
      (event.key === "c" && event.ctrlKey) ||
      (event.key === "C" && event.ctrlKey)
    ) {
      commands.clearBoard();
    } else if (
      (event.key === "i" && event.ctrlKey) ||
      (event.key === "I" && event.ctrlKey)
    ) {
      commands.invert();
    }
  };

  onMounted(() => {
    document.addEventListener("keydown", handler);
  });

  onUnmounted(() => {
    document.removeEventListener("keydown", handler);
  });
};
