<template>
  <div>
    <!-- Inline Filter Buttons -->
    <div class="time-filters mb-sm">
      <button
        v-for="option in timeOptions"
        :key="option.value"
        class="btn-filter"
        :class="{ active: selectedWindow === option.value }"
        @click="selectedWindow = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <!-- Arrivals List -->
    <div v-if="loading">Loading arrivals...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="(t, index) in arrivals" :key="index">
        🛤️ Train ({{ t.train_id }}) — {{ t.status }} — to {{ t.destination }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useArrivals } from "@/composables/useArrivals";

const props = defineProps<{
  stationName: string;
}>();

const { arrivals, loading, error, fetchArrivals } = useArrivals();

const timeOptions = [
  { label: "Next", value: "next" },
  { label: "60m", value: 60 },
  { label: "120m", value: 120 },
  { label: "24h", value: 1440 },
];

const selectedWindow = ref<number | "next">(1440);


watch(
  () => [props.stationName, selectedWindow.value],
  ([name, window]) => {
    if (name) fetchArrivals(name, window);
  },
  { immediate: true }
);
</script>

<style scoped>
.time-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.btn-filter {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  background-color: var(--color-surface);
  color: var(--color-text-high);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-filter:hover {
  background-color: var(--color-hover);
}

.btn-filter.active {
  background-color: var(--color-primary);
  color: white;
  font-weight: bold;
}
</style>
