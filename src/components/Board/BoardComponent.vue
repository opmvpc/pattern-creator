<script setup lang="ts">
import type { Cell } from "@/models/Cell";
import { init } from "./BoardComponentService";
import type { BoardComponentState } from "./BoardComponentState";

const emit = defineEmits(["board:draw"]);

const props = defineProps({
  size: { type: Number, required: true },
  cells: { type: Array, required: true },
});

let { isDrawing, pointsToDraw, cellWidth, colCount }: BoardComponentState =
  init(props);

const handleCellClick = (event: Event, index: number) => {
  isDrawing = true;
  drawOnCell(event, index);
};

const handleCellDragToDraw = (event: PointerEvent, index: number) => {
  if (event.buttons !== 1) {
    return;
  }
  drawOnCell(event, index);
};

const drawOnCell = (event: Event, index: number) => {
  const cell = event.target as HTMLDivElement;
  cell.style.backgroundColor =
    cell.style.backgroundColor === "black" ? "white" : "black";
  if (isDrawing) {
    pointsToDraw.push(index);
  }
};

const handleStopDrawing = () => {
  isDrawing = false;
  emit("board:draw", pointsToDraw);
  pointsToDraw = [];
};
</script>

<template>
  <div class="flex flex-col">
    <div
      class="grid mx-auto border border-black"
      :style="`grid-template-columns: repeat(${colCount}, ${cellWidth}px);grid-template-rows: repeat(${colCount}, ${cellWidth}px);`"
    >
      <div
        class="cell flex items-center justify-center border border-black cursor-pointer"
        v-for="(cell, n) in cells"
        @mousedown.prevent="handleCellClick($event, n)"
        @mouseup="handleStopDrawing()"
        @pointerover.prevent="handleCellDragToDraw($event, n)"
        :style="`background-color: ${(cell as Cell).getValue() ? 'black' : 'white'};`"
      ></div>
    </div>
  </div>
</template>
