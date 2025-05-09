<script setup lang="ts">
import { ref, provide } from "vue";
import { useLocalStorage } from "@vueuse/core";
import ProjectTable from "./widgets/ContestsTable.vue";
import EditProjectForm from "./widgets/EditProjectForm.vue";
import { Project } from "./types";
import { useModal, useToast } from "vuestic-ui";

const doShowAsCards = useLocalStorage("projects-view", true);


const projectToEdit = ref<Project | null>(null);
const doShowProjectFormModal = ref(false);

</script>

<template>
  <h1 class="page-title">Concursos</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaButton icon="add" @click="createNewProject">Concurso</VaButton>
      </div>

      <ProjectTable
        :projects="projects"
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
      <EditProjectForm
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
