// composables/useArrivals.ts
// INSTANCE-BASED composable - each call creates independent state
// This allows tracking arrivals for different stations simultaneously

import { ref, watch, unref, isRef } from "vue";
import type { Ref } from "vue";
import type { ArrivalsByDirection } from "@/models/transitAuthority";
import { septaAuthority } from "@/models/septa/septaAuthority";

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
      arrivals.value = await septaAuthority.fetchArrivals(id);
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

  // auto-fetch when stationId changes (if it's a ref)
  if (isRef(stationId)) {
    watch(stationId, () => refresh(), { immediate: true });
  }

  return { arrivals, loading, error, refresh };
}
