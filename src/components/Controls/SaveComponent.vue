<script setup lang="ts">
import ButtonComponent from "@/components/Buttons/ButtonComponent.vue";
import { ref, watch } from "vue";

const props = defineProps({
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
  <form class="flex items-center space-x-4">
    <input
      class="py-2 px-3 bg-gray-100 shadow-md w-full rounded-md"
      type="text"
      v-model="name"
      placeholder="Name"
    />
    <ButtonComponent @click.prevent="$emit('board:save', name)"
      >Save</ButtonComponent
    >
  </form>
</template>
