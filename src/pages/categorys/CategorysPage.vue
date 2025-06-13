<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios'

import CategorysTable from "./widgets/CategorysTable.vue";
import EditCategoryForm from "./widgets/EditCategoryForm.vue";

import { get_all, edit } from "../../api/category"

const toEdit          = ref(null);
const doShowFormModal = ref(false);

const isLoading = ref(false)
const categories = ref([])

onMounted(async () => {
  await reload()
})

async function reload() {
  let response = await get_all()
  if (response){
    categories.value = response.items
    for (let i=0; i<categories.value.length; i++){
      const ITEM = categories.value[i]
      ITEM.mostrar_en_ranking = ITEM.mostrar_en_ranking ? 'Si' : 'No'
    }
  }
}
async function onSaved(data) {
  
    let res = await edit(data)
    if (res){
      alert(res.text);
      doShowFormModal.value = false;
      await reload()
    }
}

function createNew() {
  alert("En desarrollo")
}

function showEditModal(data) {
  toEdit.value = data
  doShowFormModal.value = true
}

</script>

<template>
  <h1 class="page-title">Categorías</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <!--<VaButton icon="add" @click="createNew">Categoria</VaButton>-->
      </div>
      
      <CategorysTable
        :categories="categories"
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
      <h1 v-if="toEdit === null" class="va-h5 mb-4">Agregar Categoria</h1>
      <h1 v-else class="va-h5 mb-4">Editar Categoría - {{ toEdit.name }}</h1>
      <EditCategoryForm
        ref="editFormRef"
        :category="toEdit"
        @close="cancel"
        @save="
          async (data) => {
            await onSaved(data);
            ok();
          }
        "
      />
    </VaModal>
  </VaCard>
</template>
