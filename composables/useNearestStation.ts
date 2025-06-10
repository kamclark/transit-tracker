// composables/useNearestStation.ts
import { ref } from "vue";
import type { GeoCoordinates } from "@/types";
import { findNearestStation } from "@/services/nearestStationService";
import type { SeptaStation } from "@/models/SeptaStation";

export function useNearestStation() {
  const station = ref<SeptaStation | null>(null);
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
    } catch (e: any) {
      error.value = e.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  }

  return { station, loading, error, fetchNearest };
}
