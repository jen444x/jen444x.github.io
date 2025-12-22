/**
 * Migration script: Convert categoryCovers from single references to arrays
 * Run with: SANITY_WRITE_TOKEN="your-token" node scripts/migrate-category-covers.js
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '7pjigdmm',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

async function migrate() {
  console.log('Fetching existing categoryCovers document...');

  const doc = await client.fetch(`*[_type == "categoryCovers"][0]`);

  if (!doc) {
    console.log('No categoryCovers document found. Nothing to migrate.');
    return;
  }

  console.log('Found document:', doc._id);

  // Fields to migrate
  const fields = ['concrete', 'outdoorKitchens', 'coveredPatios', 'fireFeatures', 'landscaping', 'ironWork'];

  const updates = {};

  for (const field of fields) {
    const value = doc[field];

    if (value && value._type === 'reference') {
      // Old format: single reference → convert to array
      console.log(`Converting ${field} from single reference to array`);
      updates[field] = [value];
    } else if (Array.isArray(value)) {
      console.log(`${field} is already an array, skipping`);
    } else if (!value) {
      console.log(`${field} is empty, skipping`);
    }
  }

  if (Object.keys(updates).length === 0) {
    console.log('Nothing to migrate!');
    return;
  }

  console.log('Applying updates...');

  await client
    .patch(doc._id)
    .set(updates)
    .commit();

  console.log('Migration complete!');
}

migrate().catch(console.error);
