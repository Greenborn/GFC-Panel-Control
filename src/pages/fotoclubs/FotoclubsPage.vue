<script setup>
import { ref, onMounted } from "vue"

import FotoclubTable from "./widgets/FotoclubsTable.vue";
import EditFotoclubForm from "./widgets/EditFotoclubForm.vue";

import { get_all, edit } from "../../api/fotoclubs"

const toEdit = ref(null);
const doShowFormModal = ref(false);

const fotoclubs = ref([])

onMounted(async () => {
  await reload()
})

async function reload() {
  let response = await get_all()
  if (response){
    fotoclubs.value = response.items
  }
}

function showEditModal(data) {
  toEdit.value = data
  doShowFormModal.value = true
}

async function onSaved(fotoclub) {
  
    let res = await edit(fotoclub)
    if (res){
      alert(res.text);
      doShowFormModal.value = false;
      await reload()
    }
}
</script>

<template>
  <h1 class="page-title">Fotoclubs</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <!--<VaButton icon="add" @click="createNewFotoclub">Fotoclub</VaButton>-->
      </div>

      <FotoclubTable
        :data="fotoclubs"
        :loading="isLoading"
        @edit="showEditModal"
        @delete="onFotoclubDeleted"
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
      <h1 v-if="toEdit === null" class="va-h5 mb-4">Agregar Fotoclub</h1>
      <h1 v-else class="va-h5 mb-4">Editar Fotoclub - {{ toEdit.name }}</h1>
      <EditFotoclubForm
        ref="editFormRef"
        :fotoclub="toEdit"
        @close="cancel"
        @save="
          async (fotoclub) => {
            await onSaved(fotoclub);
            ok();
          }
        "
      />
    </VaModal>
  </VaCard>
</template>
