import type { GeoCoordinates, ITransitLocation } from "@/types";

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
): Promise<ITransitLocation | null> {
  const searchRadius = 0.75; // look at stations within .75 miles
  const proxyUrl = `https://corsproxy.io/?https://www3.septa.org/api/locations/get_locations.php?lat=${coords.latitude}&lon=${coords.longitude}&type=rail_stations&radius=${searchRadius.toString()}`;

  try {
    const res = await fetch(proxyUrl);
    if (!res.ok) { // Always check for network errors/bad responses
        console.error(`API request failed with status: ${res.status}`);
        return null;
    }

    // The API returns an array of stations, so we expect an array here.
    const rawStations: IRawSeptaStationApiData[] = await res.json();
    const rawNearestStation = rawStations[0];

    if (!rawNearestStation) {
      console.log("No nearest station found in API response.");
      return null; // No station found in the array
    }

    const nearestStation: ITransitLocation = {
      id: rawNearestStation.location_id,
      name: rawNearestStation.location_name,
      coordinates: {
        latitude: parseFloat(rawNearestStation.location_lat),
        longitude: parseFloat(rawNearestStation.location_lon),
      },
      transitAuthorityKey: "septa",
    };

    return nearestStation;

  } catch (e) {
    console.error("Error fetching or processing station data:", e);
    return null;
  }
}