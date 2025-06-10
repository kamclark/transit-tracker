export type GeoCoordinates = {
  latitude: number;
  longitude: number;
};

export interface Station {
  name: string;
  coordinates: GeoCoordinates;
  distance: number;
}
