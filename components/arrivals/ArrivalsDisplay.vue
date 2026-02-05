<script setup lang="ts">
import type { GroupedArrivals } from '@/models/arrivalGrouping';
import ArrivalGroupCard from './ArrivalGroupCard.vue';

defineProps<{
  groups: GroupedArrivals;
  loading?: boolean;
  error?: string | null;
}>();
</script>

<template>
  <div class="arrivals-display">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8 text-blue-600">
      <svg class="animate-spin h-8 w-8 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <p>Loading arrivals...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8 text-red-500">
      <p class="font-medium">Error loading arrivals</p>
      <p class="text-sm mt-1">{{ error }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="groups.length === 0" class="text-center py-8 text-gray-600">
      <p class="font-medium">No upcoming arrivals</p>
      <p class="text-sm mt-1">Check back later or try refreshing.</p>
    </div>

    <!-- Grouped Arrivals -->
    <div v-else>
      <ArrivalGroupCard
        v-for="group in groups"
        :key="`${group.key.route}::${group.key.destination}`"
        :group-key="group.key"
        :arrivals="group.arrivals"
      />
    </div>
  </div>
</template>
