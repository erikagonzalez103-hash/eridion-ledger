# TOOLS.md — Eridion / Quinta & Co. Tool Registry

**Owner:** Erika Gonzalez · **Last updated:** July 23, 2026
**Purpose:** Living inventory of every custom tool built. Claude Code: read this alongside CLAUDE.md at the start of any session that touches an existing app. When you ship a change, update the relevant entry (status, roadmap, date).
**Searchable viewer:** erikagonzalez103-hash.github.io/eridion-ledger/tools.html — reads this file directly, so editing TOOLS.md is all that's needed; the viewer stays current automatically.

---

## Status legend

- 🟢 **Live** — deployed and in active use
- 🟡 **Live-partial** — deployed, but a core module or integration is incomplete
- 🔵 **In development** — actively being built
- 📄 **Spec drafted** — scoped and documented, not yet built
- 💭 **Concept** — idea stage, no spec
- ⏸️ **Parked** — intentionally on hold

---

## Shared infrastructure

| Component | Detail |
|---|---|
| Hosting | GitHub Pages (`erikagonzalez103-hash.github.io`) — push = live |
| Primary Worker | Cloudflare `frosty-base-f01e` (Francisco, message bus, snapshot API) |
| Ledger Worker | `eridion-xero-worker` (Xero OAuth + sanitized data endpoints) |
| Image Worker | `eridion-image-library` — public image serving + passphrase-gated management for R2 bucket `eridion-assets` (deployed July 24, 2026) |
| Storage | Cloudflare KV namespace `ERIDION_KV` (note: eridion-xero-worker has its own namespace — token copy issue resolved April 2026) |
| AI model string | `claude-sonnet-4-6` (never the deprecated `claude-sonnet-4`) |
| Front-end standard | Single-file vanilla HTML/CSS/JS, no build step |
| Brand palette (confirmed June 2026 — supersedes all earlier values) | Navy `#153862` (primary) · Green `#32A200` (accent/CTA) · Light Gray `#C4C4C4` (secondary/borders) · Black `#000000` (text) · light backgrounds preferred |
| ⚠️ Known drift | CLAUDE.md (June 23, 2026) still lists the older April palette (`#24324D` etc.) — update it to match the row above. (Not in the eridion-ledger repo — locate which repo/project holds it.) |
| ⚠️ Worker source control | Neither `frosty-base-f01e` nor `eridion-xero-worker` has a GitHub repo in the account (verified July 23, 2026) — Worker source appears to live only in Cloudflare. Consider exporting to a repo for backup/versioning. |

---

## 1. Eridion Glass — Operations

