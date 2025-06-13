<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from "vue-router"

import { session } from './api/auth'

const { push } = useRouter()

onMounted(async () => {
  let response = await session()
  if (response?.stat){
    //console.log(response.stat)
    localStorage.setItem('user_data', JSON.stringify(response));
  } else {
    localStorage.removeItem('user_data')
    localStorage.removeItem('token')
    push({ name: "login" })
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
