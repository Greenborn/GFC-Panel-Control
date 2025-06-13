<script setup>
import { ref } from "vue";
import ProjectStatusBadge from "../components/ProjectStatusBadge.vue"

import { DEFAULT_FC } from "../const.js";

const props = defineProps(["fotoclub"])

const newFotoclub = ref({... (props?.fotoclub) ? props.fotoclub : DEFAULT_FC });

const required = (v) => !!v || "This field is required";

</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <VaInput
      v-model="newFotoclub.name"
      label="Nombre"
      :rules="[required]"
    />

    <VaInput
      v-model="newFotoclub.description"
      label="Descripción"
    />

    <VaInput
      v-model="newFotoclub.facebook"
      label="Facebook"
    />

    <VaInput
      v-model="newFotoclub.instagram"
      label="Instagram"
    />

    <VaInput
      v-model="newFotoclub.email"
      label="E-Mail"
    />
    
    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')"
        >Cancel</VaButton
      >
      <VaButton @click="validate() && $emit('save', newFotoclub)">Guardar</VaButton>
    </div>
  </VaForm>
</template>

<style lang="scss" scoped>
.va-select-content__autocomplete {
  flex: 1;
}

.va-input-wrapper__text {
  gap: 0.2rem;
}
</style>
