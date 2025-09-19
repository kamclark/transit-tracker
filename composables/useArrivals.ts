import { ref, watch } from "vue";
import type { ArrivalsByDirection } from "@/services/arrivalsService";
import { fetchArrivals } from "@/services/arrivalsService";

export function useArrivals(stationId: string | Ref<string>) {
  const arrivals = ref<ArrivalsByDirection | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function refresh() {
    const id = stationId instanceof Object ? stationId.value : stationId;
    if (!id) return;
    loading.value = true;
    error.value = null;
    try {
      arrivals.value = await fetchArrivals(id);
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = `Error: ${e.message}`;
      } else {
        error.value = "An unknown error occurred.";
      }
    } finally {
      loading.value = false;
    }
  }

  // auto-fetch when stationId changes
  if (stationId instanceof Object) {
    watch(stationId, () => refresh(), { immediate: true });
  }

  return { arrivals, loading, error, refresh };
}
