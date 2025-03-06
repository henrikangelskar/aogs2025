<template>
  <nav class="relative bg-white text-gray-800 p-1 border-b border-gray-300">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <NuxtLink to="/">
          <img
            src="/public/aogs2025_2_2_black.png"
            alt="Logo"
            class="max-h-[80px] py-4 px-2"
          />
        </NuxtLink>
      </div>

      <!-- Desktop Navigation (Hidden on Small Screens) -->
      <div class="hidden md:flex space-x-4 px-">
        <NuxtLink
          to="/info"
          class="text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md text-center playfair-display"
        >
          INFO
        </NuxtLink>
        <NuxtLink
          to="/plan"
          class="text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md text-center playfair-display"
        >
          SCHEMA
        </NuxtLink>
        <NuxtLink
          to="/destination"
          class="text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md text-center playfair-display"
        >
          DESTINATION
        </NuxtLink>
        <NuxtLink
          to="/rsvp"
          class="text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md text-center playfair-display"
        >
          RSVP
        </NuxtLink>
      </div>

      <!-- Mobile Hamburger Menu (Visible on Small Screens) -->
      <div class="md:hidden">
        <button
          @click="toggleMenu"
          class="p-2 border border-gray-300 hover:shadow-md"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown as an overlay -->
    <div
      v-if="isMenuOpen"
      class="absolute top-full left-0 right-0 z-10 px-2 pb-4 pt-4 bg-white border-t border-gray-300"
    >
      <NuxtLink
        to="/info"
        class="block text-sm md:text-md lg:text-xl p-2 border border-gray-300 mb-2 hover:shadow-md playfair-display"
      >
        INFO
      </NuxtLink>
      <NuxtLink
        to="/plan"
        class="block text-sm md:text-md lg:text-xl p-2 border border-gray-300 mb-2 hover:shadow-md playfair-display"
      >
        SCHEMA
      </NuxtLink>
      <NuxtLink
        to="/destination"
        class="block text-sm md:text-md lg:text-xl p-2 border border-gray-300 mb-2 hover:shadow-md playfair-display"
      >
        DESTINATION
      </NuxtLink>
      <NuxtLink
        to="/rsvp"
        class="block text-sm md:text-md lg:text-xl p-2 border border-gray-300 hover:shadow-md playfair-display"
      >
        RSVP
      </NuxtLink>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
