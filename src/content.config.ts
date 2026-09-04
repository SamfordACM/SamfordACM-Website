import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Events come in two kinds and the schema allows both:
 *
 *   - SCHEDULED -- has a `date`. Sorts chronologically, moves itself from
 *     "Upcoming" to "Past" once the date passes.
 *   - PLANNED   -- no date yet, just a `window` like "Spring 2027". Shows in
 *     its own section so a hackathon can go on the site before it is booked.
 *
 * One of the two is required; the build fails loudly if an event has neither.
 */
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z
    .object({
      title: z.string(),
      date: z.coerce.date().optional(),
      window: z.string().optional(),
      location: z.string().optional(),
      /** Link to a sign-up form so we know who is coming. */
      rsvp: z.url().optional(),
      /** Pin a flagship event to the top of the planned list. */
      featured: z.boolean().default(false),
    })
    .refine((e) => e.date !== undefined || e.window !== undefined, {
      message: 'An event needs either a `date` (scheduled) or a `window` (planned, e.g. "Spring 2027").',
    }),
});

const officers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/officers' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    /** Display order: 1 = president, 2 = VP, and so on. */
    order: z.number(),
    email: z.email().optional(),
    photo: z.string().optional(),
  }),
});

export const collections = { events, officers };
