import { ref, computed, watch } from "vue";
import type { Station, TrainInfo, Coordinates } from "@/types";

export function useNearestStation(coords: Ref<Coordinates | null>) {
  const nearestStation = ref<Station | null>(null);
  const lastUpdated = ref<string | null>(null);
  const windowMinutes = ref<number | "next">(60);

  const timeOptions = [
    { label: "Next", value: "next" },
    { label: "60 m", value: 60 },
    { label: "120 m", value: 120 },
    { label: "24 h", value: 1440 },
  ];

  async function fetchNearestStation(lat: number, lon: number): Promise<Station | null> {
    try {
      const res = await fetch(
        `https://corsproxy.io/?https://www3.septa.org/api/locations/get_locations.php?lat=${lat}&lon=${lon}&type=rail_stations`
      );
      const [station] = (await res.json()) as any[];
      return station;
    } catch (e) {
      console.error("Error fetching station:", e);
      return null;
    }
  }

  async function refreshStationData() {
    if (!coords.value) return;
    const { latitude, longitude } = coords.value;
    nearestStation.value = await fetchNearestStation(latitude, longitude);
    lastUpdated.value = new Date().toLocaleTimeString();
  }

  // Auto-refresh when coords change
  watch(coords, refreshStationData, { immediate: true });

  return {
    nearestStation,
    lastUpdated,
    windowMinutes,
    timeOptions,
    refreshStationData
  };
}
