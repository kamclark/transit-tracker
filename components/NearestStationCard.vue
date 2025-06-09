<template>
  <section class="station-card card mb-lg">
    <div v-if="station">
      <h3 v-if="roundedDistance !== null">
        {{ station.location_name }} ({{ roundedDistance }} miles away)
      </h3>

      <p>Last updated: {{ lastUpdated }}</p>

      <ArrivalsList :stationName="station.location_name" />
    </div>

    <div v-else>
      <p class="text-text-low">⚠️ No nearby station found for these coordinates.</p>
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

const roundedDistance = computed(() => {
  const raw = Number(props.station?.distance);
  return isNaN(raw) ? null : Math.floor(raw * 1000) / 1000;
});
</script>
