<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios'

import MetricTable from "./widgets/MetricsTable.vue";
import EditMetricForm from "./widgets/EditMetricForm.vue";

const toEdit = ref(null);
const doShowFormModal = ref(false);

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

function showEditModal(data) {
  toEdit.value = data
  doShowFormModal.value = true
}

function onProjectSaved(project) {
  axios.put(import.meta.env.VITE_API_URL + 'metric/edit', project)
    .then(response => {
      if (response.data.stat === true) {
        alert(response.data.text);
        doShowFormModal.value = false;
        reloadMetrics();
      } else {
        alert(response.data.text);
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        alert('Sesión expirada. Por favor, inicie sesión nuevamente.');
      } else if (error.response.status === 500) {
        alert('Error interno del servidor. Por favor, inténtelo nuevamente más tarde.');
      } else {
        alert('Error desconocido. Por favor, inténtelo nuevamente más tarde.');
      }
    });
}

function reloadMetrics() {
  isLoading.value = true;
  axios.get(import.meta.env.VITE_API_URL + 'metric/get_all')
    .then(response => {
      metrics.value = response.data.items;
      isLoading.value = false;
    })
    .catch(error => {
      console.error(error);
      isLoading.value = false;
    });
}


</script>

<template>
  <h1 class="page-title">Métricas</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <!--<VaButton icon="add" @click="createNew">Métrica</VaButton>-->
      </div>

      <MetricTable
        :metrics="metrics"
        :loading="isLoading"
        @edit="showEditModal"
        @delete="onProjectDeleted"
      />
    </VaCardContent>

    <VaModal
      v-slot="{ cancel, ok }"
      v-model="doShowFormModal"
      size="small"
      mobile-fullscreen
      close-button
      stateful
      hide-default-actions
      :before-cancel="beforeEditFormModalClose"
    >
      <h1 v-if="toEdit === null" class="va-h5 mb-4">Agregar Métrica</h1>
      <h1 v-else class="va-h5 mb-4">Editar Métrica - {{ toEdit.prize }}</h1>
      <EditMetricForm
        ref="editFormRef"
        :metric="toEdit"
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
