import type { TrainInfo } from "@/types";

export async function fetchArrivalsByWindow(stationName: string, minutes: number): Promise<TrainInfo[]> {
  const all = await fetchAllArrivals(stationName);
  const now = Date.now();
  return all.filter((a) => {
    const scheduled = new Date(a.sched_time).getTime();
    return scheduled > now && scheduled - now <= minutes * 60 * 1000;
  });
}

export async function fetchNextArrivals(stationName: string): Promise<TrainInfo[]> {
  const all = await fetchAllArrivals(stationName);
  const now = Date.now();

  // Group arrivals by destination
  const arrivalsByDest = new Map<string, TrainInfo[]>();
  for (const arrival of all) {
    const key = arrival.destination;
    const scheduled = new Date(arrival.sched_time).getTime();
    if (scheduled <= now) continue;
    if (!arrivalsByDest.has(key)) arrivalsByDest.set(key, []);
    arrivalsByDest.get(key)!.push(arrival);
  }

  // Grab soonest for each destination
  const nextArrivals = Array.from(arrivalsByDest.values()).map(group => {
    return group.sort((a, b) => new Date(a.sched_time).getTime() - new Date(b.sched_time).getTime())[0];
  });

  // Sort globally
  return nextArrivals.sort((a, b) => new Date(a.sched_time).getTime() - new Date(b.sched_time).getTime());
}

async function fetchAllArrivals(stationName: string): Promise<TrainInfo[]> {
  const safe = encodeURIComponent(stationName);
  const url = `https://corsproxy.io/?https://www3.septa.org/api/Arrivals/index.php?station=${safe}&_=${Date.now()}`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  const flattened = Object.values(data).flatMap((batch: any) =>
    batch.flatMap((group: any) => Object.values(group).flat())
  );

  return flattened;
}
