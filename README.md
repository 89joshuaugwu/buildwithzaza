# buildwithzaza

Joshua Chimaobi Ugwu's personal site — portfolio, ventures, marketplace, and hire intake. Next.js 16 (App Router) + Tailwind v4 + Firebase + Cloudinary.

## Phase 1 + 2 + 3 — what's here

- Design system in `src/app/globals.css` — navy/gold token palette, light/dark via `next-themes` (class strategy)
- Fonts: Bricolage Grotesque (display) + Manrope (body) + JetBrains Mono (terminal/data)
- Responsive nav with animated mobile menu (Motion)
- Firebase client (`src/lib/firebase/client.ts`) + admin (`src/lib/firebase/admin.ts`, server-only)
- Cloudinary upload helper — direct `fetch()`, no SDK
- Full home page: hero with a live-fetched "deploy log" + an ambient 3D particle depth layer (React Three Fiber), tech marquee, Selected Work, Ventures, About preview, Testimonials (Firestore-driven, hidden until real), contact CTA, footer
- `/projects` — full grid, category filters, search, all 13 shipped projects
- `/projects/[slug]` — case study pages (problem / approach / outcome for the 6 flagship projects, summary-only for the rest)
- `/ventures` — full AccomPadi + ReelNix page
- `/about`, `/contact`, `/hire`, `/shop` — still stub routes, say which phase fills them in
- `firestore.rules` at the project root — see "Firestore rules" below

## Setup

1. `npm install` (an `.npmrc` with `legacy-peer-deps=true` is already in the repo — needed because React 19 is ahead of some peer-dep ranges in the three.js/R3F ecosystem)
2. Copy `.env.example` to `.env.local`, fill in your Firebase + Cloudinary values
3. Drop your resume PDF into `public/resume.pdf` (the hero's download button expects it there)
4. `npm run dev` → http://localhost:3000

## Firestore rules

`firestore.rules` in the project root matches the schema in `docs/firestore-schema.md`. Copy its contents into **Firebase Console → Firestore Database → Rules → paste → Publish**. There's no way to automate this step — same as every other project, it has to be published manually.

This project only uses Firestore — no Realtime Database, no Firebase Storage (Cloudinary handles files). No RTDB or Storage rules needed here.

## Gotchas carried over from your other builds

- **firebase-admin is pinned to `^13.0.0`** — v14 breaks with an `ERR_REQUIRE_ESM` conflict, same issue as AcadeGrade v2 and RollMark. Don't bump without testing a clean build.
- **`FIREBASE_ADMIN_PRIVATE_KEY`** — `admin.ts` already handles Vercel's escaped-newline issue. Paste the key straight from the service account JSON, no manual reformatting needed.
- **Firestore security rules still need manual publish in the Firebase Console.** No way to automate that part — same as every other project.
- **Cloudinary** — always direct `fetch()` to `/auto/upload` with an unsigned preset. Never install the Cloudinary SDK.
- **Seed data**: `src/lib/data/projects.ts` is static for now. It's shaped exactly like the `projects` Firestore collection, so moving it there later (for the admin dashboard to manage) is a data migration, not a rewrite.
- **`ssr: false` + `next/dynamic`**: only legal inside a Client Component. `hero-scene-loader.tsx` is the wrapper that owns that boundary — don't call `dynamic(..., { ssr: false })` directly from a page or layout file.

## What's next

- **Phase 4** — `/hire`, `/contact`, `/shop` + Paystack checkout
- **Phase 5** — `/admin` dashboard

Data model: see `docs/firestore-schema.md`.
