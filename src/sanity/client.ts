import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Shared config to avoid hardcoding values
const config = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
}

// Read-only client for fetching data (used on frontend)
export const sanityClient = createClient({
  ...config,
  useCdn: false,
})

// Write client for uploading (used on server/API routes only)
// This requires a token which should be set in .env.local
export const sanityWriteClient = createClient({
  ...config,
  useCdn: false,
  token: import.meta.env.SANITY_WRITE_TOKEN,
})

// Shared image URL builder - use this instead of duplicating in each component
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
