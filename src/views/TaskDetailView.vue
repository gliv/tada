<template>
  <div class="container" v-if="task">
    <h1>{{ task[0].title }}</h1>
    <SanityBlocks :blocks="task[0].description" />
  </div>
</template>

<script setup lang="ts">
import { SanityBlocks } from 'sanity-blocks-vue-component'
import { useTasks } from '@/composables/useTasks'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { getTaskById, task } = useTasks()

onMounted(async () => {
  await getTaskById(route.params.id)
})
</script>

<style></style>
