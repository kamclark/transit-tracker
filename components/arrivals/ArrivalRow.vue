<script setup lang="ts">
import type { IArrival } from '@/models/arrival';
import StatusBadge from './StatusBadge.vue';

defineProps<{
  arrival: IArrival;
}>();

function formatTime(date: Date | null): string {
  if (!date) return '--';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
</script>

<template>
  <div class="flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors">
    <div class="flex items-center gap-4">
      <span class="font-semibold text-gray-900 min-w-[4rem]">
        {{ formatTime(arrival.estimatedTime) }}
      </span>
      <StatusBadge :status="arrival.status" :raw-status="arrival.rawStatus" />
    </div>
    <div class="text-right text-sm text-gray-600">
      <span v-if="arrival.platform" class="font-medium">
        Track {{ arrival.platform }}
      </span>
    </div>
  </div>
</template>
