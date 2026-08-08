# buildwithzaza

Joshua Chimaobi Ugwu's personal site — portfolio, ventures, marketplace, and hire intake. Next.js 16 (App Router) + Tailwind v4 + Firebase + Cloudinary.

## Phase 1–4 — what's here

- Design system in `src/app/globals.css` — navy/gold token palette, light/dark via `next-themes` (class strategy)
- Fonts: Bricolage Grotesque (display) + Manrope (body) + JetBrains Mono (terminal/data)
- Responsive nav with animated mobile menu (Motion), real tech-stack logos in the marquee via `react-icons` (Paystack excluded — not in that library, see note below)
- Firebase client (`src/lib/firebase/client.ts`) + admin (`src/lib/firebase/admin.ts`, server-only)
- Cloudinary upload helper — direct `fetch()`, no SDK
- Full home page: hero with a live-fetched "deploy log", ambient 3D depth layer (React Three Fiber), tech marquee, Selected Work, Ventures, About preview, Testimonials (Firestore-driven, hidden until real), contact CTA, footer
- `/projects` — full grid, filters, search, 13 shipped projects, case study pages
- `/ventures` — full AccomPadi + ReelNix page
- `/hire` — structured project-request form → Firestore `messages` (`type: "hire"`)
- `/contact` — general contact form + direct email/response-time → Firestore `messages` (`type: "contact"`)
- `/shop` — Firestore-driven product grid (no hardcoded products — there's no real catalog yet, so this reads live from day one), Paystack Inline.js checkout, server-side payment verification, graceful "opening soon" empty state
- `firestore.rules` at the project root
- `/about` — still a stub, Phase 5 territory

## Setup

1. `npm install` (`.npmrc` already handles the peer-deps issue)
2. Copy `.env.example` to `.env.local`, fill in Firebase + Cloudinary values
3. Drop your resume PDF into `public/resume.pdf`
4. **Paystack**: create products at [dashboard.paystack.com](https://dashboard.paystack.com) settings, grab your test public/secret keys, set `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY` in `.env.local`. Test with Paystack's [test cards](https://paystack.com/docs/payments/test-payments/) before going live.
5. `npm run dev` → http://localhost:3000

## Firestore rules

`firestore.rules` matches `docs/firestore-schema.md`. Copy its contents into **Firebase Console → Firestore Database → Rules → paste → Publish** — manual, every time, no way around it. Firestore only — no Realtime Database or Storage rules needed (Cloudinary handles files).

## Two things queued for Phase 5, not forgotten

- **Seed scripts**: once `/admin` exists, `src/lib/data/projects.ts` gets converted into grouped seed scripts (profile, projects, etc.) you run once to populate Firestore. From then on you edit through the dashboard, not the codebase.
- **Admin auth**: both Google Sign-In and email/password will be enabled, but access is gated the same way regardless of method — sign in succeeds, then the app checks `user.email` against your one allowed address and signs out anyone else immediately.

## Gotchas carried over from your other builds

- **firebase-admin is pinned to `^13.0.0`** — v14 breaks with an `ERR_REQUIRE_ESM` conflict, same issue as AcadeGrade v2 and RollMark. Don't bump without testing a clean build.
- **`FIREBASE_ADMIN_PRIVATE_KEY`** — `admin.ts` already handles Vercel's escaped-newline issue.
- **Firestore security rules need manual publish in the Firebase Console.** Same as every other project.
- **Cloudinary** — always direct `fetch()` to `/auto/upload` with an unsigned preset. Never install the SDK.
- **`ssr: false` + `next/dynamic`**: only legal inside a Client Component — `hero-scene-loader.tsx` owns that boundary.
- **Paystack verification is server-side only** (`/api/paystack/verify`) — the client-side callback firing is never trusted on its own; the route re-checks with Paystack directly before an order is created or a file is handed over. That route must stay on the Node runtime — `firebase-admin` doesn't run on Edge.
- **Orders have no de-duplication on `paystackRef` yet** — a retried verify call for the same reference would create a second order doc. Fine at low volume; worth a uniqueness check later.

## What's next

- **Phase 5** — `/admin` dashboard (dual-auth login, projects/testimonials/messages/products CRUD, seed scripts)

Data model: see `docs/firestore-schema.md`.
