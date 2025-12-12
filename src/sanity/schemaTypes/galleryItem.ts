import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'isVideo',
      title: 'This is a video',
      type: 'boolean',
      description: 'Check this box if uploading a video instead of a photo',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.isVideo === true,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { isVideo?: boolean }
          if (!parent?.isVideo && !value) {
            return 'Image is required'
          }
          return true
        }),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'mux.video',
      description: 'Upload a video (MP4, MOV, etc.)',
      hidden: ({ parent }) => parent?.isVideo !== true,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { isVideo?: boolean }
          if (parent?.isVideo === true && !value) {
            return 'Video is required'
          }
          return true
        }),
    }),
    defineField({
      name: 'thumbnailTime',
      title: 'Thumbnail Time (seconds)',
      type: 'number',
      description: 'Optional: Which second of the video to use as thumbnail. Leave empty to use the middle frame.',
      hidden: ({ parent }) => parent?.isVideo !== true,
      validation: (Rule) => Rule.min(0),
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
          { title: 'Gardens & Lawns', value: 'gardens' },
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
      description: 'Check this to feature on homepage slider/gallery',
      initialValue: false,
    }),
    defineField({
      name: 'homepageHero',
      title: 'Homepage Hero Image',
      type: 'boolean',
      description: '⭐ THE photo that shows in the "View Our Work" section. Only pick ONE!',
      initialValue: false,
    }),
    defineField({
      name: 'aboutUsPhoto',
      title: 'About Us Photo',
      type: 'boolean',
      description: '⭐ THE photo that shows in the About Us section. Only pick ONE!',
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
      category: 'category',
      image: 'image',
      isVideo: 'isVideo',
    },
    prepare(selection) {
      const { title, category, image, isVideo } = selection
      return {
        title: isVideo ? `🎬 ${title || 'Untitled Video'}` : (title || 'Untitled'),
        subtitle: category ? `Category: ${category}` : 'No category',
        media: isVideo ? undefined : image,
      }
    },
  },
})
