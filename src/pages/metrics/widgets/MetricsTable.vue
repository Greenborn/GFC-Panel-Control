<script setup>
import { defineVaDataTableColumns } from "vuestic-ui";
import ProjectStatusBadge from "../components/ProjectStatusBadge.vue";

const columns = defineVaDataTableColumns([
  { label: "Premio", key: "prize", sortable: true },
  { label: "Puntage", key: "score", sortable: true },
  { label: "Tipo Concurso", key: "organization_type", sortable: true },
  { label: " ", key: "actions" },
]);

const props = defineProps(["metrics", "loading"]);

</script>

<template>
  <div>
    <VaDataTable
      :items="metrics"
      :columns="columns"
      :loading="loading"
    >

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
