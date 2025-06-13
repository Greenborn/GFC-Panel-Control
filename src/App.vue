<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue';

import { session } from './api/auth'

onMounted(async () => {
  let response = await session()
  if (response){
    localStorage.setItem('user_data', JSON.stringify(response));
  }
})
</script>

<style lang="scss">
#app {
  font-family: "Inter", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-width: 20rem;
}
</style>
