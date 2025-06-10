import { SeptaStation } from "@/models/SeptaStation";
import type { GeoCoordinates } from "@/types";

export async function findNearestStation(
    coords: GeoCoordinates
): Promise<SeptaStation | null> {
    const searchRadius = .75; // look at stations within .75 miles
    const proxyUrl = `https://corsproxy.io/?https://www3.septa.org/api/locations/get_locations.php?lat=${coords.latitude}&lon=${coords.longitude}&type=rail_stations&radius=${searchRadius.toString()}`;

    try {
        const res = await fetch(proxyUrl);
        const [stationData] = (await res.json()) as any[];
        if (!stationData) return null;

        return new SeptaStation(stationData);
    } catch (e) {
        console.error("Error fetching station:", e);
        return null;
    }
}
