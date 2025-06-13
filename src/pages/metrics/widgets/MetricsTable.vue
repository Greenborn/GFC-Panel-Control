<script setup>
import { defineVaDataTableColumns } from "vuestic-ui";
import ProjectStatusBadge from "../components/ProjectStatusBadge.vue";

import { FIELDS_METRIC } from "../const.js";

const columns = defineVaDataTableColumns(FIELDS_METRIC)

const props = defineProps(["metrics", "loading"]);
const emit  = defineEmits(['edit', 'delete'])
</script>

<template>
  <div>
    <VaDataTable
      :items="metrics"
      :columns="columns"
      :loading="loading"
    >

      <template #cell(actions)="{ rowData }">
        <div class="flex gap-2 justify-end">
          <VaButton
            preset="primary"
            size="small"
            color="primary"
            icon="mso-edit"
            aria-label="Edit project"
            @click="$emit('edit', rowData)"
          />
          <!--<VaButton
            preset="primary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Delete project"
            @click="$emit('delete', rowData)"
          />-->
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
