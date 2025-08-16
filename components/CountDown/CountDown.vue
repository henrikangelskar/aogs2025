<template>
  <div class="w-full min-h-[360px] bg-[#2501ec]">
    <!-- Countdown content (set as relative so it stacks above the background) -->
    <div class="flex flex-col items-center justify-center p-4 sm:p-10">
      <!-- Grid layout: 2 columns on smaller screens, 4 columns on bigger screens -->
      <div
        class="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center items-center mb-4 py-6"
      >
        <div
          v-for="(unit, label) in timeUnits"
          :key="label"
          class="flex flex-col items-center"
        >
          <div class="p-2 sm:p-6">
            <span
              :class="[
                'text-5xl sm:text-7xl text-white font-bold playfair-display',
                { 'animate-blink': isToday }
              ]"
            >
              {{ unit }}
            </span>
          </div>
          <span
            class="mt-2 font-semibold text-white playfair-display text-base sm:text-lg"
          >
            {{ label }}
          </span>
        </div>
      </div>
      
      <!-- Confetti Button -->
      <button 
        @click="launchConfettiWithText"
        class="mt-6 px-6 py-3 bg-white text-[#2501ec] font-bold hover:bg-gray-100 transition-colors duration-200 playfair-display text-lg shadow-lg"
      >
        🎉 Launch Confetti!
      </button>
      
      <!-- Multiple Random Text Displays -->
      <div 
        v-for="text in activeTexts"
        :key="text.id"
        class="fixed z-50 pointer-events-none"
        :style="{
          left: text.x + '%',
          top: text.y + '%',
          transform: `translate(-50%, -50%) rotate(${text.rotation}deg)`
        }"
      >
        <div class="bg-white/95 backdrop-blur-sm p-4 shadow-2xl">
          <p class="text-2xl font-bold text-[#2501ec] playfair-display whitespace-nowrap">
            AMALIE & SEBBE 2025 ❤️
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import confetti from "canvas-confetti";

const now = new Date();
const targetDate = new Date(now.getFullYear(), 7, 16);
// Since today is the event date, set the timer to show 0
const isToday = now.getDate() === 16 && now.getMonth() === 7;

const timeUnits = ref({
  Dagar: "00",
  Timmar: "00",
  Minuter: "00",
  Sekunder: "00",
});

const confettiLaunched = ref(false);
const activeTexts = ref([]);

function launchIntroConfetti() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const colors = ["#FFC0CB", "#FFD700", "#FFFACD", "#E6E6FA", "#FF69B4", "#98FB98", "#87CEEB"];

  function frame() {
    // Confetti falling from the top of the screen
    confetti({
      particleCount: 12,
      startVelocity: 10,
      spread: 80,
      angle: 90,
      gravity: 0.8,
      ticks: 120,
      origin: {
        x: Math.random(),
        y: 0,
      },
      colors: colors,
      shapes: ["circle"],
      scalar: 1.2,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  }

  frame();
}

function launchButtonConfetti() {
  const duration = 500; // Half a second
  const animationEnd = Date.now() + duration;
  const colors = ["#FFC0CB", "#FFD700", "#FFFACD", "#E6E6FA", "#FF69B4", "#98FB98", "#87CEEB"];
  
  // Random position for confetti burst
  const randomX = Math.random();
  const randomY = Math.random() * 0.7; // Keep it in upper 70% of screen

  function frame() {
    // Quick confetti burst from random position
    confetti({
      particleCount: 8,
      startVelocity: 20,
      spread: 60,
      angle: 90,
      gravity: 0.6,
      ticks: 60,
      origin: {
        x: randomX,
        y: randomY,
      },
      colors: colors,
      shapes: ["circle"],
      scalar: 1.1,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  }

  frame();
}


function launchConfettiWithText() {
  // Launch quick button confetti at random position
  launchButtonConfetti();
  
  // Create new text instance with unique ID
  const textId = Date.now() + Math.random();
  const newText = {
    id: textId,
    x: Math.random() * 80 + 10, // 10-90% from left
    y: Math.random() * 60 + 20, // 20-80% from top
    rotation: (Math.random() - 0.5) * 30 // -15 to +15 degrees
  };
  
  // Add to active texts
  activeTexts.value.push(newText);
  
  // Remove this text after 3 seconds
  setTimeout(() => {
    const index = activeTexts.value.findIndex(text => text.id === textId);
    if (index > -1) {
      activeTexts.value.splice(index, 1);
    }
  }, 3000);
}

function updateCountdown() {
  // If today is the event date, show zeros and launch confetti once
  if (isToday) {
    timeUnits.value = {
      Dagar: "00",
      Timmar: "00",
      Minuter: "00",
      Sekunder: "00",
    };
    if (!confettiLaunched.value) {
      launchIntroConfetti();
      confettiLaunched.value = true;
    }
    return;
  }

  const current = new Date().getTime();
  const distance = targetDate.getTime() - current;

  if (distance > 0) {
    timeUnits.value = {
      Dagar: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      ),
      Timmar: String(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      ).padStart(2, "0"),
      Minuter: String(
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      ).padStart(2, "0"),
      Sekunder: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(
        2,
        "0"
      ),
    };
  } else {
    timeUnits.value = {
      Dagar: "00",
      Timmar: "00",
      Minuter: "00",
      Sekunder: "00",
    };
    launchIntroConfetti();
    clearInterval(countdownInterval);
  }
}

let countdownInterval;

onMounted(() => {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(countdownInterval);
});
</script>

<style scoped>
@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 0.5s infinite;
}
</style>
