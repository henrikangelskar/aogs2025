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

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || 'https://ddndffgkzzuedtuzhijm.supabase.co',
      supabaseKey: process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkbmRmZmdrenp1ZWR0dXpoaWptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMTUxMzMsImV4cCI6MjA2ODc5MTEzM30.6lyMUQ4vhzV-XMTSaH-dp_H-u6dY2Q5Nng3y13-sJxk'
    }
  }
});
