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
 * are UTC, so a 6 p.m. event rendered as 11 p.m. on the deployed site, and a
 * late-evening event would show on the wrong day.
 */
const TIME_ZONE = 'America/Chicago';

/**
 * Date and time formatting follows the Samford Style Reference Guide, which
 * follows AP style:
 *   - Abbreviate only Jan., Feb., Aug., Sept., Oct., Nov., Dec.
 *     Spell out March, April, May, June and July.
 *   - Times are "6 p.m." -- lowercase with periods, and never ":00".
 *   - Ranges use an en dash with no surrounding spaces.
 */
const AP_MONTHS = [
  'Jan.', 'Feb.', 'March', 'April', 'May', 'June',
  'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.',
];

const PARTS = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: '2-digit', hour12: true, weekday: 'long',
});

/** Reads calendar fields in campus time rather than the build machine's zone. */
function fields(date: Date): Record<string, string> {
  const out: Record<string, string> = {};
  for (const p of PARTS.formatToParts(date)) out[p.type] = p.value;
  return out;
}

export const fmt = {
  /** "Sept." -- for the date block on event rows. */
  month: (d: Date) => AP_MONTHS[Number(fields(d).month) - 1],
  /** "08" -- zero-padded so the date blocks align in a column. */
  day: (d: Date) => fields(d).day.padStart(2, '0'),
  /** "6 p.m." or "6:30 p.m." */
  time: (d: Date) => {
    const f = fields(d);
    const period = f.dayPeriod?.toUpperCase() === 'AM' ? 'a.m.' : 'p.m.';
    return `${f.hour}${f.minute === '00' ? '' : ':' + f.minute} ${period}`;
  },
  /** "Sept. 8" */
  monthDay: (d: Date) => `${AP_MONTHS[Number(fields(d).month) - 1]} ${Number(fields(d).day)}`,
  /** "Aug. 27, 2026" */
  longDate: (d: Date) => {
    const f = fields(d);
    return `${AP_MONTHS[Number(f.month) - 1]} ${Number(f.day)}, ${f.year}`;
  },
  weekday: (d: Date) => fields(d).weekday,
};

/**
 * Human description of when an event happens. A single-day event shows its
 * weekday and start time; a multi-day one shows a date range and no time,
 * because "12 a.m." is meaningless for something that runs for a month.
 */
export function describeWhen(event: Event): string {
  const { date, endDate } = event.data;
  if (!date) return event.data.window ?? '';
  if (endDate) return `${fmt.monthDay(date)}\u2013${fmt.monthDay(endDate)}`;
  return `${fmt.weekday(date)}, ${fmt.time(date)}`;
}
