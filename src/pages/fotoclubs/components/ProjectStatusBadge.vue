<script setup lang="ts">
import { PropType } from "vue";
import { Fotoclub } from "../types";

defineProps({
  status: {
    type: String as PropType<Fotoclub["status"]>,
    required: true,
  },
});

const badgeColorMap: Record<Fotoclub["status"], string> = {
  "in progress": "primary",
  archived: "secondary",
  completed: "success",
  important: "warning",
};
</script>

<template>
  <VaBadge
    square
    :color="badgeColorMap[$props.status]"
    :text="$props.status.toUpperCase()"
  />
</template>
