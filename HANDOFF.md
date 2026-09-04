# Handoff / Continuity

Written for whoever inherits this site. The goal is that nothing here depends on
one person's personal accounts, hardware, or credit card.

Status: `[x]` done, `[ ]` still open.

## Accounts that must outlive any individual officer

- [x] **GitHub organization** — `SamfordACM`, repo `SamfordACM-Website`.
      Handoff = add the incoming officer as an Owner, remove the outgoing one.
      No repo transfer, no broken URLs.
- [ ] **Add a second and third Owner** to the GitHub org — an underclassman
      officer and the faculty advisor. Officers graduate on a rolling basis;
      the advisor is the only person still here in five years.
- [x] **Membership roster** — Bulldog Central (Presence). Institution-owned, so
      it needs no succession plan:
      https://samford.presence.io/organization/association-for-computing-machinery-acm
- [x] **Discord** — https://discord.gg/kH5YTczVbX
- [x] **Instagram** — https://www.instagram.com/samfordacm/
- [ ] **LinkedIn** — pending identity verification.
- [ ] **Chapter email** — `acm@samford.edu` does not exist yet. The site
      currently shows the president's personal Samford address, which stops
      working at graduation. Ask the department for BOTH a shared address and a
      mailing list (Google Group or M365 distribution list) — they are separate
      requests.
- [ ] **Password manager** — a shared vault (Bitwarden's free org plan) holding
      every credential above, with the advisor holding recovery access.

## Domain

| | |
|---|---|
| Domain | `samfordacm.com` |
| Registrar | TODO |
| Registered to | TODO — must be a chapter address, never a personal one |
| Auto-renew | TODO — turn it ON and prepay several years |
| Expires | TODO |

### DNS records

```
@    A      185.199.108.153
@    A      185.199.109.153
@    A      185.199.110.153
@    A      185.199.111.153
@    AAAA   2606:50c0:8000::153
@    AAAA   2606:50c0:8001::153
@    AAAA   2606:50c0:8002::153
@    AAAA   2606:50c0:8003::153
www  CNAME  samfordacm.github.io
```

On Cloudflare, keep these **DNS-only (grey cloud)** until the certificate
issues, or GitHub's validation gets confused.

### Switching the site over

The site currently builds for the GitHub Pages subpath
(`/SamfordACM-Website/`). Moving to the apex domain is two lines in
`astro.config.mjs` plus a `public/CNAME` file — the comment block at the top of
that config spells it out. Every internal link routes through `src/lib/url.ts`,
so nothing else changes. Do this only AFTER DNS resolves, or the live site
breaks in the gap.

Then: repo Settings → Pages → Custom domain = `samfordacm.com`, and tick
**Enforce HTTPS** once the certificate finishes provisioning (can take a few
hours).

## Deploys

Push to `main` → `.github/workflows/deploy.yml` builds and publishes. Repo
Settings → Pages → Source must stay set to **GitHub Actions**.

**The Node version in `.nvmrc` is pinned on purpose.** `npm ci` requires a
lockfile written by a compatible npm, and an unpinned `24` once let CI pick up a
newer npm than anyone had locally — the build failed on missing lockfile
entries that were never actually missing. To upgrade Node: bump `.nvmrc`, run
`npm install` under that exact version to regenerate `package-lock.json`, and
commit both together.

## Annual checklist — every spring, before officers change

1. Add incoming officers to the GitHub org; remove graduating ones.
2. Confirm the domain auto-renews and the card on file has not expired.
3. Update `src/content/officers/` and `src/lib/chapter.ts`.
4. Confirm at least two current people can log into the registrar and the
   chapter email.

## Brand compliance

The site follows Samford University's Brand Identity Standards (Summer 2026)
and the Samford Style Reference Guide:

- **Palette** is the official one, exact hexes, in `src/styles/global.css`.
  Navy `#0C2340` carries the page (the standard requires 50-80% navy on
  websites); red `#BD1F2D` is capped at 40% and used as punctuation only;
  gray `#C1C6C8` draws the rules. Secondary colors are capped at 20% each.
- **Type** is Georgia and Tahoma -- the substitutes the standard names for
  Chronicle Deck and Whitney, which are licensed faces we cannot ship. They are
  system fonts, so the site loads no webfonts.
- **Dates and times** follow AP style per the style guide: abbreviate only
  Jan., Feb., Aug., Sept., Oct., Nov., Dec.; "6 p.m." with no ":00"; en dashes
  with no spaces in ranges. All of this lives in `src/lib/events.ts`.
- **No Samford logos are used.** The bell tower and bulldog are locked marks
  that cannot be altered or typeset, and the site does not reproduce them.

**[ ] Still to do: trademark licensing.** The standards state that any person or
organization must obtain approval and/or a license to use Samford's trademarks
-- which include the university's *name* -- for any purpose. `samfordacm.com`
uses "Samford" throughout. Confirm with the Office of Marketing and
Communication (samford.edu/go/licensing) and note the approval here.

## Deliberately not built

- **No self-hosted backend.** Everything is static files on GitHub Pages —
  nothing to patch, nothing that breaks when one person's hardware goes away.
- **No student logins, ever.** A club site must never ask for Samford
  credentials; that is a phishing pattern regardless of intent, and a static
  site has nowhere safe to put a secret.
- **No scraped member directory.** Signing up on Presence is not consent to be
  published. If a public member list happens, it is opt-in with an explicit
  "list me publicly" checkbox, showing only those who ticked it.
