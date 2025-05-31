<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <VaInput
      v-for="(field, index) in FIELDS_METRIC.filter((field) => field.key !== 'actions' && field.key !== 'organization_type')"
      :key="index"
      v-model="newMetric[field.key]"
      :label="field.label"
      :rules="[required]"
      :type="field.key === 'score' ? 'number' : 'text'"
    />
    <VaSelect
      v-model="newMetric.organization_type"
      label="Tipo Concurso"
      :options="[
        { value: 'INTERNO', text: 'Interno' },
        { value: 'EXTERNO', text: 'Externo' },
        { value: 'EXTERNO_UNICEN', text: 'Externo Unicen' }
      ]"
      :rules="[required]"
    />
    
    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')"
        >Cancelar</VaButton
      >
      <VaButton @click="validate() && $emit('save', newMetric)">Guardar</VaButton>
    </div>
  </VaForm>
</template>

<script setup>
import { ref } from "vue"
import { FIELDS_METRIC } from "../const.js"
import { DEFAULT_METRIC } from "../const.js"

const props = defineProps(["metric"])
const emit = defineEmits(["close", "save"])

const newMetric = ref(
  props?.metric ? props?.metric : { ...DEFAULT_METRIC, organization_type: 'INTERNO' }
)

const required = (v) => !!v || "This field is required"
</script>

<style lang="scss" scoped>
.va-select-content__autocomplete {
  flex: 1;
}

.va-input-wrapper__text {
  gap: 0.2rem;
}
</style>