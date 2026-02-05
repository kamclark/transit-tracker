// composables/useArrivals.ts
// INSTANCE-BASED composable - each call creates independent state
// This allows tracking arrivals for different stations simultaneously

import { ref, computed, watch, unref, isRef } from "vue";
import type { Ref } from "vue";
import type { ArrivalsByDirection, GroupedArrivals } from "@/services/arrivalsService";
import { fetchArrivals, flattenArrivals, groupArrivalsByRoute } from "@/services/arrivalsService";

export function useArrivals(stationId: string | Ref<string>) {
  const arrivals = ref<ArrivalsByDirection | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function refresh() {
    const id = unref(stationId);
    if (!id) return;
    loading.value = true;
    error.value = null;
    try {
      arrivals.value = await fetchArrivals(id);
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e.message;
      } else {
        error.value = "Failed to load arrivals";
      }
    } finally {
      loading.value = false;
    }
  }

  // Compute grouped arrivals from the raw arrivals
  const groupedArrivals = computed<GroupedArrivals>(() => {
    if (!arrivals.value) return [];
    const flat = flattenArrivals(arrivals.value);
    return groupArrivalsByRoute(flat);
  });

  // auto-fetch when stationId changes (if it's a ref)
  if (isRef(stationId)) {
    watch(stationId, () => refresh(), { immediate: true });
  }

  return { arrivals, groupedArrivals, loading, error, refresh };
}
