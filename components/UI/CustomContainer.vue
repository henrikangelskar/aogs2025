<template>
  <v-container :style="{ maxWidth: containerWidth }" class="mx-auto pa-0">
    <slot></slot>
  </v-container>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "l",
    validator: (value) => ["l", "m", "s", "xl"].includes(value), // Add "xl" to the validator
  },
});

const containerWidth = computed(() => {
  switch (props.size) {
    case "s":
      return "600px";
    case "m":
      return "800px";
    case "l":
      return "1000px";
    case "xl": // Add the "xl" case for extra-large container
      return "1200px";
    default:
      return "1000px"; // Default to "l" size if no match
  }
});
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>
