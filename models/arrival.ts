// Generic arrival interface for vehicle arrivals at any transit location

import type { VehicleType, Direction, ArrivalStatus } from './arrivalTypes';

export interface IArrival {

  // base fields
  id: string;
  transitAuthorityKey: string;
  locationId: string;
  vehicleType: VehicleType;
  scheduledTime: Date;
  estimatedTime: Date | null;
  route: string;
  destination: string;
  status: ArrivalStatus;
  rawStatus: string;
  direction: Direction;

  // Optional fields
  origin?: string;
  platform?: string;
  headsign?: string;
  realtime?: boolean;
}
