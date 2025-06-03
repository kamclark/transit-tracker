<template>
  <section class="station-card card mb-lg">
    <div v-if="station">
      <h3>{{ station.location_name }} ({{ station.distance }} miles away)</h3>
      <p>Last updated: {{ lastUpdated }}</p>

      <!-- Move arrivals logic here -->
      <ArrivalsList :stationName="station.location_name" />
    </div>

    <div v-else>
      <p class="text-text-low">⚠️ No nearby station found for these coordinates.</p>
    </div>

    <div class="refresh-section">
      <button class="refresh-btn" @click="$emit('refresh')">🔁 Refresh</button><br />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useArrivals } from "@/composables/useArrivals";
import { watch } from "vue";
import type { Station } from "~/types";
import ArrivalsList from "@/components/ArrivalsList.vue";

const props = defineProps<{
  station: Station | null;
  lastUpdated: string | null;
  windowMinutes: number | "next";
}>();

const { arrivals, loading, error, fetchArrivals } = useArrivals();

watch(
  () => props.station?.location_name,
  (name) => {
    if (name) fetchArrivals(name);
  },
  { immediate: true }
);
</script>
