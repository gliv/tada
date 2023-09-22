<template>
  <div class="container" v-if="task">
    <div class="back">
      <router-link :to="`/tasks`">
        <Button label="Back" />
      </router-link>
    </div>
    <h1>{{ task[0].title }}</h1>
    <SanityBlocks :blocks="task[0].description" />
  </div>
</template>

<script setup lang="ts">
import { SanityBlocks } from 'sanity-blocks-vue-component'
import { useTasks } from '@/composables/useTasks'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Button from 'primevue/button'

const route = useRoute()
const { getTaskById, task } = useTasks()

onMounted(async () => {
  await getTaskById(route.params.id)
})
</script>

<style scoped>
.back {
  margin-top: 1em;
}
</style>
