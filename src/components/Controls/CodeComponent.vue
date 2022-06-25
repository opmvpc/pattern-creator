<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";

defineEmits(["code:update"]);
const props = defineProps({
  code: { type: String, required: true },
});

const code = computed(() => props.code);
</script>

<template>
  <textarea
    class="p-4 bg-gray-100 shadow-md w-full"
    rows="10"
    @input="$emit('code:update', ($event.target as HTMLTextAreaElement).value)"
    :value="code"
  ></textarea>
</template>
