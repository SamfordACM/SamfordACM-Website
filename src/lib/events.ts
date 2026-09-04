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

  // A multi-day event stays "upcoming" until its end date passes, so a
  // month-long hackathon does not vanish the day after it opens.
  const endsAt = (e: Event) => e.data.endDate ?? e.data.date!;

  const upcoming = scheduled
    .filter((e) => endsAt(e) >= now)
    .sort((a, b) => a.data.date!.valueOf() - b.data.date!.valueOf());
  const past = scheduled
    .filter((e) => endsAt(e) < now)
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
  monthDay: new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', timeZone: TIME_ZONE,
  }),
  longDate: new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: TIME_ZONE,
  }),
};

/**
 * Human description of when an event happens. A single-day event shows its
 * weekday and start time; a multi-day one shows a date range and no time,
 * because "6:00 PM" is meaningless for something that runs for a month.
 */
export function describeWhen(event: Event): string {
  const { date, endDate } = event.data;
  if (!date) return event.data.window ?? '';
  if (endDate) return `${fmt.monthDay.format(date)} – ${fmt.monthDay.format(endDate)}`;
  return fmt.weekdayTime.format(date);
}
