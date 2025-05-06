<template>
    <div class="login-container">
    <h1 class="title">Login</h1>
    <form class="login-form">
      <input type="text" v-model="username" placeholder="Username" class="input-field">
      <input type="password" v-model="password" placeholder="Password" class="input-field">
      <button @click="login" class="login-button">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

function login() {
    axios.post('http://localhost:7778/api/login', {
    username: username.value,
    password: password.value
  })
  .then(response => {
    if (response.data.r === true) {
      router.push({ name: 'dashboard' })
    } else {
      console.log('Error de autenticación')
    }
  })
  .catch(error => {
    console.log(error)
  })
}
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #3e8e41;
}
</style>