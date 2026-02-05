<script setup lang="ts">
import { ref, computed } from 'vue';
import type { IArrival } from '@/models/arrival';
import type { ArrivalGroupKey } from '@/models/arrivalGrouping';
import { getGroupLabel } from '@/utils/arrivalDisplay';
import RouteChip from './RouteChip.vue';
import CountdownBadge from './CountdownBadge.vue';
import ArrivalRow from './ArrivalRow.vue';

const props = defineProps<{
  groupKey: ArrivalGroupKey;
  arrivals: IArrival[];
  defaultExpanded?: boolean;
}>();

const expanded = ref(props.defaultExpanded ?? false);

const groupLabel = computed(() => getGroupLabel(props.groupKey));
const nextArrival = computed(() => props.arrivals[0] ?? null);
const additionalCount = computed(() => Math.max(0, props.arrivals.length - 1));

function toggle() {
  expanded.value = !expanded.value;
}
</script>

<template>
  <div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-3">
    <!-- Card Header -->
    <button
      class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
      @click="toggle"
    >
      <div class="flex items-center gap-3">
        <RouteChip :route="groupKey.route" />
        <span class="font-medium text-gray-900">{{ groupLabel }}</span>
      </div>
      <div class="flex items-center gap-3">
        <CountdownBadge v-if="nextArrival" :estimated-time="nextArrival.estimatedTime" />
        <span v-if="additionalCount > 0" class="text-sm text-gray-500">
          +{{ additionalCount }} more
        </span>
        <svg
          class="w-5 h-5 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': expanded }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>

    <!-- Expanded Content -->
    <div
      v-show="expanded"
      class="border-t border-gray-200 divide-y divide-gray-100"
    >
      <ArrivalRow
        v-for="arrival in arrivals"
        :key="arrival.id"
        :arrival="arrival"
      />
    </div>
  </div>
</template>
