import { ref } from 'vue'
import debugLocations from '@/mocks/DebugLocations'
import type { Coordinates } from '@/types'

export function useDebugLocation() {
  const selectedIndex = ref('0')
  const coords = ref<Coordinates>(debugLocations[0].coords)

  function setByIndex(index: string) {
    selectedIndex.value = index
    coords.value = debugLocations[parseInt(index)].coords
  }

  function setManual(newCoordinates: Coordinates) {
      coords.value = newCoordinates;
  }

  return {
    selectedIndex,
    coords,
    debugLocations,
    setByIndex,
    setManual,
  }
}
