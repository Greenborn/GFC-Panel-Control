<script setup>
import { computed, ref, watch } from "vue";
import { useForm } from "vuestic-ui";
import UserAvatar from "./UserAvatar.vue";
import { validators } from "../../../services/utils";

const props = defineProps(["user"]);

const defaultNewUser = {
  avatar: "",
  fullname: "",
  role: "user",
  username: "",
  notes: "",
  email: "",
  active: true,
}

const newUser = ref({ ...defaultNewUser });
const avatar = ref();

const makeAvatarBlobUrl = (avatar) => {
  return URL.createObjectURL(avatar);
}

watch(avatar, (newAvatar) => {
  newUser.value.avatar = newAvatar ? makeAvatarBlobUrl(newAvatar) : "";
})

const form = useForm("add-user-form");
const emit = defineEmits(["close", "save"]);

function onSave(){
  if (form.validate()) {
    emit("save", newUser.value);
  }
}

const roleSelectOptions = [
  { text: "Admin", value: "admin" },
  { text: "User", value: "user" },
  { text: "Owner", value: "owner" },
]
</script>

<template>
  <VaForm
    v-slot="{ isValid }"
    ref="add-user-form"
    class="flex-col justify-start items-start gap-4 inline-flex w-full"
  >
    <VaFileUpload
      v-model="avatar"
      type="single"
      hide-file-list
      class="self-stretch justify-start items-center gap-4 inline-flex"
    >
      <UserAvatar :user="newUser" size="large" />
      <VaButton preset="primary" size="small">Add image</VaButton>
      <VaButton
        v-if="avatar"
        preset="primary"
        color="danger"
        size="small"
        icon="delete"
        class="z-10"
        @click.stop="avatar = undefined"
      />
    </VaFileUpload>
    <div class="self-stretch flex-col justify-start items-start gap-4 flex">
      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
          v-model="newUser.fullname"
          label="Full name"
          class="w-full sm:w-1/2"
          :rules="[validators.required]"
          name="fullName"
        />
        <VaInput
          v-model="newUser.username"
          label="Username"
          class="w-full sm:w-1/2"
          :rules="[validators.required]"
          name="username"
        />
      </div>
      <div class="flex gap-4 flex-col sm:flex-row w-full">
        <VaInput
          v-model="newUser.email"
          label="Email"
          class="w-full sm:w-1/2"
          :rules="[validators.required, validators.email]"
          name="email"
        />
        <VaSelect
          v-model="newUser.projects"
          label="Projects"
          class="w-full sm:w-1/2"
          :options="projects"
          value-by="id"
          text-by="project_name"
          :rules="[validators.required]"
          name="projects"
          multiple
          :max-visible-options="2"
        />
      </div>

      <div class="flex gap-4 w-full">
        <div class="w-1/2">
          <VaSelect
            v-model="newUser.role"
            label="Role"
            class="w-full"
            :options="roleSelectOptions"
            :rules="[validators.required]"
            name="role"
            value-by="value"
          />
        </div>

        <div class="flex items-center w-1/2 mt-4">
          <VaCheckbox
            v-model="newUser.active"
            label="Active"
            class="w-full"
            name="active"
          />
        </div>
      </div>

      <VaTextarea
        v-model="newUser.notes"
        label="Notes"
        class="w-full"
        name="notes"
      />
      <div
        class="flex gap-2 flex-col-reverse items-stretch justify-end w-full sm:flex-row sm:items-center"
      >
        <VaButton preset="secondary" color="secondary" @click="$emit('close')"
          >Cancelar</VaButton
        >
        <VaButton :disabled="!isValid" @click="onSave">Guardar</VaButton>
      </div>
    </div>
  </VaForm>
</template>
