<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from "vue";

const props = defineProps({
  size: { type: Number, required: true },
});

const emit = defineEmits(["update:size", "board:clear", "board:toggle"]);

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
  if (elem.style.backgroundColor === "black") {
    elem.style.backgroundColor = "white";
  } else {
    elem.style.backgroundColor = "black";
  }
  emit("board:toggle", index);
};

onMounted(() => {
  cellSize.value = getContainerSize();
  window.addEventListener("resize", () => {
    cellSize.value = getContainerSize();
  });
  const cells = document.querySelectorAll(
    ".cell"
  ) as NodeListOf<HTMLDivElement>;
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("pointerover", (event) => {
      if ((event as PointerEvent).buttons === 1) {
        const elem = event.target as HTMLDivElement;
        const index = parseInt(
          elem.attributes.getNamedItem("data-index")?.value ?? ""
        );
        handleCellClick(event, index);
      }
    });
  }
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
        :data-index="n"
        @mousedown.prevent="handleCellClick($event, n)"
      ></div>
    </div>
    <div class="my-8 flex items-center justify-center">
      <button
        class="bg-teal-300 text-teal-800 font-bold shadow px-4 py-2 rounded-md"
        @click="clearBoard"
      >
        Clear
      </button>
    </div>
  </div>
</template>
