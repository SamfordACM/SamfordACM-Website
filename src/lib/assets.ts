import fs from 'node:fs';
import path from 'node:path';

/**
 * True when a file exists under public/ at build time.
 *
 * Lets the site degrade gracefully around images nobody has supplied yet:
 * drop the file in and it appears on the next build, with no code change and
 * no broken-image icon in the meantime.
 */
export function hasPublicFile(relativePath: string): boolean {
  const clean = relativePath.replace(/^\/+/, '');
  return fs.existsSync(path.join(process.cwd(), 'public', clean));
}
