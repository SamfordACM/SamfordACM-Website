/**
 * Chapter facts, in one place.
 *
 * Every page reads from here, so updating a link or an email is a one-line
 * change in a single file. Anything still in [brackets] is a placeholder that
 * has not been confirmed -- replace the value, don't just delete the brackets.
 */

export const CHAPTER_EMAIL = '[acm@samford.edu — confirm this exists]';

/** Public accounts. Comment a line out and it disappears everywhere at once. */
export const SOCIALS: { label: string; href: string }[] = [
  // { label: 'Discord',   href: 'https://discord.gg/[invite code]' },
  // { label: 'Instagram', href: 'https://instagram.com/[handle]' },
  // { label: 'LinkedIn',  href: 'https://linkedin.com/company/[slug]' },
];

/** National ACM membership: encouraged for everyone, required for exec. */
export const NATIONAL_ACM_URL = 'https://www.acm.org/membership/student';

/**
 * What the chapter covers. ACM is the only computing club at Samford, so this
 * list is doing real work: it tells a visitor whose interest lives here.
 */
export const AREAS = [
  'Artificial intelligence',
  'Cybersecurity',
  'Software engineering',
  'Computer engineering',
  'Business continuity',
];
