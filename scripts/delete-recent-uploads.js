// Delete recently uploaded photos from Sanity CMS
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '7pjigdmm',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

// IDs of photos to delete (from today's upload)
const photoIds = [
  // Concrete & fire features batch
  'kOTnyjIH1b2lIev2mTeE1h',
  'fqs0fFI029IEWdNLdrogFJ',
  'fqs0fFI029IEWdNLdroguL',
  'fqs0fFI029IEWdNLdrohtt',
  'fqs0fFI029IEWdNLdroioJ',
  'fqs0fFI029IEWdNLdrokd9',
  'oFB9wYvKrs2R4L9rOghstv',
  'kOTnyjIH1b2lIev2mTeHI6',
  'fqs0fFI029IEWdNLdromHj',
  'kOTnyjIH1b2lIev2mTeIbv',
  'oFB9wYvKrs2R4L9rOghtKl',
  'fqs0fFI029IEWdNLdrop67',
  'oFB9wYvKrs2R4L9rOghvOl',
  'kOTnyjIH1b2lIev2mTeKh7',
  'kOTnyjIH1b2lIev2mTeKyL',
  'kOTnyjIH1b2lIev2mTeLji',
  'kOTnyjIH1b2lIev2mTeOEk',
  // Iron work batch
  'kOTnyjIH1b2lIev2mTtmbO',
  'kOTnyjIH1b2lIev2mTtnR4',
]

async function deletePhotos() {
  console.log(`🗑️  Starting deletion of ${photoIds.length} photos...\n`)

  let successCount = 0
  let errorCount = 0

  for (const id of photoIds) {
    try {
      await client.delete(id)
      console.log(`✅ Deleted: ${id}`)
      successCount++
    } catch (err) {
      console.error(`❌ Failed to delete: ${id}`)
      console.error(`   Error: ${err.message}`)
      errorCount++
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`Deletion complete!`)
  console.log(`✅ Deleted: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
}

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('❌ SANITY_WRITE_TOKEN required')
  console.error('   Run with: SANITY_WRITE_TOKEN="your_token" node scripts/delete-recent-uploads.js')
  process.exit(1)
}

deletePhotos()
