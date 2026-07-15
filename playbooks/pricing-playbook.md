# Eridion Glass — Pricing Playbook

The knowledge base for the Eridion pricing tool. Every recommendation the pricing
agent makes should trace back to a principle in this file. Frameworks are distilled
from Michael C. Stone (*Markup & Profit: A Contractor's Guide, Revisited*), the
RSMeans unit price estimating method, Hermann Simon (*Confessions of the Pricing
Man*), Blair Enns (*Pricing Creativity*), and Thomas Nagle (*The Strategy and
Tactics of Pricing*) — applied to a glass subcontractor selling to production
builders in DFW.

---

## Layer 1 — Markup methodology (Stone)

The core rule: **markup is derived from YOUR numbers, never borrowed from the
industry.** "Everyone charges 1.5x" is how contractors go broke slowly.

### The markup formula

Markup exists to cover overhead AND profit on top of job costs. Derive it annually
(and re-derive it quarterly — see the review cadence below):

```
Projected annual sales volume     V
Projected annual job costs        C   (materials + field labor + equipment for all jobs)
Annual overhead                   O   (everything that isn't a job cost — see Layer 2)
Required annual profit            P   (a set % of V, decided in advance — not "what's left")

Required markup = (C + O + P) / C
Price of any job = job cost × markup
```

If the derived markup feels "too high to win work," the answer is never to shave the
markup — it's to lower overhead, raise volume, or accept that some work can't be won
profitably. Cutting markup below the derived number is choosing to lose money with
extra steps.

### Markup vs. margin — never confuse them

Markup is applied to cost; margin is measured against price. Mixing them up
understates every price you quote.

| Markup (on cost) | Gross margin (of price) |
|---|---|
| 1.25× (25%) | 20.0% |
| 1.33× (33%) | 25.0% |
| 1.50× (50%) | 33.3% |
| 1.67× (67%) | 40.0% |
| 2.00× (100%) | 50.0% |

Conversions: `margin = (markup − 1) / markup` and `markup = 1 / (1 − margin)`.

### Volume changes the markup

Overhead is mostly fixed, so markup is a function of volume. If projected volume
drops 20%, the same overhead must be recovered across fewer job dollars — markup
must RISE, which is the opposite of the instinct to discount when work is slow.
The tool should recompute required markup whenever the volume forecast changes.

### One markup, applied to everything

Stone's discipline: the derived markup applies to every job cost dollar — materials,
labor, and subs alike. Selectively "eating" markup on materials for a builder is a
price cut; if you choose to do it, it must be shown as a deliberate concession with
a dollar value, not buried in the estimate.

---

## Layer 2 — Unit price cost structure (RSMeans method)

Every line item on a builder price list decomposes the same way:

```
Unit price = (Material + Labor + Equipment) × markup
  Material  = quantity per unit × supplier cost × (1 + waste %)
  Labor     = (crew hours per unit ÷ productivity) × fully-loaded labor rate
  Equipment = allocated cost of trucks/tools/lifts per unit of work
```

Rules for building the cost sheet:

- **Fully-loaded labor rate**, not wage: wage + payroll taxes + workers' comp +
  liability insurance + benefits + non-billable time (drive time, shop time,
  callbacks). For most trades this is 1.5–1.8× the raw wage.
- **Use your own historical productivity**, not national averages. RSMeans daily
  output figures are the fallback for work you haven't tracked; your last 20 jobs
  are the truth for work you have. (RSMeans cost *data* is a licensed product —
  this tool encodes the method and Eridion's own numbers.)
- **Waste factors are real costs.** Glass breakage, mis-measures, and remakes go in
  the unit cost, not in "stuff happens."
- **Overhead is enumerated annually**, not guessed: insurance (GL, auto, umbrella),
  vehicles + fuel, shop/office rent and utilities, software, phones, bookkeeping,
  owner salaries for non-field time, marketing, bad debt, interest. If the 2020
  overhead number is still in use, the audit starts here.

### Line-item health check

For every line on every builder price list, the tool computes and flags:

| Status | Condition |
|---|---|
| 🔴 Underwater | price < cost (negative gross margin) |
| 🟠 Below floor | margin > 0 but below the minimum margin floor |
| 🟡 Stale | cost inputs not updated in > 2 quarters |
| 🟢 Healthy | at or above derived markup with current costs |

---

## Layer 3 — Pricing strategy (Simon · Enns · Nagle)

- **Price is the biggest profit lever (Simon).** On typical cost structures, a 1%
  price improvement moves operating profit several times more than a 1% cost cut or
  1% volume gain. The audit should always express findings in annual profit dollars,
  not percentages — "line 14 underpriced by $38/unit × 400 units/yr = $15,200/yr."
- **Underpricing is the default failure mode (Simon).** Companies systematically
  price on fear. A price list untouched-by-method since 2020 is almost certainly
  low, not high: DFW construction labor and glass/aluminum inputs have all moved
  materially since then.
- **Never present one number (Enns).** Wherever the format allows, present three
  options — a stripped-down base, the recommended middle, a premium top. The top
  option anchors; the middle sells. On builder bids this maps to base spec /
  upgraded spec / premium spec pricing.
- **Price the customer, not the job (Enns).** Identical work does not deserve an
  identical price across customers with different payment speed, volume commitment,
  back-charge behavior, and hassle. Per-builder pricing tiers are legitimate.
- **Three pricing bases (Nagle):** cost-plus (floor), market/competitive (what
  builders' alternative subs charge), value-based (what the work is worth to the
  buyer). Production-builder work is mostly cost- and market-driven; custom and
  client-facing work supports value pricing. Know which regime each price lives in.
- **Win rate is a price signal.** Winning ~everything means priced too low; the
  optimum for bid work is a meaningful loss rate. Track wins/losses per builder and
  per line of work, and treat a >90% win rate as a red flag, not a triumph.

---

## The pricing audit (first run)

1. **Rebuild overhead for the trailing 12 months** from actuals (Xero), not the
   2020 model. Derive the current required markup.
2. **Rebuild the cost sheet** for the top 20 line items by annual revenue: current
   supplier quotes, current fully-loaded labor rates, actual productivity.
3. **Score every builder price list line** with the health check above.
4. **Per-builder profitability:** same line item, different builders — after
   payment terms, retainage, back-charge history, and hassle cost. Rank builders by
   true margin, not by revenue.
5. **Quantify the gap** in annual dollars and rank the fixes: which line items, at
   which builders, are worth renegotiating first. This ranked list is the direct
   input to the negotiation agent.

## Quarterly pricing review (recurring)

Stone's cadence, encoded as a checklist the tool tracks with a "last reviewed" date:

- [ ] Update material costs on the top 20 line items (supplier quotes / invoices)
- [ ] Recompute fully-loaded labor rate (any wage, comp-rate, or insurance changes)
- [ ] Recompute overhead run-rate from actuals; re-derive required markup
- [ ] Re-run the line-item health check on every builder price list
- [ ] Review win rate and volume vs. projection; adjust markup if volume shifted
- [ ] Log decisions: what was repriced, what was deliberately left alone, and why

---

## Guardrails (hard rules for any agent using this playbook)

1. Never recommend a price below unit cost + the minimum margin floor without an
   explicit, named strategic reason (loss leader for a volume commitment, buying
   into a new builder) and a dollar cap on the exposure.
2. Every recommendation cites its numbers: cost basis, derived markup, and the
   dollar impact per year.
3. Estimates marked stale (>2 quarters old inputs) must be flagged in any output
   that uses them.
4. This playbook informs business pricing decisions; it is not legal, tax, or
   accounting advice.
