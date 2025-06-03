import { ref } from "vue";
import type { TrainInfo } from "@/types";
import { fetchArrivalsByWindow, fetchNextArrivals } from "@/services/arrivalsService";

export function useArrivals() {
  const arrivals = ref<TrainInfo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchArrivals(stationName: string, window: number | "next" = "next") {
    try {
      loading.value = true;
      error.value = null;

      if (window === "next") {
        arrivals.value = await fetchNextArrivals(stationName);
      } else {
        arrivals.value = await fetchArrivalsByWindow(stationName, window);
      }
    } catch (err: any) {
      console.error("Error fetching arrivals:", err);
      error.value = err.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  }

  return { arrivals, loading, error, fetchArrivals };
}
