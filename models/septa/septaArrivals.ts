// models/septa/septaArrivals.ts
// SEPTA-specific arrival models extending generic IArrival

import type { IArrival } from '@/models/arrival';
import { VehicleType, Direction, type ArrivalStatus } from '@/models/arrivalTypes';
import type { RawPrediction } from './septaRawTypes';

export interface ISeptaArrival extends IArrival {
  // SEPTA-specific fields
  trainId: string;
  serviceType: string;
  track: string;
  nextStation?: string;
  path?: string;
}

// Helper function to map SEPTA status strings to normalized ArrivalStatus
export function mapSeptaStatus(rawStatus: string): ArrivalStatus {
  const lower = rawStatus.toLowerCase();
  if (lower === 'on time') return 'on-time';
  if (lower === 'delayed') return 'delayed';
  if (lower.match(/^\d+ min$/)) return 'arriving';  // "2 min", "5 min", etc.
  if (lower === 'cancelled') return 'cancelled';
  return 'scheduled';  // default fallback
}

export class SeptaArrival implements ISeptaArrival {
  // IArrival fields
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
  origin?: string;
  platform?: string;
  headsign?: string;
  realtime?: boolean;

  // ISeptaArrival fields
  trainId: string;
  serviceType: string;
  track: string;
  nextStation?: string;
  path?: string;

  constructor(raw: RawPrediction, locationId: string) {
    // Generic IArrival fields
    this.id = raw.train_id;
    this.transitAuthorityKey = 'septa';
    this.locationId = locationId;
    this.vehicleType = VehicleType.Train;
    this.scheduledTime = new Date(raw.sched_time);
    this.estimatedTime = new Date(raw.depart_time);
    this.route = raw.line;
    this.destination = raw.destination;
    this.status = mapSeptaStatus(raw.status);
    this.rawStatus = raw.status;
    this.direction = raw.direction === 'N' ? Direction.North : Direction.South;
    this.origin = raw.origin;
    this.platform = raw.platform;
    this.realtime = true;  // SEPTA provides real-time data

    // SEPTA-specific fields
    this.trainId = raw.train_id;
    this.serviceType = raw.service_type;
    this.track = raw.track;
    this.nextStation = raw.next_station ?? undefined;
    this.path = raw.path ?? undefined;
  }
}
