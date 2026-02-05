<script setup lang="ts">
import { computed } from 'vue';
import type { ArrivalStatus } from '@/models/arrivalTypes';
import { getStatusDisplay } from '@/utils/arrivalDisplay';

const props = defineProps<{
  status: ArrivalStatus;
  rawStatus?: string;
}>();

const display = computed(() => getStatusDisplay(props.status));
const label = computed(() => props.rawStatus || display.value.label);
</script>

<template>
  <span
    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
    :class="display.colorClass"
  >
    {{ label }}
  </span>
</template>
