import type { GeoCoordinates } from "@/types";

export class SeptaStation {
  id: string;
  name: string;
  coordinates: GeoCoordinates;
  distance: number;
  address?: string;
  raw?: any;

  constructor(data: any) {
    this.id = data.location_id;
    this.name = data.location_name;
    this.coordinates = {
      latitude: parseFloat(data.location_lat),
      longitude: parseFloat(data.location_lon),
    };
    this.distance = parseFloat(data.distance);
    this.address = `${data.location_data?.address1 ?? ""}, ${data.location_data?.city ?? ""}`.trim();
    this.raw = data;
  }
}
