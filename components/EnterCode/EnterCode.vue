<template>
  <div
    v-if="!isLoggedIn"
    style="
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background: #2501ec;
      z-index: 1000;
    "
    class="d-flex justify-center align-center"
  >
    <div class="text-center">
      <v-text-field
        v-model="code"
        label="Ange kod"
        variant="solo"
        class="custom-input rounded-0"
        @keyup.enter="checkCode"
        autocomplete="off"
        :error="error"
        :error-messages="errorMessage"
        min-width="300"
        style="border-radius: 0 !important"
      />

      <v-btn
        variant="outlined"
        color="white"
        size="large"
        style="border-radius: 0px"
        @click="checkCode"
        class="mt-4"
        min-width="300"
      >
        Bekräfta
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const code = ref("");
const isLoggedIn = ref(false);
const error = ref(false);
const errorMessage = ref("");

onMounted(() => {
  isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
});

function checkCode() {
  if (code.value.toLowerCase() === "aogs2025") {
    isLoggedIn.value = true;
    localStorage.setItem("isLoggedIn", "true");
  } else {
    error.value = true;
    errorMessage.value = "Fel kod. Försök igen.";
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
