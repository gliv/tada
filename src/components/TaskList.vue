<template>
  <div class="taskList">
    <div class="actions">
      <Button severity="success" @click="openNew"> + New Task </Button>
    </div>
    <DataTable :value="tasks" :reorderableColumns="true" tableStyle="min-width: 50rem">
      <Column
        v-for="col of columns"
        :field="col.field"
        :header="col.header"
        :key="col.field"
      ></Column>
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            rounded
            text
            class="mr-2"
            severity="info"
            @click="editTask(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            text
            rounded
            severity="danger"
            @click="confirmDeleteTask(slotProps.data)"
          />
          <Button
            icon="pi pi-angle-right"
            text
            rounded
            severity="info"
            @click="goToTaskPage(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="taskDialog"
      :style="{ width: '450px' }"
      header="Product Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Title</label>
        <InputText
          id="title"
          v-model.trim="task.title"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !task.title }"
        />
        <small class="p-error" v-if="submitted && !task.title">Title is required.</small>
      </div>

      <div class="field">
        <label for="is_done">Done?</label>
        <InputSwitch v-model="task.is_done" />
      </div>

      <template #footer>
        <Button label="Cancel" icon="pi pi-times" outlined @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveTask" />
      </template>
    </Dialog>

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
const { getTasks, tasks, newTask } = useTasks()
const toast = useToast()

const task: Ref<Task> = ref()
const taskDialog = ref(false)
const deleteTaskDialog = ref(false)
const submitted = ref(false)

const columns = ref([
  { field: 'title', header: 'Task' },
  { field: 'is_done', header: 'Done?' }
])

onMounted(async () => {
  await getTasks()
})

const hideDialog = () => {
  taskDialog.value = false
  submitted.value = false
}

const openNew = () => {
  const emptyTask = {
    _id: '',
    title: '',
    is_done: false
  }
  task.value = emptyTask
  submitted.value = false
  taskDialog.value = true
}

const saveTask = async () => {
  submitted.value = true

  // TODO: validate input
  newTask(task.value)

  taskDialog.value = false
  task.value = {} as Task
  await getTasks() // does this attempted reload of the list actually work?
}

const editTask = (t: Task) => {
  task.value = { ...t }
  taskDialog.value = true

  /////////////////////////////////////////////////////////////////
  //
  // TODO: improvement, edit inline, remove edit dialogue
  //
  /////////////////////////////////////////////////////////////////
}

const confirmDeleteTask = (t: Task) => {
  task.value = t
  deleteTaskDialog.value = true
}

const deleteTask = () => {
  /////////////////////////////////////////////////////////////////
  //
  // add delete method to useTasks? call it and reload tasks.
  //
  /////////////////////////////////////////////////////////////////

  tasks.value = tasks.value.filter((val) => val.id !== task.value._id)
  deleteTaskDialog.value = false
  task.value = {} as Task
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Task Deleted', life: 3000 })
}

const goToTaskPage = (t: Task) => {
  router.push(`/tasks/${t._id}`)
}
</script>

<style scoped>
.actions {
  padding-bottom: 1em;
}
</style>
