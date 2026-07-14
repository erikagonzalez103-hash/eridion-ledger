# Eridion Glass — Business Profile & Cost Inputs

Working data file for the pricing audit. Captured from the owner interview and
uploaded supplier documents on 2026-07-14. This is the raw input to the cost
model — update it as better numbers arrive. **Gaps are marked `TODO`.**

## Company snapshot

- Eridion Glass — glass subcontractor, DFW (Dallas–Fort Worth)
- Revenue: ~$500k–$1M/yr (trailing 12 months, owner estimate) — `TODO: exact from Xero`
- Customers: production builders dominate; **1–2 builders hold most of the revenue**
  - Builders: **Grand Homes** and **Hines Homes** highest, then **DR Horton** — `TODO: rough % share each`
- Sell prices: **mostly 2020 opening prices** — never repriced from a cost model
- Profit target: none has ever been set. Audit decision: start at Stone's 8% net
  floor, target 10% once the price list is repaired.

## Product lines (all real revenue lines)

1. Frameless shower enclosures (3/8" heavy glass)
2. Framed / semi-frameless showers
3. Mirrors (vanity, closet)
4. Glass staircases / stair rail
5. Balcony railings (interior + exterior)
6. Pool fences
7. Kitchen cabinet glass
8. Architectural glass

## Labor model

- Sub installers (1099), paid **flat rate per job, varies by job type**
- Sub flat-rate table captured — see `data/standard-items-2026.md`. Pricing rules: hardware cost ×1.60, sub labor cost ×1.45.

## Overhead

- Source of truth: Xero (connector currently unavailable in this session)
- `TODO: trailing-12-month operating expenses — via Xero pull, ledger backup JSON`
  `export, or owner estimate`

## Material costs (from uploaded supplier docs, July 2026)

### M3 Glass Technologies — Irving, TX (confidential price sheet, per sqft)

- Clear glass: 3/16" $5.53 · 1/4" $5.53 · 3/8" $4.40 · 1/2" $4.24 · 5/8" $32.04 · 3/4" $33.53
- Starphire low-iron: 1/4" $17.54 · 3/8" $19.25 · 1/2" $19.18
- Clear mirror 1/4": $8.49
- Temper & polish (all types): 1/4" $1.59 · 3/8" $3.17 · 1/2" $4.60
- Fabrication: hole ≤2" $5.63 · hole 2–5" $13.47–19.59 · shower hinge notch $9.98 ·
  clamp notch $9.98 · buttress notch $18.72 · EnduroShield $2.92/sqft
- **Energy surcharge on all orders, not included in sheet prices** — `TODO: current %`
- Effective 3/8" clear tempered/polished: **≈ $7.57/sqft + surcharge + fab**

### Imperial Glass — Dallas, TX (per sqft, tempered)

- 1/4" clear $4.99 · 3/8" clear $6.99 · 1/2" clear $12.00
- 7 manufacture days, pickup or deliver-to-site
- **Beats M3 on base 3/8" tempered (~8% before M3's surcharge)** — leverage for
  supplier negotiation and a second-source option

### Sky Building Materials — Dallas, TX (pre-fab 3/8" shower doors, each)

- Standard sizes 24–28" × 71–79": $80–90/door; out-of-square: $88–90
- 10+ doors: negotiable "special price"
- ≈ $5.85/sqft **finished** (28×79 @ $90) — make-vs-buy benchmark for standard
  doors and a cost ceiling argument for suppliers

### CR Laurence (crlaurence.com) — hardware

- Hinges, clamps, handles, channel, headers for showers; rail fittings
- `TODO: typical hardware cost per frameless shower set $__, per rail ft $__`

## Sell-side price lists (what Eridion charges builders)

- Captured: standard-item catalog with current system sell rates — see `data/standard-items-2026.md`
- `TODO: any builder-specific price lists that differ from the standard catalog`

## First-run audit checklist (from pricing-playbook.md)

- [x] Collect supplier material costs (M3, Imperial, Sky)
- [x] Installer rate table (Stock Default Costs screenshot)
- [ ] Hardware costs per job type (CRL)
- [ ] Overhead trailing 12 months
- [ ] Exact revenue + volume by product line
- [ ] Builder list w/ revenue share, payment terms, retainage
- [x] Standard-item sell catalog (test quote); TODO builder-specific overrides
- [ ] Derive required markup; score every price-list line
