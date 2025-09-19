import type { GeoCoordinates, ITransitLocation } from "@/types";

type SeptaLocationRaw = {
  location_id: string; // "90219"
  location_name: string; // "East Falls"
  location_lat: string; // "40.0113889"
  location_lon: string; // "-75.1919444"
  distance?: string; // ".6243" (miles, as string)
  location_type: "rail_stations" | string;
  location_data?: {
    location_id?: string;
    location_name?: string;
    startDate?: string;
    endDate?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    hours?: string;
    loc_name?: string;
    status?: string;
    phone?: string;
  };
};

interface SeptaTrainStation extends ITransitLocation {
  kind: "septa.train-station";
  distanceMiles?: number;
  septaType: string; // i.e rail_stations
  // metadata septa api never sends back
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  phone?: string;
  _raw?: SeptaLocationRaw;
}

const SEARCH_RADIUS = 1.5; // look for stations within a mile and a half

function mapSeptaLocationToStation(raw: SeptaLocationRaw): SeptaTrainStation {
  const lat = Number(raw.location_lat);
  const lon = Number(raw.location_lon);
  const distanceMiles = raw.distance != null ? Number(raw.distance) : undefined;

  const addr = raw.location_data ?? {};
  return {
    kind: "septa.train-station",
    transitAuthorityKey: "SEPTA",
    id: raw.location_id,
    name: raw.location_name,
    coordinates: { latitude: lat, longitude: lon },
    septaType: raw.location_type,
    distanceMiles: Number.isFinite(distanceMiles) ? distanceMiles : undefined,
    address: {
      line1: addr.address1,
      line2: addr.address2,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
    },
    phone: addr.phone,
    _raw: raw,
  };
}
export async function findNearestStation(
  coords: GeoCoordinates
): Promise<SeptaTrainStation | null> {
  const raws = await $fetch<SeptaLocationRaw[]>("/api/septa", {
    method: "GET",
    params: {
      lat: coords.latitude,
      lon: coords.longitude,
      radius: SEARCH_RADIUS,
      type: "rail_stations",
    },
  });

  if (!raws?.length) return null;

  const isSorted = raws.every((r, i) => {
    if (i === 0 || !r.distance || !raws[i - 1].distance) return true;
    return Number(r.distance) >= Number(raws[i - 1].distance!);
  });

  let nearestRaw: SeptaLocationRaw;

  // assuming api return is lowest distance stations to high
  if (isSorted) {
    nearestRaw = raws[0]; // first obj is shortest distance
  } else {
    nearestRaw = [...raws].sort(
      (a, b) => Number(a.distance ?? Infinity) - Number(b.distance ?? Infinity)
    )[0];
  }

  return mapSeptaLocationToStation(nearestRaw);
}
