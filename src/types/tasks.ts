interface Task {
  _id: string
  title: string
  description?: text
  is_done: boolean
  parent?: Task._id
  children?: Task._id[]
}

export type { Task }

/////////////////////
//
// Add these later:
// type >ref
// tags >ref
// status >ref
// parent >ref
// children [>ref]
// assignee >ref
//
/////////////////////
