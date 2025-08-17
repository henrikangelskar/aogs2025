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

      <!-- Navigation -->
      <div class="flex space-x-4">
        <NuxtLink
          to="/gallery"
          class="text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md text-center playfair-display"
        >
          GALLERI
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  // Simple navigation component
};
</script>
