<template>
  <section class="arrivals-section card mt-md">
    <h2 class="mb-sm">Arrivals at {{ stationName }}</h2>

    <p v-if="loading">📡 Loading arrivals…</p>
    <p v-else-if="error" class="text-red-500">🚨 {{ error }}</p>
    <ul v-else>
      <li
        v-for="(train, i) in arrivals"
        :key="i"
        class="mb-xs"
      >
        <strong>ID:</strong> {{ train.train_id }} |
        <strong>Status:</strong> {{ train.status }} |
        <strong>Direction:</strong> {{ train.direction }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useArrivals } from "@/composables/useArrivals";

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
