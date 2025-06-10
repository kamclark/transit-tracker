export type Coordinates = [number, number];

export interface Station {
  name: string;
  coordinates: Coordinates;
  distance: number;
}

export class SeptaStation implements Station {
  name: string;
  coordinates: [number, number];
  distance: number;
  line?: string;
  rawData?: any;

  constructor(data: any) {
    this.name = data.location_name;
    this.coordinates = [parseFloat(data.lat), parseFloat(data.lon)];
    this.distance = parseFloat(data.distance);
    this.line = data.line;
    this.rawData = data;
  }
}
