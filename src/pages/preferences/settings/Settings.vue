<template>
  <div
    class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5"
  >
    <p class="font-bold w-[200px]">Name</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ userName }}
      </div>
    </div>
    <VaButton
      :style="buttonStyles"
      class="w-fit h-fit"
      preset="primary"
      @click="emits('openNameModal')"
    >
      Edit
    </VaButton>
  </div>
  <VaDivider />
  <div
    class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5"
  >
    <p class="font-bold w-[200px]">Email</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ email }}
      </div>
    </div>
  </div>
  <div
    class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5"
  >
    <p class="font-bold w-[200px]">Password</p>
    <div class="flex-1">
      <div class="max-w-[748px]">•••••••••••••</div>
    </div>
    <VaButton
      :style="buttonStyles"
      class="w-fit h-fit"
      preset="primary"
      @click="emits('openResetPasswordModal')"
    >
      Reset Password
    </VaButton>
  </div>
  <VaDivider />
  <div
    class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5"
  >
    <p class="font-bold w-[200px]">Two-factor authentication</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        {{ content }}
      </div>
    </div>
    <VaButton
      :style="buttonStyles"
      class="w-fit h-fit"
      preset="primary"
      :color="color"
      @click="toggle2FA"
    >
      {{ button }}
    </VaButton>
  </div>
  <VaDivider />
  <div
    class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 min-h-[36px] leading-5"
  >
    <p class="font-bold w-[200px]">Email subscriptions</p>
    <div class="flex-1">
      <div class="max-w-[748px]">
        <p>To manage what emails you get, visit the</p>
        <div class="flex space-x-1 w-fit">
          <RouterLink
            :to="{ name: 'settings' }"
            class="font-semibold text-primary"
            >Notification settings</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";

import { useToast } from "vuestic-ui";


import { buttonStyles } from "../styles";


const { init } = useToast();

const toastMessage = computed(() =>{});

const toggle2FA = () => {
  init({ message: toastMessage.value, color: "success" });
};

const emits = defineEmits(["openNameModal", "openResetPasswordModal"]);
</script>
