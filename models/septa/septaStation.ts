// models/septa/septaStation.ts
// SEPTA-specific station models extending generic IStation

import type { IStation } from '@/models/station';
import { StopType } from '@/models/locationTypes';
import type { GeoCoordinates } from '@/types';

export interface ISeptaStation extends IStation {
  // SEPTA-specific fields
  locationId: string;
  locationType: string;
  raw?: any;
}

export class SeptaStation implements ISeptaStation {
  // ITransitStop fields
  id: string;
  transitAuthorityKey: string;
  name: string;
  coordinates: GeoCoordinates;
  stopType: StopType;
  distance?: number;
  timezone?: string;

  // IStation fields
  address?: string;
  platforms?: string[];
  amenities?: any[];
  connections?: string[];

  // ISeptaStation fields
  locationId: string;
  locationType: string;
  raw?: any;

  constructor(data: any) {
    // ITransitStop fields
    this.id = data.location_id;
    this.transitAuthorityKey = 'septa';
    this.name = data.location_name;
    this.coordinates = {
      latitude: parseFloat(data.location_lat),
      longitude: parseFloat(data.location_lon),
    };
    this.stopType = StopType.TrainStation;  // SEPTA Regional Rail uses train stations
    this.distance = parseFloat(data.distance);

    // IStation fields
    const address1 = data.location_data?.address1 ?? '';
    const city = data.location_data?.city ?? '';
    this.address = `${address1}, ${city}`.trim().replace(/^,\s*/, '').replace(/,\s*$/, '') || undefined;

    // ISeptaStation fields
    this.locationId = data.location_id;
    this.locationType = data.location_type;
    this.raw = data;
  }
}
