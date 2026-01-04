// models/station.ts
// Generic station interface extending ITransitStop for larger facilities

import type { ITransitStop } from './transitStop';
import type { StationAmenity } from './locationTypes';

export interface IStation extends ITransitStop {
  // Additional fields for larger transit facilities
  address?: string;
  platforms?: string[];
  amenities?: StationAmenity[];
  connections?: string[];
}
