<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios'

import SectionsTable from "./widgets/SectionsTable.vue";
import EditSectionForm from "./widgets/EditSectionForm.vue";

const toEdit          = ref(null);
const doShowFormModal = ref(false);
const isLoading       = ref(false)

const sections = ref([])

onMounted(async () => {
  let response = await axios.get(import.meta.env.VITE_API_URL+'section/get_all')
  if (response){
    sections.value = response.data.items
    console.log(sections.value)
  }
})

function showEditModal(data) {
  toEdit.value = data
  doShowFormModal.value = true
}

function crearNueva(){
  alert("En desarrollo")
}
</script>

<template>
  <h1 class="page-title">Secciones</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <!--<VaButton icon="add" @click="crearNueva">Sección</VaButton>-->
      </div>

      <SectionsTable
        :sections="sections"
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
      <h1 v-if="toEdit === null" class="va-h5 mb-4">Agregar Sección</h1>
      <h1 v-else class="va-h5 mb-4">Editar Sección</h1>
      <EditSectionForm
        ref="editFormRef"
        :seccion="showEditModal"
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
