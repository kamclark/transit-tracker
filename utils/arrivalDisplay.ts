// utils/arrivalDisplay.ts
// Display helpers for arrivals

import type { ArrivalGroupKey } from '@/models/arrivalGrouping';
import type { ArrivalStatus } from '@/models/arrivalTypes';
import { VehicleType } from '@/models/arrivalTypes';

/**
 * Generate user-friendly label for an arrival group
 * Bus-friendly: uses "Toward [destination]" or headsign
 * Train-friendly: shows "Route to Destination"
 */
export function getGroupLabel(key: ArrivalGroupKey): string {
  // If headsign available, prefer it
  if (key.headsign) {
    return key.headsign;
  }

  // For buses, use "Toward" pattern
  if (key.vehicleType === VehicleType.Bus) {
    return `Toward ${key.destination}`;
  }

  // For trains/rail, show route + destination
  return `to ${key.destination}`;
}

/**
 * Generate a consistent color from route name
 * Uses hash-based approach for unknown routes
 */
export function getRouteColor(route: string): string {
  // Known SEPTA Regional Rail colors
  const ROUTE_COLORS: Record<string, string> = {
    AIR: '#1E40AF', // Airport Line
    CHE: '#7C3AED', // Chestnut Hill East
    CHW: '#8B5CF6', // Chestnut Hill West
    CYN: '#059669', // Cynwyd
    FOX: '#DC2626', // Fox Chase
    LAN: '#0891B2', // Lansdale/Doylestown
    MED: '#CA8A04', // Media/Wawa
    NOR: '#16A34A', // Manayunk/Norristown
    PAO: '#EA580C', // Paoli/Thorndale
    TRE: '#2563EB', // Trenton
    WAR: '#9333EA', // Warminster
    WIL: '#0D9488', // Wilmington/Newark
    WTR: '#4F46E5', // West Trenton
  };

  if (ROUTE_COLORS[route]) {
    return ROUTE_COLORS[route];
  }

  // Hash-based fallback for unknown routes
  const hash = route.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 45%)`;
}

/**
 * Format minutes until arrival
 */
export function formatCountdown(estimatedTime: Date | null): string {
  if (!estimatedTime) return '--';

  const now = new Date();
  const diffMs = estimatedTime.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / 60000);

  if (diffMins <= 0) return 'Now';
  if (diffMins === 1) return '1 min';
  return `${diffMins} min`;
}

/**
 * Get status display info
 */
export function getStatusDisplay(status: ArrivalStatus): { label: string; colorClass: string } {
  switch (status) {
    case 'on-time':
      return { label: 'On Time', colorClass: 'bg-green-100 text-green-800' };
    case 'delayed':
      return { label: 'Delayed', colorClass: 'bg-red-100 text-red-800' };
    case 'early':
      return { label: 'Early', colorClass: 'bg-blue-100 text-blue-800' };
    case 'arriving':
      return { label: 'Arriving', colorClass: 'bg-blue-100 text-blue-800' };
    case 'departed':
      return { label: 'Departed', colorClass: 'bg-gray-100 text-gray-600' };
    case 'cancelled':
      return { label: 'Cancelled', colorClass: 'bg-red-100 text-red-800' };
    case 'scheduled':
    default:
      return { label: 'Scheduled', colorClass: 'bg-gray-100 text-gray-600' };
  }
}
