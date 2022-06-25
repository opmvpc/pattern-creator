<script setup lang="ts">
import PatternCreatorComponent from "@/components/PatternCreatorComponent.vue";
</script>

<template>
  <div class="container mx-auto px-4 font-mono pb-8">
    <header class="mt-4 mb-8">
      <h1 class="text-center font-bold text-2xl">Pattern Creator</h1>
    </header>
    <main class="grid grid-cols-1 gap-8">
      <PatternCreatorComponent></PatternCreatorComponent>
    </main>
  </div>
</template>
