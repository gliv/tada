<template>
  <div class="taskList">
    <DataTable
      :value="tasks"
      :reorderableColumns="true"
      @rowReorder="onRowReorder"
      tableStyle="min-width: 50rem"
    >
      <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="false" />
      <Column
        v-for="col of columns"
        :field="col.field"
        :header="col.header"
        :key="col.field"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTasks } from '@/composables/useTasks'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const { getTasks, tasks } = useTasks()

const columns = ref([
  { field: 'title', header: 'Task' },
  { field: 'is_done', header: 'Done?' }
])

const onRowReorder = (event) => {
  console.log(event.value)
  tasks.value = event.value
}

onMounted(async () => {
  await getTasks()
})
</script>

<style scoped></style>
