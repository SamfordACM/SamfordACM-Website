import { getCollection, type CollectionEntry } from 'astro:content';

export type Event = CollectionEntry<'events'>;

/**
 * Splits events into the three groups every page needs. Scheduled events sort
 * by date; planned ones (no date yet) put featured items first, then fall back
 * to alphabetical so the order is stable between builds.
 */
export async function groupEvents(now = new Date()) {
  const all = await getCollection('events');

  const scheduled = all.filter((e) => e.data.date !== undefined);
  const planned = all
    .filter((e) => e.data.date === undefined)
    .sort((a, b) => {
      if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
      return a.data.title.localeCompare(b.data.title);
    });

  const upcoming = scheduled
    .filter((e) => e.data.date! >= now)
    .sort((a, b) => a.data.date!.valueOf() - b.data.date!.valueOf());
  const past = scheduled
    .filter((e) => e.data.date! < now)
    .sort((a, b) => b.data.date!.valueOf() - a.data.date!.valueOf());

  return { upcoming, planned, past };
}

/**
 * Campus time zone, pinned explicitly.
 *
 * Without this, dates format in the *build machine's* zone -- GitHub's runners
 * are UTC, so a 6:00 PM event rendered as 11:00 PM on the deployed site, and a
 * late-evening event would show on the wrong day. Always format through these.
 */
const TIME_ZONE = 'America/Chicago';

export const fmt = {
  month: new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: TIME_ZONE }),
  day: new Intl.DateTimeFormat('en-US', { day: '2-digit', timeZone: TIME_ZONE }),
  time: new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: '2-digit', timeZone: TIME_ZONE,
  }),
  weekdayTime: new Intl.DateTimeFormat('en-US', {
    weekday: 'long', hour: 'numeric', minute: '2-digit', timeZone: TIME_ZONE,
  }),
  longDate: new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: TIME_ZONE,
  }),
};
