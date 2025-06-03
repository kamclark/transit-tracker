<template>
  <section class="station-card card mb-lg">
    <div v-if="station">
      <h3>{{ station.location_name }} ({{ station.distance }} miles away)</h3>
      <p>Last updated: {{ lastUpdated }}</p>

      <div v-if="loading">Loading arrivals...</div>
      <div v-else-if="error">{{ error }}</div>
      <ul v-else>
        <li v-for="(t, index) in arrivals" :key="index">
          🛤️ {{ t.train_id }} — {{ t.status }} — to {{ t.destination }}
        </li>
      </ul>
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

const props = defineProps<{
  station: Station | null;
  lastUpdated: string | null;
  windowMinutes: number | "next";
  timeOptions: Array<{ label: string; value: number | "next" }>;
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
