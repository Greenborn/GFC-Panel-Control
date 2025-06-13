<script setup>
import { ref } from "vue";
import SectionStatusBadge from "../components/SectionStatusBadge.vue";

import { DEFAULT_SECTION } from "../const.js";

const props = defineProps(["seccion"]);

const model = ref({ ...props?.seccion ? props.seccion : DEFAULT_SECTION });

const required = (v) => !!v || "This field is required";

</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    
    <VaInput
      v-model="model.name"
      label="Sección"
      :rules="[required]"
    />

    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')"
        >Cancelar</VaButton
      >
      <VaButton @click="validate() && $emit('save', model)">Guardar</VaButton>
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
