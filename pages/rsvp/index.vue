<template>
    <div>
        <RSVP />
    </div>
</template>
<script setup>
import { onMounted } from "vue";
import RSVP from "~/components/RSVP/RSVP.vue";

const loading = ref(true);
const isLoggedIn = ref(false);

onMounted(() => {
loading.value = false;
isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
});
</script>
