<template>
  <div>
    <div v-if="loading" class="text-center p-6">Laster...</div>
    <div v-else>
      <div
        v-if="!isLoggedIn"
        class="flex flex-col items-center justify-center min-h-screen p-6"
      >
        <h2 class="text-xl md:text-2xl lg:text-3xl mb-4 playfair-display">
          Vänligen ange koden
        </h2>
        <input
          v-model="codeInput"
          type="text"
          placeholder="Ange kod"
          class="p-2 block text-sm md:text-md lg:text-xl p-2 border border-gray-300 playfair-display"
          @keyup.enter="checkCode"
        />
        <button
          @click="checkCode"
          class="block text-sm md:text-md lg:text-xl p-2 border border-gray-300 mb-2 playfair-display mt-4 bg-[#2501ec] text-white"
        >
          Bekräfta
        </button>
        <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
      </div>
      <div v-else>
        <NavBar />

        <!-- Authenticated: render page content -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NavBar from "~/components/Nav/NavBar.vue";

const loading = ref(true);
const isLoggedIn = ref(false);
const codeInput = ref("");
const errorMessage = ref("");

onMounted(() => {
  // Check if the user has already entered the correct code
  isLoggedIn.value = localStorage.getItem("access_granted") === "true";
  loading.value = false;
});

const checkCode = () => {
  if (codeInput.value.toLowerCase().trim() === "aogs2025") {
    localStorage.setItem("access_granted", "true");
    isLoggedIn.value = true;
  } else {
    errorMessage.value = "Fel kod, försök igen.";
  }
};
</script>
