<script setup lang="ts">
import { computed } from 'vue';
import { formatCountdown } from '@/utils/arrivalDisplay';

const props = defineProps<{
  estimatedTime: Date | null;
}>();

const countdown = computed(() => formatCountdown(props.estimatedTime));

const isImminent = computed(() => {
  if (!props.estimatedTime) return false;
  const diffMs = props.estimatedTime.getTime() - Date.now();
  return diffMs <= 5 * 60 * 1000; // 5 minutes or less
});
</script>

<template>
  <span
    class="inline-flex items-center justify-center min-w-[4rem] px-3 py-1.5 rounded-lg text-sm font-bold"
    :class="isImminent ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'"
  >
    {{ countdown }}
  </span>
</template>
