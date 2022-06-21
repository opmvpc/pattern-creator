<script setup lang="ts">
defineProps({
  code: { type: String, required: true },
});
</script>

<template>
  <textarea class="p-4 bg-gray-100 shadow-md w-full">{{ code }}</textarea>
</template>
