// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://rockyconcreteinc.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap(),
    sanity({
      projectId: '7pjigdmm',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/admin',
    }),
    react()
  ]
});