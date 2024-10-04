<template>
  <v-dialog v-model="isVisible" max-width="800px" @click:outside="closeDialog">
    <v-card>
      <div class="d-flex justify-space-between align-center">
        <v-card-title class="headline">{{ heading }}</v-card-title>
        <div v-if="tooltipText" style="width: 20px" class="mr-3">
          <v-icon>mdi-information</v-icon>
          <v-tooltip :text="tooltipText" activator="parent" location="left">
          </v-tooltip>
        </div>
      </div>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="light" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from "vue";
import { useModalStore } from "../stores/modalStore.js";

const props = defineProps({
  heading: {
    type: String,
    required: true,
  },
  modalKey: {
    type: String,
    required: true,
  },
  tooltipText: {
    type: String,
    default: "",
  },
});

const modalStore = useModalStore();

const isVisible = computed({
  get: () => modalStore.isVisible(props.modalKey),
  set: (value) => {
    if (!value) modalStore.hide(props.modalKey);
  },
});

function closeDialog() {
  modalStore.hide(props.modalKey);
}
</script>
