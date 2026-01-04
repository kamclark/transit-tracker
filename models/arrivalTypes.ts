// models/arrivalTypes.ts
// Generic enums and types for transit arrivals

export enum VehicleType {
  Train = 'train',
  Bus = 'bus',
  Trolley = 'trolley',
  Subway = 'subway',
  Ferry = 'ferry',
  LightRail = 'light-rail'
}

export enum Direction {
  Inbound = 'inbound',        // Toward city center / main terminus
  Outbound = 'outbound',      // Away from city center
  North = 'north',
  South = 'south',
  East = 'east',
  West = 'west',
  Clockwise = 'clockwise',           // For circular routes
  Counterclockwise = 'counterclockwise'
}

export type ArrivalStatus =
  | 'on-time'
  | 'delayed'
  | 'early'
  | 'arriving'    // Imminent arrival (e.g., "2 min")
  | 'departed'
  | 'cancelled'
  | 'scheduled';  // No real-time data available
