import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'categoryCovers',
  title: 'Category Covers',
  type: 'document',
  description: 'Select which photo to use as the cover image for each service category on the homepage',
  fields: [
    defineField({
      name: 'concrete',
      title: 'Concrete Work Cover',
      type: 'reference',
      to: [{ type: 'galleryItem' }],
      options: {
        filter: 'category == "concrete"',
      },
      description: 'Pick a concrete photo for the Services section',
    }),
    defineField({
      name: 'outdoorKitchens',
      title: 'Outdoor Kitchens Cover',
      type: 'reference',
      to: [{ type: 'galleryItem' }],
      options: {
        filter: 'category == "outdoor-kitchens"',
      },
      description: 'Pick an outdoor kitchen photo for the Services section',
    }),
    defineField({
      name: 'coveredPatios',
      title: 'Covered Patios Cover',
      type: 'reference',
      to: [{ type: 'galleryItem' }],
      options: {
        filter: 'category == "covered-patios"',
      },
      description: 'Pick a covered patio photo for the Services section',
    }),
    defineField({
      name: 'fireFeatures',
      title: 'Fire Features Cover',
      type: 'reference',
      to: [{ type: 'galleryItem' }],
      options: {
        filter: 'category == "fire-features"',
      },
      description: 'Pick a fire feature photo for the Services section',
    }),
    defineField({
      name: 'landscaping',
      title: 'Landscaping Cover',
      type: 'reference',
      to: [{ type: 'galleryItem' }],
      options: {
        filter: 'category == "landscaping"',
      },
      description: 'Pick a landscaping photo for the Services section',
    }),
    defineField({
      name: 'ironWork',
      title: 'Iron Work Cover',
      type: 'reference',
      to: [{ type: 'galleryItem' }],
      options: {
        filter: 'category == "iron-work"',
      },
      description: 'Pick an iron work photo for the Services section',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Category Covers',
        subtitle: 'Homepage service card images',
      }
    },
  },
})
