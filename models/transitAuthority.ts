// models/transitAuthority.ts
// Generic interface for transit authorities (agencies)

import type { GeoCoordinates } from '@/types';
import type { IStation } from './station';
import type { IArrival } from './arrival';
import type { Direction } from './arrivalTypes';

// Grouped arrivals by direction - generic structure
// Using Partial<Record<>> for Vue reactivity compatibility
export type ArrivalsByDirection = Partial<Record<Direction, IArrival[]>>;

export interface ITransitAuthority {
  // Unique identifier for the agency (e.g., 'septa', 'wmata', 'mta')
  key: string;

  // Display name
  name: string;

  // Region/city served
  region: string;

  // Directions used by this authority (for UI grouping)
  directions: Direction[];

  // Core API methods
  fetchArrivals(stationId: string): Promise<ArrivalsByDirection>;
  findNearestStation(coords: GeoCoordinates, radiusMiles?: number): Promise<IStation | null>;
}
