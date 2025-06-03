export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Station = {
  location_id: string;
  location_name: string;
  distance: string;
};

export type DebugStation = {
  location_name: string;
  location_id: number;
};


export type TrainInfo = {
  direction: string;
  path: string;
  train_id: string;
  origin: string;
  destination: string;
  line: string;
  status: string; // "On Time", "3 min", etc
  service_type: string;
  next_station: string | null;
  sched_time: string;
  depart_time: string;
  track: string;
  track_change: string | null;
  platform: string;
  platform_change: string | null;
};
