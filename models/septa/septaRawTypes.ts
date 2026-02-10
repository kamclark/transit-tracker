// models/septa/septaRawTypes.ts
// Raw SEPTA API response types (moved from RawArrivals.ts)

export interface RawPrediction {
    direction: "N" | "S";
    path: string;
    train_id: string;
    origin: string;
    destination: string;
    line: string;
    status: string;
    service_type: string;
    next_station: string | null;
    sched_time: string;
    depart_time: string;
    track: string;
    track_change: string | null;
    platform: string;
    platform_change: string | null;
}

export interface RawDirectionGroup {
    Northbound?: RawPrediction[];
    Southbound?: RawPrediction[];
}

export interface RawArrivalsResponse {
    [dateKey: string]: RawDirectionGroup[];
}

export interface IRawSeptaStationApiData {
  location_id: string;
  location_name: string;
  location_lat: string;
  location_lon: string;
  distance: string;
  location_type: string;
  location_data: Record<string, string>;
}
