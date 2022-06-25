<script setup lang="ts">
defineProps({
  errorMessage: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col items-center" v-show="errorMessage.length > 0">
    <h1 class="font-bold text-red-500">Error 😵</h1>
    <p class="text-xs text-red-400">{{ errorMessage }}</p>
  </div>
</template>
