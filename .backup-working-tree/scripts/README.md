# Seed scripts

One-time imports that move the data which used to be hardcoded in the
codebase into Firestore, so you manage it from `/admin` from then on
instead of editing code.

## Run them

Needs Node 20.6+ for `--env-file` (you're on v24, so you're set):

```bash
node --env-file=.env.local scripts/seed-profile.mjs
node --env-file=.env.local scripts/seed-projects.mjs
```

## What each one does

- **seed-profile.mjs** — writes `profile/main`: bio, the "currently
  building" line, and the deploy-log lines shown in the hero. Safe to
  re-run, it just overwrites the doc.
- **seed-projects.mjs** — writes all 13 projects that used to live in
  `src/lib/data/projects.ts`, using each project's slug as its Firestore
  document ID. Safe to re-run — overwrites matching docs, doesn't
  duplicate them.

## After running

The site already prefers Firestore over the hardcoded fallback the
moment any doc exists in a collection — no code change, no redeploy
needed. From here, manage everything from `/admin`: edit a project's
copy, flip `featured` / `ventureSpotlight`, add real screenshots, add
testimonials, list products for the shop.

`src/lib/data/projects.ts` stays in the codebase as a fallback — if
Firestore is ever empty or briefly unreachable, the site falls back to
it instead of showing a blank page. You shouldn't need to edit that file
again after seeding.
