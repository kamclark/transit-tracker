<template>
  <TitleBar appTitle="Transit Tracker" />
  <LocationDebugPanel
    :selectedLocationIndex="selectedLocation"
    :debugLocations="debugLocations"
    @update:selectedLocationIndex="selectedLocation = $event"
    @setLocation="setDebugLocation"
    @update:coords="coords = $event"
    @forceError="handleSimulatedError"
  />
  <LocationOutput :coords="coords" />
  <p v-if="stationError" class="text-red-500 mt-md">
    {{ stationError }}
  </p>
</template>

<script setup lang="ts">
import TitleBar from "~/components/TitleBar.vue";
import LocationDebugPanel from "~/components/LocationDebugPanel";
import LocationOutput from "~/components/LocationOutput";
import debugLocations from "~/mocks/DebugLocations";

const selectedLocation = ref("0"); // “Home” at index 0
const coords = ref<Coordinates | null>(null);
const stationError = ref<string | null>(null);

// Set debug coordinates by dropdown
function setDebugLocation() {
  const index = parseInt(selectedLocation.value);
  coords.value = debugLocations[Number(selectedLocation.value)].coords;
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
