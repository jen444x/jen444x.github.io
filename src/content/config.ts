import { defineCollection, z } from 'astro:content';

const galleryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    alt: z.string(),
    categories: z.record(z.string().nullable()),
    featured: z.boolean().optional().default(false),
    date: z.date().optional(),
  }),
});

export const collections = {
  gallery: galleryCollection,
};
