// composables/useNearestStation.ts
import { ref } from "vue";
import { findNearestStation } from "@/services/nearestStationService";
import type { GeoCoordinates } from "~/types";
import type { IStation } from "@/models/station";

export function useNearestStation() {
  const station = ref<IStation | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  
  async function fetchNearest(coords: GeoCoordinates) {
    loading.value = true;
    error.value = null;

    try {
      const result = await findNearestStation(coords);
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
