<template>
  <div class="taskList">
    <div v-for="task in props.tasks" class="task-item" :key="task._id">
      <router-link :to="`/tasks/${task._id}`">
        <h2>{{ task.title }}</h2>
      </router-link>
      <Button label="Tada" />
      <SanityBlocks :blocks="task.description" />
      <hr />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SanityBlocks } from 'sanity-blocks-vue-component'
import Button from 'primevue/button'
import { defineProps } from 'vue'
import type { Task } from '@/types/tasks'

const props = defineProps<{
  tasks: Task[]
}>()
</script>

<style scoped></style>
