<template>
  <div>
    <!-- Hero Section -->
    <div class="relative w-full min-h-[300px] max-h-[500px] overflow-hidden">
      <img
        src="/public/drink.png"
        alt="Drink"
        class="w-full h-full object-cover"
      />
      <!-- Overlay to darken the image -->
      <div class="absolute inset-0 bg-black opacity-30"></div>
      <!-- Text container on top of the overlay -->
      <div
        class="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-10"
      >
        <h1
          class="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl playfair-display mb-2 mt-6 text-center"
        >
          Schema
        </h1>
        <p
          class="text-white text-base sm:text-lg md:text-xl lg:text-2xl playfair-display mb-2 text-center"
        >
          Hur dagen kommer att se ut för bröllopet
        </p>
      </div>
    </div>

    <!-- Content Section -->
    <section class="w-full white py-8">
      <!-- Centered white box with a max width -->
      <div class="max-w-4xl mx-auto p-6">
        <div class="space-y-6 text-gray-700 playfair-display text-lg">
          <!-- Friday Section -->
          <div>
            <h3 class="text-2xl font-bold playfair-display">Fredag</h3>
            <p class="playfair-display mt-2 text-xl">
              För de som är sugna samlas vi för en avslappnad drink någonstans i
              stan kvällen innan bröllopet. Vi återkommer snart med exakt tid
              och plats!
            </p>
          </div>
          <!-- Saturday Section -->
          <div>
            <h3 class="text-2xl font-bold playfair-display">Lördag</h3>
            <ul class="list-disc list-inside playfair-display">
              <li class="playfair-display mt-2 text-xl">
                Vigsel i Ingarö kyrka kl. 14:00
              </li>
              <li class="playfair-display mt-2 text-xl">
                Båtresa med bubbel från kyrkan till Villa Soludden kl. 15:30
              </li>
              <li class="playfair-display mt-2 text-xl">
                Mottagning med drinkar när vi kommer fram
              </li>
              <li class="playfair-display mt-2 text-xl">Middag i orangeriet</li>
              <li class="playfair-display mt-2 text-xl">
                Dans & fest – drinkar, en (troligen inte särskilt imponerande)
                bröllopsdans på bryggan och en ordentlig fest!
              </li>
              <li class="playfair-display mt-2 text-xl">
                Bastu? För den som är sugen finns det kanske möjlighet till ett
                nattdopp – ta med badkläder om du vill haka på!
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No additional logic needed.
</script>
