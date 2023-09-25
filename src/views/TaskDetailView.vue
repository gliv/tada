<template>
  <div class="container" v-if="task">
    <div class="back">
      <router-link :to="`/tasks`">
        <Button label="Back" />
      </router-link>
    </div>
    <h1>{{ task[0].title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useTasks } from '@/composables/useTasks'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Button from 'primevue/button'

const route = useRoute()
const { getTaskById } = useTasks()

const task = ref()

onMounted(async () => {
  task.value = await getTaskById(route.params.id)
})
</script>

<style scoped>
.back {
  margin-top: 1em;
}
</style>
