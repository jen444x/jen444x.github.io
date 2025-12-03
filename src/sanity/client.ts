import { createClient } from '@sanity/client'

// Read-only client for fetching data (used on frontend)
export const sanityClient = createClient({
  projectId: '7pjigdmm',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Write client for uploading (used on server/API routes only)
// This requires a token which should be set in .env.local
export const sanityWriteClient = createClient({
  projectId: '7pjigdmm',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: import.meta.env.SANITY_WRITE_TOKEN,
})
