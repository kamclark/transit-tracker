import type { GeoCoordinates } from "~/types";

export async function getUserCoordinates(): Promise<GeoCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("Geolocation is not supported."));
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        resolve({ latitude: latitude, longitude: longitude });
      },
      (err) => reject(err)
    );
  });
}
