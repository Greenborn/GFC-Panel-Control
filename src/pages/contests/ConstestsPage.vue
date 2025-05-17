<script setup lang="ts">
import { ref, provide } from "vue";
import { useLocalStorage } from "@vueuse/core";
import ContestsTable from "./widgets/ContestsTable.vue";
import EditConstestForm from "./widgets/EditConstestForm.vue";


const projectToEdit = ref(null);
const doShowProjectFormModal = ref(false);

const contests = ref([])
</script>

<template>
  <h1 class="page-title">Concursos</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaButton icon="add" @click="createNewProject">Concurso</VaButton>
      </div>

      <ContestsTable
        :contests="contests"
        :loading="isLoading"
        @edit=""
        @delete=""
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
      <EditConstestForm
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
