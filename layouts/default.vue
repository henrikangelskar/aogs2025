<template>
  <div>
    <NavBar />
    <slot />
  </div>
</template>
<script setup>
import NavBar from "~/components/Nav/NavBar.vue";
</script>
