<template>
  <section class="w-full white py-8">
    <!-- Centered white box with a max width -->
    <div class="max-w-4xl mx-auto p-6">
      <!-- Header and Subheader -->
      <div class="text-center mb-8">
        <h2 class="playfair-display text-3xl font-bold mb-2 text-gray-800">
          Översikt & information
        </h2>
        <p class="text-lg text-gray-700 playfair-display">
          Här är de olika alternativen för att få en översikt
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <!-- RSVP Box -->
        <NuxtLink
          to="/rsvp"
          class="flex-1 border border-gray-300 hover:shadow-md bg-white transition p-4"
        >
          <span class="playfair-display text-2xl block text-center">
            RSVP
          </span>
          <span class="playfair-display text-md mt-1 block text-center">
            Svara på inbjudan
          </span>
        </NuxtLink>
        <!-- INFORMATION Box -->
        <NuxtLink
          to="/info"
          class="flex-1 border border-gray-300 hover:shadow-md bg-white transition p-4"
        >
          <span class="playfair-display text-2xl block text-center">
            Information
          </span>
          <span class="playfair-display text-md mt-1 block text-center">
            Information om bröllopet
          </span>
        </NuxtLink>
        <!-- Schema Box -->
        <NuxtLink
          to="/plan"
          class="flex-1 border border-gray-300 hover:shadow-md bg-white transition p-4"
        >
          <span class="playfair-display text-2xl block text-center">
            Schema
          </span>
          <span class="playfair-display text-md mt-1 block text-center">
            Vad händer under dagen?
          </span>
        </NuxtLink>
        <!-- Resebeskrivning Box -->
        <NuxtLink
          to="/destination"
          class="flex-1 border border-gray-300 hover:shadow-md bg-white transition p-4"
        >
          <span class="playfair-display text-2xl block text-center">
            Resebeskrivning
          </span>
          <span class="playfair-display text-md mt-1 block text-center">
            Hur man tar sig dit
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional logic needed.
</script>
