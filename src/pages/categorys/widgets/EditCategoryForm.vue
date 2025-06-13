<script setup>
import { ref } from "vue"
import ProjectStatusBadge from "../components/ProjectStatusBadge.vue"

import { DEFAULT_CATEGORY } from "../const.js";
const props = defineProps(['category']);

const newCategory = ref({ ... (props?.category) ? props.category : DEFAULT_CATEGORY });

const required = (v) => !!v || "This field is required";

</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <VaInput
      v-model="newCategory.name"
      label="Nombre"
      :rules="[required]"
    />
    
    <VaSelect
      v-model="newCategory.mostrar_en_ranking"
      label="Mostrar en Ranking"
      :options="[
        { value: 1, text: 'Si' },
        { value: 0, text: 'No' }
      ]"
    />

    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')"
        >Cancelar</VaButton>
      <VaButton @click="validate() && $emit('save', newCategory)">Guardar</VaButton>
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
