# Eridion Glass Lookbook — Wix Build Guide

A section-by-section blueprint for rebuilding the lookbook natively in the
Wix Editor. Everything here mirrors the approved design
(`lookbook/index.html`) and Brand Guidelines v2.0. No code required —
this build uses Wix's CMS, Repeaters, Selection Tags, and Pro Gallery.

**Why native:** images and video managed in Wix's Media Manager, every
project indexed by Google (each gets its own page), and the whole thing
stays editable by you in the normal Wix editor.

**Companion file:** `wix-projects-import.csv` — import it into the CMS
collection in Phase 2 so you don't retype the 12 projects.

---

## Phase 0 — Site design settings (do this first, 15 min)

These make every later step faster, because elements pick up the theme.

### Colors (Site Design → Color Palette)
Set the theme colors to the brand tokens:

| Role | Hex | Used for |
|---|---|---|
| Primary / Main 1 | `#153862` | Headlines, buttons, navy sections |
| Accent | `#32A200` | Accent fills ONLY — lines, markers. Never body text |
| Dark | `#0E2741` | Footer depth, button hover |
| Light background | `#F7F8FA` | Page background |
| Tinted background | `#EAEEF3` | Alternate section backgrounds |
| Body text | `#000000` | All running text |
| Secondary text | `#5C6B7A` | Captions, locations, labels |
| Dividers | `#C4C4C4` strong / `#E6E8EC` subtle | Rules and borders |

**The green rule:** brand green appears only as small fills and accent
shapes. If green ever needs to carry text, don't — use navy instead.

### Fonts (Site Design → Text Theme)
Headline face: **Jost** in light weights (a Futura-style geometric —
owner decision, supersedes the Archivo Expanded named in Brand
Guidelines v2.0; update the guidelines doc to match). Body: **Inter**.

1. Search Wix's font list for **Jost** and **Inter**. If either is
   missing, download the free family from Google Fonts
   (fonts.google.com/specimen/Jost — get Light 300 + Regular 400) and
   add it via **Upload Fonts**. Both are open-license; uploading is fine.
2. Set the text theme:

| Theme slot | Font | Size | Color |
|---|---|---|---|
| Heading 1 | Jost Light 300 | 44px | `#153862` |
| Heading 2 | Jost Light 300 | 30px | `#153862` |
| Heading 3 | Jost 400 | 22–26px | `#153862` |
| Paragraph (lead) | Inter 500 | 18px | `#000000` |
| Paragraph (body) | Inter 400 | 16px | `#000000` |
| Caption | Inter 400 | 13px | `#5C6B7A` |

Rule of thumb: Jost **300** only at display sizes (H1/H2 and big stat
numbers); anything 26px or smaller uses Jost **400** so thin strokes
never get fragile. Body copy is always Inter.

Eyebrow style (used often, worth memorizing): Jost 400, 12px, ALL CAPS,
letter-spacing ~0.25em, color `#5C6B7A` (or `#32A200` only on navy
backgrounds).

### Buttons
Default button style: **squared corners (0 radius)**, fill `#153862`,
text white, Inter 600 12px ALL CAPS with letter-spacing; hover fill
`#0E2741`. The brand is squared everywhere — no rounded corners on
buttons, tags, or cards.

---

## Phase 1 — Page setup

1. Add a new blank page named **Our Work** (or **Portfolio**). Hide it
   from the menu until finished (Page settings → hide from menu).
2. Page background: `#F7F8FA`.
3. Page SEO (Page settings → SEO): title
   `Project Lookbook | Eridion Glass — Custom Glazing, DFW`, description:
   `Selected work by Eridion Glass — colorback glass, shower enclosures,
   mirrors, storefronts, and architectural glass for luxury builders in
   the DFW metroplex.`

---

## Phase 2 — CMS collection (the engine)

Open **CMS** (Content Manager) in the editor's left sidebar → **Create
Collection** → name it `Projects`.

