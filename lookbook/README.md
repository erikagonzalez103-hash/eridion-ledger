# Eridion Glass — Project Lookbook

A free, self-contained, single-file HTML lookbook (`index.html`) for showcasing
Eridion's glazing work to GCs, builders, and architects. No frameworks, no build
step, no hosting cost.

> **⚠️ Mostly SAMPLE data.** The featured wet-room case study ("The Tile Look,
> Without the Grout") is real — adapted from the eridionglass.com blog post on
> colorback glass — but it still needs real photos. Every other project,
> number, client name, and quote is a fictional placeholder marked `[like
> this]` or tagged "Sample". Replace before publishing anything publicly.

## What's inside

- **Hero + stats bar** — headline, positioning line, and four headline numbers.
- **3 featured case studies** — "Benchmark" style: stat grid (scope, systems,
  GC partner, timeline) + Challenge → Approach → Result narrative + client quote.
- **Filterable project grid** — 12 projects (1 real, 11 sample), filter chips
  by Eridion's actual service lines (Colorback Glass, Showers & Wet Rooms,
  Mirrors, Elevators & Lobbies, Storefronts, Specialty). Tiles open a detail
  modal; flagship tiles jump to their case study.
- **Capabilities strip** and a **request-a-quote footer**.
- Scroll-reveal animation (respects reduced-motion settings), fully responsive.

## How to put in real content

1. **Grid projects** — edit the `PROJECTS` array near the bottom of
   `index.html`. Each entry is one tile: name, type, sector, location, one
   quantified scope line, systems, GC/client, timeline, short description.
   Keep the numbers specific ("24,000 sq ft · 62 exam rooms" wins more work
   than "large medical project").
2. **Featured case studies** — edit the three `<article class="case">` blocks.
3. **Photos, carousels, and video** — every project has a `media` array; the
   page renders it automatically. Each item is one of:
   - `{img:'images/photo.jpg', alt:'what it shows'}` — a photo
   - `{video:'images/clip.mp4', poster:'images/cover.jpg'}` — a video player
   - `{ph:'ph-a', tag:'Sample'}` — a gradient placeholder (delete these as
     real media arrives)

   One item fills the area as a single image/video; two or more become a
   carousel with arrows, dots, and touch swipe. Grid tiles show the first
   item as a cover (videos show their poster with a ▶ badge); the full
   carousel/player appears in featured case studies and the project modal.
   Put the files in `images/` next to `index.html`. Keep videos short
   (10–30 s walkthroughs) and compressed (H.264 MP4, ~720p is plenty).
4. **Links** — the header "Main Site" button and footer "Discuss Your Project"
   button currently point at `https://www.eridionglass.com`; point the footer
   one at your contact page's exact URL.
5. **Notice bar** — delete the `<div class="notice">` block once real content
   is in.

### Photo shot list (for future jobs)

Prioritize: (1) one wide establishing shot of the finished installation with
context, (2) one detail/edge shot showing fit and finish, (3) one in-progress
shot showing crew/means-and-methods. Landscape orientation, horizontal lines
level, shot at dusk or on overcast days to control reflections.

## How to publish free at lookbook.yourdomain.com

1. Create a **public** GitHub repo (e.g. `eridion-lookbook`) and put
   `index.html` (and `images/`) at its root.
2. Repo **Settings → Pages** → deploy from branch `main`, root folder. The site
   goes live at `https://<username>.github.io/eridion-lookbook/`.
3. Still in the Pages settings, enter the custom domain
   `lookbook.<yourdomain>.com` and save. **Do this before the DNS step** —
   GitHub warns that creating the DNS record first briefly exposes the
   subdomain to takeover.
4. Add the DNS record. In Wix: **Domains → Domain Actions → Manage DNS
   Records → CNAME (Aliases) → + Add Record**, Host Name `lookbook`, Value
   `<username>.github.io` (no repo name). If your domain is connected to Wix
   by *pointing* rather than Wix nameservers, add the CNAME at your domain
   registrar instead.
5. Wait for DNS (minutes to 24 h), then tick **Enforce HTTPS** in the Pages
   settings.
6. In the Wix editor, add a menu item "Portfolio" / "Our Work" linking to
   `https://lookbook.<yourdomain>.com`.

## Why not paste the HTML into a Wix page?

Wix's Embed HTML element puts pasted code inside a fixed-height iframe:
content gets cropped or scrollbarred, isn't responsive on mobile, and is
invisible to Google. Hosting on GitHub Pages under a subdomain avoids all of
that and costs nothing.
