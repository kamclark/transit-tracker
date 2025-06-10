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
