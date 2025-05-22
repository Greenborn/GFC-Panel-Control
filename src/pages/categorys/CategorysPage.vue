<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios'

import CategorysTable from "./widgets/CategorysTable.vue";
import EditCategoryForm from "./widgets/EditCategoryForm.vue";

const projectToEdit = ref(null);
const doShowProjectFormModal = ref(false);

const isLoading = ref(false)
const categories = ref([])

onMounted(async () => {
  let response = await axios.get(import.meta.env.VITE_API_URL+'category/get_all')
  if (response){
    categories.value = response.data.items
    for (let i=0; i<categories.value.length; i++){
      const ITEM = categories.value[i]
      ITEM.mostrar_en_ranking = ITEM.mostrar_en_ranking ? 'Si' : 'No'
    }
  }
})

function createNew() {
  alert("En desarrollo")
}
</script>

<template>
  <h1 class="page-title">Categorías</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        
        <VaButton icon="add" @click="createNew">Categoria</VaButton>
      </div>

      
      <CategorysTable
        :categories="categories"
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
      <EditCategoryForm
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
