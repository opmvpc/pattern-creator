<script setup lang="ts">
defineEmits(["board:load"]);

defineProps({
  savedBoardsNames: {
    type: Array,
    required: true,
  },
  selected: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <select
    class="py-2 px-3 bg-gray-100 shadow-md w-full rounded-md"
    v-show="savedBoardsNames.length > 0"
    v-model="selected"
    @change="$emit('board:load', selected)"
  >
    <option value="" class="text-gray-700" disabled>
      Load a saved pattern
    </option>
    <option v-for="name in savedBoardsNames" :value="name">
      {{ name }}
    </option>
  </select>
</template>
