<script setup>
import { defineVaDataTableColumns } from "vuestic-ui"
import ProjectStatusBadge from "../components/ProjectStatusBadge.vue"

import { FIELDS_CATEGORY } from "../const.js"

const columns = defineVaDataTableColumns(FIELDS_CATEGORY)

const props = defineProps(["categories", "loading"])
const emit  = defineEmits(['edit', 'delete'])
</script>

<template>
  <div>
    <VaDataTable
      :items="categories"
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
            aria-label="Editar Categoría"
            @click="$emit('edit', rowData )"
          />
          <!--<VaButton
            preset="primary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Borrar Categoría"
            @click="$emit('delete', rowData)"
          />-->
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
