<template>
  <div class="coord-display">
    <p v-if="coords" class="coord mb-xs text-text-high">
      📍 (latty: {{ coords.latitude }}°, longi: {{ coords.longitude }}°)
    </p>
    <p v-else class="coord text-text-high">Grabbing lo…</p>
  </div>
</template>

<script setup lang="ts">
import type { Coordinates } from "@/types";

const props = defineProps<{
  coords: Coordinates | null;
}>();
</script>
