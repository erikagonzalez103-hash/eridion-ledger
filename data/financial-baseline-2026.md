# Eridion Glass — Financial Baseline (2026-07-14)

Sources: eridion-ledger app backup JSON (Apr 1 – Jul 14, 2026) and the Xero
Income Statement, cash basis, Jan 1 – Jul 14, 2026. Owner-confirmed: the
"duplicate-looking" income entries are deposits + final payments (not doubles).

## Actual P&L — Jan 1 to Jul 14, 2026 (cash basis, ~6.5 months)

| Line | $ | % of sales |
|---|---|---|
| Sales | 284,564 | 100% |
| Materials | 122,014 | **42.9%** |
| Subcontractors | 47,407 | 16.7% |
| Sales taxes paid | 13,297 | 4.7% |
| Stripe fees | 2,556 | 0.9% |
| **Total COGS** | **185,273** | **65.1%** |
| **Gross profit** | **99,487** | **34.9%** |
| Operating expenses | 66,306 | 23.3% (~$10.2k/mo) |
| **Net income (before owner draws)** | **33,181** | **11.7%** |
| Owner draws (bill schedule, ~$4.6k/mo ≈ $30k for period) | ~30,000 | ~10.5% |
| **True economic profit after owner comp** | **~$3k** | **~1.2%** |

**The H1 diagnosis in one line: the business worked for free.** After paying
the owner a modest draw, H1 profit was ~1% of sales vs the 8% Stone floor —
a shortfall of ~$19k for the period (~$62k/yr at current run rate).

### Where it leaked

1. **Materials ran 42.9% of sales vs the 31.8% Profit First budget** — 11
   points ≈ $31k of H1 gross profit that the allocation model expected but
   never existed. Causes to separate in the audit: 2020 sell prices vs 2026
   glass costs (documented), breakage/remakes not billed, cash-basis timing
   (glass bought for jobs not yet invoiced), and supplier mix (M3 vs Imperial).
2. **Subs ran 16.7% vs 14.3% budget** — consistent with install sell lines
   priced below the ×1.45 rule (see standard-items margin check).
3. **Opex at $10.2k/mo is 2.2× the $4.7k/mo bill schedule** — the schedule
   misses: accounting $10.5k YTD, meals ~$4.8k, software $6.2k YTD, small
   tools $4.1k, bank charges + interest $5.6k, taxes & licenses $6.2k.
   Note bookkeeping+accounting ≈ 3.7% of revenue — high for this size.
4. **Q1 volume was weak:** Jan–Mar ≈ $109k (~$36k/mo) vs May–Jun ~$76k/mo.
   Overhead at $10.2k/mo is 23% of a $44k month but 13% of a $76k month —
   volume recovery alone repairs much of the margin, IF cost ratios hold.

### Revised Stone inputs (actuals-based)

```
O (true overhead)  = $10.2k/mo opex + $4.6k/mo owner comp ≈ $14.8k/mo ≈ $178k/yr
V (run rate)       ≈ $915k/yr (May–Jun pace) — H1 annualized only ~$525k
P (target)         = 8% floor / 10% target
Break-even markup at run-rate volume ≈ 1.38× on job cost (absolute floor)
PF-model markup (allocations hold)   ≈ 2.17× on job cost (the audit target)
Actual H1 whole-business markup      ≈ 1.54× (COGS 65.1%)
```

## Revenue run rate

| Month | Recorded income |
|---|---|
| Apr 2026 (first full month) | $22,088 |
| May 2026 | $71,723 |
| Jun 2026 | $80,887 |

Recent run rate ≈ **$76k/month → ~$915k/year annualized** — top of the owner's
$500k–$1M estimate.

## Client concentration (Apr–Jul recorded income, $175,248 total)

| Client | Revenue | Share |
|---|---|---|
| Grand Homes (all divisions) | $49,884 | 28.5% |
| **Trinity Stairs** | $45,507 | 26.0% |
| Martyn Hammer (custom) | $21,791 | 12.4% |
| DR Horton (TX + AR divisions) | $18,828 | 10.7% |
| Hines Homes | $11,711 | 6.7% |
| Pennington (commercial) | $9,232 | 5.3% |
| Direct / custom / other | $18,295 | 10.4% |

