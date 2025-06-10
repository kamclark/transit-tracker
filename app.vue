<script setup lang="ts">
import TitleBar from "./components/TitleBar.vue";
import { useLocation } from "@/composables/useLocation";

const { coords, loading, error, fetchLocation } = useLocation();

onMounted(async () => {
  await fetchLocation();
});
</script>

<template>
  <TitleBar appTitle="Transit Tracker" />
</template>
