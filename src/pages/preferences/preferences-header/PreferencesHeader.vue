<template>
  <VaAvatar size="large" color="warning"
    ><span class="text-4xl"> <img class="rounded-full" :src="get_img_profile()" /> </span></VaAvatar
  >
  <div class="flex flex-col justify-center">
    <h2 class="text-[28px] md:text-[32px] leading-10 font-bold">
      {{ userName }}
    </h2>
    <div class="flex space-x-1 text-[13px] leading-4">
      <p>Member since</p>
      <p>{{ memberSince }}</p>
    </div>
  </div>
</template>

<script setup>
import { get_img_profile } from '../../../api/auth'
</script>
