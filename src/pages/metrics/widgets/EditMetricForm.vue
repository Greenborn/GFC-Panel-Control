<script setup>
import { ref } from "vue";
import ProjectStatusBadge from "../components/ProjectStatusBadge.vue"

import { DEFAULT_METRIC } from "../const.js"

const props = defineProps(["metric"])

const newProject = ref({ ...DEFAULT_METRIC })

const required = (v) => !!v || "This field is required"

</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <VaInput
      v-model="newProject.project_name"
      label="Project name"
      :rules="[required]"
    />
    
    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')"
        >Cancelar</VaButton
      >
      <VaButton @click="validate() && $emit('save', newProject)">Guardar</VaButton>
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
