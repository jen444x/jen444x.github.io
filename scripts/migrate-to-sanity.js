import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Sanity client with write access
const client = createClient({
  projectId: '7pjigdmm',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

// Map old category format to new Sanity format
const categoryMap = {
  'concrete': 'concrete',
  'concrete-walkways': { category: 'concrete', subcategory: 'walkways' },
  'concrete-stairs': { category: 'concrete', subcategory: 'steps-stairs' },
  'concrete-flatwork': { category: 'concrete', subcategory: 'flatwork-patios' },
  'outdoor-kitchens': 'outdoor-kitchens',
  'covered-patios': 'covered-patios',
  'pools-spas': 'pools-spas',
  'fire-features': 'fire-features',
  'landscaping': 'landscaping',
  'landscaping-turf': { category: 'landscaping', subcategory: 'turf' },
  'landscaping-gardens': { category: 'landscaping', subcategory: 'gardens' },
  'landscaping-water-features': { category: 'landscaping', subcategory: 'water-features' },
  'ironwork': 'iron-work', // Note: schema uses hyphen
}

// Parse frontmatter from markdown file
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null

  const frontmatter = {}
  const lines = match[1].split('\n')
  let currentKey = null
  let inArray = false

  for (const line of lines) {
    if (line.startsWith('  - ')) {
      // Array item
      if (currentKey) {
        if (!frontmatter[currentKey]) frontmatter[currentKey] = []
        frontmatter[currentKey].push(line.replace('  - ', '').replace(/"/g, ''))
      }
    } else if (line.includes(':')) {
      const [key, ...valueParts] = line.split(':')
      const value = valueParts.join(':').trim().replace(/"/g, '')
      currentKey = key.trim()
      if (value) {
        frontmatter[currentKey] = value === 'true' ? true : value === 'false' ? false : value
      }
    }
  }

  return frontmatter
}

// Get category and subcategory from old format
function mapCategory(oldCategories) {
  // Use first category as primary
  const primary = oldCategories[0]
  const mapped = categoryMap[primary]

  if (typeof mapped === 'string') {
    return { category: mapped, subcategory: null }
  } else if (mapped) {
    return mapped
  }

  // Fallback: try to parse manually
  console.warn(`Unknown category format: ${primary}`)
  return { category: 'concrete', subcategory: null }
}

async function migrateGallery() {
  const galleryDir = path.join(__dirname, '../src/content/gallery')
  const publicDir = path.join(__dirname, '../public')

  const files = fs.readdirSync(galleryDir).filter(f => f.endsWith('.md'))

  console.log(`Found ${files.length} gallery items to migrate\n`)

  let successCount = 0
  let errorCount = 0

  for (const file of files) {
    const filePath = path.join(galleryDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const data = parseFrontmatter(content)

    if (!data) {
      console.error(`❌ Could not parse: ${file}`)
      errorCount++
      continue
    }

    // Get image path and read file
    const imagePath = path.join(publicDir, data.image)

    if (!fs.existsSync(imagePath)) {
      console.error(`❌ Image not found: ${data.image}`)
      errorCount++
      continue
    }

    const { category, subcategory } = mapCategory(data.categories)

    try {
      // Upload image to Sanity
      const imageBuffer = fs.readFileSync(imagePath)
      const imageAsset = await client.assets.upload('image', imageBuffer, {
        filename: path.basename(imagePath),
      })

      // Create gallery item document
      const doc = {
        _type: 'galleryItem',
        title: data.title,
        alt: data.alt || data.title,
        category: category,
        featured: data.featured || false,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id,
          },
        },
      }

      // Only add subcategory if it exists
      if (subcategory) {
        doc.subcategory = subcategory
      }

      const created = await client.create(doc)

      console.log(`✅ ${data.title}`)
      console.log(`   Category: ${category}${subcategory ? ` → ${subcategory}` : ''}`)
      console.log(`   ID: ${created._id}\n`)

      successCount++

    } catch (err) {
      console.error(`❌ Failed: ${file}`)
      console.error(`   Error: ${err.message}\n`)
      errorCount++
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`Migration complete!`)
  console.log(`✅ Success: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
}

// Check for token
if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('❌ SANITY_WRITE_TOKEN environment variable is required')
  console.error('   Run with: SANITY_WRITE_TOKEN=your_token node scripts/migrate-to-sanity.js')
  process.exit(1)
}

migrateGallery()
