import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  name: 'rocky-concrete-gallery',
  title: 'Rocky Concrete Gallery',

  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,

  plugins: [structureTool()],

  schema: {
    types: [], // We'll add gallery schema in next step
  },
})
