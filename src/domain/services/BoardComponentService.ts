import { computed, ref, watch, onMounted, onUnmounted } from "vue";
import type { BoardComponentState } from "@/domain/types/BoardComponentState";

const init = (props: any): BoardComponentState => {
  let isDrawing = false;
  let pointsToDraw: number[] = [];

  const cellWidth = ref(0);
  const colCount = computed(() => {
    return props?.size;
  });

  watch(colCount, () => {
    cellWidth.value = computeCellWidth();
  });

  const resizeHandler = () => {
    cellWidth.value = computeCellWidth();
  };

  onMounted(() => {
    cellWidth.value = computeCellWidth();
    window.addEventListener("resize", resizeHandler);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resizeHandler);
  });

  const computeCellWidth = (): number => {
    const container = document.querySelector("#board-grid") as HTMLDivElement;
    if (!container) {
      return 0;
    }
    const containerWidth = container.offsetWidth;
    return Math.ceil(containerWidth / colCount.value) - 2;
  };

  return {
    isDrawing: isDrawing,
    pointsToDraw: pointsToDraw,
    cellWidth: cellWidth,
    colCount: colCount,
  };
};

export { init };
