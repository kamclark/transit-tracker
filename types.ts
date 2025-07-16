export type GeoCoordinates = {
  latitude: number;
  longitude: number;
};

export interface ITransitLocation {
  id: string;
  name: string;
  coordinates: GeoCoordinates;
  transitAuthorityKey: string;
}

