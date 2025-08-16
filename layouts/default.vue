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
        <NavBar v-if="!isGalleryPage" />

        <!-- Authenticated: render page content -->
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import confetti from "canvas-confetti";
import NavBar from "~/components/Nav/NavBar.vue";

const loading = ref(true);
const isLoggedIn = ref(false);
const codeInput = ref("");
const errorMessage = ref("");
const isGalleryPage = ref(false);

let autoConfettiInterval;

function launchCornerConfetti() {
  const colors = ["#FFC0CB", "#FFD700", "#FFFACD", "#E6E6FA", "#FF69B4", "#98FB98", "#87CEEB"];
  const isLeftCorner = Math.random() < 0.5;
  
  confetti({
    particleCount: 20,
    startVelocity: 30,
    spread: 55,
    angle: isLeftCorner ? 45 : 135,
    gravity: 0.8,
    ticks: 100,
    origin: {
      x: isLeftCorner ? 0 : 1,
      y: 0.7
    },
    colors: colors,
    shapes: ["circle"],
    scalar: 1.2,
  });
}

onMounted(() => {
  // Check if the user has already entered the correct code
  isLoggedIn.value = localStorage.getItem("access_granted") === "true";
  
  loading.value = false;
  
  // Start automatic corner confetti every 10 seconds on all pages
  autoConfettiInterval = setInterval(launchCornerConfetti, 10000);
});

onUnmounted(() => {
  clearInterval(autoConfettiInterval);
});

// Watch for route changes
watch(() => useRoute().path, (newPath) => {
  isGalleryPage.value = newPath === '/gallery';
}, { immediate: true });

const checkCode = () => {
  if (codeInput.value.toLowerCase().trim() === "aogs2025") {
    localStorage.setItem("access_granted", "true");
    isLoggedIn.value = true;
  } else {
    errorMessage.value = "Fel kod, försök igen.";
  }
};
</script>
