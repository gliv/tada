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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
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
// Start here:
// title str
// desciption str
// is_done bool
//
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
