// models/septa/septaAuthority.ts
// SEPTA transit authority implementation

import type { GeoCoordinates } from '@/types';
import type { IStation } from '@/models/station';
import type { ITransitAuthority, ArrivalsByDirection } from '@/models/transitAuthority';
import type { RawArrivalsResponse, RawDirectionGroup, IRawSeptaStationApiData } from './septaRawTypes';
import { Direction } from '@/models/arrivalTypes';
import { SeptaArrival } from './septaArrivals';
import { SeptaStation } from './septaStation';

export const septaAuthority: ITransitAuthority = {
  key: 'septa',
  name: 'SEPTA',
  region: 'Philadelphia, PA',
  directions: [Direction.North, Direction.South],

  async fetchArrivals(stationId: string): Promise<ArrivalsByDirection> {
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
  },

  async findNearestStation(coords: GeoCoordinates, radiusMiles = 0.75): Promise<IStation | null> {
    const url = `/api/septa/stations?lat=${coords.latitude}&lon=${coords.longitude}&type=rail_stations&radius=${radiusMiles}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Station lookup failed: ${res.status}`);
    }

    const rawStations: IRawSeptaStationApiData[] = await res.json();
    const rawNearestStation = rawStations[0];

    if (!rawNearestStation) {
      return null;
    }

    return new SeptaStation(rawNearestStation);
  }
};
