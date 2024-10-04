<template>
  <div>
    <LoadingBig v-if="loading" />

    <div v-else>
      <CustomContainer>
        <v-img src="/aogs2025.png" height="480"></v-img>
      </CustomContainer>
      <v-sheet color="#2501ec">
        <CustomContainer size="m">
          <RSVP />
        </CustomContainer>
      </v-sheet>
      <CustomContainer size="m">
        <CountDown />
      </CustomContainer>
      <EnterCode />
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import CustomContainer from "~/components/UI/CustomContainer.vue";
import CountDown from "~/components/CountDown/CountDown.vue";
import EnterCode from "~/components/EnterCode/EnterCode.vue";
import RSVP from "~/components/RSVP/RSVP.vue";
import LoadingBig from "~/components/Loading/LoadingBig.vue";

const loading = ref(true);
const isLoggedIn = ref(false);

onMounted(() => {
  loading.value = false;
  isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
});
</script>
