// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// ---------------------------------------------------------------------------
// WHEN samfordacm.com IS PURCHASED, make exactly these two changes:
//   1. site: 'https://samfordacm.com'
//   2. base: '/'
//   ...and re-create public/CNAME containing the single line: samfordacm.com
// Every internal link goes through src/lib/url.ts, so nothing else needs to move.
// ---------------------------------------------------------------------------
export default defineConfig({
  site: 'https://samfordacm.github.io',
  base: '/SamfordACM-Website/',
  vite: {
    plugins: [tailwindcss()],
  },
});
