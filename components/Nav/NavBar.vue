<template>
  <nav class="bg-white text-gray-800 p-1 border-b border-gray-300">
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
      <div class="hidden md:flex space-x-4 px-2">
        <NuxtLink to="/info" class="text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md text-center playfair-display">
          INFO
        </NuxtLink>
        <NuxtLink to="/plan" class="text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md text-center playfair-display">
          SCHEMA
        </NuxtLink>
        <NuxtLink to="/destination" class="text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md text-center playfair-display">
          RESE
        </NuxtLink>
        <NuxtLink to="/rsvp" class="text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md text-center playfair-display">
          RSVP
        </NuxtLink>
      </div>

      <!-- Mobile Grid Layout (2x2) -->
      <div class="grid grid-cols-2 gap-2 px-2 w-full md:hidden text-center">
        <NuxtLink to="/info" class="text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md playfair-display">
          INFO
        </NuxtLink>
        <NuxtLink to="/plan" class="text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md playfair-display">
          SCHEMA
        </NuxtLink>
        <NuxtLink to="/destination" class="text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md playfair-display">
          RESE
        </NuxtLink>
        <NuxtLink to="/rsvp" class="text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md playfair-display">
          RSVP
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
