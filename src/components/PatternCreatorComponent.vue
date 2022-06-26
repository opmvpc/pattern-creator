<script setup lang="ts">
import BoardComponent from "@/components/Board/BoardComponent.vue";
import BoardSizeComponent from "@/components/Controls/BoardSizeComponent.vue";
import CodeComponent from "@/components/Controls/CodeComponent.vue";
import SaveComponent from "@/components/Controls/SaveComponent.vue";
import LoadComponent from "@/components/Controls/LoadComponent.vue";
import ControlsComponent from "@/components/Controls/ControlsComponent.vue";
import ErrorMessageComponent from "@/components/ErrorMessageComponent.vue";
import type { AppState } from "@/domain/types/AppState";
import {
  init,
  commandsInit,
  registerKeyboardShortcuts,
} from "@/domain/services/PatternCreatorService";

const state: AppState = init();
const commands = commandsInit(state);
registerKeyboardShortcuts(state, commands);
</script>

<template>
  <BoardSizeComponent
    :size="state.size.width"
    @update:size="commands.updateSize"
  ></BoardSizeComponent>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
    <SaveComponent
      @board:save="commands.saveBoard"
      :selected="state.currentBoardName.name"
    ></SaveComponent>
    <LoadComponent
      :savedBoardsNames="state.savedBoardsNames"
      :selected="state.currentBoardName.name"
      @board:load="commands.loadBoard"
    ></LoadComponent>
  </div>
  <div id="board-grid" class="w-full xl:w-3/5 mx-auto">
    <BoardComponent
      :size="state.size.width"
      :cells="state.board.cells"
      @board:draw="commands.draw"
    ></BoardComponent>
  </div>
  <ControlsComponent
    :hasPrevious="state.commandInvoker.hasPrevious"
    :hasNext="state.commandInvoker.hasNext"
    @board:clear="commands.clearBoard"
    @board:invert="commands.invert"
    @command:undo="() => state.commandInvoker.undo()"
    @command:redo="() => state.commandInvoker.redo()"
  ></ControlsComponent>
  <ErrorMessageComponent
    :error-message="state.commandInvoker.error.message"
  ></ErrorMessageComponent>
  <CodeComponent
    :code="state.board.code.body"
    @code:update="commands.updateBoardFromCode"
  ></CodeComponent>
</template>
