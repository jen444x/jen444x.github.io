import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepageCovers',
  title: 'Homepage Service Cards',
  type: 'document',
  description: 'Pick ONE photo for each service card on the homepage',
  fields: [
    defineField({
      name: 'concrete',
      title: 'Concrete Work',
      type: 'reference',
      to: [{ type: 'galleryItem' }],
      options: { filter: 'category == "concrete" && isVideo != true' },
    }),
    defineField({
      name: 'outdoorKitchens',
      title: 'Outdoor Kitchens',
      type: 'reference',
      to: [{ type: 'galleryItem' }],
      options: { filter: 'category == "outdoor-kitchens" && isVideo != true' },
    }),
    defineField({
      name: 'coveredPatios',
      title: 'Covered Patios',
      type: 'reference',
      to: [{ type: 'galleryItem' }],
      options: { filter: 'category == "covered-patios" && isVideo != true' },
    }),
    defineField({
      name: 'fireFeatures',
      title: 'Fire Features',
      type: 'reference',
      to: [{ type: 'galleryItem' }],
      options: { filter: 'category == "fire-features" && isVideo != true' },
    }),
    defineField({
      name: 'landscaping',
      title: 'Landscaping',
      type: 'reference',
      to: [{ type: 'galleryItem' }],
      options: { filter: 'category == "landscaping" && isVideo != true' },
    }),
    defineField({
      name: 'ironWork',
      title: 'Iron Work',
      type: 'reference',
      to: [{ type: 'galleryItem' }],
      options: { filter: 'category == "iron-work" && isVideo != true' },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Service Cards',
        subtitle: 'Cover images for homepage',
      }
    },
  },
})
