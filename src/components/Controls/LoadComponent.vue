<script setup lang="ts">
import { ref, watch } from "vue";

defineEmits(["board:load"]);

const props = defineProps({
  savedBoardsNames: {
    type: Array,
    required: true,
  },
  selected: {
    type: String,
    required: true,
  },
});

const name = ref(props.selected);

watch(props, () => {
  name.value = props.selected;
});
</script>

<template>
  <select
    class="py-2 px-3 bg-gray-100 shadow-md w-full rounded-md"
    v-show="savedBoardsNames.length > 0"
    v-model="name"
    @change="$emit('board:load', name)"
  >
    <option value="" class="text-gray-700" disabled>
      Load a saved pattern
    </option>
    <option v-for="savedBoardName in savedBoardsNames" :value="savedBoardName">
      {{ savedBoardName }}
    </option>
  </select>
</template>
