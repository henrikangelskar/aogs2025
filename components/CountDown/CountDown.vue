<template>
  <v-container class="text-center" fluid>
    <v-row class="mb-4 justify-center align-center">
      <v-col
        cols="3"
        v-for="(unit, label) in timeUnits"
        :key="label"
        class="d-flex flex-column align-center"
      >
        <div elevation="2" class="pa-4 rounded-lg">
          <span class="display-4 fancy-font" style="font-size: 42px">
            {{ unit }}
          </span>
        </div>
        <span class="mt-2 fancy-font">{{ label }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import confetti from "canvas-confetti";

// Set the target date to August 16th of this year, or next year if the date has already passed
const now = new Date();
const targetDate = new Date(now.getFullYear(), 7, 16); // Months are 0-indexed, so 7 is August
if (now > targetDate) {
  targetDate.setFullYear(targetDate.getFullYear() + 1); // Move to next year if the date has passed
}

const timeUnits = ref({
  Dagar: "00",
  Timmar: "00",
  Minuter: "00",
  Sekunder: "00",
});

function launchConfetti() {
  const duration = 3000; // 3 seconds
  const animationEnd = Date.now() + duration;
  const colors = ["#FFC0CB", "#FFD700", "#FFFACD", "#E6E6FA", "#FF69B4"]; // Wedding colors

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
      scalar: 1.2, // Increase size of confetti pieces
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
    launchConfetti(); // Trigger confetti when countdown reaches zero
    clearInterval(countdownInterval); // Stop the countdown
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
.display-4 {
  font-weight: bold;
}
</style>
