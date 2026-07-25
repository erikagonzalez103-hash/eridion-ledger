# SOP — Adding a Project to the Eridion Lookbook

The standard operating procedure for turning a finished job into a
published lookbook case study. Owner: Erika. Time per project once
photos exist: ~20–30 minutes plus the interview.

## The tools (bookmark these)

| Tool | URL | What it's for |
|---|---|---|
| Image Library | `…github.io/eridion-ledger/image-library.html` | Upload, tag, and manage all job photos |
| Lookbook Builder | `…github.io/eridion-ledger/lookbook/builder.html` | Assemble projects: facts, photos, crops, layout |
| Lookbook (live) | `…github.io/eridion-ledger/lookbook/` | The published portfolio |
| Brand Guidelines | `…github.io/eridion-ledger/brand/brand-guidelines.html` | Voice, color, type rules |

The Library and Builder share one login (worker URL + passphrase) —
connect either once per browser and both work.

---

## Step 1 — Photos into the Image Library

1. Open the Image Library and **drag the job's photos into the upload
   box** (originals from Dion's camera/phone are fine — the library
   resizes automatically).
2. Optionally type shared tags in "Tags for this upload" (e.g. the job
   name). The **AI tagger** fills in category, products, spaces, styles,
   and a caption for each photo on its own.
3. After upload, spot-check the AI's tags and fix anything odd. Set
   **grade**: `hero` for the best shots, `ok` for usable, `skip` for
   rejects (skip-graded photos are hidden from the Builder by default).

**Per project, aim for** (from the brand guidelines): one wide finished
"hero" shot, one macro detail (edges, joints, hardware), one
in-progress/install shot, and — gold tier — a 10–30 second walkthrough
video.

## Step 2 — Write the story (the interview)

1. Open a Claude session and say which job you want to write up.
2. Answer the interview questions — ramble freely, in your own words.
   Have roughly in mind: **what/where/who**, the **numbers** (sq ft,
   panel count, dimensions, timeline), **what made it interesting**
   (the constraint, the request), **what you did about it**, and **how
   it turned out** (schedule, callbacks avoided, reactions, repeat work).
3. Claude drafts in the brand voice (Challenge → Approach → Result +
   pull quote); you correct anything that doesn't sound like you;
   approve.

Voice checkpoints: specifics over adjectives · quantify the scope ·
never "solutions/world-class/cutting-edge" · the repeat hire or builder
callback IS the ending.

## Step 3 — Assemble in the Builder

1. Open the Builder — the photo catalog loads automatically.
2. **+ New Project** (or open the one Claude seeded). Fill the facts:
   name, type (must match a filter), sector, location, quantified scope,
   systems, client, timeline. Paste the approved story into the
   case-study fields. **Featured** now means the hero spotlight — the
   3–4 cards at the top of the page. Keep exactly 3–4 projects ticked;
   every project with a case study still gets its full case-study bar.
3. Find its photos: filter by the facet dropdowns (Category / Product /
   Space / Style / Tags / Job) or search. **Click photos in display
   order — the first is the cover/hero.**
4. **Pick the Hero layout**: *Wide hero* for landscape photography,
   *Tall column* for portrait. Rule of thumb — match the best photo's
   orientation.
5. Watch for **⚠ badges** on gallery thumbnails: that photo's shape
   fights the chosen frame. Click **⛶** and drag/zoom the photo until
   the crop is right (the frame you see is exactly the live frame).
6. Click **👁 Preview** on the project — this renders the case study
   precisely as the lookbook will. Toggle Wide/Tall there if unsure;
   the toggle saves. Check every carousel slide with the arrows.

## Step 4 — Publish

1. **Export JSON** → **Copy**.
2. Paste the export into the Claude session. Claude wires it into the
   lookbook, verifies, and pushes — the live page updates in ~1 minute.
3. Open the live lookbook and check the new case study on desktop AND
   phone.

## Step 5 — Wix (only when/if the Wix-native version is in play)

**Wix CSV** in the Builder exports all projects in the CMS import
format (media is attached inside Wix afterward). See
`WIX-BUILD-GUIDE.md` for the full Wix build.

---

## Standards

- **Types (filters)** — use exactly: `Colorback Glass`,
  `Showers & Wet Rooms`, `Mirrors`, `Elevators & Lobbies`,
  `Storefronts`, `Specialty`. A typo creates a broken filter.
- **Layouts** — only Wide hero (16:9) and Tall column (11:20). No
  custom shapes; that's what keeps the book looking consistent.
- **Scope lines are quantified** — "241.5 sq ft · 15 panels" beats
  "large glass package" every time.
- **Photos stay in the library** — the lookbook displays them from
  there; never delete a photo that a case study uses.

## SEO / AEO checklist (per new case study)

The page ships with structured data (LocalBusiness + FAQ) and social
share tags. Each new case study helps search and AI answers most when:

- The **scope line is quantified** (sizes, counts, panel limits) — AI
  answer engines quote checkable numbers.
- Any **standing answer** you give clients (like the colorback price
  posture) appears in the text — if it's worth saying to a client, it's
  worth being the quoted answer online. Tell Claude and it gets added
  to the page's FAQ data.
- **Alt text** describes the photo specifically (the builder export
  handles this when captions are real).
- At go-live: point `lookbook.eridionglass.com` at the page and enable
  the canonical tag (marked in index.html) **before** promoting the
  URL, add the lookbook link to the Wix site menu, and submit the URL
  in Google Search Console.

## Troubleshooting

| Symptom | Fix |
|---|---|
| New uploads missing in Builder | Click **Load Catalog** (or refresh) |
| Photo tagged `not-in-manifest` | Old-style upload — re-upload via the Library box, delete the loose copy |
| "Passphrase rejected" | Re-enter worker URL + passphrase (same as Library) |
| Crop looks different live than in ⛶ | It shouldn't — frames are locked to match. Hard-refresh both pages; if it persists, tell Claude |
| Grid filter shows nothing | The project's Type doesn't exactly match a standard type — fix spelling in the Builder |
