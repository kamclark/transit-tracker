// composables/useLocation.ts
import { ref } from "vue";
import type { GeoCoordinates } from "@/types";
import { getUserCoordinates } from "@/services/geolocationService";

const coordinates = ref<GeoCoordinates | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

export function useLocation() {
  async function fetchLocation() {
    try {
      loading.value = true;
      const userCoords = await getUserCoordinates();
      coordinates.value = userCoords;
    } catch (e: unknown) {
      if (e instanceof GeolocationPositionError) {
        error.value = `Geolocation error: ${e.message}`;
      } else if (e instanceof Error) {
        error.value = `Error: ${e.message}`;
      } else {
        error.value = "An unknown error occurred.";
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
