// models/transitStop.ts
// Generic base interface for all transit locations

import type { GeoCoordinates } from '@/types';
import type { StopType } from './locationTypes';

export interface ITransitStop {
  // Core fields
  id: string;
  transitAuthorityKey: string;
  name: string;
  coordinates: GeoCoordinates;
  stopType: StopType;

  // Optional fields
  distance?: number;
  timezone?: string;
}
