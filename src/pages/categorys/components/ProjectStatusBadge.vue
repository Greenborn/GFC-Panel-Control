<script setup>
defineProps(['status']);

const badgeColorMap = {
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
