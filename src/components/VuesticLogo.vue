<template>
  <img src="/portadaGFC.png" alt="logo" :style="{ height: `${props.height}rem`, filter: props.color == 1 ? 'grayscale(100%) brightness(0%)' : 'grayscale(0) brightness(100%)' }" />
</template>

<script setup>
const props = defineProps(['height', 'color']);
</script>