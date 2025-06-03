<template>
  <TitleBar appTitle="Transit Tracker" />
  <LocationDebugPanel
    :selectedLocationIndex="selectedIndex"
    :coords="coords"
    :debugLocations="debugLocations"
    @update:selectedLocationIndex="setByIndex"
    @update:coords="setManual"
    @forceError="handleSimulatedError"
  />

  <LocationOutput :coords="coords" />

  <NearestStationCard
    :station="nearestStation ?? null"
    :lastUpdated="lastUpdated"
    :windowMinutes="windowMinutes"
    @update:windowMinutes="windowMinutes = $event"
  />

  <p v-if="stationError" class="text-red-500 mt-md">
    {{ stationError }}
  </p>
</template>

<script setup lang="ts">
import TitleBar from "./components/TitleBar.vue";
import LocationDebugPanel from "./components/LocationDebugPanel.vue";
import LocationOutput from "./components/LocationOutput.vue";
import DebugLocations from "./mocks/DebugLocations";
import { useDebugLocation } from "@/composables/useDebugLocation";
import { useNearestStation } from "./composables/useNearestStation";

const {
  selectedIndex,
  coords,
  debugLocations,
  setByIndex,
  setManual,
} = useDebugLocation();

const {
  nearestStation,
  lastUpdated,
  windowMinutes,
  timeOptions,
  refreshStationData
} = useNearestStation(coords);

const selectedLocation = ref("0"); // “Home” at index 0
// const coords = ref<Coordinates | null>(null);
const stationError = ref<string | null>(null);

// Set debug coordinates by dropdown
function setDebugLocation() {
  const index = parseInt(selectedLocation.value);
  coords.value = DebugLocations[Number(selectedLocation.value)].coords;
}

function handleSimulatedError() {
  stationError.value = "🔥 Simulated error from debug panel";
  console.error("Simulated error triggered");
}

// Seed coords on mount
onMounted(() => {
  setDebugLocation();
});
</script>
