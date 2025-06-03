import type { Coordinates } from "@/types";

const DebugLocations: { location_name: string; coords: Coordinates }[] = [
  { location_name: "cribbo 🏠", coords: { latitude: 40.0298, longitude: -75.181 } },
  { location_name: "30th Street Station 🚉", coords: { latitude: 39.9556, longitude: -75.182 } },
  { location_name: "Suburban Station 🚆", coords: { latitude: 39.9543, longitude: -75.1657 } },
  { location_name: "Temple University 🍒", coords: { latitude: 39.9801, longitude: -75.1541 } },
  { location_name: "White House 🏛️", coords: { latitude: 38.897957, longitude: -77.036560 } },
  { location_name: "L.A 🎬", coords: { latitude: 33.953, longitude: -118.33963 } },
];

export default DebugLocations;
