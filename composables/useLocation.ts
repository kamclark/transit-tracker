// composables/useLocation.ts
// SINGLETON composable - state is shared across all callers
// This is intentional: there's only one user location in the app

import { ref } from "vue";
import type { GeoCoordinates } from "@/types";
import { getUserCoordinates } from "@/services/geolocationService";

// Module-scoped state (singleton pattern)
const coordinates = ref<GeoCoordinates | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

export function useLocation() {
  async function fetchLocation() {
    loading.value = true;
    error.value = null;
    try {
      coordinates.value = await getUserCoordinates();
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e.message;
      } else {
        error.value = "Failed to get location.";
      }
    } finally {
      loading.value = false;
    }
  }

  return {
    coords: coordinates,
    loading,
    error,
    fetchLocation,
  };
}
