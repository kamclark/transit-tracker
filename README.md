# Transit Tracker

A modular Vue 3 + Nuxt application for tracking real-time public transit arrivals. Built with a multi-agency architecture that currently supports SEPTA (Philadelphia) and is designed to easily extend to other transit authorities.

---

## Features

- **Find Nearest Station:** Uses browser geolocation to find the closest station within a configurable radius
- **Live Arrivals:** Real-time arrival data grouped by direction
- **Multi-Agency Architecture:** Generic interfaces (`ITransitAuthority`, `IStation`, `IArrival`) allow adding new transit systems
- **Nuxt Server Routes:** API proxying via `/server/api/` for CORS-free production deployment
- **TypeScript:** Fully typed models, services, and composables

---

## Project Structure

```text
transit-tracker/
├── app.vue                     # Main application entry
├── components/
│   ├── ArrivalList.vue         # Reusable arrival list by direction
│   ├── StationDetail.vue       # Station info + arrivals display
│   └── TitleBar.vue            # App header
├── composables/
│   ├── useArrivals.ts          # Instance-based: fetch arrivals for a station
│   ├── useLocation.ts          # Singleton: user geolocation
│   └── useNearestStation.ts    # Singleton: nearest station lookup
├── models/
│   ├── arrival.ts              # Generic IArrival interface
│   ├── arrivalTypes.ts         # VehicleType, Direction, ArrivalStatus enums
│   ├── locationTypes.ts        # StopType, StationAmenity enums
│   ├── station.ts              # Generic IStation interface
│   ├── transitAuthority.ts     # ITransitAuthority interface
│   ├── transitStop.ts          # Base ITransitStop interface
│   └── septa/                  # SEPTA-specific implementations
│       ├── septaArrivals.ts    # SeptaArrival class
│       ├── septaAuthority.ts   # SEPTA ITransitAuthority implementation
│       ├── septaRawTypes.ts    # Raw API response types
│       └── septaStation.ts     # SeptaStation class
├── server/api/septa/           # Nuxt server routes (API proxy)
│   ├── arrivals.ts             # /api/septa/arrivals
│   └── stations.ts             # /api/septa/stations
├── services/
│   └── geolocationService.ts   # Browser geolocation wrapper
└── types.ts                    # Global types (GeoCoordinates)
```

---

## Architecture

### Type Hierarchy

```text
ITransitStop (base)
    └── IStation (extends with amenities, platforms)
            └── ISeptaStation (SEPTA-specific fields)

IArrival (generic arrival)
    └── ISeptaArrival (SEPTA-specific fields)

ITransitAuthority (agency interface)
    └── septaAuthority (SEPTA implementation)
```

### Data Flow

```text
Browser Geolocation → useLocation (singleton)
                           ↓
                    GeoCoordinates
                           ↓
               useNearestStation (singleton)
                → septaAuthority.findNearestStation()
                           ↓
                       IStation
                           ↓
                  useArrivals (instance)
                → septaAuthority.fetchArrivals()
                           ↓
               ArrivalsByDirection
                           ↓
                   StationDetail
                           ↓
                    ArrivalList
```

### Composable Patterns

| Composable          | Pattern   | Why                                               |
| ------------------- | --------- | ------------------------------------------------- |
| `useLocation`       | Singleton | One user location per app                         |
| `useNearestStation` | Singleton | One nearest station per user                      |
| `useArrivals`       | Instance  | Different components may track different stations |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build

```bash
# Production build
npm run build

# Static generation (GitHub Pages)
npm run generate
```

---

## Adding a New Transit Authority

1. **Create raw types** in `models/<authority>/rawTypes.ts`
2. **Create arrival class** implementing `IArrival` in `models/<authority>/arrivals.ts`
3. **Create station class** implementing `IStation` in `models/<authority>/station.ts`
4. **Create authority object** implementing `ITransitAuthority` in `models/<authority>/authority.ts`
5. **Add server routes** in `server/api/<authority>/`
6. **Update composables** to accept or select the new authority (currently hardcoded to SEPTA)

---

## Deployment

Deploy to GitHub Pages:

```bash
npm run deploy
```

Or configure GitHub Actions for automated deployment on push to `main`.

---

## Tech Stack

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/) (Composition API)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Changelog

### [2026-02-10]

- **Removed redundant services:** Composables now use `septaAuthority` (`ITransitAuthority`) directly
- **Improved type safety:** Eliminated `any` types in SeptaStation model
- **Fixed TitleBar prop:** Component now uses the `appTitle` prop passed from app.vue
- **Improved error handling:** Server routes now log errors and include context in responses
- **Added input validation:** Station lookup validates numeric lat/lon/radius parameters
- **Fixed double-fetch on mount:** Eliminated race condition between onMounted and watcher in app.vue
- **Improved geolocation:** Added timeout, caching, and user-friendly permission error messages
- **CSS cleanup:** Removed global utility classes that conflicted with Tailwind

### [2026-02-05]

- **Multi-agency architecture:** Added `ITransitAuthority` interface for extensibility
- **Nuxt server routes:** Replaced third-party CORS proxy with native `/server/api/` routes
- **Standardized error handling:** Services throw, composables catch
- **Generalized directions:** `ArrivalsByDirection` uses `Direction` enum keys
- **Extracted `ArrivalList` component:** Reduced duplication in StationDetail
- **Documented composable patterns:** Singleton vs instance-based

### [2025-06-10]

- Refactored to composable architecture
- Improved TypeScript types for all core data
- Improved error and loading state handling

### [2025-05-27]

- Migrated from Vue SPA to Nuxt 3
- Added GitHub Actions workflow for deployment

### [2025-05-22]

- Initial commit: Vue 3 + Vite setup

---

## License

MIT License

---

## Acknowledgements

- [SEPTA API](https://www3.septa.org/hackathon/) for transit data
- [Nuxt Docs](https://nuxt.com/docs) and [Vue Docs](https://vuejs.org/guide/introduction.html)
