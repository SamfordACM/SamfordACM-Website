/**
 * Chapter facts, in one place.
 *
 * Every page reads from here, so updating a link or an email is a one-line
 * change in a single file. Anything still in [brackets] is a placeholder that
 * has not been confirmed -- replace the value, don't just delete the brackets.
 */

export const CHAPTER_EMAIL = 'dabbott1@samford.edu'; // TODO: swap for a role address
// that survives officer turnover (acm@samford.edu) once the department sets one up.

/** Public accounts. Comment a line out and it disappears everywhere at once. */
export const SOCIALS: { label: string; href: string }[] = [
  { label: 'Discord', href: 'https://discord.gg/kH5YTczVbX' },
  { label: 'Instagram', href: 'https://www.instagram.com/samfordacm/' },
  // LinkedIn page pending identity verification -- uncomment once it resolves.
  // { label: 'LinkedIn', href: 'https://linkedin.com/company/[slug]' },
];

/**
 * Official membership signup, through Samford's Bulldog Central (Presence).
 * This is the roster of record -- institution-owned, so it outlives any officer.
 */
export const PRESENCE_SIGNUP_URL =
  'https://samford.presence.io/organization/association-for-computing-machinery-acm';

/** National ACM membership: encouraged for everyone, required for exec. */
export const NATIONAL_ACM_URL = 'https://www.acm.org/membership/student';

/**
 * What a visitor finds here. Mixes the subject areas we cover with what
 * actually happens at an event -- both are reasons to walk in the door.
 */
export const AREAS = [
  'Artificial intelligence',
  'Cybersecurity',
  'Software engineering',
  'Computer engineering',
  'Workshops',
  'Guest speakers',
  'Competitions',
  'Food and prizes',
];

/**
 * Hero photo, shown above the pull quote on the homepage.
 * Drop a file in public/photos/ and set this to e.g. '/photos/kickoff.jpg'.
 * Left null, the page renders a placeholder frame instead.
 */
export const HERO_PHOTO: string | null = null;

/** Faculty advisor -- the continuity anchor as officers turn over. */
export const ADVISOR = 'Greg Kawell';
