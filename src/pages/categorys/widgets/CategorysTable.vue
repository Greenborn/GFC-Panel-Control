<script setup lang="ts">
import { defineVaDataTableColumns } from "vuestic-ui";
import ProjectStatusBadge from "../components/ProjectStatusBadge.vue";

const columns = defineVaDataTableColumns([
  { label: "Project name", key: "project_name", sortable: true },
  { label: "Project owner", key: "project_owner", sortable: true },
  { label: "Team", key: "team", sortable: true },
  { label: "Status", key: "status", sortable: true },
  { label: "Creation Date", key: "created_at", sortable: true },
  { label: " ", key: "actions" },
]);

const props = defineProps(["categories", "loading"]);

</script>

<template>
  <div>
    <VaDataTable
      :items="categories"
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
            @click="$emit('edit', project as Project)"
          />
          <VaButton
            preset="primary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Delete project"
            @click="$emit('delete', project as Project)"
          />
        </div>
      </template>
    </VaDataTable>
    <div
      class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2"
    >

      <div v-if="totalPages > 1" class="flex">
        <VaButton
          preset="secondary"
          icon="va-arrow-left"
          aria-label="Previous page"
          :disabled="$props.pagination.page === 1"
          @click="$props.pagination.page--"
        />
        <VaButton
          class="mr-2"
          preset="secondary"
          icon="va-arrow-right"
          aria-label="Next page"
          :disabled="$props.pagination.page === totalPages"
          @click="$props.pagination.page++"
        />
        <VaPagination
          v-model="$props.pagination.page"
          buttons-preset="secondary"
          :pages="totalPages"
          :visible-pages="5"
          :boundary-links="false"
          :direction-links="false"
        />
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
