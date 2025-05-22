<script setup>
import { defineVaDataTableColumns } from "vuestic-ui";
import UserAvatar from "../../users/widgets/UserAvatar.vue";
import ProjectStatusBadge from "../components/ProjectStatusBadge.vue";
const columns = defineVaDataTableColumns([
  { label: " ", key: "actions" },
  { label: "ID", key: "id", sortable: true },
  { label: "Nombre", key: "name", sortable: true },
  { label: "Inicio Inscripcion", key: "start_date", sortable: true },
  { label: "Fin Inscripcion", key: "end_date", sortable: true },
  { label: "Sub titulo", key: "sub_title", sortable: true },
  { label: "Descripcion", key: "description", sortable: true },
]);

const props = defineProps(["contests", "loading"]);

</script>

<template>
  <div>
    <VaDataTable
      :items="contests"
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
          <UserAvatar :user="getUserById(rowData.project_owner)" size="small" />
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
            @click="$emit('edit', project)"
          />
          <VaButton
            preset="primary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Delete project"
            @click="$emit('delete', project)"
          />
        </div>
      </template>
    </VaDataTable>
    <div
      class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2"
    >
      <div>
       
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
