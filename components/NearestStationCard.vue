<template>
  <section class="station-card card mb-lg">
    <h2 class="text-text-high mb-sm">Nearest Station</h2>

    <div v-if="station">
      <p class="station-name font-bold">{{ station.location_name }} <span v-if="station.distance">({{ station.distance }} miles away)</span></p>
      

      <!-- Add controls or station info here -->
    </div>

    <div v-else>
      <p class="text-text-low">⚠️ No nearby station found for these coordinates.</p>
    </div>

    <div class="refresh-section">
      <button class="refresh-btn" @click="$emit('refresh')">🔁 Refresh</button>
      <span v-if="lastUpdated">Last updated: {{ lastUpdated }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Station } from "@/types"

const props = defineProps<{
  station: Station | null;
  lastUpdated: string | null;
  windowMinutes: number | "next";
  timeOptions: Array<{ label: string; value: number | "next" }>;
}>();

const emit = defineEmits<{
  (e: "refresh"): void;
  (e: "update:windowMinutes", val: number | "next"): void;
}>();
</script>
