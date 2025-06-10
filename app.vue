<script setup lang="ts">
import { onMounted, watch } from "vue";
import TitleBar from "./components/TitleBar.vue";
import { useLocation } from "@/composables/useLocation";
import { useNearestStation } from "@/composables/useNearestStation";

const { coords, loading: geoLoading, error: geoError, fetchLocation } = useLocation();
const { station, loading: stationLoading, error: stationError, fetchNearest } = useNearestStation();

onMounted(async () => {
  await fetchLocation();
  if (coords.value) {
    await fetchNearest(coords.value);
    console.log("🚉 Station data:", station.value);
  }
});

// reactively refetch if coords ever change
watch(coords, (newCoords) => {
  if (newCoords) fetchNearest(newCoords);
});
</script>

<template>
  <TitleBar appTitle="Transit Tracker" />

  <div v-if="geoLoading || stationLoading">Loading…</div>
  <div v-else-if="geoError">{{ geoError }}</div>
  <div v-else-if="stationError">{{ stationError }}</div>
  <div v-else-if="station">
    <h2>Nearest Station</h2>
    <h3>{{ station.name }}</h3>
    <p>(Station ID: <span>{{ station.id }}</span>)</p>
    <p>Distance: {{ station.distance.toFixed(2) }} miles</p>
  </div>
</template>

<style>
span{
  color: 
}

h3 {
  color: lightblue
}
</style>