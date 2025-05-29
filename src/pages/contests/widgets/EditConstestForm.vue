<script setup>
import { computed, ref, watch } from "vue";
import ProjectStatusBadge from "../components/ProjectStatusBadge.vue"

const props = defineProps(["contest"]);
defineEmits(["save", "close"]);

const defaultValues = {
  project_name: "",
  project_owner: undefined,
  team: [],
  status: undefined,
};

const newContest = ref({ ...defaultValues });

const required = (v) => !!v || "This field is required";

const ownerFiltersSearch = ref("");
const teamFiltersSearch = ref("");
</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <VaInput
      v-model="newContest.project_name"
      label="Project name"
      :rules="[required]"
    />
    <VaSelect
      v-model="newContest.status"
      label="Status"
      :rules="[required]"
      track-by="value"
      value-by="value"
      :options="[
        { text: 'In progress', value: 'in progress' },
        { text: 'Archived', value: 'archived' },
        { text: 'Completed', value: 'completed' },
        { text: 'Important', value: 'important' },
      ]"
    >
      <template #content="{ value }">
        <ProjectStatusBadge v-if="value" :status="value.value" />
      </template>
    </VaSelect>
    <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')"
        >Cancel</VaButton
      >
      <VaButton @click="validate() && $emit('save', newContest)">{{
        saveButtonLabel
      }}</VaButton>
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
