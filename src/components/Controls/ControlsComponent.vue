<script setup lang="ts">
import ButtonComponent from "@/components/Buttons/ButtonComponent.vue";

const emit = defineEmits([
  "board:clear",
  "board:invert",
  "command:undo",
  "command:redo",
]);

const props = defineProps({
  hasNext: {
    type: Boolean,
    required: true,
  },
  hasPrevious: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center justify-between sm:justify-center sm:space-x-8">
    <ButtonComponent @click="emit('board:clear')"> Clear </ButtonComponent>
    <ButtonComponent @click="emit('board:invert')"> Inverse </ButtonComponent>
    <ButtonComponent @click="emit('command:undo')" :disabled="!hasPrevious">
      Undo
    </ButtonComponent>
    <ButtonComponent @click="emit('command:redo')" :disabled="!hasNext">
      Redo
    </ButtonComponent>
  </div>
</template>
