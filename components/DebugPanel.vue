<script setup lang="ts">
import { ref, computed } from "vue";
import { septaAuthority } from "@/models/septa/septaAuthority";
import type { ArrivalsByDirection } from "@/models/transitAuthority";
import type { Direction } from "@/models/arrivalTypes";
import ArrivalList from "./ArrivalList.vue";

const stationId = ref("");
const loading = ref(false);
const error = ref<string | null>(null);
const rawJson = ref<unknown>(null);
const parsedArrivals = ref<ArrivalsByDirection | null>(null);

const arrivalEntries = computed(() => {
  if (!parsedArrivals.value) return [];
  return Object.entries(parsedArrivals.value) as [Direction, (typeof parsedArrivals.value)[Direction]][];
});

const hasArrivals = computed(() =>
  arrivalEntries.value.some(([_, list]) => list && list.length > 0)
);

async function handleFetch() {
  const id = stationId.value.trim();
  if (!id) return;

  loading.value = true;
  error.value = null;
  rawJson.value = null;
  parsedArrivals.value = null;

  try {
    // 1. Raw fetch for inspection
    const rawRes = await fetch(`/api/septa/arrivals?station=${encodeURIComponent(id)}`);
    if (!rawRes.ok) {
      throw new Error(`Server responded ${rawRes.status}: ${rawRes.statusText}`);
    }
    rawJson.value = await rawRes.json();

    // 2. Full pipeline (same path as production)
    parsedArrivals.value = await septaAuthority.fetchArrivals(id);
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : "Unknown error";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="mt-8 border-t-2 border-dashed border-gray-600 pt-6">
    <h2 class="text-xl font-bold text-yellow-400 mb-4">Debug Panel (dev only)</h2>

    <div class="flex gap-2 mb-4">
      <input
        v-model="stationId"
        type="text"
        placeholder="Station ID (e.g. 30th Street Station)"
        class="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md placeholder-gray-500"
        @keyup.enter="handleFetch"
      />
      <button
        :disabled="loading || !stationId.trim()"
        class="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="handleFetch"
      >
        {{ loading ? "Fetching..." : "Fetch" }}
      </button>
    </div>

    <div v-if="error" class="text-red-400 mb-4">
      Error: {{ error }}
    </div>

    <div v-if="rawJson || parsedArrivals" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Raw JSON -->
      <div>
        <h3 class="text-sm font-semibold text-gray-400 mb-2">Raw API Response</h3>
        <pre class="bg-gray-800 text-green-300 p-4 rounded-md text-xs overflow-auto max-h-96">{{ JSON.stringify(rawJson, null, 2) }}</pre>
      </div>

      <!-- Parsed Arrivals -->
      <div>
        <h3 class="text-sm font-semibold text-gray-400 mb-2">Parsed Arrivals</h3>
        <div v-if="!hasArrivals" class="text-gray-500">
          No arrivals parsed from response.
        </div>
        <div v-else class="bg-white rounded-md p-4">
          <ArrivalList
            v-for="[direction, list] in arrivalEntries"
            :key="direction"
            :direction="direction"
            :arrivals="list ?? []"
          />
        </div>
      </div>
    </div>
  </div>
</template>
