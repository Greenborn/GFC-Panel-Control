<script setup>
import { defineVaDataTableColumns } from "vuestic-ui";

import ProjectStatusBadge from "../components/ProjectStatusBadge.vue";
import { FIELDS_FC } from "../const.js";

const columns = defineVaDataTableColumns(FIELDS_FC);

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
            aria-label="Editar Fotoclub"
            @click="$emit('edit', project )"
          />
          <VaButton
            preset="primary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Eliminar Fotoclub"
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
