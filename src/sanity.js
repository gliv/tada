import { createClient } from '@sanity/client'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const sanityClient = createClient({
  projectId: 'eu0t5oq0',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-09-22', // use current date (YYYY-MM-DD) to target the latest API version
  token: import.meta.env.VITE_SANITY_SECRET_TOKEN // Only if you want to update content with the client
})
