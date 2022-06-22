<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  size: { type: Number, required: true },
});

const emit = defineEmits(["board:clear", "board:toggle", "board:invert"]);

const cellSize = ref(0);

watch(props, () => {
  cellSize.value = getContainerSize();
  clearBoard();
});

const getContainerSize = () => {
  const containerWidth = (
    document.querySelector("#board-grid") as HTMLDivElement
  ).offsetWidth;
  return Math.ceil(containerWidth / props.size) - 2;
};

const clearBoard = () => {
  emit("board:clear");
  const cells = document.querySelectorAll(
    ".cell"
  ) as NodeListOf<HTMLDivElement>;
  for (const cell of cells) {
    cell.style.backgroundColor = "white";
  }
};

const handleCellClick = (event: Event, index: number) => {
  const elem = event.target as HTMLDivElement;
  drawOnCell(elem, index);
};

const handleCellDragToDraw = (event: PointerEvent, index: number) => {
  if (event.buttons !== 1) {
    return;
  }
  const elem = event.target as HTMLDivElement;
  drawOnCell(elem, index);
};

const drawOnCell = (elem: HTMLDivElement, index: number) => {
  if (elem.style.backgroundColor === "black") {
    elem.style.backgroundColor = "white";
  } else {
    elem.style.backgroundColor = "black";
  }
  emit("board:toggle", index - 1);
};

const invert = () => {
  const cells = document.querySelectorAll(
    ".cell"
  ) as NodeListOf<HTMLDivElement>;
  for (const cell of cells) {
    if (cell.style.backgroundColor === "black") {
      cell.style.backgroundColor = "white";
    } else {
      cell.style.backgroundColor = "black";
    }
  }
  emit("board:invert");
};

onMounted(() => {
  cellSize.value = getContainerSize();
  window.addEventListener("resize", () => {
    cellSize.value = getContainerSize();
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", () => {});
});
</script>

<template>
  <div class="flex flex-col">
    <div
      class="grid mx-auto border border-black"
      :style="`grid-template-columns: repeat(${size}, ${cellSize}px);grid-template-rows: repeat(${size}, ${cellSize}px);`"
    >
      <div
        class="cell flex items-center justify-center border border-black cursor-pointer"
        v-for="n in size * size"
        @mousedown.prevent="handleCellClick($event, n)"
        @pointerover.prevent="handleCellDragToDraw($event, n)"
      ></div>
    </div>
    <div class="my-8 flex items-center justify-center space-x-8">
      <button
        class="bg-teal-300 text-teal-800 font-bold shadow px-4 py-2 rounded-md"
        @click="clearBoard"
      >
        Clear
      </button>
      <button
        class="bg-teal-100 text-teal-800 font-bold shadow px-4 py-2 rounded-md"
        @click="invert"
      >
        Inverse
      </button>
    </div>
  </div>
</template>
