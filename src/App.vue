<script setup lang="ts">
import BoardComponent from "@/components/BoardComponent.vue";
import BoardSizeComponent from "@/components/BoardSizeComponent.vue";
import CodeComponent from "@/components/CodeComponent.vue";
import { ref } from "vue";
import { Board } from "./models/Board";

const size = ref(10);
const board = ref(new Board(size.value));

const createBoard = () => {
  board.value = new Board(size.value);
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
        @update:size="(newSize) => (size = parseInt(newSize))"
      ></BoardSizeComponent>
      <div id="board-grid" class="xl:w-3/5 mx-auto">
        <BoardComponent
          :size="size"
          @board:clear="createBoard()"
          @board:toggle="(index: number) => board.toggleCell(index)"
        ></BoardComponent>
        <CodeComponent :code="board.getCellsJSON()"></CodeComponent>
      </div>
    </main>
  </div>
</template>
