# MotionVault

**The treasure vault for animated web design** — a unified platform inspired by the five
"treasure websites" designers use to cure flat AI-generated sites:

| Vault | Inspired by | What's inside |
|---|---|---|
| **Site Templates** (`/templates`) | Motion Sites | 50 complete animated landing pages (8 industries × 5+ visual styles), each with a copy-paste AI prompt |
| **Components** (`/components`) | React Bits + Aceternity UI | 173 advanced animated components (3D cards, glass navbars, modals, carousels, dropdowns…) |
| **UI Elements** (`/elements`) | Uiverse | 145 micro-elements (buttons, loaders, toggles, inputs, badges, ratings…), 12 palette variants |
| **Animations** (`/animations`) | Anime.js | 150 motion snippets (particle fields, confetti, sine waves, scramble text, magnetic hover…)**518 assets total.** Wave 25+ content is generated from a family × palette system
(`src/lib/seed/gen/`): each design family renders once per curated palette, so every variant is a
real, working preview with its own AI prompt — add a family once and get 8+ color stories for free.

Every asset ships with:

- ⚡ a **real live preview** — self-contained HTML running in a sandboxed iframe (no CDN, works offline)
- 📋 the **full source code** (inline CSS/JS, vanilla web — copy straight into any project)
- 🤖 a **detail-rich AI prompt** — paste it into Cursor / Claude Code / Codex / v0 / domestic LLMs to reproduce the asset 1:1
- ⭐ views / stars / copies tracking, tags, tech badges and related assets

## Tech stack

- **Next.js 15** (App Router, Server Components + Route Handlers)
- **TypeScript** + **Tailwind CSS 3**
- **JSON file store** (`data/vault.json`) behind a repository-style data layer (`src/lib/db.ts`)
  — swap for SQLite/Postgres by replacing that one module; native module builds are avoided
  so the app runs anywhere without node-gyp.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Public frontend

- `/` — hero, stats, four vaults, featured assets, how-it-works, tag cloud, newest, CTA
- `/templates` · `/components` · `/elements` · `/animations` — category pages with live-search,
  tag filter, tech filter and four sort orders
- `/explore` — everything, searchable (`?q=`, `?tag=`)
- `/item/[slug]` — detail page: tabbed **Live Preview / Source Code / AI Prompt**, one-click copy
  (copy buttons increment a per-item counter), related assets

## Admin center (`/admin`)

**Demo credentials: `admin` / `motion123`** (changeable in Settings)

- **Dashboard** — total assets, views, copies, stars; per-category distribution bars;
  recent activity log; most-copied prompts; recently updated items
- **All Items** — searchable/filterable table with inline *publish/draft* and *featured* toggles,
  delete-with-confirm, edit and view-live links
- **Add / Edit Item** — full editor with basics, comma-separated tags, tech multi-select,
  stats, publish/featured flags, the AI prompt field, and the self-contained preview HTML field
  with a **live test preview** rendered as you type
- **Settings** — site name, tagline, hero title/subtitle and admin credentials

All admin mutations go through protected API routes (`/api/admin/*`) that check an httpOnly
session cookie; the data layer logs every create/update/delete/login to the activity feed.

> ⚠ The auth is intentionally demo-grade (cookie token, credentials in the JSON store).
> Put a real auth provider + hashed passwords in front of it before production use.

## User accounts & social sign-in

Public auth lives at **`/login`** and **`/register`** — email+password (scrypt-hashed,
HMAC-signed httpOnly session cookie `mv_user`) plus **Continue with Google / GitHub**.

OAuth is env-driven; copy `.env.example` → `.env.local` and fill in:

| Variable | Where to get it | Callback to register |
|---|---|---|
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google Cloud Console → APIs & Services → Credentials (Web application) | `<origin>/api/auth/oauth/google/callback` |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | github.com/settings/developers → New OAuth App | `<origin>/api/auth/oauth/github/callback` |
| `AUTH_SECRET` | any long random string | — |

If a provider's keys are missing, its button automatically runs in a labelled **demo mode**
(signs in a demo account) so the flow stays testable in previews. OAuth state is carried in a
short-lived httpOnly cookie (`mv_oauth_state`) and the callback verifies it before exchanging
the code for a profile; accounts are upserted by provider id into `data/vault.json`.

API: `POST /api/auth/register|login|logout` · `GET /api/auth/me` ·
`GET /api/auth/oauth/<google|github>` (+`/callback`).

## Project layout

```
src/
  app/
    page.tsx                 # home
    [category]/page.tsx      # /templates /components /elements /animations
    explore/                 # cross-category search
    item/[slug]/             # detail + tabs (DetailClient)
    admin/                   # admin layout (login shell), dashboard, items CRUD, settings
    api/                     # copy tracking + admin auth/items/settings route handlers
  components/                # SiteHeader, SiteFooter, ItemCard, VaultBrowser, icons
  lib/
    types.ts                 # Item / Settings / DB types
    categories.ts            # the four vaults + tech labels
    db.ts                    # JSON-store data layer (items CRUD, stats, settings, events)
    seed/                    # 54 curated assets: each html preview + AI prompt
```


## New features

- **React/TSX component downloads** — 45 curated assets ship with a real, type-checked
  React + Tailwind + TypeScript component (read from `content/react-src/*.tsx`). The detail
  page shows a **React (TSX)** tab with copy + download (`/r/[slug]/component.tsx`); cards
  show a ⚛ TSX badge.
- **Dark / light preview toggle** — every live preview can switch themes; light mode injects
  CSS-variable overrides into the sandboxed iframe.
- **Bilingual UI (English / 中文)** — a header switcher sets a cookie; the whole public site
  (nav, hero, categories, filters, detail page, footer) follows. Item titles/prompts stay in
  English as they target AI coding tools.
- **Admin trend chart** — 21-day daily views/copies stats with an SVG area chart and week-over-week
  delta; stat cards now include a "Pending review" count.
- **Community submissions + favorites** — anyone can submit an asset at `/submit` (with a live
  sandbox preview); it lands in `/admin/submissions` for **approve/reject review**. Approved items
  publish into the vault. The ♥ on any card saves favorites to `localStorage`, viewable at `/favorites`.
