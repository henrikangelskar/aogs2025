<template>
  <div>
    <LoadingBig v-if="loading" />

    <div style="background: #2501ec; min-height: 100vh" v-else>
      <v-sheet color="#2501ec">
        <CustomContainer size="m">
          <v-img src="/aogs2025_2.png" height="280"></v-img>

          <RSVP />
        </CustomContainer>
      </v-sheet>

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
