<script setup lang="ts">
defineProps({
  size: { type: Number, required: true },
});

defineEmits(["update:size"]);
</script>

<template>
  <form class="flex flex-col mx-auto w-1/3">
    <label for="size" class="font-bold">Size</label>
    <div class="flex space-x-4 w-full">
      <input
        class="flex-grow"
        id="size"
        type="range"
        :value="size"
        min="2"
        max="50"
        @input="$emit('update:size', ($event.target as HTMLInputElement).value)"
      />
      <span class="text-sm"> {{ size }} x {{ size }} </span>
    </div>
  </form>
</template>
