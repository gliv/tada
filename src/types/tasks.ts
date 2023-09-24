interface Task {
  _id: string
  title: string
  description?: Array<any>
  is_done: boolean
}

export type { Task }
