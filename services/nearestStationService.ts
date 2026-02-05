import type { GeoCoordinates } from "@/types";
import type { IStation } from "@/models/station";
import { SeptaStation } from "@/models/septa/septaStation";

interface IRawSeptaStationApiData {
  location_id: string;
  location_name: string;
  location_lat: string;
  location_lon: string;
  distance: string;
  location_type: string;
  location_data: Record<string, string>;
}

export async function findNearestStation(
  coords: GeoCoordinates
): Promise<IStation | null> {
  const searchRadius = 0.75; // look at stations within .75 miles
  const url = `/api/septa/stations?lat=${coords.latitude}&lon=${coords.longitude}&type=rail_stations&radius=${searchRadius}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Station lookup failed: ${res.status}`);
  }

  const rawStations: IRawSeptaStationApiData[] = await res.json();
  const rawNearestStation = rawStations[0];

  if (!rawNearestStation) {
    return null; // No station found within radius - valid empty result
  }

  return new SeptaStation(rawNearestStation);
}