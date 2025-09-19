// services/arrivalsService.ts

import type {
  RawArrivalsResponse,
  RawDirectionGroup,
  RawPrediction,
} from "@/models/rawArrivals";
import { SeptaPrediction } from "@/models/SeptaPrediction";

export interface ArrivalsByDirection {
  northbound: SeptaPrediction[];
  southbound: SeptaPrediction[];
}

export async function fetchArrivals(
  stationId: string
): Promise<ArrivalsByDirection> {
  const url = `https://corsproxy.io/?https://www3.septa.org/api/Arrivals/index.php?station=${stationId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Arrivals fetch failed: ${res.status}`);
  const raw = (await res.json()) as RawArrivalsResponse;

  const dateKey = Object.keys(raw)[0];
  const groups = raw[dateKey] as RawDirectionGroup[];

  const north = groups
    .flatMap((g) => g.Northbound ?? [])
    .map((r) => new SeptaPrediction(r));

  const south = groups
    .flatMap((g) => g.Southbound ?? [])
    .map((r) => new SeptaPrediction(r));

  return { northbound: north, southbound: south };
}
