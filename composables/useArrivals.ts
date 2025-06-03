import { ref } from "vue";
import type { TrainInfo } from "@/types";

export function useArrivals() {
  const arrivals = ref<TrainInfo[] | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchArrivals(stationName: string, windowMinutes: number | "next" = "next") {
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

      const now = Date.now();
      if (windowMinutes === "next") {
        const upcomingByDirection: Record<string, any[]> = {};

        // Group arrivals by direction
        for (const arrival of flattened) {
          const dir = arrival.direction || "unknown";
          const time = new Date(arrival.sched_time).getTime();
          if (time > now) {
            if (!upcomingByDirection[dir]) {
              upcomingByDirection[dir] = [];
            }
            upcomingByDirection[dir].push(arrival);
          }
        }

        // For each direction, sort by soonest and take the first
        const nextPerDirection = Object.values(upcomingByDirection).flatMap((group) =>
          group.sort(
            (a: any, b: any) =>
              new Date(a.sched_time).getTime() - new Date(b.sched_time).getTime()
          )[0]
        );

        arrivals.value = nextPerDirection;
      }
      else {
        // Filter based on time window
        arrivals.value = flattened.filter((arrival: any) => {
          const scheduled = new Date(arrival.sched_time).getTime();
          return scheduled > now && scheduled - now <= windowMinutes * 60 * 1000;
        });
      }
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
