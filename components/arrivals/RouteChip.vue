<script setup lang="ts">
import { computed } from 'vue';
import { getRouteColor } from '@/utils/arrivalDisplay';

const props = defineProps<{
  route: string;
}>();

const backgroundColor = computed(() => getRouteColor(props.route));
</script>

<template>
  <span
    class="inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-semibold text-white shadow-sm"
    :style="{ backgroundColor }"
  >
    {{ route }}
  </span>
</template>
