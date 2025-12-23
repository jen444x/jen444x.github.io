import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteImages',
  title: 'Site Images',
  type: 'document',
  description: 'Select key images used across the site',
  fields: [
    defineField({
      name: 'homepageHero',
      title: 'Homepage Hero Image',
      type: 'reference',
      to: [{ type: 'galleryItem' }],
      options: {
        filter: 'isVideo != true',
      },
      description: 'The main image in the "View Our Work" section. Type to search by title.',
    }),
    defineField({
      name: 'aboutUsPhoto',
      title: 'About Us Photo',
      type: 'reference',
      to: [{ type: 'galleryItem' }],
      options: {
        filter: 'isVideo != true',
      },
      description: 'The photo in the About Us section. Type to search by title.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Images',
        subtitle: 'Hero & About Us photos',
      }
    },
  },
})
