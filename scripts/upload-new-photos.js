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
    filename: '1F62D8E2-5C01-4497-82A2-3EE09E1BC505_1_105_c.jpeg',
    title: 'Custom fire pit with stamped concrete patio',
    alt: 'Round gas fire pit with bronze rim and black fire glass on stamped concrete patio featuring smooth broom finish',
    category: 'fire-features',
    subcategory: 'fire-pits',
    finishType: null,
  },
  {
    filename: '2395D144-CDD5-4D4E-8267-A7EE7958A70C_1_105_c.jpeg',
    title: 'Modern pool deck with large format concrete pavers',
    alt: 'Aerial view of contemporary pool deck installation with large smooth concrete pavers in gray tones',
    category: 'concrete',
    subcategory: 'flatwork-patios',
    finishType: 'smooth',
  },
  {
    filename: '30BAA46A-FF7F-47CA-B33C-71A362A9815D_1_105_c.jpeg',
    title: 'Covered entry with flagstone stamped concrete',
    alt: 'Covered porch flooring featuring flagstone pattern stamped concrete in warm earth tones with natural stone appearance',
    category: 'concrete',
    subcategory: 'flatwork-patios',
    finishType: 'stamped',
  },
  {
    filename: '35497401-35A9-4765-B936-2E29DFF465D1_1_105_c.jpeg',
    title: 'Ashlar slate stamped concrete patio',
    alt: 'Stamped concrete patio with ashlar slate pattern in gray tones featuring textured finish and expansion joints',
    category: 'concrete',
    subcategory: 'flatwork-patios',
    finishType: 'stamped',
  },
  {
    filename: '391CD3CF-2879-4D92-B6B0-1D0CDBFEE13E_1_105_c.jpeg',
    title: 'Fresh concrete walkway and steps installation',
    alt: 'Newly poured concrete walkway and steps with smooth broom finish leading from driveway to front entry',
    category: 'concrete',
    subcategory: 'walkways-steps',
    finishType: 'broom-finish',
  },
  {
    filename: '3CA334DB-A11E-4747-BE2F-7CD91432E6BD_1_105_c.jpeg',
    title: 'European cobblestone stamped concrete patio',
    alt: 'Decorative stamped concrete patio with European fan cobblestone pattern in warm brown and tan tones',
    category: 'concrete',
    subcategory: 'flatwork-patios',
    finishType: 'stamped',
  },
  {
    filename: '5ACCBCE2-5D80-4356-8B04-CFA4B3BF83BD_1_105_c.jpeg',
    title: 'Closeup of acid-stained concrete with variegated finish',
    alt: 'Detailed view of acid-stained concrete floor with mottled brown and tan variegated finish and natural color variations',
    category: 'concrete',
    subcategory: 'flatwork-patios',
    finishType: 'stained',
  },
  {
    filename: '66065793-D0D4-4946-A7F2-95077EB3BC99_1_105_c.jpeg',
    title: 'Round fire pit with bronze rim and glass',
    alt: 'Custom gas fire pit with bronze metal rim and black fire glass on gray stamped concrete patio',
    category: 'fire-features',
    subcategory: 'fire-pits',
    finishType: null,
  },
  {
    filename: '6A8800DF-4C41-4019-A801-B4A3880B0C71_1_105_c.jpeg',
    title: 'European fan cobblestone pattern detail',
    alt: 'Stamped concrete featuring European fan cobblestone pattern with warm tan and brown color blend',
    category: 'concrete',
    subcategory: 'flatwork-patios',
    finishType: 'stamped',
  },
  {
    filename: '75326C01-A866-46FE-87A8-4E38CA39C342_1_105_c.jpeg',
    title: 'Diamond-scored stained concrete patio',
    alt: 'Stained concrete patio with diagonal diamond scoring pattern in gray and brown variegated tones',
    category: 'concrete',
    subcategory: 'flatwork-patios',
    finishType: 'stained',
  },
  {
    filename: '7EDE38C3-8C2A-4166-976B-3C5368EFBCA2_1_105_c.jpeg',
    title: 'Wood plank stamped concrete patio',
    alt: 'Stamped concrete patio with realistic wood plank pattern in gray and tan weathered wood appearance',
    category: 'concrete',
    subcategory: 'flatwork-patios',
    finishType: 'stamped',
  },
  {
    filename: '93123D03-38E7-45C1-8F5F-D2B75B5092BE_1_105_c.jpeg',
    title: 'Wood grain stamped concrete walkway',
    alt: 'Stamped concrete walkway featuring detailed wood grain pattern with natural weathered wood coloring and texture',
    category: 'concrete',
    subcategory: 'walkways-steps',
    finishType: 'stamped',
  },
  {
    filename: 'A99C5D66-E640-4FA9-A4F4-B51D75B558B6_1_105_c.jpeg',
    title: 'Exposed aggregate concrete entryway',
    alt: 'Exposed aggregate concrete patio with natural stone and pebble finish at front entrance',
    category: 'concrete',
    subcategory: 'flatwork-patios',
    finishType: 'exposed-aggregate',
  },
  {
    filename: 'ADBA9B88-B11D-400A-8D76-EB18C04BAF33_1_105_c.jpeg',
    title: 'Exposed aggregate concrete detail',
    alt: 'Closeup of exposed aggregate concrete with multicolored stones and pebbles in brown, tan, and gray tones',
    category: 'concrete',
    subcategory: 'flatwork-patios',
    finishType: 'exposed-aggregate',
  },
  {
    filename: 'E125A667-04F0-4C8C-9A6C-361BFA914F0C_1_105_c.jpeg',
    title: 'Custom fire pit with stacked stone veneer',
    alt: 'Round gas fire pit with white concrete cap, stacked stone veneer sides, and blue fire glass on smooth concrete patio',
    category: 'fire-features',
    subcategory: 'fire-pits',
    finishType: null,
  },
  {
    filename: 'E31FA842-62A2-4E7C-BF58-B5BD8FD7613A_1_105_c.jpeg',
    title: 'Flagstone stamped patio with custom fire pit',
    alt: 'Backyard stamped concrete patio with flagstone pattern in earth tones featuring custom stone fire pit and smooth concrete steps',
    category: 'concrete',
    subcategory: 'flatwork-patios',
    finishType: 'stamped',
  },
  {
    filename: 'F6CB1341-E07C-4480-A124-D61F7962D25A_1_105_c.jpeg',
    title: 'Stained concrete floor with decorative scoring',
    alt: 'Interior stained concrete floor with diamond-pattern decorative scoring and metallic stain finish in tan tones',
    category: 'concrete',
    subcategory: 'flatwork-patios',
    finishType: 'stained',
  },
]

const photosDir = path.join(__dirname, '../public/img/new photos')

async function uploadPhotos() {
  console.log(`Starting upload of ${photos.length} photos...\n`)

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

      // Add subcategory only if it exists
      if (photo.subcategory) {
        doc.subcategory = photo.subcategory
      }

      // Add finish type only if it exists (concrete photos)
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

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`Upload complete!`)
  console.log(`✅ Success: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
}

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('❌ SANITY_WRITE_TOKEN required')
  console.error('   Run with: SANITY_WRITE_TOKEN="your_token" node scripts/upload-new-photos.js')
  process.exit(1)
}

uploadPhotos()
