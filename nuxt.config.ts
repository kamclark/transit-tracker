// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/transit-tracker/' : '/',
  },
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss'],
  css: [
    // anything in here will be auto-injected on every page
    '~/assets/css/global.css',
  ],
  pages: false
})