<script setup>
import { defineVaDataTableColumns, useModal } from "vuestic-ui";
import UserAvatar from "./UserAvatar.vue";
import { ref } from "vue";
import { useVModel } from "@vueuse/core";

const columns = defineVaDataTableColumns([
]);

const props = defineProps([
  "users",
  "loading"]);

const roleColors = {
  admin: "danger",
  user: "background-element",
  owner: "warning",
};

const { confirm } = useModal();
</script>

<template>
  <VaDataTable
    :columns="columns"
    :items="users"
    :loading="$props.loading"
  >
    <template #cell(fullname)="{ rowData }">
      <div class="flex items-center gap-2 max-w-[230px] ellipsis">
        <UserAvatar :user="rowData" size="small" />
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
        :color="roleColors[rowData.role]"
      />
    </template>

    <template #cell(projects)="{ rowData }">
      <div class="ellipsis max-w-[300px] lg:max-w-[450px]">
        {{ rowData }}
      </div>
    </template>

    <template #cell(actions)="{ rowData }">
      <div class="flex gap-2 justify-end">
        <VaButton
          preset="primary"
          size="small"
          icon="mso-edit"
          aria-label="Edit user"
          @click=""
        />
        <VaButton
          preset="primary"
          size="small"
          icon="mso-delete"
          color="danger"
          aria-label="Delete user"
          @click="onUserDelete(rowData)"
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
