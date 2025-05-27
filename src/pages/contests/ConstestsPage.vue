<script setup>
import { ref, onMounted } from "vue";
import ContestsTable from "./widgets/ContestsTable.vue";
import EditConstestForm from "./widgets/EditConstestForm.vue";
import { fechaDateToString } from "../../helpers/utils";

import axios from 'axios'

const contestToEdit = ref(null);
const doShowFormModal = ref(false);

const contests = ref([])

onMounted(async () => {
  let response = await axios.get(import.meta.env.VITE_API_URL+'contests/get_all')
  if (response){
    contests.value = response.data.items
    for (let i=0; i<contests.value.length; i++){
      const ITEM = contests.value[i]
      ITEM.start_date = fechaDateToString(new Date(ITEM.start_date), '-')
      ITEM.end_date   = fechaDateToString(new Date(ITEM.end_date), '-')
    }

    contests.value.sort((a, b) => b.id - a.id)
  }
})

function agregarConcurso(){
  alert("En desarrollo")
}

function showEditModal(data) {
  contestToEdit.value = data
  doShowFormModal.value = true
}

</script>

<template>
  <h1 class="page-title">Concursos</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <!--<VaButton icon="add" @click="agregarConcurso">Concurso</VaButton>-->
      </div>

      <ContestsTable
        :contests="contests"
        :loading="isLoading"
        @edit="showEditModal"
        @delete=""
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
      <h1 v-if="contestToEdit === null" class="va-h5 mb-4">Guardar</h1>
      <h1 v-else class="va-h5 mb-4">Editar</h1>
      <EditConstestForm
        ref="editFormRef"
        :contest="contestToEdit"
      />
    </VaModal>
  </VaCard>
</template>
