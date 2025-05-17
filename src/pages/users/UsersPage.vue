<script setup>
import { ref, onMounted } from "vue";
import UsersTable from "./widgets/UsersTable.vue";
import EditUserForm from "./widgets/EditUserForm.vue";
import { useModal, useToast } from "vuestic-ui";
import axios from 'axios';
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

const users = ref([]);

onMounted(async () => {
  let response = await axios.get(import.meta.env.VITE_API_URL+'users/get_all')
  if (response){
    users.value = response.data.items
    console.log(users.value)
  }
})

</script>

<template>
  <h1 class="page-title">Usuarios</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">

          <VaInput  placeholder="Buscar">
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
