<template>
  <header>
    <h1 class="heading-primary">Transit Tracker</h1>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  appTitle: string;
}>();
</script>

<style>

h1.heading-primary {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-text-high);
  margin-bottom: var(--space-md);
  line-height: 1.2;
}
</style>