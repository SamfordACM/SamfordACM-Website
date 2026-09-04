/**
 * Builds an internal link that survives being served from a subpath.
 *
 * On GitHub Pages this site lives under /SamfordACM-Website/ until a custom
 * domain is attached, at which point it moves to the root. Routing every
 * internal href through here means that move is a one-line config change
 * instead of a find-and-replace across every page.
 */
export function path(p = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const rest = p.replace(/^\/+/, '');
  return rest ? `${base}/${rest}` : `${base}/`;
}

/** Strips the base prefix off a real request path, for active-nav comparisons. */
export function normalize(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const stripped = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return stripped.replace(/\/+$/, '') || '/';
}
