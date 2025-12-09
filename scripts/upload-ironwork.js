// Upload iron work photos to Sanity CMS
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

// Iron work photos
const photos = [
  {
    filename: '7C439E36-BA33-4BC5-B9D5-D41E5EBCE2F9_1_105_c.jpeg',
    title: 'Custom ornamental iron driveway gate with scenic design',
    alt: 'Large decorative metal gate featuring custom laser-cut mountain and wildlife scene with Greek key pattern railing above',
    category: 'iron-work',
    subcategory: null,
  },
  {
    filename: '435B4771-A3C7-484A-8202-4E02028FE060_1_105_c.jpeg',
    title: 'Diamond-shaped decorative metal trellis living wall',
    alt: 'Custom black metal diamond trellis frame installed as decorative living wall feature with climbing plants',
    category: 'iron-work',
    subcategory: null,
  },
]

const photosDir = path.join(__dirname, '../public/img/new photos/skipped')

async function uploadPhotos() {
  console.log(`📸 Starting upload of ${photos.length} iron work photos...\n`)

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

      const created = await client.create(doc)
      console.log(`✅ ${photo.title}`)
      console.log(`   Category: ${photo.category}`)
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
  console.error('   Run with: SANITY_WRITE_TOKEN="your_token" node scripts/upload-ironwork.js')
  process.exit(1)
}

uploadPhotos()
