async function isUniqueAcrossAllDocuments(slug: string, context: any) {
  const {document, getClient} = context
  const client = getClient({apiVersion: '2022-09-22'})
  const id = document._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  }
  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`
  const result = await client.fetch(query, params)
  return result
}

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
        isUnique: isUniqueAcrossAllDocuments,
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
// Add these later:
// type >ref
// tags >ref
// status >ref
// parent >ref
// children [>ref]
// assignee >ref
//
/////////////////////
