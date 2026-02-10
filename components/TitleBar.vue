<script setup lang="ts">
defineProps<{
  appTitle: string;
}>();
</script>

<template>
  <header>
    <h1 class="heading-primary">{{ appTitle }}</h1>
  </header>
</template>

<style>

h1.heading-primary {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-text-high);
  margin-bottom: var(--space-md);
  line-height: 1.2;
}
</style>