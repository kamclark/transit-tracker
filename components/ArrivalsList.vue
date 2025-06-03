<!-- components/ArrivalsList.vue -->
<template>
  <div>
    <div v-if="loading">Loading arrivals...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="(t, index) in arrivals" :key="index">
        Train ({{ t.train_id }}) — {{ t.status }} — to {{ t.destination }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useArrivals } from "@/composables/useArrivals";
import { watch } from "vue";
import type { Station } from "@/types";

const props = defineProps<{
  stationName: string;
}>();

const { arrivals, loading, error, fetchArrivals } = useArrivals();

watch(
  () => props.stationName,
  (name) => {
    if (name) fetchArrivals(name);
  },
  { immediate: true }
);
</script>
