// composables/useLocation.ts
import { ref } from "vue";
import type { GeoCoordinates } from "@/types";
import { getUserCoordinates } from "@/services/geolocationService";

const coordinates = ref<GeoCoordinates | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

export function useLocation() {
    async function fetchLocation() {
        try {
            loading.value = true;
            const userCoords = await getUserCoordinates();
            coordinates.value = userCoords;
        } catch (e: any) {
            console.error("Geolocation error:", e);
            error.value = e.message || "Failed to get location.";
        } finally {
            loading.value = false;
        }
    }

    return {
        coords: coordinates,
        loading,
        error,
        fetchLocation,
    };
}
