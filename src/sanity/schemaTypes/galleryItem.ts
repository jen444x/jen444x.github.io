import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping and focal point selection
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Brief description of the project (e.g., "Modern geometric walkway with clean lines")',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for accessibility (usually same as title)',
      validation: (Rule) => Rule.required().max(125),
      initialValue: (context) => context.parent?.title || '',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Select the primary category for this project',
      options: {
        list: [
          { title: 'Concrete Work', value: 'concrete' },
          { title: 'Outdoor Kitchens', value: 'outdoor-kitchens' },
          { title: 'Covered Patios', value: 'covered-patios' },
          { title: 'Fire Features', value: 'fire-features' },
          { title: 'Landscaping', value: 'landscaping' },
          { title: 'Iron Work', value: 'iron-work' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      description: 'Select a specific type (for Concrete, Fire Features, and Landscaping)',
      options: {
        list: [
          // Concrete subcategories
          { title: 'Walkways & Steps', value: 'walkways-steps' },
          { title: 'Flatwork & Patios', value: 'flatwork-patios' },
          { title: 'Driveways', value: 'driveways' },
          { title: 'Stone Work', value: 'stone-work' },
          // Fire Features subcategories
          { title: 'Fire Pits', value: 'fire-pits' },
          { title: 'Fire Pit Tables', value: 'fire-pit-tables' },
          { title: 'Fireplaces', value: 'fireplaces' },
          // Landscaping subcategories
          { title: 'Artificial Turf', value: 'turf' },
          { title: 'Water Features', value: 'water-features' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }) =>
        parent?.category !== 'concrete' && parent?.category !== 'landscaping' && parent?.category !== 'fire-features',
    }),
    defineField({
      name: 'finishType',
      title: 'Finish Type',
      type: 'string',
      description: 'Type of concrete finish (only for Concrete photos)',
      options: {
        list: [
          { title: 'Stamped', value: 'stamped' },
          { title: 'Stained', value: 'stained' },
          { title: 'Exposed Aggregate', value: 'exposed-aggregate' },
          { title: 'Broom Finish', value: 'broom-finish' },
          { title: 'Smooth/Troweled', value: 'smooth' },
          { title: 'Colored', value: 'colored' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }) => parent?.category !== 'concrete',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g., 1 = first, 10 = near top, leave blank = no preference)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Check this to feature on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Notes from dad about this project (for Jennifer to review)',
      rows: 3,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add custom tags (optional - for future search/filtering)',
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: subtitle ? `Category: ${subtitle}` : 'No category',
        media: media,
      }
    },
  },
})
