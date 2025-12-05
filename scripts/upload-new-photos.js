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
    filename: '03559C57-B458-40ED-8C06-1F525FBF10C1_1_105_c.jpeg',
    title: 'Covered patio with stone bar and outdoor kitchen',
    category: 'outdoor-kitchens',
    subcategory: null,
  },
  {
    filename: '15820BBF-5871-4A5A-B335-06CB7CE971B0_1_105_c.jpeg',
    title: 'Covered patio with stone veneer bar and seating',
    category: 'outdoor-kitchens',
    subcategory: null,
  },
  {
    filename: '16373F7B-3167-49D4-82C9-E5055DF526D3_1_105_c.jpeg',
    title: 'Expansive covered patio with dual ceiling fans',
    category: 'covered-patios',
    subcategory: null,
  },
  {
    filename: '2A8FC3DC-5929-4668-8961-9BD398474893_1_102_o.jpeg',
    title: 'Covered outdoor kitchen with stone bar and grill',
    category: 'outdoor-kitchens',
    subcategory: null,
  },
  {
    filename: '5E946A03-379C-4BA4-872C-BBE634C80BC8_1_105_c.jpeg',
    title: 'Aluminum louvered patio cover with pool view',
    category: 'covered-patios',
    subcategory: null,
  },
  {
    filename: '803182A4-DC8E-4F79-ADE3-9CC9884A22B8_1_105_c.jpeg',
    title: 'Concrete fire pit table with modern seating',
    category: 'fire-features',
    subcategory: 'fire-pit-tables',
  },
  {
    filename: '93B7689C-6121-4EB1-88BA-8F65396FCD6E_1_105_c.jpeg',
    title: 'Aluminum patio cover with ceiling fan and pool',
    category: 'covered-patios',
    subcategory: null,
  },
  {
    filename: '9A796DEF-F41A-4237-9AAF-96146E1D07A4_1_105_c.jpeg',
    title: 'Covered outdoor kitchen with stone bar and TV',
    category: 'outdoor-kitchens',
    subcategory: null,
  },
  {
    filename: 'AE760FE9-C6DE-429E-970C-1ED7D58DB9A5_1_105_c.jpeg',
    title: 'Stamped ashlar slate patio in progress',
    category: 'concrete',
    subcategory: 'flatwork-patios',
  },
  {
    filename: 'CA5CE75E-173C-4F8D-87E6-0318A212D57E_1_105_c.jpeg',
    title: 'Concrete fire pit table with glass guard lit',
    category: 'fire-features',
    subcategory: 'fire-pit-tables',
  },
  {
    filename: 'CCDE8D80-3375-4C4A-AE6F-F25242D2C3D4_1_105_c.jpeg',
    title: 'Large covered patio with fire pit table',
    category: 'covered-patios',
    subcategory: null,
  },
  {
    filename: 'D6414AE1-FC2F-4747-AD7C-0DEAB1DC5D42_4_5005_c.jpeg',
    title: 'Concrete fire pit table closeup with pool view',
    category: 'fire-features',
    subcategory: 'fire-pit-tables',
  },
  {
    filename: 'D70A6938-DF35-489C-935A-C450AA908871_4_5005_c.jpeg',
    title: 'Pool with turf and concrete paver patio',
    category: 'pools-spas',
    subcategory: null,
  },
  {
    filename: 'DB226A2D-FB57-484F-B04A-4BC40E020DE3_4_5005_c.jpeg',
    title: 'Covered patio with stone bar seating',
    category: 'outdoor-kitchens',
    subcategory: null,
  },
  {
    filename: 'E2E4EC8F-2E90-498E-84A6-735DAD018543_1_102_a.jpeg',
    title: 'Covered patio with stone bar full view',
    category: 'outdoor-kitchens',
    subcategory: null,
  },
  {
    filename: 'F75027C1-7E7D-4B66-8EB3-765D02964F09_4_5005_c.jpeg',
    title: 'Covered patio with wood planter and stone bar',
    category: 'outdoor-kitchens',
    subcategory: null,
  },
  {
    filename: 'FABAE435-8112-4938-A229-F866B8F3B31B_4_5005_c.jpeg',
    title: 'Outdoor kitchen with stone veneer and grill',
    category: 'outdoor-kitchens',
    subcategory: null,
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
        alt: photo.title,
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

      const created = await client.create(doc)
      console.log(`✅ ${photo.title}`)
      console.log(`   Category: ${photo.category}${photo.subcategory ? ` → ${photo.subcategory}` : ''}`)
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
