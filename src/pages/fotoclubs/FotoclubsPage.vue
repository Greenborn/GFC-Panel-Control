<script setup>
import { ref } from "vue";

import FotoclubTable from "./widgets/FotoclubsTable.vue";
import EditFotoclubForm from "./widgets/EditFotoclubForm.vue";
import { useModal, useToast } from "vuestic-ui";

const projectToEdit = ref(null);
const doShowFotoclubFormModal = ref(false);

</script>

<template>
  <h1 class="page-title">Fotoclubs</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaButton icon="add" @click="createNewFotoclub">Fotoclub</VaButton>
      </div>

      <FotoclubTable
        :projects="projects"
        :loading="isLoading"
        @edit="editFotoclub"
        @delete="onFotoclubDeleted"
      />
    </VaCardContent>

    <VaModal
      v-slot="{ cancel, ok }"
      v-model="doShowFotoclubFormModal"
      size="small"
      mobile-fullscreen
      close-button
      stateful
      hide-default-actions
      :before-cancel="beforeEditFormModalClose"
    >
      <h1 v-if="projectToEdit === null" class="va-h5 mb-4">Add project</h1>
      <h1 v-else class="va-h5 mb-4">Edit project</h1>
      <EditFotoclubForm
        ref="editFormRef"
        :project="projectToEdit"
        :save-button-label="projectToEdit === null ? 'Add' : 'Save'"
        @close="cancel"
        @save="
          (project) => {
            onFotoclubSaved(project);
            ok();
          }
        "
      />
    </VaModal>
  </VaCard>
</template>
