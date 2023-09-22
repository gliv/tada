<template>
  <div class="home">
    <h1>Welcome to your Vue + Sanity Blog</h1>
    <div class="posts">
      <div class="loading" v-if="loading">Loading...</div>
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <div class="container">
        <div v-for="task in tasks" class="post-item" :key="task._id">
          <router-link :to="`/blog/${task.slug.current}`">
            <h2>{{ task.title }}</h2>
          </router-link>
          <SanityBlocks :blocks="task.description" />
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { getTasks } from '@/sanity.js'
import { useTasks } from '@/composables/useTasks'
import { SanityBlocks } from 'sanity-blocks-vue-component'
import { ref, onMounted } from 'vue'

const { getTasks, tasks } = useTasks()

const loading = ref(false)
const error = ref()

onMounted(async () => {
  // fetch the tasks
  await getTasks()
  console.log(tasks)
})
</script>

<style scoped>
.home h1 {
  text-align: center;
}
.container {
  margin: 0 auto;
  max-width: 42em;
  width: 100%;
}
.post-item {
  box-sizing: border-box;
}
</style>
