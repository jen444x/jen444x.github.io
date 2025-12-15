import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { muxInput } from 'sanity-plugin-mux-input'
import { schemaTypes } from './src/sanity/schemaTypes'

// Custom structure for organizing gallery items by category
const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // All Gallery Items (with sorting)
      S.listItem()
        .title('All Gallery Items')
        .child(
          S.documentList()
            .title('All Gallery Items')
            .filter('_type == "galleryItem"')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),

      S.divider(),

      // Gallery by Category
      S.listItem()
        .title('By Category')
        .child(
          S.list()
            .title('Categories')
            .items([
              S.listItem()
                .title('Concrete')
                .child(
                  S.list()
                    .title('Concrete')
                    .items([
                      S.listItem()
                        .title('All Concrete')
                        .child(
                          S.documentList()
                            .title('All Concrete')
                            .filter('_type == "galleryItem" && category == "concrete"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Walkways & Steps')
                        .child(
                          S.documentList()
                            .title('Walkways & Steps')
                            .filter('_type == "galleryItem" && category == "concrete" && subcategory == "walkways-steps"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Flatwork & Patios')
                        .child(
                          S.documentList()
                            .title('Flatwork & Patios')
                            .filter('_type == "galleryItem" && category == "concrete" && subcategory == "flatwork-patios"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Stone Work')
                        .child(
                          S.documentList()
                            .title('Stone Work')
                            .filter('_type == "galleryItem" && category == "concrete" && subcategory == "stone-work"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Driveways')
                        .child(
                          S.documentList()
                            .title('Driveways')
                            .filter('_type == "galleryItem" && category == "concrete" && subcategory == "driveways"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                    ])
                ),
              S.listItem()
                .title('Outdoor Kitchens')
                .child(
                  S.documentList()
                    .title('Outdoor Kitchens')
                    .filter('_type == "galleryItem" && category == "outdoor-kitchens"')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Covered Patios')
                .child(
                  S.documentList()
                    .title('Covered Patios')
                    .filter('_type == "galleryItem" && category == "covered-patios"')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Fire Features')
                .child(
                  S.list()
                    .title('Fire Features')
                    .items([
                      S.listItem()
                        .title('All Fire Features')
                        .child(
                          S.documentList()
                            .title('All Fire Features')
                            .filter('_type == "galleryItem" && category == "fire-features"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Fire Pits')
                        .child(
                          S.documentList()
                            .title('Fire Pits')
                            .filter('_type == "galleryItem" && category == "fire-features" && subcategory == "fire-pits"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Fire Pit Tables')
                        .child(
                          S.documentList()
                            .title('Fire Pit Tables')
                            .filter('_type == "galleryItem" && category == "fire-features" && subcategory == "fire-pit-tables"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Fireplaces')
                        .child(
                          S.documentList()
                            .title('Fireplaces')
                            .filter('_type == "galleryItem" && category == "fire-features" && subcategory == "fireplaces"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                    ])
                ),
              S.listItem()
                .title('Landscaping')
                .child(
                  S.list()
                    .title('Landscaping')
                    .items([
                      S.listItem()
                        .title('All Landscaping')
                        .child(
                          S.documentList()
                            .title('All Landscaping')
                            .filter('_type == "galleryItem" && category == "landscaping"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Gardens & Lawns')
                        .child(
                          S.documentList()
                            .title('Gardens & Lawns')
                            .filter('_type == "galleryItem" && category == "landscaping" && subcategory == "gardens"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Water Features')
                        .child(
                          S.documentList()
                            .title('Water Features')
                            .filter('_type == "galleryItem" && category == "landscaping" && subcategory == "water-features"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Artificial Turf')
                        .child(
                          S.documentList()
                            .title('Artificial Turf')
                            .filter('_type == "galleryItem" && category == "landscaping" && subcategory == "turf"')
                            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        ),
                    ])
                ),
              S.listItem()
                .title('Iron Work')
                .child(
                  S.documentList()
                    .title('Iron Work')
                    .filter('_type == "galleryItem" && category == "iron-work"')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),
            ])
        ),

      S.divider(),

      // Featured Items (quick access)
      S.listItem()
        .title('Featured Items')
        .child(
          S.documentList()
            .title('Featured Items')
            .filter('_type == "galleryItem" && featured == true')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),

      S.divider(),

      // Category Covers (for homepage Services section)
      S.listItem()
        .title('Category Covers')
        .child(
          S.document()
            .schemaType('categoryCovers')
            .documentId('categoryCovers')
            .title('Category Covers')
        ),
    ])

export default defineConfig({
  name: 'rocky-concrete',
  title: 'Rocky Concrete',

  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,

  plugins: [
    structureTool({ structure }),
    muxInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
