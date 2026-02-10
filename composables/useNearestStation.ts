// composables/useNearestStation.ts
// SINGLETON composable - state is shared across all callers
// This is intentional: there's only one "nearest station" to the user's location

import { ref } from "vue";
import { septaAuthority } from "@/models/septa/septaAuthority";
import type { GeoCoordinates } from "@/types";
import type { IStation } from "@/models/station";

// Module-scoped state (singleton pattern)
const station = ref<IStation | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

export function useNearestStation() {
  async function fetchNearest(coords: GeoCoordinates) {
    loading.value = true;
    error.value = null;

    try {
      const result = await septaAuthority.findNearestStation(coords);
      if (!result) {
        error.value = "No station found nearby.";
      } else {
        station.value = result;
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e.message;
      } else {
        error.value = "An unexpected error occurred";
      }
    } finally {
      loading.value = false;
    }
  }

  return { station, loading, error, fetchNearest };
}
