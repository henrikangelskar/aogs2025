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
              class="text-5xl sm:text-7xl text-white font-bold playfair-display"
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import confetti from "canvas-confetti";

const now = new Date();
const targetDate = new Date(now.getFullYear(), 7, 16);
if (now > targetDate) {
  targetDate.setFullYear(targetDate.getFullYear() + 1);
}

const timeUnits = ref({
  Dagar: "00",
  Timmar: "00",
  Minuter: "00",
  Sekunder: "00",
});

function launchConfetti() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const colors = ["#FFC0CB", "#FFD700", "#FFFACD", "#E6E6FA", "#FF69B4"];

  function frame() {
    confetti({
      particleCount: 6,
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
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

function updateCountdown() {
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
    launchConfetti();
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
