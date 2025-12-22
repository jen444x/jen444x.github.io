import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryCovers',
  title: 'Gallery Page Cards',
  type: 'document',
  description: 'Pick up to 3 photos for each category bento grid on the gallery page',
  fields: [
    defineField({
      name: 'concrete',
      title: 'Concrete Work',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'galleryItem' }],
          options: { filter: 'category == "concrete" && isVideo != true' },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'outdoorKitchens',
      title: 'Outdoor Kitchens',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'galleryItem' }],
          options: { filter: 'category == "outdoor-kitchens" && isVideo != true' },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'coveredPatios',
      title: 'Covered Patios',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'galleryItem' }],
          options: { filter: 'category == "covered-patios" && isVideo != true' },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'fireFeatures',
      title: 'Fire Features',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'galleryItem' }],
          options: { filter: 'category == "fire-features" && isVideo != true' },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'landscaping',
      title: 'Landscaping',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'galleryItem' }],
          options: { filter: 'category == "landscaping" && isVideo != true' },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'ironWork',
      title: 'Iron Work',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'galleryItem' }],
          options: { filter: 'category == "iron-work" && isVideo != true' },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Gallery Page Cards',
        subtitle: 'Bento grid images for gallery',
      }
    },
  },
})
