import { sanityClient as client } from '@/sanity.js'
import { ref } from 'vue'

// uses GROQ to query content: https://www.sanity.io/docs/query-cheat-sheet

export function useTasks() {
  const task = ref()
  const tasks = ref()

  async function getTaskById(id) {
    const query = `*[_id == "${id}" ]{
      title,
      slug,
      description,
      is_done
    }`
    task.value = await client.fetch(query)
  }

  async function getTasks() {
    tasks.value = await client.fetch(
      `*[_type == "task"]{
        _id,
        title,
        slug,
        description,
        is_done
      }[0...50]`
    )
  }
  return {
    task,
    tasks,
    getTaskById,
    getTasks
  }
}

// export async function createPost(post) {
//   const result = client.create(post)
//   return result
// }

// export async function updateDocumentTitle(_id, title) {
//   const result = client.patch(_id).set({ title })
//   return result
// }
