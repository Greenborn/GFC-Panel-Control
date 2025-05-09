<script setup lang="ts">
import { ref, watchEffect } from "vue";
import UsersTable from "./widgets/UsersTable.vue";
import EditUserForm from "./widgets/EditUserForm.vue";
import { useModal, useToast } from "vuestic-ui";
//import { useProjects } from "../projects/composables/useProjects";

const doShowEditUserModal = ref(false);

//const { projects } = useProjects();

const userToEdit = ref(null);

const showEditUserModal = (user) => {
  userToEdit.value = user;
  doShowEditUserModal.value = true;
};

const showAddUserModal = () => {
  userToEdit.value = null;
  doShowEditUserModal.value = true;
};

const { init: notify } = useToast();


const onUserSaved = async (user) => {
  if (user.avatar.startsWith("blob:")) {
    const blob = await fetch(user.avatar).then((r) => r.blob());
    const { publicUrl } = await usersApi.uploadAvatar(blob);
    user.avatar = publicUrl;
  }

  if (userToEdit.value) {
    await usersApi.update(user);
    if (!error.value) {
      notify({
        message: `${user.fullname} has been updated`,
        color: "success",
      });
    }
  } else {
    await usersApi.add(user);

    if (!error.value) {
      notify({
        message: `${user.fullname} has been created`,
        color: "success",
      });
    }
  }
};

const onUserDelete = async (user) => {
  await usersApi.remove(user);
  notify({
    message: `${user.fullname} has been deleted`,
    color: "success",
  });
};

const editFormRef = ref();

const { confirm } = useModal();

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
  <h1 class="page-title">Usuarios</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">

          <VaInput  placeholder="Search">
            <template #prependInner>
              <VaIcon name="search" color="secondary" size="small" />
            </template>
          </VaInput>
        </div>
        <VaButton @click="showAddUserModal">Agregar</VaButton>

      </div>

      <UsersTable
        :users="users"
        
        :loading="isLoading"
        @editUser="showEditUserModal"
        @deleteUser="onUserDelete"
      />
    </VaCardContent>
  </VaCard>

  <VaModal
    v-slot="{ cancel, ok }"
    v-model="doShowEditUserModal"
    size="small"
    mobile-fullscreen
    close-button
    hide-default-actions
    :before-cancel="beforeEditFormModalClose"
  >
    <h1 class="va-h5">{{ userToEdit ? "Edit user" : "Add user" }}</h1>
    <EditUserForm
      ref="editFormRef"
      :user="userToEdit"
      :save-button-label="userToEdit ? 'Save' : 'Add'"
      @close="cancel"
      @save="
        (user) => {
          onUserSaved(user);
          ok();
        }
      "
    />
  </VaModal>
</template>
