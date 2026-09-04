// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Live at the apex domain. `base` is '/' because the site is served from the
  // domain root rather than a GitHub Pages project subpath. Internal links go
  // through src/lib/url.ts, which reads these -- don't hardcode paths.
  site: 'https://samfordacm.com',
  base: '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
