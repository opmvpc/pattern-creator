<script setup lang="ts">
import ButtonComponent from "@/components/Buttons/ButtonComponent.vue";

defineProps({
  selected: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <form class="flex items-center space-x-4">
    <input
      class="py-2 px-3 bg-gray-100 shadow-md w-full rounded-md"
      type="text"
      v-model="selected"
      placeholder="Name"
    />
    <ButtonComponent @click.prevent="$emit('board:save', selected)"
      >Save</ButtonComponent
    >
  </form>
</template>
