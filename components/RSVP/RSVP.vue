<template>
  <div>
    <!-- Hero Header -->
    <div class="relative w-full min-h-[300px] max-h-[500px] overflow-hidden">
      <img
        src="/public/lines.jpg"
        alt="Drink"
        class="w-full h-full object-cover"
      />
      <!-- Overlay to darken the image -->
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <!-- Text container on top of the overlay -->
      <div
        class="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-10"
      >
        <div>
          <img
            src="/public/aogs2025-remove-bg-black.png"
            alt="AOGS 2025"
            class="mx-auto max-h-[200px] object-contain"
          />
        </div>

        <h1 class="text-7xl my-6 playfair-display text-black">Välkomna</h1>
      </div>
    </div>

    <!-- Page Content -->
    <div class="p-6 text-center py-20">
      <div class="max-w-2xl mx-auto">
        <p class="mb-4 text-3xl playfair-display">
          Du är inbjuden till Sebastian och Amalies bröllop i Stockholm, 15-17
          Augusti. Svara gärna så snart som möjligt, men senast 31 januari. Mer
          info kommer snart här och på mail. Vi ser fram emot att fira vår stora
          dag med dig!
        </p>

        <p class="playfair-display">Massor av kärlek,</p>
        <p class="mb-4 text-3xl playfair-display">Amalie & Sebbe</p>
      </div>

      <div class="mt-8">
        <a
          class="inline-block bg-[#2501ec] hover:shadow-md text-white font-bold py-3 px-8 text-3xl rounded-none transition duration-300 playfair-display"
          href="https://fk0dkk0d1c4.typeform.com/to/szuK4jVR"
          target="_blank"
        >
          RSVP
        </a>
      </div>
    </div>
  </div>
</template>
