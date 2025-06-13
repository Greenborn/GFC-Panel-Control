<script setup>
import { ref, onMounted } from "vue";

import { get_all, edit } from "../../api/sections"

import SectionsTable from "./widgets/SectionsTable.vue";
import EditSectionForm from "./widgets/EditSectionForm.vue";

const toEdit          = ref(null);
const doShowFormModal = ref(false);
const isLoading       = ref(false)

const sections = ref([])

onMounted(async () => {
  await reload()
})

async function reload() {
  let response = await get_all()
  if (response){
    sections.value = response.items
  }
}

function showEditModal(data) {
  toEdit.value = data
  doShowFormModal.value = true
}

function crearNueva(){
  alert("En desarrollo")
}

async function onSaved(data) {
  
    let res = await edit(data)
    if (res){
      alert(res.text);
      doShowFormModal.value = false;
      await reload()
    }
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
        :seccion="toEdit"
        @close="cancel"
        @save="
          (section) => {
            onSaved(section);
            ok();
          }
        "
      />
    </VaModal>
  </VaCard>
</template>
