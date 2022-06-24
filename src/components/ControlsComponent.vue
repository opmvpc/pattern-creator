<script setup lang="ts">
import ButtonComponent from "./ButtonComponent.vue";

const emit = defineEmits([
  "board:clear",
  "board:invert",
  "command:undo",
  "command:redo",
]);
</script>

<template>
  <div class="flex items-center justify-between sm:justify-center sm:space-x-8">
    <ButtonComponent @click="emit('board:clear')"> Clear </ButtonComponent>
    <ButtonComponent @click="emit('board:invert')"> Inverse </ButtonComponent>
    <ButtonComponent @click="emit('command:undo')"> Undo </ButtonComponent>
    <ButtonComponent @click="emit('command:redo')"> Redo </ButtonComponent>
  </div>
</template>
