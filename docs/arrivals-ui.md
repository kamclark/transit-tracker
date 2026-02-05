# Arrivals UI Architecture

## Overview

The arrivals display groups transit arrivals by **route + destination** rather than just direction. This provides a more intuitive view, especially for buses where directional labels (N/S/E/W) are less meaningful.

## Grouping Logic

**Before:** Arrivals grouped by direction only
```
Northbound ⬆️
  - R5 to Thorndale (8:15)
  - R3 to West Trenton (8:18)
  - R5 to Thorndale (8:30)
```

**After:** Arrivals grouped by route + destination
```
[R5] to Thorndale          2 min  (+1 more)
[R3] to West Trenton       5 min
```

## Component Hierarchy

```
ArrivalsDisplay
├── ArrivalGroupCard (one per route+destination)
│   ├── RouteChip (colored route badge)
│   ├── CountdownBadge (next arrival time)
│   └── ArrivalRow (expanded view, one per arrival)
│       └── StatusBadge (on-time/delayed indicator)
```

## Components

### ArrivalsDisplay
Main container that receives grouped arrivals and handles loading/error/empty states.

**Props:**
- `groups: GroupedArrivals` - Array of arrival groups
- `loading?: boolean` - Show loading spinner
- `error?: string | null` - Error message to display

### ArrivalGroupCard
Expandable card representing a single route+destination combination.

**Props:**
- `groupKey: ArrivalGroupKey` - Route, destination, vehicle type
- `arrivals: IArrival[]` - All arrivals for this group
- `defaultExpanded?: boolean` - Start expanded

**Behavior:**
- Collapsed: Shows route chip, destination label, next arrival countdown, "+N more"
- Expanded: Shows all arrivals with times, status, and platform

### RouteChip
Colored badge displaying the route identifier.

**Props:**
- `route: string` - Route identifier (e.g., "R5", "44")

**Styling:**
- Uses predefined colors for known SEPTA routes
- Falls back to hash-based color generation for unknown routes

### CountdownBadge
Displays minutes until arrival.

**Props:**
- `estimatedTime: Date | null` - Estimated arrival time

**Display:**
- "Now" when <= 0 minutes
- "1 min" / "N min" otherwise
- Blue background for imminent arrivals (< 5 min)

### StatusBadge
Shows arrival status with color coding.

**Props:**
- `status: ArrivalStatus` - Normalized status
- `rawStatus?: string` - Original status string for display

**Colors:**
- Green: on-time
- Red: delayed, cancelled
- Blue: arriving, early
- Gray: scheduled, departed

### ArrivalRow
Single arrival in the expanded card view.

**Props:**
- `arrival: IArrival` - Full arrival data

**Displays:**
- Formatted time (HH:MM)
- Status badge
- Platform/track (if available)

## Data Flow

```
fetchArrivals(stationId)
    ↓
ArrivalsByDirection (grouped by N/S)
    ↓
flattenArrivals() → IArrival[]
    ↓
groupArrivalsByRoute() → GroupedArrivals
    ↓
ArrivalsDisplay component
```

## Display Labels

The `getGroupLabel()` function generates user-friendly labels:

| Vehicle Type | Format | Example |
|--------------|--------|---------|
| Bus | `Toward {destination}` | "Toward Frankford" |
| Train/Rail | `to {destination}` | "to Center City" |
| With headsign | `{headsign}` | "Airport Express" |

## Route Colors

Known SEPTA Regional Rail lines have predefined colors. Unknown routes use a hash-based color generation for consistency.

```typescript
const ROUTE_COLORS = {
  AIR: '#1E40AF',  // Airport Line
  PAO: '#EA580C',  // Paoli/Thorndale
  TRE: '#2563EB',  // Trenton
  // ... etc
};
```

## Files

| File | Purpose |
|------|---------|
| `models/arrivalGrouping.ts` | Types: `ArrivalGroupKey`, `ArrivalGroup`, `GroupedArrivals` |
| `utils/arrivalDisplay.ts` | Display helpers: labels, colors, formatting |
| `services/arrivalsService.ts` | `groupArrivalsByRoute()`, `flattenArrivals()` |
| `composables/useArrivals.ts` | `groupedArrivals` computed ref |
| `components/arrivals/*.vue` | UI components |
