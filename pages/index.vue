<template>
  <div class="min-h-screen bg-white text-black">
    <div class="max-w-4xl mx-auto px-6 py-12 text-center">
      <!-- Logo -->
      <div class="mb-12">
        <img
          src="/aogs2025_2_2_black.png"
          alt="AOGS 2025"
          class="mx-auto h-32 md:h-40"
        />
      </div>

      <!-- Thank You Message -->
      <div class="mb-12">
        <h1 class="text-4xl md:text-6xl font-bold text-black mb-8 playfair-display">
          Tack för en fantastisk fest!
        </h1>
        
        <p class="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
          Vi hoppas ni hade en underbar kväll och att ni skapade minnen för livet. 
          Nu vill vi gärna samla alla era bilder och videos från festen!
        </p>

        <div class="mb-12">
          <p class="text-lg text-gray-700 mb-4">
            📸 Dela era minnen med oss genom att ladda upp era foton och videos
          </p>
          <p class="text-md text-gray-600">
            Alla bilder och videos kommer att samlas i vårt galleri så att alla kan njuta av minnena tillsammans
          </p>
        </div>

        <!-- Gallery Button -->
        <NuxtLink 
          to="/gallery"
          class="inline-block px-8 py-4 bg-[#2501ec] text-white text-xl font-semibold border border-gray-300 hover:shadow-md transition-all playfair-display"
        >
          🎉 Gå till galleriet
        </NuxtLink>
      </div>

      <!-- Footer Info -->
      <div class="text-gray-600 text-sm">
        <p>Med kärlek,</p>
        <p class="font-semibold">AOGS 2025 Arrangörerna</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Simple thank you page with link to gallery
</script>

<style scoped>
.playfair-display {
  font-family: 'Playfair Display', serif;
}
</style>