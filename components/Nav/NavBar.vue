<template>
  <nav class="bg-white text-gray-800 p-1 border-b border-gray-300">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <div class="flex-shrink-0">
        <NuxtLink to="/">
          <img
            src="/public/aogs2025_2_2_black.png"
            alt="Logo"
            class="max-h-[80px] py-4 px-2"
          />
        </NuxtLink>
      </div>
      <div class="flex space-x-4 px-2">
        <NuxtLink to="/info" class="playfair-display text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md">INFO</NuxtLink>
        <NuxtLink to="/plan" class="playfair-display text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md">SCHEMA</NuxtLink>
        <NuxtLink to="/destination" class="playfair-display text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md">RESE</NuxtLink>
        <NuxtLink to="/rsvp" class="playfair-display text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md">RSVP</NuxtLink>

      </div>
    </div>
  </nav>
</template>
