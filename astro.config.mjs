// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import sanity from '@sanity/astro';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://rockyconcreteinc.com',
  output: 'server',
  adapter: netlify(),

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['sanity']
    }
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