interface Task {
  _id: string
  title: string
  slug: string
  description?: Array<any>
  is_done: boolean
}

export type { Task }
