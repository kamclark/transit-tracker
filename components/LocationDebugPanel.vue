<template>
  <section class="debug-panel">
    <h2>Debugging</h2>

    <div class="location-controls">
      <label class="label">Mode</label>
      <div class="">
        <label>
          <input type="radio" value="preset" v-model="mode" />
          Preset
        </label>
        <label>
          <input type="radio" value="manual" v-model="mode" />
          Manual
        </label>
      </div>

      <div v-if="mode === 'preset'">
        <label for="debug-location" class="label"> Preset Location </label>
        <br />
        <select
          id="debug-location"
          class="select-input rounded-md"
          :value="selectedLocationIndex"
          @change="emitLocationIndex"
        >
          <option disabled value="">Select Location</option>
          <option
            v-for="(location, index) in debugLocations"
            :key="index"
            :value="index.toString()"
          >
            {{ location.location_name }}
          </option>
        </select>
      </div>

      <!-- Manual Input -->
      <div v-if="mode === 'manual'" class="manual-coords">
        <label class="label">Latitude</label>
        <input
          type="number"
          v-model.number="manualLat"
          placeholder="Latitude"
          class="input"
        />
        <br />
        <label class="label">Longitude</label>
        <input
          type="number"
          v-model.number="manualLon"
          placeholder="Longitude"
          class="input"
        />
        <br />
        <button class="btn" @click="emitManualCoords">Set Manual Coords</button>
      </div>
    </div>
    <!-- Error trigger for testing -->
    <button class="btn" @click="emit('forceError')">Trigger Error</button>
  </section>
</template>

<script setup lang="ts">
import type { Coordinates, DebugStation } from "@/types";

const props = defineProps<{
  selectedLocationIndex: string;
  debugLocations: DebugStation[];
}>();

const emit = defineEmits<{
  (e: "update:selectedLocationIndex", val: string): void;
  (e: "setLocation"): void;
  (e: "update:coords", coords: Coordinates): void;
  (e: "forceError"): void;
}>();

// mode: "preset" or "manual"
const mode = ref<"preset" | "manual">("preset");

// manual input
const manualLat = ref<number | null>(null);
const manualLon = ref<number | null>(null);

function emitLocationIndex(e: Event) {
  const index = (e.target as HTMLSelectElement).value;
  emit("update:selectedLocationIndex", index);
  emit("setLocation");
}

function emitManualCoords() {
  if (manualLat.value != null && manualLon.value != null) {
    emit("update:coords", {
      latitude: manualLat.value,
      longitude: manualLon.value,
    });
  }
}
</script>

<style>
label {
  color: var(--color-text-med);
}
.manual-coords input,
select {
  background-color: rgba(170, 170, 255, 0.894);
}
</style>
