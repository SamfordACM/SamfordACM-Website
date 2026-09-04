# Samford ACM Website

Source for [samfordacm.com](https://samfordacm.com) — the Samford University student
chapter of the ACM. Built with [Astro](https://astro.build), deployed automatically to
GitHub Pages on every push to `main`.

## Making changes without installing anything

Most updates do not require a local setup. Edit the file on github.com, commit to `main`,
and the site rebuilds in about a minute.

**Add an event** — create a file in `src/content/events/`:

```markdown
---
title: Resume Workshop
date: 2026-10-14T18:00:00-05:00
location: Cooney Hall 210
rsvp: https://forms.gle/example   # optional, delete the line if unused
---

Optional longer description goes here.
```

Events sort themselves and move from "Upcoming" to "Past" automatically based on `date`.

**Update officers** — edit the files in `src/content/officers/`. `order` controls display
position (1 = president). Set `photo: /officers/name.jpg` after adding the image to
`public/officers/`.

**Edit page copy** — the six pages live in `src/pages/`. The prose is plain HTML inside
each file; look for `TODO` comments marking placeholder text.

## Running it locally

Requires Node 24 (see `.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
npm run check    # type-check content and components
```

## Layout

```
src/
  content/          Events and officers as Markdown (the stuff you edit most)
  content.config.ts Schemas — a malformed event fails the build on purpose
  pages/            One file per route
  layouts/Base.astro  Shared <head>, nav, footer
  components/       Nav and Footer
  styles/global.css Tailwind import + chapter color palette
public/             Served as-is. CNAME pins the custom domain.
.github/workflows/  The deploy pipeline
```

See [HANDOFF.md](HANDOFF.md) for accounts, domain, and succession details.
