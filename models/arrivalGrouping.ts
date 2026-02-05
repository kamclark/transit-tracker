// models/arrivalGrouping.ts
// Types for grouping arrivals by route + destination

import type { IArrival } from './arrival';
import { VehicleType, Direction } from './arrivalTypes';

// Grouping key for route + destination based grouping
export interface ArrivalGroupKey {
  route: string;
  destination: string;
  headsign?: string;
  vehicleType: VehicleType;
  direction?: Direction;
}

// Creates a stable string key for Map usage
export function createGroupKeyString(key: ArrivalGroupKey): string {
  return `${key.route}::${key.destination}`;
}

// Grouped arrivals structure
export interface ArrivalGroup {
  key: ArrivalGroupKey;
  arrivals: IArrival[];
}

export type GroupedArrivals = ArrivalGroup[];
