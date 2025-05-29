<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios'

import MetricTable from "./widgets/MetricsTable.vue";
import EditMetricForm from "./widgets/EditMetricForm.vue";

const projectToEdit = ref(null);
const doShowFotoclubFormModal = ref(false);

const metrics = ref([])
const isLoading = ref(false)

onMounted(async () => {
  let response = await axios.get(import.meta.env.VITE_API_URL+'metric/get_all')
  if (response){
    metrics.value = response.data.items
    console.log(metrics.value)
  }
})

function createNew(){
  alert("En desarrollo")
}
</script>

<template>
  <h1 class="page-title">Métricas</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaButton icon="add" @click="createNew">Métrica</VaButton>
      </div>

      <MetricTable
        :metrics="metrics"
        :loading="isLoading"
        @edit="editProject"
        @delete="onProjectDeleted"
      />
    </VaCardContent>

    <VaModal
      v-slot="{ cancel, ok }"
      v-model="doShowProjectFormModal"
      size="small"
      mobile-fullscreen
      close-button
      stateful
      hide-default-actions
      :before-cancel="beforeEditFormModalClose"
    >
      <h1 v-if="projectToEdit === null" class="va-h5 mb-4">Add project</h1>
      <h1 v-else class="va-h5 mb-4">Edit project</h1>
      <EditMetricForm
        ref="editFormRef"
        :project="projectToEdit"
        :save-button-label="projectToEdit === null ? 'Add' : 'Save'"
        @close="cancel"
        @save="
          (project) => {
            onProjectSaved(project);
            ok();
          }
        "
      />
    </VaModal>
  </VaCard>
</template>
