<template>
  <div>
    <!-- Hero Section (Fixed Cropping & Full Cover) -->
    <div
      class="relative w-full h-[400px] bg-[#2501ec] flex flex-col items-center justify-center items-center p-4 sm:p-10 text-center"
    >
      <h1
        class="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl playfair-display mb-2"
      >
        Destination & resväg
      </h1>
      <p
        class="text-white text-base sm:text-lg md:text-xl lg:text-2xl playfair-display"
      >
        Hur man tar sig till bröllopet
      </p>
    </div>

    <!-- Section: Transport to Church -->
    <div class="bg-white w-full">
      <div class="max-w-4xl mx-auto p-6">
        <section class="w-full py-8 px-6 md:px-12 lg:px-20">
          <h2 class="text-3xl md:text-2xl lg:text-3xl playfair-display mb-4">
            Transport på bröllopsdagen
          </h2>
          <p class="text-sm md:text-md lg:text-lg mb-2 playfair-display mb-4">
            <strong>Till kyrkan: </strong> Du
            <span class="playfair-display font-bold">
              ordnar själv transport
            </span>
            till Ingarö kyrka. Adressen är Ingarö kyrkväg, 134 60 Ingarö,
            Sverige.
          </p>
          <div>
            <a
              href="https://maps.app.goo.gl/kKU48iRsq1sDTK7v8"
              target="_blank"
              class="playfair-display text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md"
            >
              Vägbeskrivningar
            </a>
          </div>
          <div class="mt-6">
            <img
              src="/public/church.png"
              alt="Church"
              class="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>
      </div>
    </div>

    <!-- Section: Transport to Villa Soludden -->
    <div class="bg-gray-50 w-full">
      <div class="max-w-4xl mx-auto p-6">
        <section class="w-full py-8 px-6 md:px-12 lg:px-20">
          <h2 class="text-3xl md:text-2xl lg:text-3xl playfair-display mb-4">
            Transport till Villa Soludden
          </h2>
          <p class="text-sm md:text-md lg:text-lg mb-2 mt-6 playfair-display">
            <strong>Från kyrkan till Villa Soludden:</strong> Vi tar båten
            tillsammans! Om du föredrar att ordna egen transport, meddela oss
            gärna i förväg.
          </p>
          <!-- New Button for Villa Soludden Directions -->
          <div class="mt-4">
            <a
              href="https://www.villasoludden.se/"
              target="_blank"
              class="playfair-display text-sm md:text-md lg:text-xl p-2 border border-gray-300 px-4 hover:shadow-md"
            >
              Nettside til Villa Soludden
            </a>
          </div>

          <!-- Video Section for Villa Soludden -->
          <div class="mt-8 flex justify-center">
            <video
              class="w-full max-w-3xl rounded-lg shadow-lg"
              controls
              autoplay
              loop
              muted
            >
              <source
                src="/public/villa-soludden-winter-01.mp4"
                type="video/mp4"
              />
              Din webbläsare stöder inte videouppspelning.
            </video>
          </div>
        </section>
      </div>
    </div>

    <!-- Section: Transport back to the city -->
    <div class="bg-white w-full">
      <div class="max-w-4xl mx-auto p-6">
        <section class="w-full py-8 px-6 md:px-12 lg:px-20">
          <h2 class="text-3xl md:text-2xl lg:text-3xl playfair-display mb-4">
            Transport tillbaka till stan
          </h2>
          <p class="text-sm md:text-md lg:text-lg mb-4 mt-6 playfair-display">
            <strong>Tillbaka till stan:</strong> Du kan boka transport via Bolt,
            Uber eller Taxi Stockholm (+46 8 15 00 00) under kvällen.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
