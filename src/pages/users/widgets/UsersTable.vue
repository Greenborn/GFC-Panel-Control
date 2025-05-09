<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from "vuestic-ui";
import UserAvatar from "./UserAvatar.vue";
import { PropType, computed, toRef } from "vue";
import { Pagination, Sorting } from "../../../data/pages/users";
import { useVModel } from "@vueuse/core";

const columns = defineVaDataTableColumns([
  { label: "Full Name", key: "fullname", sortable: true },
  { label: "Email", key: "email", sortable: true },
  { label: "Username", key: "username", sortable: true },
  { label: "Role", key: "role", sortable: true },
  { label: "Projects", key: "projects", sortable: true },
  { label: " ", key: "actions", align: "right" },
]);

const props = defineProps({
});

const emit = defineEmits<{
}>();

const users = toRef(props, "users");
const sortByVModel = useVModel(props, "sortBy", emit);
const sortingOrderVModel = useVModel(props, "sortingOrder", emit);

const roleColors: Record<UserRole, string> = {
  admin: "danger",
  user: "background-element",
  owner: "warning",
};

const { confirm } = useModal();

const onUserDelete = async (user: User) => {
  const agreed = await confirm({
    title: "Delete user",
    message: `Are you sure you want to delete ${user.fullname}?`,
    okText: "Delete",
    cancelText: "Cancel",
    size: "small",
    maxWidth: "380px",
  });

  if (agreed) {
    emit("delete-user", user);
  }
};

const formatProjectNames = (projects: Project["id"][]) => {
  const names = projects.reduce((acc, p) => {
    const project = props.projects?.find(({ id }) => p === id);

    if (project) {
      acc.push(project.project_name);
    }

    return acc;
  }, [] as string[]);
  if (names.length === 0) return "No projects";
  if (names.length <= 2) {
    return names.map((name) => name).join(", ");
  }

  return (
    names
      .slice(0, 2)
      .map((name) => name)
      .join(", ") +
    " + " +
    (names.length - 2) +
    " more"
  );
};
</script>

<template>
  <VaDataTable
    :columns="columns"
    :items="users"
    :loading="$props.loading"
  >
    <template #cell(fullname)="{ rowData }">
      <div class="flex items-center gap-2 max-w-[230px] ellipsis">
        <UserAvatar :user="rowData as User" size="small" />
        {{ rowData.fullname }}
      </div>
    </template>

    <template #cell(username)="{ rowData }">
      <div class="max-w-[120px] ellipsis">
        {{ rowData.username }}
      </div>
    </template>

    <template #cell(email)="{ rowData }">
      <div class="ellipsis max-w-[230px]">
        {{ rowData.email }}
      </div>
    </template>

    <template #cell(role)="{ rowData }">
      <VaBadge
        :text="rowData.role"
        :color="roleColors[rowData.role as UserRole]"
      />
    </template>

    <template #cell(projects)="{ rowData }">
      <div class="ellipsis max-w-[300px] lg:max-w-[450px]">
        {{ formatProjectNames(rowData.projects) }}
      </div>
    </template>

    <template #cell(actions)="{ rowData }">
      <div class="flex gap-2 justify-end">
        <VaButton
          preset="primary"
          size="small"
          icon="mso-edit"
          aria-label="Edit user"
          @click="$emit('edit-user', rowData as User)"
        />
        <VaButton
          preset="primary"
          size="small"
          icon="mso-delete"
          color="danger"
          aria-label="Delete user"
          @click="onUserDelete(rowData as User)"
        />
      </div>
    </template>
  </VaDataTable>

  <div
    class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2"
  >
    
    <div v-if="totalPages > 1" class="flex">
      
    </div>
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
