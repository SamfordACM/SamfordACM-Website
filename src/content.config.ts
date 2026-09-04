import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Add an event by dropping a new .md file in src/content/events/.
// Anything that does not match this shape will fail the build loudly,
// which is the point -- a typo gets caught before it reaches the site.
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    // Optional so a placeholder event can go up before details are locked in.
    rsvp: z.url().optional(),
  }),
});

const officers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/officers' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    // Controls display order on the Officers page: 1 = president, 2 = VP, etc.
    order: z.number(),
    email: z.email().optional(),
    photo: z.string().optional(),
  }),
});

export const collections = { events, officers };
