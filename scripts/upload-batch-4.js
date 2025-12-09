// Upload batch 4 photos to Sanity CMS
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = createClient({
  projectId: '7pjigdmm',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

// Photos analyzed by AI with metadata
const photos = [
  {
    filename: 'IMG_1980.jpeg',
    title: 'Wood plank stamped concrete patio detail',
    alt: 'Close-up of stamped concrete patio with realistic wood plank pattern in weathered gray and tan tones',
    category: 'concrete',
    subcategory: 'flatwork-patios',
    finishType: 'stamped',
  },
  {
    filename: 'IMG_3899.jpeg',
    title: 'Artificial turf backyard with concrete paver walkway',
    alt: 'Side yard featuring artificial turf installation with large format concrete stepping pavers creating modern walkway',
    category: 'landscaping',
    subcategory: 'turf',
    finishType: null,
  },
]

const photosDir = path.join(__dirname, '../public/img/new photos')

async function uploadPhotos() {
  console.log(`📸 Starting upload of ${photos.length} photos...\n`)

  let successCount = 0
  let errorCount = 0

  for (const photo of photos) {
    const imagePath = path.join(photosDir, photo.filename)

    if (!fs.existsSync(imagePath)) {
      console.error(`❌ Not found: ${photo.filename}`)
      errorCount++
      continue
    }

    try {
      // Upload image to Sanity
      const imageBuffer = fs.readFileSync(imagePath)
      const imageAsset = await client.assets.upload('image', imageBuffer, {
        filename: photo.filename,
      })

      // Create gallery item document
      const doc = {
        _type: 'galleryItem',
        title: photo.title,
        alt: photo.alt,
        category: photo.category,
        featured: false,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id,
          },
        },
      }

      // Add subcategory if it exists
      if (photo.subcategory) {
        doc.subcategory = photo.subcategory
      }

      // Add finish type if it exists (concrete photos)
      if (photo.finishType) {
        doc.finishType = photo.finishType
      }

      const created = await client.create(doc)
      console.log(`✅ ${photo.title}`)
      console.log(`   Category: ${photo.category}${photo.subcategory ? ` → ${photo.subcategory}` : ''}`)
      if (photo.finishType) {
        console.log(`   Finish: ${photo.finishType}`)
      }
      console.log(`   ID: ${created._id}\n`)

      successCount++

    } catch (err) {
      console.error(`❌ Failed: ${photo.filename}`)
      console.error(`   Error: ${err.message}\n`)
      errorCount++
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`Upload complete!`)
  console.log(`✅ Success: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
}

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('❌ SANITY_WRITE_TOKEN required')
  console.error('   Run with: SANITY_WRITE_TOKEN="your_token" node scripts/upload-batch-4.js')
  process.exit(1)
}

uploadPhotos()
