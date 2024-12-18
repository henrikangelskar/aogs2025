import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass",
    "@/assets/css/main.css",
    "@mdi/font/css/materialdesignicons.min.css",
  ],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  nitro: {
    preset: "vercel",
  },

  devtools: {
    timeline: {
      enabled: true,
    },
  },

  compatibilityDate: "2024-10-04",
});