import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'categoryCovers',
  title: 'Category Covers',
  type: 'document',
  description: 'Select cover images for each service category (used on Gallery and Services pages)',
  fields: [
    defineField({
      name: 'concrete',
      title: 'Concrete Work',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'galleryItem' }],
          options: {
            filter: 'category == "concrete" && isVideo != true',
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
      description: 'Pick up to 3 photos. First one is the main image, others fill the bento grid.',
    }),
    defineField({
      name: 'outdoorKitchens',
      title: 'Outdoor Kitchens',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'galleryItem' }],
          options: {
            filter: 'category == "outdoor-kitchens" && isVideo != true',
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
      description: 'Pick up to 3 photos. First one is the main image, others fill the bento grid.',
    }),
    defineField({
      name: 'coveredPatios',
      title: 'Covered Patios',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'galleryItem' }],
          options: {
            filter: 'category == "covered-patios" && isVideo != true',
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
      description: 'Pick up to 3 photos. First one is the main image, others fill the bento grid.',
    }),
    defineField({
      name: 'fireFeatures',
      title: 'Fire Features',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'galleryItem' }],
          options: {
            filter: 'category == "fire-features" && isVideo != true',
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
      description: 'Pick up to 3 photos. First one is the main image, others fill the bento grid.',
    }),
    defineField({
      name: 'landscaping',
      title: 'Landscaping',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'galleryItem' }],
          options: {
            filter: 'category == "landscaping" && isVideo != true',
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
      description: 'Pick up to 3 photos. First one is the main image, others fill the bento grid.',
    }),
    defineField({
      name: 'ironWork',
      title: 'Iron Work',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'galleryItem' }],
          options: {
            filter: 'category == "iron-work" && isVideo != true',
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
      description: 'Pick up to 3 photos. First one is the main image, others fill the bento grid.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Category Covers',
        subtitle: 'Gallery & Services card images',
      }
    },
  },
})