### Fields
| Field name | Type | Notes |
|---|---|---|
| Title | Text | Project name |
| Type | Text | Must match a filter tag exactly (see list below) |
| Sector | Text | e.g. "Luxury Custom Home" |
| Location | Text | e.g. "DFW Metroplex, TX" |
| Scope | Text | One quantified line |
| Systems | Text | Glass systems used |
| Client | Text | GC / builder / property manager |
| Timeline | Text | e.g. "1 week, measure to install" |
| Description | Text (multi-line) | 1–2 sentence summary |
| Featured | Boolean | Yes for the 3 flagship case studies |
| Challenge | Rich text | Featured projects only |
| Approach | Rich text | Featured projects only |
| Result | Rich text | Featured projects only |
| Quote | Text | Pull quote |
| QuoteWho | Text | Attribution |
| CoverImage | Image | Grid tile cover |
| Gallery | Media Gallery | Photos + video — this powers carousels |

**Type values (filters):** `Colorback Glass`, `Showers & Wet Rooms`,
`Mirrors`, `Elevators & Lobbies`, `Storefronts`, `Specialty`.

### Import the projects
CMS → Projects collection → **Import** → upload
`wix-projects-import.csv`. It fills every text field for all 12 projects
(the real wet-room case study plus 11 clearly-bracketed samples).
Images/video can't come in by CSV — add them per item afterward by
clicking the CoverImage / Gallery fields, straight from your Media
Manager. **That's your "just add the images" workflow.**

### Dynamic pages (free SEO)
When Wix offers to create a **dynamic item page** for the collection,
accept. Every project gets its own URL
(`/projects/the-tile-look-without-the-grout`) that Google indexes.
Layout it once (Phase 5) and all projects inherit it.

---

## Phase 3 — Build the page, top to bottom

### Section 1: Hero
- Left-aligned text stack on `#F7F8FA`:
  - Eyebrow: `GLAZING · DESIGN · CRAFT — DFW METROPLEX`
  - Heading 1: `Custom glazing, built to spec.`
  - Under the H1, add a **Line** element: 56px wide, 5px thick, `#32A200`.
  - Lead paragraph: `Eridion Glass is a husband-and-wife shop fabricating
    and installing custom glazing for high-end homes.`
  - Body: `We field-verify every opening and set each panel to spec — so
    the people who quote your job are the same ones who stand behind it.
    A selection of that work follows.`
- Stats strip: 4 equal columns, thin top border `#C4C4C4`. Each column:
  big number (Archivo Expanded 700, ~34px, navy) over a small caps label
  (11px, `#5C6B7A`):
  - `25+` / YEARS MASTER GLAZIER
  - `1 wk` / MEASURE TO INSTALL
  - `$1M+` / HOMES WE BUILD FOR
  - `100s` / COLORBACK COLORS
- Animation: select the text stack → Animation → a subtle one-time
  "Fade In / Float In (up)". Use sparingly — hero and section titles only.

### Section 2: Featured case studies (×3)
Three two-column strips on white cards (or alternating white /
`#EAEEF3` backgrounds). For each:
- **Media column:** a **Pro Gallery** (Add → Gallery → Pro Gallery),
  layout **Slideshow/Slider**. Load it from the project's Gallery field
  (or drop images in directly). Pro Gallery handles arrows, dots, swipe,
  and **video items** natively. Style: arrows navy, no rounded corners.
- **Text column, in order:** eyebrow (sector · type), Heading 3, caption
  line (location), a 2×2 facts block (four small label/value text pairs:
  SCOPE, SYSTEMS, CLIENT, TIMELINE), then three short paragraphs with
  bold caps lead-ins — CHALLENGE, APPROACH, RESULT — then the pull quote
  (Archivo Expanded 500 17px navy) with attribution caption.
- Optional brand touch: a small green corner triangle (Add → Shape →
  right triangle, `#32A200`, ~20px) pinned to the card's top-right —
  the cut-corner motif from the guidelines.

Content for case study 1 (real — paste as-is): use the wet-room fields
in the CSV (Challenge/Approach/Result columns are complete). Case
studies 2–3 are bracketed samples to overwrite with real projects.

### Section 3: All projects — filterable grid
This is Repeater + Selection Tags + dataset. All no-code:
1. Add a **Dataset** connected to `Projects` (it may already exist from
   Phase 2). Mode: Read-only.
