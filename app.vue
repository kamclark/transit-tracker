<script setup lang="ts">
import { onMounted, watch } from "vue";
import TitleBar from "./components/TitleBar.vue";
import { useLocation } from "@/composables/useLocation";
import { useNearestStation } from "@/composables/useNearestStation";

const { coords, loading: geoLoading, error: geoError, fetchLocation } = useLocation();
const {
  station,
  loading: stationLoading,
  error: stationError,
  fetchNearest,
} = useNearestStation();

const stationIdRef = computed(() => station?.value?.id || "");
const {
  arrivals,
  loading: arrivalsLoading,
  error: arrivalsError,
  refresh: refreshArrivals,
} = useArrivals(stationIdRef);

onMounted(async () => {
  await fetchLocation();
  if (coords.value) {
    await fetchNearest(coords.value);
    console.log("🚉 Station data:", station.value);
  }
});

// refetch if coords ever change
watch(coords, (newCoords) => {
  if (newCoords) fetchNearest(newCoords);
});
</script>

<template>
  <main class="p-4">
    <TitleBar appTitle="Transit Tracker" />

    <div v-if="geoLoading">Locating you…</div>
    <div v-else-if="geoError" class="text-red-500">{{ geoError }}</div>

    <div v-else-if="stationLoading">Finding nearest station…</div>
    <div v-else-if="stationError" class="text-red-500">{{ stationError }}</div>

    <div v-else-if="station">
      <div class="mb-3">
        <h2 class="text-lg font-semibold">{{ station.name }}</h2>
        <p>ID: {{ station.id }} • {{ station.distance.toFixed(2) }} mi away</p>
      </div>

      <button
        class="px-3 py-1 rounded bg-blue-600 text-white mb-4"
        @click="refreshArrivals"
      >
        🔄 Refresh Arrivals
      </button>

      <div v-if="arrivalsLoading">Loading train times…</div>
      <div v-else-if="arrivalsError" class="text-red-500">{{ arrivalsError }}</div>

      <div v-else>
        <div class="mb-2">
          <h3 class="font-medium">Northbound</h3>
          <ul>
            <li
              v-for="train in arrivals?.northbound"
              :key="train.trainId"
              class="py-1 train-arrival border-b"
            >
              {{ train.departTime.toLocaleTimeString() }} ({{ train.status }}) —
              {{ train.origin }} → {{ train.destination }} ({{ train.line }})
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-medium">Southbound</h3>
          <ul>
            <li
              v-for="train in arrivals?.southbound"
              :key="train.trainId"
              class="py-1 train-arrival border-b"
            >
              {{ train.departTime.toLocaleTimeString() }} ({{ train.status }}) —
              {{ train.origin }} → {{ train.destination }} ({{ train.line }})
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.train-arrival {
  list-style: none;
}
</style>
