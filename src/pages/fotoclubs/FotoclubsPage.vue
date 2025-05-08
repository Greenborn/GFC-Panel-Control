<script setup lang="ts">
import { ref, provide } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useFotoclubs } from "./composables/useFotoclubs";
import FotoclubTable from "./widgets/FotoclubsTable.vue";
import EditFotoclubForm from "./widgets/EditFotoclubForm.vue";
import { Fotoclub } from "./types";
import { useModal, useToast } from "vuestic-ui";
import { useFotoclubUsers } from "./composables/useFotoclubUsers";

const doShowAsCards = useLocalStorage("projects-view", true);

const { projects, update, add, isLoading, remove, pagination, sorting } =
  useFotoclubs();

const { users, getTeamOptions, getUserById } = useFotoclubUsers();

provide("ContestsPage", {
  users,
  getTeamOptions,
  getUserById,
});

const projectToEdit = ref<Fotoclub | null>(null);
const doShowFotoclubFormModal = ref(false);

const editFotoclub = (project: Fotoclub) => {
  projectToEdit.value = project;
  doShowFotoclubFormModal.value = true;
};

const createNewFotoclub = () => {
  projectToEdit.value = null;
  doShowFotoclubFormModal.value = true;
};

const { init: notify } = useToast();

const onFotoclubSaved = async (project: Fotoclub) => {
  doShowFotoclubFormModal.value = false;
  if ("id" in project) {
    await update(project as Fotoclub);
    notify({
      message: "Fotoclub updated",
      color: "success",
    });
  } else {
    await add(project as Fotoclub);
    notify({
      message: "Fotoclub created",
      color: "success",
    });
  }
};

const { confirm } = useModal();

const onFotoclubDeleted = async (project: Fotoclub) => {
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
    message: "Fotoclub deleted",
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
  <h1 class="page-title">Fotoclubs</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaButton icon="add" @click="createNewFotoclub">Fotoclub</VaButton>
      </div>

      <FotoclubTable
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        v-model:pagination="pagination"
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
