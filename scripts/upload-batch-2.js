// Upload batch 2 photos to Sanity CMS
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
    filename: 'D6CC0225-36B7-41A7-A13A-4A3D4639542F_1_105_c.jpeg',
    title: 'Modern covered patio with outdoor bar and kitchen',
    alt: 'Covered outdoor entertainment area with large stone bar, outdoor kitchen, ceiling fans, and smooth concrete flooring',
    category: 'outdoor-kitchens',
    subcategory: null,
    finishType: null,
  },
  {
    filename: '53CD8379-1EE7-47AC-B742-72376E6BD2FE_1_105_c.jpeg',
    title: 'Custom stone waterfall feature',
    alt: 'Multi-tier natural stone waterfall with river rock landscaping at front entry',
    category: 'landscaping',
    subcategory: 'water-features',
    finishType: null,
  },
  {
    filename: 'B14FB96B-FCDE-47F3-AE88-DCD9F9911E06_1_105_c.jpeg',
    title: 'Stamped concrete walkway and steps with decorative borders',
    alt: 'Tiered concrete steps and walkway featuring ashlar slate stamp pattern with artificial turf and brick column accents',
    category: 'concrete',
    subcategory: 'walkways-steps',
    finishType: 'stamped',
  },
  {
    filename: 'IMG_0086.jpeg',
    title: 'Custom brick fire pit under construction',
    alt: 'Round fire pit with stacked brick veneer and black metal fire ring during installation',
    category: 'fire-features',
    subcategory: 'fire-pits',
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
  console.error('   Run with: SANITY_WRITE_TOKEN="your_token" node scripts/upload-batch-2.js')
  process.exit(1)
}

uploadPhotos()
