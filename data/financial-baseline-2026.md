# Eridion Glass — Financial Baseline (from ledger backup, 2026-07-14)

Source: eridion-ledger app backup JSON (data window Apr 1 – Jul 14, 2026; app
launched Apr 1). Numbers are as-recorded; see data-quality flags at bottom.

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

## Data-quality flags (verify before trusting shares above)

1. **Possible duplicate income entries.** Trinity Stairs "3213 Santa Bella"
   $8,208.42 appears 3× (two dated 2026-06-10 with the same invoice 2093) plus
   $6,715.98 2× ; Hines "222 Abington" $3,816.66 2×; Martyn Hammer $5,992.53 2×
   and $4,902.97 2×. Notes say "payment 2/3/4" — equal progress payments are
   plausible, but two identical entries on the same date for the same invoice
   look like double-recording. If duplicates, Trinity's share (and total
   revenue) is overstated.
2. **Actual expenses aren't tracked in the app** (expense store holds only
   opening balances) — bills schedule is the overhead source of truth;
   materials/subs actuals live in Xero.
3. DR Horton splits across two Xero contacts (TX and "NW Arkansas & Little
   Rock") — merge for the builder profile; also owner operates in two states
   (TX/AR tax schedules both present).
