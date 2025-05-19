<script setup lang="ts">
import { ref  } from "vue";
import ProjectTable from "./widgets/ProjectsTable.vue";
import EditProjectForm from "./widgets/EditProjectForm.vue";
import { useModal, useToast } from "vuestic-ui";


const projectToEdit = ref(null);
const doShowProjectFormModal = ref(false);

const editProject = (project) => {
  projectToEdit.value = project;
  doShowProjectFormModal.value = true;
};

const createNewProject = () => {
  projectToEdit.value = null;
  doShowProjectFormModal.value = true;
};

const { init: notify } = useToast();

const onProjectSaved = async (project) => {
  doShowProjectFormModal.value = false;
  if ("id" in project) {
    await update(project);
    notify({
      message: "Project updated",
      color: "success",
    });
  } else {
    await add(project );
    notify({
      message: "Project created",
      color: "success",
    });
  }
};

const { confirm } = useModal();

const onProjectDeleted = async (project) => {
  const response = await confirm({
    title: "Delete project",
    message: `Are you sure you want to delete project "${project.project_name}"?`,
    okText: "Delete",
    size: "small",
    maxWidth: "380px",
  });

  if (!response) {
    return;
  }

  await remove(project);
  notify({
    message: "Project deleted",
    color: "success",
  });
};

const editFormRef = ref();

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: "380px",
      message: "Form has unsaved changes. Are you sure you want to close it?",
      size: "small",
    });
    if (agreed) {
      hide();
    }
  } else {
    hide();
  }
};
</script>

<template>
  <h1 class="page-title">Métricas</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaButton icon="add" @click="createNewProject">Métrica</VaButton>
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
