// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Used to generate absolute URLs (sitemap, canonical tags, social previews).
  // Update this if the domain ever changes.
  site: 'https://samfordacm.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
