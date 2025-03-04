<template>
  <div class="relative w-full max-h-[600px] overflow-hidden">
    <img
      src="/public/sky.jpg"
      alt="Flowers"
      class="w-full h-full object-cover"
    />
    <!-- Overlay to darken the image -->
    <div class="absolute inset-0 bg-black opacity-10"></div>
    <!-- Text container on top of the overlay -->
    <div
      class="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-10"
    >
      <h1
        class="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl playfair-display mb-2 mt-6 text-center"
      >
        Amalie & Sebastian
      </h1>
      <p
        class="text-white text-base sm:text-lg md:text-xl lg:text-2xl playfair-display mb-2 text-center"
      >
        Villa Soludden, 16 Augusti | Värmdö, Sverige
      </p>
      <img
        src="/public/aogs2025_2.png"
        alt="Logo"
        class="max-w-[150px] sm:max-w-[300px]"
      />
    </div>
  </div>
</template>
