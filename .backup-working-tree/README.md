# buildwithzaza

Joshua Chimaobi Ugwu's personal site — portfolio, ventures, marketplace, and hire intake. Next.js 16 (App Router) + Tailwind v4 + Firebase + Cloudinary.

## Phase 1–5 — what's here

- Design system in `src/app/globals.css` — navy/gold token palette, light/dark via `next-themes` (class strategy)
- Fonts: Bricolage Grotesque (display) + Manrope (body) + JetBrains Mono (terminal/data)
- Responsive nav with animated mobile menu, real tech-stack logos via `react-icons`
- Firebase client + admin, Cloudinary upload helper (direct `fetch()`, no SDK)
- Full home page, `/projects` (grid + filters + search + case studies), `/ventures`, `/hire`, `/contact`, `/shop` + Paystack
- **`/admin`** — dual-auth login (Google + email/password, gated to one email), full CRUD for projects/testimonials/products, a real-time messages inbox, and a profile editor that controls the hero deploy log
- **Firestore-first data**: `/`, `/projects`, and `/projects/[slug]` now read from Firestore first, falling back to the hardcoded `src/lib/data/projects.ts` only if Firestore is empty or unreachable. Nothing goes blank before you seed; nothing needs to change in code after you do.
- `scripts/` — grouped seed scripts (`seed-profile.mjs`, `seed-projects.mjs`) to move the hardcoded data into Firestore once
- `firestore.rules` at the project root

## Setup

1. `npm install` (`.npmrc` handles the peer-deps issue)
2. Copy `.env.example` to `.env.local`, fill in Firebase + Cloudinary + Paystack values
3. Drop your resume PDF into `public/resume.pdf`, or upload it from `/admin/profile` instead (that one wins if both exist, since it sets `resumeUrl` for the profile doc — up to you which you use)
4. `npm run dev` → http://localhost:3000

## Setting up admin access (do this before you can log in)

1. **Firebase Console → Authentication → Sign-in method** — enable both **Google** and **Email/Password** providers.
2. **Create your account** — easiest path: Authentication → Users → Add user, using `joshuaugwu89@gmail.com` (or whatever `NEXT_PUBLIC_ADMIN_EMAIL` is set to) and a password. Or just hit `/admin/login` and use "Continue with Google" with that same Google account — either method works, since both are checked against the same allowed email.
3. Go to `/admin/login`. Anyone who signs in with a *different* email — Google or password, doesn't matter — gets silently signed back out. Only `NEXT_PUBLIC_ADMIN_EMAIL` gets through.

## Seeding your data

```bash
node --env-file=.env.local scripts/seed-profile.mjs
node --env-file=.env.local scripts/seed-projects.mjs
```

See `scripts/README.md` for details. After running these, everything is editable from `/admin` — no more touching code to update a project description, swap a screenshot, or list something for sale.

## Firestore rules

`firestore.rules` matches `docs/firestore-schema.md`. Copy its contents into **Firebase Console → Firestore Database → Rules → paste → Publish** — manual, every time, no way around it. Firestore only — no Realtime Database or Storage rules needed (Cloudinary handles files).

## Gotchas carried over from your other builds

- **firebase-admin is pinned to `^13.0.0`** — v14 breaks with an `ERR_REQUIRE_ESM` conflict, same issue as AcadeGrade v2 and RollMark.
- **`FIREBASE_ADMIN_PRIVATE_KEY`** — `admin.ts` already handles Vercel's escaped-newline issue.
- **Firestore security rules need manual publish in the Firebase Console.**
- **Cloudinary** — always direct `fetch()` to `/auto/upload` with an unsigned preset. Never install the SDK.
- **`ssr: false` + `next/dynamic`**: only legal inside a Client Component — `hero-scene-loader.tsx` owns that boundary.
- **Paystack verification is server-side only** (`/api/paystack/verify`), must stay on the Node runtime.
- **Orders have no de-duplication on `paystackRef` yet.**
- **Admin route protection is client-side** (an auth check in `admin/layout.tsx`), not middleware. The actual security boundary is `firestore.rules` — `isAdmin()` gates every write regardless of what the UI does, so this is fine for a single-admin dashboard, but it's worth knowing the layout check alone isn't what's protecting the data.

## What's next

Everything from the original plan is built. From here it's mostly content: seed your data, add real testimonials and products as you get them, drop in a Paystack icon if you want one, and decide if `/about` needs to be more than the homepage preview.

Data model: see `docs/firestore-schema.md`.
