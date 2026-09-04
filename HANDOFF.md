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

## Deliberately not built

- **No self-hosted backend.** Everything is static files on GitHub Pages —
  nothing to patch, nothing that breaks when one person's hardware goes away.
- **No student logins, ever.** A club site must never ask for Samford
  credentials; that is a phishing pattern regardless of intent, and a static
  site has nowhere safe to put a secret.
- **No scraped member directory.** Signing up on Presence is not consent to be
  published. If a public member list happens, it is opt-in with an explicit
  "list me publicly" checkbox, showing only those who ticked it.