### Order Tracker 🟢
- **Location:** [`erikagonzalez103-hash/order-tracker`](https://github.com/erikagonzalez103-hash/order-tracker)
- **URL:** erikagonzalez103-hash.github.io/order-tracker/
- **Purpose:** Track glass orders by job number from receipt → delivery → payment
- **Features:** Smart Glazier CSV import, AI invoice scanning, payment email generator
- **Roadmap:** Sync with Profit First Ledger via job number as linking key

### Profit First Ledger 🟡
- **Location:** [`erikagonzalez103-hash/eridion-ledger`](https://github.com/erikagonzalez103-hash/eridion-ledger) (frontend) · Cloudflare Worker `eridion-xero-worker` (backend — no GitHub repo, see Shared infrastructure)
- **URL:** erikagonzalez103-hash.github.io/eridion-ledger
- **Purpose:** Profit First tracking across 8 Capital One bucket accounts (internal only — never referenced publicly)
- **Backend:** `eridion-xero-worker` — OAuth complete, tokens in KV, passphrase-gated endpoints, account numbers sanitized at Worker level
- **Gap:** Frontend sync UI not yet built (backend done April 9, 2026)
- **Roadmap:** (1) Sync button → pull month transactions; (2) auto-categorize to buckets; (3) budget vs. actual; (4) AI coaching layer; (5) check/remittance photo scan → AI auto-fill (Grand Homes remittance = priority 1, Hines Bill.com = priority 2, Stripe screenshots = priority 3; DR Horton needs a manual translator/lookup table); (6) Order Tracker sync via job number
- **Note:** This repo previously hosted the pricing audit + negotiation prep pages; both moved to `eridion-pricing` (redirect stubs remain at /pricing.html and /negotiation.html)

### Estimate Studio 🔵
- **Location:** [`erikagonzalez103-hash/eridion-pricing`](https://github.com/erikagonzalez103-hash/eridion-pricing) — also holds the pricing audit + negotiation prep tools moved out of eridion-ledger
- **Purpose:** Custom pricing layer on top of Smart Glazier (Path C hybrid strategy) — AI pricing, Profit First margin validation, sub labor cost
- **Status:** Phase 1 built; later phases scoped in Smart Glazier integration blueprint

### Eridion Snapshot (Weekly) 🟢
- **Location:** [`erikagonzalez103-hash/eridion-snapshot`](https://github.com/erikagonzalez103-hash/eridion-snapshot) · snapshot API on Worker `frosty-base-f01e`
- **Purpose:** 4-tab weekly business snapshot: Summary, Sales, Cash Flow (AP/vendor bills from Order Tracker), YOY (2026 projection off 2025 pace + AI insight callouts)
- **Automation:** Francisco auto-generates every Monday
- **Print mode:** All 4 tabs, 3–5 pages, 8.5×11

### ScopeKit 🟢
- **Location:** [`erikagonzalez103-hash/scopekit`](https://github.com/erikagonzalez103-hash/scopekit)
- **Purpose:** Scope/spec tooling for jobs (single-file app on GitHub Pages)

---

## 2. Eridion Glass — Sales & Marketing

### Outreach CRM 🟢
- **Location:** [`erikagonzalez103-hash/crm`](https://github.com/erikagonzalez103-hash/crm)
- **URL:** erikagonzalez103-hash.github.io/crm/
- **Purpose:** B2B outreach to luxury builders — contacts, sequences, copy
- **Features:** 7 role-specific copy tracks (CEO, Purchasing, Ops, Supervisor, Designer, Woman-Owned, DBA), 4-touch + LinkedIn sequence, Luxury Builder Warm 6-touch, FIFA 14-day sprint tab, bulk Excel import w/ duplicate detection, response intake with tone analysis, custom copy blocks, AI ✦ Personalize (content library, Colorback case study pre-loaded), CSV export
- **Roadmap:** Copy library → contact assignment; grow the content library from Social Campaign Studio output

### Social Campaign Studio 🟢 (v2.0)
- **Location:** [`erikagonzalez103-hash/eridion-social-campaign-studio`](https://github.com/erikagonzalez103-hash/eridion-social-campaign-studio)
- **Purpose:** Weekly blog + social content generator with built-in research
- **v3.0 roadmap:** Instagram format, SEO package generator, blog header fix, Canva spec generator, voice training, LinkedIn OAuth direct posting, Instagram API, Wix API blog auto-publish, MP4 upload, session persistence, automated cross-posting, post lifespan extender

### Image Library 🟢 (July 2026)
- **Location:** R2 bucket `eridion-assets` (storage) · Worker `eridion-image-library` (API) · frontend `image-library.html` + Worker source `workers/image-library-worker.js` in [`erikagonzalez103-hash/eridion-ledger`](https://github.com/erikagonzalez103-hash/eridion-ledger)
- **URL:** erikagonzalez103-hash.github.io/eridion-ledger/image-library.html
- **Worker:** https://eridion-image-library.erikagonzalez103.workers.dev (deployed July 24, 2026) — public image URLs are `…workers.dev/img/<filename>`; list/upload/tag/delete gated by `LIBRARY_KEY`
- **Purpose:** Tagged image library — filter by tag chips, search, upload w/ tags, edit tags, delete, and **Copy URL** for a stable public link per image
- **First open:** enter the Worker URL + passphrase in the app's ⚙ Settings (stored in that browser only)
- **Manual fallback:** dash.cloudflare.com → R2 → `eridion-assets` → click an image → Download

---

## 3. Francisco / Agent Infrastructure

### Francisco — Morning Brief / Command Center 🟡
- **Location:** [`erikagonzalez103-hash/morning-brief`](https://github.com/erikagonzalez103-hash/morning-brief) (frontend) · Cloudflare Worker `frosty-base-f01e` (backend — no GitHub repo, see Shared infrastructure)
- **URL:** erikagonzalez103-hash.github.io/morning-brief/
- **Architecture:** Option B — separate module files sharing one nav bar
- **Live:** Xero OAuth integration, win-back scanner, cron checklist pipeline (every 15 min, 7am–6pm M–F: Grand Homes completion emails, invoice BCCs, Capital One ACH, builder POs, Zuritex/Ryan invoices)
- **Blocker:** Microsoft Entra client secret + 3 Cloudflare Worker env vars (last step before email agent goes fully live). Tenant `8d56a07e-...`, Client `7f81efad-...`
- **KV schema:** `actions:log`, `actions:pending`, `jobs:{address}`, `user:erika:prefs`, `user:dion:prefs`, `mode:current`

### Process Library 🟢
- **Location:** ⚠️ *No `process-library` repo exists in the account (verified July 23, 2026), yet the URL below implies one — it may live as a module inside `morning-brief` or the URL may be outdated. Confirm and update.*
- **URL:** erikagonzalez103-hash.github.io/process-library/
- **Purpose:** Documented business processes (e.g., Grand Homes two-stage BuildPro completion detection); linked into Command Center nav

### Agent-to-Agent Message Bus 🟢
- **Location:** Cloudflare Worker `frosty-base-f01e` (no GitHub repo)
- **Purpose:** Francisco ↔ Biff communication layer

### Biff → Jericho (Dion's agent) 📄
- **Location:** [`erikagonzalez103-hash/Jericho`](https://github.com/erikagonzalez103-hash/Jericho) (last pushed May 2, 2026)
- **Status:** Jericho is the evolution of Biff (confirmed July 23, 2026). Context document drafted; not yet live. Older references to "Biff" (message bus, Module 10) refer to this agent.

### Module 10 — "Blackbox" Continuity Playbook 📄
- **Location:** Spec document only — not yet in a repo
- **Spec drafted:** April 27, 2026
- **Purpose:** Auto-generated continuity playbook from Xero/Order Tracker/CRM/KV → encrypted versioned PDF pushed to Biff KV for emergency Dion access; dead man's switch included

---

## 4. Strategy & Finance Tools

### Grant Pipeline Tracker 🔵
- **Location:** [`erikagonzalez103-hash/grant-tracker`](https://github.com/erikagonzalez103-hash/grant-tracker)
- **Scope:** Eridion + Quinta & Co. grants; single-file HTML on GitHub Pages
- **Hot item:** AT&T "She's Connected" contest — closes July 31, 2026, $50K

### Valuation Worksheets 🟢
- **Location:** *Unconfirmed — no obvious repo match; see "Unmatched repos" below. Confirm and update.*
- **Path to Exit:** target ~$6M enterprise value / ~$4M combined take-home
- **Path to Franchise:** parallel scenario worksheet

---

## 5. Quinta & Co.

### Workshop Signup Form 🟢
- **Location:** [`erikagonzalez103-hash/quinta`](https://github.com/erikagonzalez103-hash/quinta) · Supabase project (DB + Edge Functions)
- **URL:** /quinta/signup/ (GitHub Pages)
- **Stack:** Supabase (DB + Edge Functions) + Resend + Stripe (manual invoicing, cohorts 1–3)
- **Known gotcha:** Resend sends must come from `quintaand.co` (verified domain), NOT `send.quintaand.co` — 403s hide behind green dashboard bars

### Prep Tool Template (reusable) 🟢
- **Location:** *Unconfirmed — no obvious repo match; see "Unmatched repos" below. Confirm and update.*
- **Format:** Single HTML, Cinzel + near-black + gold, sidebar nav, search, click-expand Q&A, mobile-responsive, chunked Read Aloud (180/350/650ms pauses), voice picker, speed slider, 14 sections, TL;DR, callouts, flag analysis, local save
- **Use:** Any cert/interview prep build

### Fortune Teller ❓ TBD
- **Location:** [`erikagonzalez103-hash/fortune_teller`](https://github.com/erikagonzalez103-hash/fortune_teller)
- **Purpose/status:** Assigned under Quinta & Co. (July 23, 2026) — purpose, status, and URL to fill in

### HER House Tool ❓ TBD
- **Location:** [`erikagonzalez103-hash/her-house-tool`](https://github.com/erikagonzalez103-hash/her-house-tool)
- **Purpose/status:** Assigned under Quinta & Co. (July 23, 2026) — purpose, status, and URL to fill in

---

## 6. Community (HER Dallas)

### Sponsor CRM 🟢
- **Location:** [`erikagonzalez103-hash/her-dallas-crm`](https://github.com/erikagonzalez103-hash/her-dallas-crm)
- **File:** HerDallas_Sponsor_CRM.html (mobile-optimized)
- **Data:** 38 named contacts with LinkedIn personalization intel; 48-org community partner list, 4 tiers

---

## 7. Pulse (early-stage venture)

Separate company being built slowly alongside Eridion and Quinta & Co.

### Pulse Dashboard 🔵
- **Location:** [`erikagonzalez103-hash/pulse-dashboard`](https://github.com/erikagonzalez103-hash/pulse-dashboard)
- **Purpose/status:** Details to fill in

### Pulse Demo 🔵
- **Location:** [`erikagonzalez103-hash/pulse-demo`](https://github.com/erikagonzalez103-hash/pulse-demo)
- **Purpose/status:** Details to fill in

---

## Repo directory

Snapshot of every GitHub repo in the account (July 23, 2026) and what it maps to.

| Repo | Registry entry | Last push |
|---|---|---|
| `order-tracker` | Order Tracker | Jul 2, 2026 |
| `eridion-ledger` | Profit First Ledger (+ this registry) | Jul 22, 2026 |
| `eridion-pricing` | Estimate Studio · pricing audit · negotiation prep | Jul 17, 2026 |
| `eridion-snapshot` | Eridion Snapshot (Weekly) | Jul 1, 2026 |
| `scopekit` | ScopeKit | Jul 2, 2026 |
| `crm` | Outreach CRM | Jul 2, 2026 |
| `eridion-social-campaign-studio` | Social Campaign Studio | Jul 19, 2026 |
| `morning-brief` | Francisco — Morning Brief / Command Center | Jul 2, 2026 |
| `grant-tracker` | Grant Pipeline Tracker | Jul 14, 2026 |
| `quinta` | Workshop Signup Form | Jul 21, 2026 |
| `her-dallas-crm` | HER Dallas Sponsor CRM | Apr 23, 2026 |
| `Jericho` | Biff → Jericho (Dion's agent) | May 2, 2026 |
| `pulse-dashboard` | Pulse Dashboard | Jun 24, 2026 |
| `pulse-demo` | Pulse Demo | Jul 3, 2026 |
| `fortune_teller` | Fortune Teller (Quinta & Co.) | Jun 30, 2026 |
| `her-house-tool` | HER House Tool (Quinta & Co.) | Jun 7, 2026 |

### Cleanup

All repos are now mapped to registry entries except the one below.

| Repo | Last push | Note |
|---|---|---|
| `florals` | Jul 9, 2026 | Speed-build demo (flower shop site, 45 min w/ hardening) — **to be deleted** (Erika, July 23, 2026); remove this row once deleted |

---

## Cross-cutting roadmap (multi-app)

1. **Job number as universal linking key** — Order Tracker ↔ Ledger ↔ Estimate Studio
2. **Brand palette migration** — rebrand older apps to the June 2026 palette (Order Tracker, CRM, Ledger, Social Campaign Studio, HER Dallas CRM eligible)
3. **Command Center consolidation** — modules join the shared nav as they mature (Processes ✅, Vendors, Contacts/win-back)
4. **Francisco go-live** — Entra secret + env vars, then email agent fully autonomous

---

## Maintenance rules (for Claude Code)

- Update this file in the same commit as any feature change to a listed app
- New tool = new entry with status, URL, purpose, stack, roadmap
- Every entry gets a **Location** line — the GitHub repo (linked) and any backend (Worker, Supabase, etc.); the tools.html viewer surfaces it in search
- Status changes get a date in parentheses, e.g., "🟢 Live (July 2026)"
- Never commit secrets here; they live in Cloudflare env vars
- Keep CLAUDE.md and this file consistent — CLAUDE.md is *how to work*, TOOLS.md is *what exists*
- tools.html parses this file's structure (`##` categories, `###` tool headings with a status emoji, `- **Key:** value` bullets) — keep that shape so entries stay searchable
