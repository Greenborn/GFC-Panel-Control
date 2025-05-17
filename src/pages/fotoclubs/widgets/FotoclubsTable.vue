<script setup>
import { defineVaDataTableColumns } from "vuestic-ui";

import ProjectStatusBadge from "../components/ProjectStatusBadge.vue";

const columns = defineVaDataTableColumns([
  { label: "Nombre",      key: "name", sortable: true },
  { label: "Descripcion", key: "description", sortable: true },
  { label: "Facebook",    key: "facebook", sortable: true },
  { label: "Instagram",   key: "instagram", sortable: true },
  { label: "Email",       key: "email", sortable: true },
  { label: " ",           key: "actions" },
]);

const props = defineProps([ 'data', 'loading' ]);
const emit  = defineEmits(['edit', 'delete'])

</script>

<template>
  <div>
    <VaDataTable
      v-model:sort-by="sortByVModel"
      v-model:sorting-order="sortingOrderVModel"
      :items="props.data"
      :columns="columns"
      :loading="loading"
    >
      <template #cell(project_name)="{ rowData }">
        <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
          {{ rowData.project_name }}
        </div>
      </template>
      <template #cell(project_owner)="{ rowData }">
        <div
          v-if="getUserById(rowData.project_owner)"
          class="flex items-center gap-2 ellipsis max-w-[230px]"
        >
          {{ getUserById(rowData.project_owner).fullname }}
        </div>
      </template>
      <template #cell(team)="{ rowData: project }">
        <VaAvatarGroup
          size="small"
          :options="getTeamOptions(project.team)"
          :max="5"
        />
      </template>
      <template #cell(status)="{ rowData: project }">
        <ProjectStatusBadge :status="project.status" />
      </template>

      <template #cell(created_at)="{ rowData: project }">
        {{ new Date(project.created_at).toLocaleDateString() }}
      </template>

      <template #cell(actions)="{ rowData: project }">
        <div class="flex gap-2 justify-end">
          <VaButton
            preset="primary"
            size="small"
            color="primary"
            icon="mso-edit"
            aria-label="Edit project"
            @click="$emit('edit', project )"
          />
          <VaButton
            preset="primary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Delete project"
            @click="$emit('delete', project )"
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
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(tbody .va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
