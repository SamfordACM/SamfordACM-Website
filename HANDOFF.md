# Handoff / Continuity

Written for whoever inherits this site. The goal is that nothing here depends on one
person's personal accounts.

Status legend: `[ ]` not done yet, `[x]` done.

## Accounts that must outlive any individual officer

- [ ] **GitHub organization** — this repo lives under the org, never a personal account.
      Owners: president + at least one underclassman officer + faculty advisor.
      Transfer = add the incoming officer as Owner, remove the outgoing one.
- [ ] **Chapter email** — `acm@samford.edu` (or a dedicated Google account). Owns the
      domain registration and the Google Form responses.
- [ ] **Password manager** — shared vault (Bitwarden free org) holding every credential
      below. Advisor holds recovery access.
- [ ] **Domain registrar account** — registered to the chapter email, *not* a personal one.

## Domain

| | |
|---|---|
| Domain | `samfordacm.com` |
| Registrar | TODO |
| Renewal | TODO — prepay multiple years, auto-renew ON |
| Expires | TODO |

DNS records pointing at GitHub Pages:

```
@    A      185.199.108.153
@    A      185.199.109.153
@    A      185.199.110.153
@    A      185.199.111.153
@    AAAA   2606:50c0:8000::153
@    AAAA   2606:50c0:8001::153
@    AAAA   2606:50c0:8002::153
@    AAAA   2606:50c0:8003::153
www  CNAME  <org>.github.io
```

Repo Settings → Pages → Custom domain = `samfordacm.com`, then tick **Enforce HTTPS**
once the certificate finishes provisioning (can take up to ~24h). If DNS is on
Cloudflare, keep these records **DNS-only / grey cloud** until the cert issues.

The custom domain is also pinned by `public/CNAME`. Both must agree.

## Deploys

Push to `main` → `.github/workflows/deploy.yml` builds and publishes. No manual step.
Repo Settings → Pages → Source must be set to **GitHub Actions**.

If a deploy fails, the Actions tab has the log. The most common cause is a malformed
event file — the content schema rejects bad dates and missing fields on purpose.

## Annual checklist (do this every spring before officers change)

1. Add incoming officers to the GitHub org; remove graduating ones.
2. Confirm the domain auto-renews and the payment method has not expired.
3. Update `src/content/officers/`.
4. Confirm at least two current people can log into the registrar and the email account.

## Deliberately not used

No self-hosted backend, database, or always-on server. Everything is static files served
by GitHub Pages, so there is nothing to maintain, patch, or pay for beyond the domain,
and nothing that breaks when a specific person's hardware goes away. Keep it that way
unless there is a strong reason not to — and if there is, use a managed service the org
can own, not personal hardware.
