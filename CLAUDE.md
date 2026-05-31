# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Important:** This is Next.js 16 (not 15 or 13/14). APIs, file conventions, and middleware behavior differ from training data. Check `node_modules/next/dist/docs/` before writing code. The middleware file is named `proxy.ts` (not `middleware.ts`) — Next.js 16 renamed this convention.

---

## Commands

```bash
npm run dev          # Start local dev server (localhost:3000)
npm run build        # Production build — always run before committing
npm run lint         # ESLint check

# Database — always prefix with dotenv to load .env.local
dotenv -e .env.local -- npx drizzle-kit push      # Push schema changes to Neon
dotenv -e .env.local -- npx tsx src/lib/seed.ts   # Seed founder data

# Pull env vars from Vercel (production env has all keys)
vercel env pull .env.local --environment production --yes
```

No test suite exists yet.

---

## Architecture

### Route Structure

All public-facing pages live in `src/app/(site)/` with a shared layout (`Nav` + `Footer`). The root `src/app/layout.tsx` wraps everything in `AppClerkProvider` only — no Nav/Footer at root level.

```
src/app/
  layout.tsx              ← Root: fonts + ClerkProvider only
  (site)/
    layout.tsx            ← Adds Nav, Footer, OrganizationSchema JSON-LD
    page.tsx              ← Homepage (hero + SearchEngine)
    founders/             ← /founders + /founders/[slug]
    blog/                 ← /blog + /blog/[slug]
    about/ fund/ seek/ listen/
    sign-in/ sign-up/     ← Clerk auth pages
    invite/[token]/       ← Founder onboarding via invite link
  admin/                  ← Clerk-protected, has its own layout (sidebar nav)
    founders/[id]/        ← FounderEditorForm.tsx + actions.ts
    blog/[id]/            ← BlogEditorForm.tsx + actions.ts
    invites/              ← Generate + send founder invite links
  api/
    search/               ← Keyword-based mentor matching (no AI key needed)
    seek/                 ← Seeker form submission + Resend emails
    og/founder/ og/blog/  ← Dynamic OG images via ImageResponse
    webhooks/calendly/    ← Calendly booking mirror
  feed.xml/               ← Podcast RSS feed
  proxy.ts                ← Clerk auth guard for /admin/*; gracefully degrades when Clerk keys absent
```

### Database (Drizzle + Neon Postgres)

Schema in `src/db/schema.ts`. Client in `src/db/index.ts` (lazy-initialized proxy — safe to import at module level even when `DATABASE_URL` is unset).

Key tables: `founders`, `posts`, `seekers`, `founder_invites`, `bookings`, `subscribers`, `social_links`, `content_blocks`.

`founders.blueprint` is a `jsonb` column typed as `BlueprintItem[]` — always cast it when reading: `founder.blueprint as BlueprintItem[]`.

### Design System

Tailwind v4 — config lives entirely in `src/app/globals.css` under `@theme inline` (no `tailwind.config.ts`). Use the custom color tokens directly: `bg-charcoal`, `text-gold`, `border-sos-border`, etc.

Fonts are CSS variables: `var(--font-serif)` (Cormorant Garamond) and `var(--font-sans)` (Montserrat). Always set `style={{ fontFamily: "var(--font-serif)" }}` on serif elements — Tailwind's `font-serif` class alone won't apply the Google Font.

No border-radius anywhere (`--radius: 0`). The design is sharp-cornered by intent.

### Auth (Clerk)

`proxy.ts` checks whether Clerk env vars are present. If absent, `/admin/*` redirects to `/admin-setup` instead of throwing. This allows local dev without Clerk configured.

Sign-up is disabled — `proxy.ts` redirects `/sign-up` → `/sign-in`. Admin access is invite-only via Clerk dashboard.

### Founder Photos

Photos are stored in Vercel Blob. `src/lib/founder-blobs.ts` handles uploads. The `FounderPhoto` component (`src/components/founders/FounderPhoto.tsx`) wraps `next/image` and handles the Blob URL domain. `next.config.ts` must include any new image hostnames.

### Donation Links

`src/lib/donation-links.ts` reads env vars (`NEXT_PUBLIC_DONATION_PAYPAL_URL`, `NEXT_PUBLIC_DONATION_VENMO_URL`, etc.) and returns only configured links. The `/fund` page calls `hasDonationLinks()` to decide between showing payment buttons or a fallback contact section.

### Admin Server Actions

Each admin editor has a co-located `actions.ts` with `"use server"` functions. Never put `"use server"` at the top of a `page.tsx` — it breaks page component exports. Always put server actions in separate files.

### One-off DB Scripts

`src/lib/` contains several one-off scripts (`seed.ts`, `update-youtube.ts`, etc.). Run them with:
```bash
dotenv -e .env.local -- npx tsx src/lib/<script>.ts
```
