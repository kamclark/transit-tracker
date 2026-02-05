<script setup lang="ts">
import type { IArrival } from "@/models/arrival";
import type { Direction } from "@/models/arrivalTypes";

const props = defineProps<{
  direction: Direction;
  arrivals: IArrival[];
}>();

// Direction display labels and icons
const directionDisplay: Record<Direction, { label: string; icon: string }> = {
  north: { label: "Northbound", icon: "⬆️" },
  south: { label: "Southbound", icon: "⬇️" },
  east: { label: "Eastbound", icon: "➡️" },
  west: { label: "Westbound", icon: "⬅️" },
  inbound: { label: "Inbound", icon: "🔵" },
  outbound: { label: "Outbound", icon: "🔴" },
  clockwise: { label: "Clockwise", icon: "🔃" },
  counterclockwise: { label: "Counter-clockwise", icon: "🔄" },
};

const display = directionDisplay[props.direction] ?? { label: props.direction, icon: "" };
</script>

<template>
  <div v-if="arrivals.length > 0" class="mb-6">
    <h4 class="font-bold text-lg text-gray-700 mb-2 border-b pb-2">
      {{ display.label }} {{ display.icon }}
    </h4>
    <ul class="divide-y divide-gray-200">
      <li
        v-for="arrival in arrivals"
        :key="arrival.id"
        class="py-3 flex items-center justify-between text-gray-800"
      >
        <div>
          <span class="font-semibold text-blue-700">
            {{ arrival.estimatedTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          </span>
          <span class="text-sm text-gray-500 ml-2">({{ arrival.rawStatus }})</span>
          <p class="text-sm text-gray-600 mt-1">
            {{ arrival.origin }} <span class="font-medium text-gray-700">→</span> {{ arrival.destination }}
            <span class="ml-2 text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{{ arrival.route }}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
