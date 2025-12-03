import type { APIRoute } from 'astro'
import { createClient } from '@sanity/client'

export const POST: APIRoute = async ({ request }) => {
  try {
    // Get the Sanity write token from environment
    const sanityToken = import.meta.env.SANITY_WRITE_TOKEN

    if (!sanityToken) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error: Missing Sanity token' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Create write client
    const client = createClient({
      projectId: '7pjigdmm',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
      token: sanityToken,
    })

    // Parse form data
    const formData = await request.formData()
    const imageFile = formData.get('image') as File | null
    const title = formData.get('title') as string | null
    const category = formData.get('category') as string | null
    const subcategory = formData.get('subcategory') as string | null
    const notes = formData.get('notes') as string | null

    // Validate required fields
    if (!imageFile || !title || !category) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: image, title, and category are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Convert File to Buffer for Sanity upload
    const arrayBuffer = await imageFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload image to Sanity
    const imageAsset = await client.assets.upload('image', buffer, {
      filename: imageFile.name,
      contentType: imageFile.type,
    })

    // Create the gallery item document
    const galleryItem = {
      _type: 'galleryItem',
      title: title.trim(),
      alt: title.trim(), // Auto-copy title to alt text
      category: category,
      ...(subcategory && { subcategory }), // Only include if provided
      ...(notes && { notes: notes.trim() }), // Only include if provided
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
      featured: false,
    }

    const createdDoc = await client.create(galleryItem)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Photo uploaded successfully',
        id: createdDoc._id,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Upload error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    return new Response(
      JSON.stringify({ error: `Upload failed: ${errorMessage}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
