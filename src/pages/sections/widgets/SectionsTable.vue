<script setup>
import { ref } from "vue";
import { defineVaDataTableColumns } from "vuestic-ui";

import { FLIEDS_SECTION } from "../const.js";
import ProjectStatusBadge from "../components/SectionStatusBadge.vue";

const columns = defineVaDataTableColumns(FLIEDS_SECTION);

const props   = defineProps(["sections", "loading"]);
const emit    = defineEmits(['edit', 'delete'])
</script>

<template>
  <div>
    <VaDataTable
      :items="sections"
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
            aria-label="Editar Sección"
            @click="$emit('edit', rowData)"
          />
          <!--<VaButton
            preset="primary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Borrar Sección"
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
