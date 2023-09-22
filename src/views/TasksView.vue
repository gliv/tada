<template>
  <div class="home">
    <h1>Welcome to your Vue + Sanity Blog</h1>
    <div class="posts">
      <TaskList :tasks="tasks" />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { getTasks } from '@/sanity.js'
import { useTasks } from '@/composables/useTasks'
import { onMounted } from 'vue'
import TaskList from '@/components/TaskList.vue'

const { getTasks, tasks } = useTasks()

onMounted(async () => {
  await getTasks()
})
</script>

<style scoped></style>