2. Add **Selection Tags** (Add → Input → Selection Tags) with the six
   Type values above plus nothing else — connect them to the dataset as
   a **filter on the Type field**. Style: squared, outline `#C4C4C4`,
   selected state fill `#153862` white text.
3. Add a **Repeater** (3 columns desktop / 1 on mobile). In each item:
   image (connect → CoverImage), small caps label (Type · Sector), title
   (H3, 22px), location caption, scope line. White card, `#E6E8EC`
   border, no corner radius.
4. Connect the repeater item's click to the project's **dynamic page**.

### Section 4: Capabilities (navy strip)
Full-width strip, background `#153862`, white text:
- Eyebrow in `#32A200`: `CAPABILITIES`
- Heading 2 (white): `Design consultation through fabrication and
  installation — a master glazier on every complex job.`
- Six columns (2 rows × 3), each: small caps white heading with a 3px
  green left border, plus a light body line (`#C7D3E0`):
  1. **Colorback Glass** — Digitally color-matched back-painted glass for wet room walls, backsplashes, and feature walls — the tile look with zero grout.
  2. **Showers & Wet Rooms** — Frameless and steam-rated enclosures in low-iron glass, field-measured and set to spec.
  3. **Mirrors** — Full-wall, vanity, framed, and gym mirrors with polished edges and concealed mounting.
  4. **Elevators & Lobbies** — Colorback glass elevator cab panels and lobby feature walls — installed off-hours, in as little as one week.
  5. **Storefronts & Entrances** — Aluminum storefront framing, all-glass entrances, and commercial glass and mirror packages.
  6. **Architectural & Specialty** — Wine cellar enclosures, glass stair systems, and complex architectural glass installations.

### Section 5: Closing CTA
Centered on `#F7F8FA`:
- Heading 2: `Have plans to send over?`
- Body: `We field-measure, quote quickly, and stand behind the install.
  Wet room, wine cellar, stair system, or an architectural feature —
  send it over and we'll take a look.`
- Button (theme style): `SEND US YOUR PLANS` → link to your contact page.

---

## Phase 4 — Dynamic item page layout (once)

Open the Projects item page Wix generated and lay out:
1. Title (H1 on this page), eyebrow (Type · Sector), location caption.
2. **Pro Gallery** connected to the Gallery field — this is the
   carousel/video area, and it updates itself whenever you add media to
   a project in the CMS.
3. The four facts (Scope / Systems / Client / Timeline) as label/value
   pairs connected to their fields.
4. Challenge / Approach / Result rich-text fields (they'll simply be
   empty for non-featured projects — or show/hide based on Featured).
5. Quote + attribution.
6. A "Back to all projects" text link.

---

## Phase 5 — Mobile + finish

1. Open the **mobile editor** and walk every section: stats 2×2,
   repeater single column, galleries full width. Fix anything odd —
   mobile is most of your traffic.
2. Entrance animations: hero + section headings only. Skip the rest.
3. Unhide the page and add **Our Work** to the site menu.
4. Test: filter chips, a project page, a gallery with a video in it.

---

## Content workflow after launch (the part you asked about)

Adding a new project = **no editing the page at all**:
1. CMS → Projects → **+ New Item**
2. Fill the text fields (keep Scope quantified — square feet, unit counts)
3. Click CoverImage → upload/choose from Media Manager
4. Click Gallery → add photos and video clips in the order you want them
   to appear in the carousel
5. Save. It appears in the grid, filters, and gets its own Google-indexed
   page automatically.

Photo/video guidance (from your brand guidelines): natural daylight,
true-to-life color, architectural composition. Per project aim for one
wide finished shot, one macro detail (edges, joints, hardware), and —
gold tier — a 10–30 second phone walkthrough video for the gallery.

---

## Design-fidelity notes (honest list)

- Wix's Pro Gallery arrows/dots won't look pixel-identical to the custom
  build — get them close with navy arrows and squared corners.
- The scroll-reveal will be Wix's entrance animations, slightly different
  timing. Fine.
- The cut-corner motif needs the little triangle shape added manually
  per card; skip it if fiddly — the green underline bars carry the brand.
- Keep the custom `lookbook/index.html` in the repo regardless: it's the
  design reference, and it remains the fallback plan (GitHub Pages
  subdomain) if the Wix rebuild ever feels limiting.
