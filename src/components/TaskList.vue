<template>
  <div class="task_list">
    <Button severity="success" @click="addEmptyTask"> + New Task </Button>

    <DataTable
      :value="tasks"
      editMode="cell"
      @cell-edit-complete="onCellEditComplete"
      :reorderableColumns="true"
      tableStyle="width: 100%"
      :key="dataTableKey"
    >
      <Column field="title" header="Task" sortable>
        <template #body="{ data, field }">
          {{ data[field] }}
        </template>
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" autofocus />
        </template>
      </Column>
      <Column field="is_done" header="Done?" sortable>
        <template #body="{ data, field }">
          <InputSwitch v-model="data[field]" />
        </template>
      </Column>
      <Column field="_id" header="ID" sortable>
        <template #body="{ data, field }">
          {{ data[field] }}
        </template>
      </Column>
      <Column :exportable="false" style="align: right">
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            text
            rounded
            severity="danger"
            @click="confirmDeleteTask(slotProps.data)"
          />
          <Button
            icon="pi pi-eye"
            text
            rounded
            severity="info"
            @click="goToTaskDetailPage(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="deleteTaskDialog"
      :style="{ width: '450px' }"
      header="Heads up!"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="task._id"> <b>Are you sure you want to delete this task?</b> </span><br /><br />
        {{ task.title }}<br />
        <small>ID: {{ task._id }}</small>
      </div>
      <template #footer>
        <Button label="Cancel" text @click="deleteTaskDialog = false" />
        <Button label="Delete" severity="danger" text @click="deleteTask" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { type Ref, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTasks } from '@/composables/useTasks'

import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputSwitch from 'primevue/inputswitch'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { Task } from '@/types/tasks'

const router = useRouter()
const { tasks, getTasks, newTask, updateTaskField, deleteTaskById } = useTasks()
const toast = useToast()

const dataTableKey = ref(0)
const forceRerender = () => {
  dataTableKey.value += 1
}

const task: Ref<Task> = ref()
const deleteTaskDialog = ref(false)

onMounted(async () => {
  await getTasks()
})

const onCellEditComplete = async (event) => {
  let { data, newValue, field } = event
  await updateTaskField(data._id, field, newValue)
}

const addEmptyTask = async () => {
  const emptyTask = {
    title: '',
    is_done: false
  }
  await newTask(emptyTask)
  forceRerender()
  console.log(tasks.value)
}

const confirmDeleteTask = (t: Task) => {
  task.value = t
  deleteTaskDialog.value = true
}

const deleteTask = async () => {
  deleteTaskDialog.value = false
  deleteTaskById(task.value._id)
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Task Deleted', life: 3000 })
  forceRerender()
}

const goToTaskDetailPage = (t: Task) => {
  router.push(`/tasks/${t._id}`)
}
</script>

<style lang="scss" scoped>
::v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0;
  padding-bottom: 0;
}
.actions {
  padding-bottom: 1em;
}
</style>
