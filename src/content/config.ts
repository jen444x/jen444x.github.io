import { defineCollection, z } from 'astro:content';

const galleryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    alt: z.string(),
    categories: z.array(z.string()), // Array of category slugs (e.g., ["concrete-walkways", "fire-features"])
    featured: z.boolean().optional().default(false),
    date: z.date().optional(),
  }),
});

export const collections = {
  gallery: galleryCollection,
};
