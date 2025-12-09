// Upload batch 3 photos to Sanity CMS
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
    filename: '2472B107-140F-4908-9ED7-E2CD6E5ADE1F_1_105_c.jpeg',
    title: 'Complete backyard transformation with artificial turf installation',
    alt: 'Backyard featuring artificial turf lawn with concrete patio borders, planter beds, and covered pergola',
    category: 'landscaping',
    subcategory: 'turf',
    finishType: null,
  },
  {
    filename: '5A472963-21C6-4685-A115-FC623B9C0620_1_105_c.jpeg',
    title: 'Decorative stacked stone veneer detail',
    alt: 'Natural multicolor stacked stone ledger veneer with rust, gold, and gray tones on concrete cap',
    category: 'concrete',
    subcategory: 'stone-work',
    finishType: null,
  },
  {
    filename: '75ED8881-F720-4B75-B8DC-7B33CF6DF903_1_105_c.jpeg',
    title: 'Flagstone stamped concrete walkway with turf and garden beds',
    alt: 'Curved stamped concrete walkway featuring flagstone pattern in tan tones with artificial turf and landscape borders',
    category: 'concrete',
    subcategory: 'walkways-steps',
    finishType: 'stamped',
  },
  {
    filename: '95C77CD7-4585-4E7B-9EC9-1A7C7C0D9526.heic',
    title: 'Photo from HEIC file',
    alt: 'Photo uploaded from HEIC format',
    category: 'concrete',
    subcategory: 'flatwork-patios',
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
  console.error('   Run with: SANITY_WRITE_TOKEN="your_token" node scripts/upload-batch-3.js')
  process.exit(1)
}

uploadPhotos()
