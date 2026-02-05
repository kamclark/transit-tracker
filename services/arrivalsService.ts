// services/arrivalsService.ts

import type {
  RawArrivalsResponse,
  RawDirectionGroup,
} from "@/models/septa/septaRawTypes";
import type { ArrivalsByDirection } from "@/models/transitAuthority";
import type { IArrival } from "@/models/arrival";
import { Direction } from "@/models/arrivalTypes";
import { SeptaArrival } from "@/models/septa/septaArrivals";
import {
  type ArrivalGroupKey,
  type GroupedArrivals,
  createGroupKeyString,
} from "@/models/arrivalGrouping";

export type { ArrivalsByDirection, GroupedArrivals };

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

// Flatten ArrivalsByDirection into a single array
export function flattenArrivals(byDirection: ArrivalsByDirection): IArrival[] {
  return Object.values(byDirection).flat().filter(Boolean) as IArrival[];
}

// Group arrivals by route + destination
export function groupArrivalsByRoute(arrivals: IArrival[]): GroupedArrivals {
  const groups = new Map<string, { key: ArrivalGroupKey; arrivals: IArrival[] }>();

  for (const arrival of arrivals) {
    const key: ArrivalGroupKey = {
      route: arrival.route,
      destination: arrival.destination,
      headsign: arrival.headsign,
      vehicleType: arrival.vehicleType,
      direction: arrival.direction,
    };
    const keyStr = createGroupKeyString(key);

    if (!groups.has(keyStr)) {
      groups.set(keyStr, { key, arrivals: [] });
    }
    groups.get(keyStr)!.arrivals.push(arrival);
  }

  // Sort arrivals within each group by estimated time
  // Then sort groups by their earliest arrival
  return Array.from(groups.values())
    .map((g) => ({
      ...g,
      arrivals: g.arrivals.sort(
        (a, b) =>
          (a.estimatedTime?.getTime() ?? Infinity) -
          (b.estimatedTime?.getTime() ?? Infinity)
      ),
    }))
    .sort((a, b) => {
      const aTime = a.arrivals[0]?.estimatedTime?.getTime() ?? Infinity;
      const bTime = b.arrivals[0]?.estimatedTime?.getTime() ?? Infinity;
      return aTime - bTime;
    });
}
