// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: [
    // anything in here will be auto-injected on every page
    '~/assets/css/global.css',
  ],
})