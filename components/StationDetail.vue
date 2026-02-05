<script setup lang="ts">
import { computed } from "vue";
import type { IStation } from "@/models/station";
import { useArrivals } from "@/composables/useArrivals";
import ArrivalsDisplay from "./arrivals/ArrivalsDisplay.vue";

const props = defineProps<{
  station: IStation;
}>();

const stationIdRef = computed(() => props.station.id);
const {
  groupedArrivals,
  loading: arrivalsLoading,
  error: arrivalsError,
  refresh: refreshArrivals,
} = useArrivals(stationIdRef);

const handleRefreshClick = () => {
  refreshArrivals();
};
</script>

<template>
  <div class="station-detail-container bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200">
    <div class="station-header flex items-center justify-between mb-4">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 mb-1">
          {{ props.station.name }}
        </h1>
        <p class="text-sm text-gray-500">
          ID: <span class="font-medium text-gray-700">{{ props.station.id }}</span>
          • Transit Authority: <span class="font-medium text-gray-700">{{ props.station.transitAuthorityKey.toUpperCase() }}</span>
        </p>
      </div>
      <button
        :disabled="arrivalsLoading"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out flex items-center gap-2"
        :class="{ 'opacity-50 cursor-not-allowed': arrivalsLoading }"
        @click="handleRefreshClick"
      >
        <svg v-if="arrivalsLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <span v-else>Refresh</span>
      </button>
    </div>

    <div class="arrivals-section mt-6">
      <h3 class="text-xl font-bold text-gray-800 mb-4">Upcoming Arrivals</h3>

      <ArrivalsDisplay
        :groups="groupedArrivals"
        :loading="arrivalsLoading"
        :error="arrivalsError"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
