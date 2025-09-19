<script setup lang="ts">
import { onMounted, watch } from "vue";
import TitleBar from "./components/TitleBar.vue";
import { useLocation } from "@/composables/useLocation";
import { useNearestStation } from "@/composables/useNearestStation";
import StationDetail from "./components/StationDetail.vue";

const { coords, loading: geoLoading, error: geoError, fetchLocation } = useLocation();
const {
  station,
  loading: stationLoading,
  error: stationError,
  fetchNearest,
} = useNearestStation();


onMounted(async () => {
  await fetchLocation();
  if (coords.value) {
    await fetchNearest(coords.value);
  }
});

// refetch if coords ever change
watch(coords, (newCoords) => {
  if (newCoords) fetchNearest(newCoords);
});
</script>

<template>
  <main class="p-4">
    <TitleBar app-title="Transit Tracker" />

    <div v-if="geoLoading">Locating you…</div>
    <div v-else-if="geoError" class="text-red-500">{{ geoError }}</div>

    <div v-else-if="stationLoading">Finding nearest station…</div>
    <div v-else-if="stationError" class="text-red-500">{{ stationError }}</div>

    <StationDetail
      v-else-if="station"
      :station="station" />
    <div v-else>No station data available.</div>
  </main>
</template>

<style>
</style>