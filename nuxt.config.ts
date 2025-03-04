import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: ["@/assets/css/main.css", "@mdi/font/css/materialdesignicons.min.css"],

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

  modules: ["@nuxtjs/tailwindcss"],
});
