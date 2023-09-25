import { ref } from 'vue'

function makeid(length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

export function useTasks() {
  const DBmock = [
    {
      _id: '1234-5678-8910-1112',
      title: 'First task',
      description: '',
      is_done: false
    },
    {
      _id: '5678-8910-1112-1234',
      title: 'Second task',
      description: '',
      is_done: false
    },
    {
      _id: '8910-1112-1234-5678',
      title: 'Third task',
      description: '',
      is_done: false
    }
  ]

  const tasks = ref()

  async function getTaskById(_id) {
    const res = DBmock.filter(function (item) {
      return item._id === _id
    })
    return res
  }

  async function getTasks(): Promise<void> {
    tasks.value = DBmock
  }

  async function newTask(task) {
    const newId = makeid(19)
    task._id = newId
    const listOfTasks = DBmock
    listOfTasks.push(task)
    tasks.value = listOfTasks
  }

  async function updateTaskField(_id, field, newValue) {
    const listOfTasks = DBmock
    const task = listOfTasks.filter(function (item) {
      return item._id == _id
    })
    const index = listOfTasks.map((item) => item._id).indexOf(_id)
    const newTaskValue = task
    newTaskValue[field] = newValue
    DBmock[index] = newTaskValue
    tasks.value = listOfTasks
  }

  async function deleteTaskById(_id) {
    const listOfTasks = DBmock
    const index = listOfTasks.map((item) => item._id).indexOf(_id)
    listOfTasks.splice(index, 1)
    tasks.value = listOfTasks
  }

  return {
    tasks,
    getTaskById,
    getTasks,
    newTask,
    updateTaskField,
    deleteTaskById
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
