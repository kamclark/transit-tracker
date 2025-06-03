import { ref } from "vue";
import type { TrainInfo } from "@/types";

export function useArrivals() {
  const arrivals = ref<TrainInfo[] | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchArrivals(stationName: string) {
    const safeName = encodeURIComponent(stationName);
    const url = `https://corsproxy.io/?https://www3.septa.org/api/Arrivals/index.php?station=${safeName}&_=${Date.now()}`;

    try {
      loading.value = true;
      error.value = null;

      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();

      const flattened = Object.values(data).flatMap((batch: any) =>
        batch.flatMap((group: any) => Object.values(group).flat())
      );

      arrivals.value = flattened;
    } catch (err: any) {
      console.error("Failed to fetch arrivals:", err);
      error.value = err.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  }

  return {
    arrivals,
    loading,
    error,
    fetchArrivals,
  };
}
