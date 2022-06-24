<script setup lang="ts">
import BoardComponent from "@/components/BoardComponent.vue";
import BoardSizeComponent from "@/components/BoardSizeComponent.vue";
import CodeComponent from "@/components/CodeComponent.vue";
import { ref } from "vue";
import { Board } from "./models/Board";
import SaveComponent from "./components/SaveComponent.vue";
import LoadComponent from "./components/LoadComponent.vue";
import { Invoker } from "./models/Commands/Invoker";
import { SaveCommand } from "./models/Commands/SaveCommand";
import { Storage } from "./models/Storage";
import { LoadCommand } from "./models/Commands/LoadCommand";
import { ClearBoardCommand } from "./models/Commands/ClearBoardCommand";
import { InverseBoardCommand } from "./models/Commands/InverseBoardCommand";

const commandInvoker = new Invoker();
const size = ref(10);
const board = ref(new Board(size.value));
const savedBoardsNames = ref(Storage.getBoardNames());
const currentBoardName = ref("");

const clearBoard = () => {
  currentBoardName.value = "";
  commandInvoker.execute(new ClearBoardCommand(board.value, size.value));
  commandInvoker.clear();
};

const saveBoard = (name: string) => {
  currentBoardName.value = name;
  commandInvoker.execute(new SaveCommand(name, board.value.getCellsJSON()));
  savedBoardsNames.value = Storage.getBoardNames();
};

const loadBoard = (name: string) => {
  commandInvoker.execute(new LoadCommand(name, board, size));
  commandInvoker.clear();
  currentBoardName.value = name;
};

const updateSize = (newSize: string) => {
  size.value = parseInt(newSize);
  board.value.updateSize(size.value);
};

const invert = () => {
  commandInvoker.execute(new InverseBoardCommand(board.value));
};
</script>

<template>
  <div class="container mx-auto px-4 font-mono">
    <header class="mt-4 mb-8">
      <h1 class="text-center font-bold text-2xl">Pattern Creator</h1>
    </header>
    <main class="grid grid-cols-1 gap-8">
      <BoardSizeComponent
        :size="size"
        @update:size="updateSize"
      ></BoardSizeComponent>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <SaveComponent
          @board:save="saveBoard"
          :selected="currentBoardName"
        ></SaveComponent>
        <LoadComponent
          :savedBoardsNames="savedBoardsNames"
          :selected="currentBoardName"
          @board:load="loadBoard"
        ></LoadComponent>
      </div>
      <div id="board-grid" class="w-full xl:w-3/5 mx-auto">
        <BoardComponent
          :size="size"
          :cells="board.cells"
          @board:clear="clearBoard()"
          @board:toggle="(index: number) => board.toggleCell(index)"
          @board:invert="() => invert()"
        ></BoardComponent>
        <CodeComponent :code="board.getCode()"></CodeComponent>
      </div>
    </main>
  </div>
</template>
