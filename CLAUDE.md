# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Profit First revenue-allocation ledger for Eridion Glass (a glazing business). The entire application is **one file: `index.html`** (~3,500 lines) — all CSS, markup, and JavaScript inline. There is no build system, no package.json, no dependencies, no tests, and no CI. It is deployed as a static page (GitHub Pages) and is one app in the "Eridion HQ" suite — the nav bar at the top links to sibling apps (`morning-brief`, `order-tracker`, `crm`, `eridion-snapshot`) hosted under the same `erikagonzalez103-hash.github.io` origin.

## Development workflow

- **Run**: open `index.html` in a browser. No server or build step required. Cloud sync and Xero features need network access to the worker (below).
- **Test**: manual, in the browser. Verify the tab(s) you touched render and that data survives a reload (localStorage round-trip).
- **Edit**: everything lives in `index.html`. CSS is in two `<style>` blocks near the top; all JS is one `<script>` block (lines ~867–3524).

## Architecture

### File layout inside index.html

1. `<style>` blocks — utility-class-free, hand-rolled CSS, dark navy/green theme.
2. HQ nav + header (sync badge, Backup/Restore buttons, Xero badge).
3. Tab bar + one `<div class="panel" id="panel-<name>">` per tab: `forecast`, `bills`, `expense`, `distribute`, `ledger`, `buckets`, `cashflow`, `reports`, `xero`.
4. Modals (mark-paid, quick-paid, bill edit, forecast edit, email scan).
5. One `<script>` block containing all logic. Sections are marked with `// ─── NAME ───` or `// ===` banner comments.

### Script ordering matters

The script is one top-level block with **init code executed inline** (around line ~2980: `loadData()`, `migrateForecasts()`, `autorollForecasts()`, render calls, `checkXeroStatus()`). The Bills v2 section is declared *after* that init block. Because newer sections use `const`/`let`, hoisting does not protect you — a previous TDZ bug required moving `loadBills()` below its declarations (commit `eed1a4e`). When adding code, keep declarations above any top-level call that uses them.

All functions referenced from inline `onclick="..."` attributes must remain global (no wrapping in modules/IIFEs).

### Tabs and rendering

`showTab(name, el)` toggles `.active` on tabs/panels and dispatches to per-tab render functions (`renderForecast`, `renderBills`, `renderLedger`, `renderBuckets`, `renderCashFlow`, `renderReports`, etc.). Rendering is done by building HTML strings and assigning `innerHTML`. Newer code escapes user data with `escBill()`; follow that pattern for any user-entered text.

### Data model — localStorage + cloud sync

Each store is a JSON array/object in localStorage with a dedicated `save*()` function that persists locally **and** calls `scheduleCloudSync()`:

| Store | Key |
|---|---|
| Incomes | `eg_income_v1` |
| Expenses | `eg_expense_v1` |
| Distributions | `eg_dist_v1` |
| Actual bucket balances | `eg_actual_v1` |
| Forecasts | `eg_forecast_v1` |
| Cash flow settings | `eridion_cashflow_settings_v1` |
| Bill schedule | `eridion_bill_schedule_v1` |
| Bills instances | `eridion_bills_v1` |
| Bills cash inputs | `eridion_bills_cash_v1` |

Cloud sync pushes/pulls a snapshot of all these stores to a **shared Cloudflare Worker** (`HQ_WORKER` / `WORKER_URL` = `https://frosty-base-f01e.erikagonzalez103.workers.dev`) via `PUT/GET /ledger/data`, with last-write-wins arbitration using an `updatedAt` timestamp stored under `eg_ledger_synced_at`. The same worker serves `/registry/builders` (builder-name datalist) and all `/xero/*` endpoints (Xero OAuth lives server-side in the worker — no client credentials). The header Backup/Restore buttons export/import the same snapshot as a JSON file.

The Cash Flow calendar also **reads the order-tracker app's localStorage directly** (`eridion_orders_v2`) — cross-app data sharing works because all HQ apps are served from the same origin. If you add a new persistent store, add its key to `ledgerSnapshot()` so it is included in cloud sync and backups.

### Domain logic

- **Profit First buckets**: income is split across six buckets by fixed percentages in `PCT` (`profit`, `owners`, `tax`, `opex`, `mat`, `subs`). `BUCKET_KEYS`, `BUCKET_LABELS`, `BUCKET_COLORS`, `BUCKET_ACCTS` describe them; `calcAlloc(payment, fee)` performs the split.
- **Stripe fees**: `calcStripeFee(p)` = 2.9% + $0.30; forecast payment modals can auto-compute this.
- **Forecast lifecycle**: rows in `forecasts` carry a status (forecast → paid / delayed / cancelled, with partial payments in a `payments` array). Helpers: `fcReceived`, `fcRemaining`, `fcNetTotal`. `autorollForecasts()` rolls unpaid rows forward monthly.
- **Bills v2**: `BILL_SCHEDULE_SEED` / `schedule` is the source of truth — each recurring bill lists which week(s) of the month (1–5) it falls in. `generateBillsForWeek()` instantiates bill rows per week; anything still Open rolls over to the current week. Week math is week-of-month based (`getWeekOfMonth`, `getNextWeek`).
- **Cash Flow calendar**: Monday-based weeks spanning the current month plus two weeks (`cfComputeWeeks`), joining forecasts, bills, order-tracker orders, and ledger history into a running-balance view against a low-cash threshold.
- **Xero import**: `syncFromXero()` fetches bank transactions via the worker; `mapXeroToBucket()` classifies them with the `BUCKET_RULES` regex table (contact + line-item description → bucket, RECEIVE defaults to income, SPEND defaults to opex); user reviews then imports per-transaction or in bulk. Imported Xero IDs are tracked to avoid duplicates.

## Conventions

- Vanilla JS, no framework. Older sections use `var` + ES5 style; newer sections (Bills v2, Cash Flow) use `const`/`let`. Match the style of the section you're editing.
- Dates are handled as `YYYY-MM-DD` strings (`todayStr()`, `daysUntil()`); months as `"Mon YYYY"` strings (`currentMonth()`, `monthSortKey()`).
- Money formatting via `fmt(n, dec)`, `cfFmt(n)` (whole dollars), `fmtBillMoney(n)` — reuse rather than adding new formatters.
- The file header comment (`<!-- Bills v2 schedule+rollover · YYYY-MM-DD -->`) is used as a version marker; commit messages historically name the feature/phase (e.g. "Phase 1: HQ nav + builder registry").
