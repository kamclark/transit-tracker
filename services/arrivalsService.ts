// services/arrivalsService.ts

import type {
  RawArrivalsResponse,
  RawDirectionGroup,
} from "@/models/septa/septaRawTypes";
import type { ArrivalsByDirection } from "@/models/transitAuthority";
import { Direction } from "@/models/arrivalTypes";
import { SeptaArrival } from "@/models/septa/septaArrivals";

export type { ArrivalsByDirection };

export async function fetchArrivals(
  stationId: string
): Promise<ArrivalsByDirection> {
  const url = `/api/septa/arrivals?station=${encodeURIComponent(stationId)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Arrivals fetch failed: ${res.status}`);
  const raw = (await res.json()) as RawArrivalsResponse;

  const dateKey = Object.keys(raw)[0];
  const groups = raw[dateKey] as RawDirectionGroup[];

  const north = groups
    .flatMap(g => g.Northbound ?? [])
    .map(r => new SeptaArrival(r, stationId));

  const south = groups
    .flatMap(g => g.Southbound ?? [])
    .map(r => new SeptaArrival(r, stationId));

  return {
    [Direction.North]: north,
    [Direction.South]: south,
  };
}
