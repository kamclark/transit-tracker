import type { Coordinates } from "@/types";

const DebugLocations: { name: string; coords: Coordinates }[] = [
  { name: "cribbo 🏠", coords: { latitude: 40.0298, longitude: -75.181 } },
  { name: "30th Street Station 🚉", coords: { latitude: 39.9556, longitude: -75.182 } },
  { name: "Suburban Station 🚆", coords: { latitude: 39.9543, longitude: -75.1657 } },
  { name: "Temple University 🍒", coords: { latitude: 39.9801, longitude: -75.1541 } },
  { name: "White House 🏛️", coords: { latitude: 39.9801, longitude: -75.1541 } },
  { name: "L.A 🎬", coords: { latitude: 33.953, longitude: -118.33963 } },
];

export default DebugLocations;
