export default {
  name: 'task',
  type: 'document',
  title: 'Task',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    },
    {
      name: 'is_done',
      type: 'boolean',
      title: 'Is Done',
    },
  ],
}

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
