# Fable Magazine

India's premium digital discovery magazine — a Next.js 16 + Supabase + Claude AI editorial-commerce platform.

Built with:
- **Next.js 16** (Turbopack, App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Supabase** (Postgres + Auth + Storage + RLS)
- **Claude Sonnet 4.6** (content generation, quality checks)
- **Ahrefs + DataForSEO** (keyword research)

## What this is

A full operating system for a premium Indian digital magazine:

### For readers
- **Homepage** — curated editorial + commerce discovery
- **Trending Radar** — live trending topics across India, scored on 8 factors
- **7 categories** — Technology, AI Tools, Shopping, Money, Lifestyle, Entertainment, Travel
- **Shopping ecosystem** — buying guides, product comparisons, verified deals
- **Article pages** — editorial layouts, sticky TOC, related content, author bios
- **Newsletter** — daily digest subscription

### For editors
- **Admin dashboard** — overview of drafts, trends, approvals
- **Article management** — CMS with draft → review → scheduled → published workflow
- **Trend Radar** — discovered topics from Google Trends, News, Reddit, YouTube, e-commerce
- **Keyword research** — Ahrefs + DataForSEO integration with India-focused opportunities
- **AI content generator** — brief → research → outline → draft → quality check → human review
- **Publishing calendar** — monthly view, drag-and-drop, auto-publish off by default
- **Product catalog** — verified prices, affiliate links, merchant tracking
- **Newsletter composer** — daily digest flow
- **Affiliate dashboard** — click tracking, conversion attribution
- **Analytics** — page views, popular articles, affiliate performance

## Research outputs (saved during build)

- `BRAND_RESEARCH.md` — 168 brand names researched, top 3: Dhammak, Indiopia, Haalchal
- `MARKET_RESEARCH.md` — Indian digital media competitive landscape + monetization
- `KEYWORD_RESEARCH.md` — 307 verified India keywords across 7 categories (Ahrefs sourced)
- `keywords_india_master.csv` — flat CSV for import into keyword database

## Quick start

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY

# 3. Set up Supabase
# Create project at supabase.com → Settings → Database → paste supabase/schema.sql

# 4. Run dev
npm run dev
# → http://localhost:3000
```

### Admin access
- Visit `/admin/login`
- Magic-link login via Supabase Auth
- First user must have role manually set to `admin` in `profiles` table

## File map

```
src/
├── app/
│   ├── (public)/        # Public-facing site (32 pages)
│   │   ├── page.tsx     # Homepage
│   │   ├── trending/
│   │   ├── [category]/[slug]/   # Article pages
│   │   ├── shopping, deals, buying-guides, product-comparisons
│   │   ├── compare/[comparison]/
│   │   ├── authors/, collections/[slug]/, tag/[tag]/
│   │   └── about, contact, privacy-policy, terms, ...
│   ├── (admin)/admin/   # Admin panel
│   │   ├── page.tsx     # Dashboard
│   │   ├── articles/, calendar/
│   │   ├── trends/, keywords/, generate/
│   │   ├── products/, affiliate/, newsletter/
│   │   └── analytics/, settings/
│   ├── api/
│   │   ├── ai/generate      # Claude article generation
│   │   ├── trends/pull      # Trend radar collection
│   │   ├── cron/trends      # Scheduled trend collection
│   │   ├── newsletter/subscribe
│   │   └── affiliate/click  # Affiliate click tracking + redirect
│   ├── sitemap.ts, robots.ts
│   └── layout.tsx
├── components/
│   ├── ui/              # Button, Container, Badge, SectionHeading, ClientDate
│   ├── layout/          # Header, Footer, TickerBar
│   ├── editorial/       # ArticleCard variants
│   ├── commerce/        # ProductCard variants
│   ├── admin/           # AdminShell, AdminPageHeader
│   └── forms/           # NewsletterForm
├── lib/
│   ├── ai/claude.ts     # Article outline, draft, quality checks
│   ├── trends/sources.ts # Google News, Reddit, scoring
│   ├── seo/schema.ts    # Schema.org JSON-LD builders
│   ├── supabase/        # client, server, middleware
│   ├── sample-content.ts # Dev seed data
│   └── utils.ts         # cn, formatDate, formatINR, slugify
├── config/
│   ├── brand.ts         # Central brand identity — swap to rebrand
│   └── site.ts          # Nav, footer config
├── types/content.ts
└── proxy.ts             # Next 16 edge middleware (auth guard)
supabase/schema.sql      # Full database schema with RLS
```

## Design system

- Palette: warm cream background (`#FAF6F1`), ink foreground (`#0A0A0B`), rust accent (`#D4502C`), gold (`#C9A961`)
- Typography: Fraunces (editorial serif), Inter (sans), JetBrains Mono (labels)
- Pattern: generous whitespace, sharp (non-rounded) buttons, rule-above section headings, tracked mono eyebrows

All design tokens live in `src/app/globals.css`. All brand identity in `src/config/brand.ts` (swap in one line).

## Automation & scheduling

Cron endpoints protected by `CRON_SECRET`:

- `/api/cron/trends` — pull trends every 4-6 hours

Point Railway Cron (or external scheduler) at these URLs with the secret header `x-cron-secret`.

## Deployment (Railway)

```bash
# 1. Push to GitHub
# 2. railway init
# 3. railway up
```

`railway.toml` is pre-configured. Set all env vars in Railway dashboard before first deploy.

## Editorial principles

- **No fabrication**: prices, stats, reviews — if we can't verify, we don't publish.
- **AI content is marked**: `is_ai_generated` in article metadata + editorial disclosure.
- **Auto-publish is off**: all drafts need human approval, always.
- **India-first**: INR pricing, Indian cities, Indian context — not localized American content.
- **DPDP 2023 compliance**: privacy policy follows India's Digital Personal Data Protection Act.
- **Google Search Essentials**: no spam, no keyword stuffing, content for people.

## What's intentionally left for human setup

- **Brand name finalization** — top 3 options in `BRAND_RESEARCH.md`, swap via `src/config/brand.ts`
- **Supabase project creation** — run `supabase/schema.sql` on your new project
- **API keys** — Anthropic, Ahrefs, DataForSEO, Resend (newsletter)
- **Google Search Console + GA4** — verify after first deploy
- **Affiliate network credentials** — Amazon Associates, Cuelinks, EarnKaro
- **Domain purchase** — Dhammak.com, .in, .co all available at time of research
- **Logo + brand assets** — placeholder "Fable" wordmark in place

## License

Proprietary — © Fable Magazine 2026.