Notable: the owner named Grand Homes + Hines as the top two, but the ledger
shows **Trinity Stairs (glass stair/rail B2B) is the #2 revenue source** — a
different negotiation counterpart than a production builder, with its own
profile. Hines is 6.7% in this window. Top-2 concentration (Grand + Trinity)
= 54.5% of revenue.

## Profit First allocation (encoded in every income entry)

profit 12.7% · owners 10.7% · tax 17.0% · opex 13.5% · materials 31.8% ·
subs 14.3% — job-cost envelope (mat+subs) = **46.1% of revenue**, which implies
a whole-job markup of **100/46.1 ≈ 2.17× on total job cost** for the allocation
model to hold.

## Overhead (recurring bill schedule, monthly)

- **Business opex bucket: ≈ $4,740/mo** — GL insurance $692, Progressive auto
  $205, truck payments $827 + $386, tolls $476, gas $100, storage $356,
  bookkeeper $575, AT&T $284, utilities ≈ $553, security $70, software ≈ $215,
  DBA $84
- **Owner's comp bucket: ≈ $4,606/mo** (mortgages, health/dental/eye insurance,
  vehicle, personal) — paid as owner draws; counts as owner compensation in
  Stone's overhead definition
- Job-cost recurring: subs $2,500/mo + materials $375/mo (not overhead)
- **Stone overhead (opex + owner comp): ≈ $9,350/mo ≈ $112k/yr ≈ 12.3% of
  revenue at current volume**

## First-pass Stone markup derivation (annualized, budget-based)

```
V (volume)        ≈ $915k
C (job costs)     ≈ 46.1% of V ≈ $422k   (PF envelope; actuals TBD per item)
O (overhead)      ≈ $112k  (12.3%)
P (profit target) =  8% floor / 10% target → $73k–92k
Tax reserve       =  17% allocation (treated per PF model)

Required whole-job markup ≈ 2.17× total job cost
(sell price of any item ≥ 2.17 × [glass + fab + hardware + sub labor + measure])
```

Cross-check against the component rules: hardware ×1.60 and labor ×1.45 are
**below** the 2.17 whole-job requirement — the model only balances if the glass
markup carries the difference. On hardware- and labor-heavy items (sliders with
$810 kits, office enclosures with $860 sub labor) the blended markup falls well
short of 2.17 even when every component follows its rule. This is the structural
reason the audit needs per-item scoring, not just rule compliance.

## Repricing constraint: the locked vs. flexible segments (owner, 2026-07-14)

**Grand Homes and DR Horton prices are set once a year and barely movable
mid-cycle** (GH: little room; DRH: even less). That locks ~39% of revenue
(GH 28.5% + DRH 10.7%) at current pricing until each renewal. Strategy split:

- **Flexible segment (~61% of revenue) — reprice NOW:** Trinity Stairs (26%),
  Martyn Hammer and custom/direct (~14%), Pennington/commercial (5.3%),
  Hines (6.7%), and all homeowner work. Mirrors (three packages below
  break-even) can be fixed immediately here. This segment must carry an
  above-target markup to offset the locked builders until their renewals.
- **Locked segment — prepare the annual renewal package:** full clause-25
  cost documentation (M3 2020 vs 2026 + energy surcharge history), the
  per-item audit, and the negotiation prep brief, ready well before each
  renewal date. `TODO: GH and DRH renewal months` — the prep clock runs
  from those dates.
- DRH also carries the quiet IDRH labor discount ($225 flat vs $250 standard
  3-panel rate) — fold into the renewal ask rather than fighting it mid-year.

## Data-quality flags (verify before trusting shares above)

1. ~~Possible duplicate income entries~~ — RESOLVED: owner confirms these are
   deposit + final-payment pairs, not duplicates. Client shares stand.
2. **Actual expenses aren't tracked in the app** (expense store holds only
   opening balances) — bills schedule is the overhead source of truth;
   materials/subs actuals live in Xero.
3. DR Horton splits across two Xero contacts (TX and "NW Arkansas & Little
   Rock") — merge for the builder profile; also owner operates in two states
   (TX/AR tax schedules both present).
