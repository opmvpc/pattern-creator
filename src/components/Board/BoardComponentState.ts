import type { Ref } from "vue";

export interface BoardComponentState {
  isDrawing: boolean;
  pointsToDraw: number[];
  cellWidth: Ref<number>;
  colCount: Ref<number>;
}
