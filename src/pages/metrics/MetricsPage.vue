<script setup>
import { ref, onMounted } from "vue"

import MetricTable from "./widgets/MetricsTable.vue";
import EditMetricForm from "./widgets/EditMetricForm.vue";
import { get_all, edit } from "../../api/metrics"

const toEdit = ref(null);
const doShowFormModal = ref(false);

const metrics = ref([])
const isLoading = ref(false)

onMounted(async () => {
  let response = await get_all()
  if (response){
    metrics.value = response.items
  }
})

function createNew(){
  alert("En desarrollo")
}

function showEditModal(data) {
  toEdit.value = data
  doShowFormModal.value = true
}

async function onSaved(metric) {
  const editedMetric = { ...metric }
  if (editedMetric.organization_type?.value)
    editedMetric.organization_type = editedMetric.organization_type.value;
  
    let res = await edit(editedMetric)
    if (res){
      alert(res.text);
      doShowFormModal.value = false;
      await reloadMetrics();
    }
}

async function reloadMetrics() {
  isLoading.value = true;

  let response = await get_all()
  if (response){
    isLoading.value = false;
    metrics.value = response.items
  }
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
          (metric) => {
            onSaved(metric);
            ok();
          }
        "
      />
    </VaModal>
  </VaCard>
</template>
