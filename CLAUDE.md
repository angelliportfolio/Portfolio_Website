# Angelli Productions — Portfolio Site

## Project Overview

A luxury photography and directing portfolio site for **Angelli Nguyen** (Photographer + Director), based in Colorado and available worldwide. The site serves two distinct audiences:

1. **Commercial/Brand clients** — fashion, beauty, and advertising work
2. **Wedding/Lifestyle clients** — couples, weddings, portraits, and elopements

The brand voice is quietly luxurious, editorial, and intimate. Design should let photography dominate — minimal UI chrome, generous whitespace, restrained typography.

---

## Reference Sites

- **Current site**: [angelliproductions.com](https://angelliproductions.com) — source of truth for existing content, layout structure, and brand identity
- **Inspiration — wedding/lifestyle feel**: [meredithdiamond.com](https://meredithdiamond.com/gallery-colorado-wedding-photographer) — gallery-first, editorial storytelling, clear CTAs
- **Inspiration — commercial/beauty feel**: [emilynnrose.com](https://www.emilynnrose.com/) — minimalist grid, neutral palette, image-first
- **Inspiration — high-fashion editorial grid**: [jasonkim.com](https://jasonkim.com/) — masonry grid, project cards, publication credits

---

## Site Architecture & Navigation Model

The site uses **same-page tab-based content reveal** — clicking a nav tab shows/hides content panels without a full page load. No hard page navigations for portfolio switching. This keeps visual continuity and avoids jarring reloads.

### Navigation Hierarchy

```
Landing Page
├── [Tab] Commercial + Brands
│   ├── [Sub-tab] Fashion      → reveals fashion gallery panel
│   ├── [Sub-tab] Beauty       → reveals beauty gallery panel
│   ├── [Sub-tab] Directing    → reveals directing reel/stills panel
│   └── [Sub-tab] Contact      → reveals commercial contact form
└── [Tab] Weddings + Lifestyle
    ├── [Sub-tab] Home         → reveals lifestyle landing panel
    ├── [Sub-tab] About        → reveals about/approach panel
    ├── [Sub-tab] Weddings     → reveals wedding collections panel
    ├── [Sub-tab] Couples      → reveals couples gallery panel
    ├── [Sub-tab] Portraits    → reveals portraits gallery panel
    └── [Sub-tab] Inquire      → reveals wedding inquiry/booking form
```

### Behavior Rules
- Primary nav tabs (`Commercial + Brands` / `Weddings + Lifestyle`) switch between the two top-level portfolio contexts
- Each context has its own secondary sub-nav that reveals the relevant panel
- Active tab state is visually indicated (underline, weight, or color shift)
- Transitions: smooth fade or slide-in — never a hard cut
- Deep-linking: URL hash or query param updates on tab change so links can land on a specific section (e.g. `/#fashion`, `/#weddings`)
- On mobile: primary tabs collapse into a hamburger or stacked menu; sub-tabs become a scrollable horizontal strip

### Section Content

**Landing Page**
- Full-screen or split hero image
- Logo and name centered
- Two CTA paths: `Commercial + Brands` | `Weddings + Lifestyle`
- Minimal text — photography does the talking

**Commercial + Brands**
- Fashion: editorial fashion gallery (masonry or uniform grid)
- Beauty: beauty and cosmetic campaign work
- Directing: video reel embed + stills
- Contact: commercial-focused inquiry form + short bio

**Weddings + Lifestyle**
- Home: lifestyle landing with taglines ("Bridal. Meets. Editorial.", "Romance, held in time.")
- About: photographer story, approach, and film/digital note
- Weddings: collections grouped by venue/location (each collection is a named card linking to a full gallery)
- Couples: engagement session gallery
- Portraits: individual portrait session gallery
- Inquire: wedding-specific contact form (event date, venue, guest count) + booking calendar embed

**General Contact + About**
- Accessible from both portfolios
- Shared inquiry form
- Bio, approach statement, social links

---

## Design System

### Color Palette
Clean, light, neutral. White-dominant with soft warm grays. Photography carries all color weight — UI never competes.

- Background: `#FFFFFF` or very light warm white (`#FAF9F7`)
- Text: near-black (`#1A1A1A`) for body, medium gray (`#888`) for captions/meta
- Accent: subtle warm tone — avoid cool blues or saturated colors
- No dark mode required at launch

### Typography
- Headings: elegant, thin-weight serif or refined sans-serif (e.g. Cormorant Garamond, Playfair Display, or similar)
- Body: clean readable sans-serif (e.g. Inter, DM Sans)
- All caps used sparingly for labels and nav items
- Generous line-height and letter-spacing

### Layout Principles
- Image-first: galleries fill the viewport, UI fades to background
- Generous whitespace between sections
- Mobile-first responsive — photography clients browse on phones
- Masonry or uniform grid for gallery layouts (reference jasonkim.com for commercial, meredithdiamond.com for weddings)
- Lazy loading required (~1000+ images)

### Gallery Behavior
- Hover: subtle overlay or scale effect (no heavy overlays)
- Click: lightbox with full-resolution view, prev/next navigation
- Pagination or infinite scroll — TBD based on performance testing
- Each wedding collection is its own page (venue name, location, couple name)

---

## Features & Integrations

### Contact Form
- Fields: Name, Email, Phone (optional), Service type (Commercial / Wedding / Portrait), Message, Preferred contact date
- Backend: TBD (Formspree, Resend, or similar lightweight service acceptable)
- Wedding/Lifestyle inquire form has additional fields: event date, venue, guest count

### Booking / Scheduling
- Goal: HoneyBook-style booking flow (lead capture → proposal → contract → invoice)
- Phase 1: Simple inquiry form with calendar embed (Calendly or Cal.com acceptable as placeholder)
- Phase 2: Deeper HoneyBook integration or custom booking system
- Do not over-engineer Phase 1 — get the form working first

### Client Delivery
- Currently uses **Pixieset** for delivered galleries
- Integration: link from client portal or confirmation emails to their Pixieset gallery
- No need to replicate Pixieset functionality in-site

### Image Hosting
**Cloudinary** — free tier (25GB storage, 25GB bandwidth/month).

- Handles resizing, WebP conversion, and CDN delivery automatically via URL params
- Use the Next.js Cloudinary loader: `next-cloudinary` or custom `cloudinaryLoader`
- All gallery image `src` values are Cloudinary URLs — swappable without component refactoring
- Pixieset remains the client delivery system only (no overlap)

### Hosting & Deployment
**Vercel** — free tier, zero-config Next.js deployment.

- Connect GitHub repo → auto-deploys on push to `main`
- Preview deployments on every PR
- Custom domain: `angelliproductions.com` pointed via DNS

---

## Tech Stack

**Next.js (App Router)** — chosen stack.

Reasons: handles ~1000+ images well via `next/image`, supports static generation for SEO, has clean client-side state management for the tab-reveal navigation, and deploys to Vercel with zero config.

Key conventions:
- Use **static generation** (`generateStaticParams`) for all gallery pages
- Tab state managed client-side with `useState` — no server round-trips for panel switching
- `next/image` with Cloudinary loader for automatic resizing and WebP conversion
- Keep JS minimal on gallery pages — no heavy client bundles for purely presentational content

---

## SEO & Performance

- Every gallery page gets a unique `<title>` and `<meta description>`
- Wedding collections use location-rich slugs (e.g. `/weddings/della-terra-estes-park`)
- Core Web Vitals target: LCP < 2.5s on mobile (critical for image-heavy site)
- All images require `alt` text
- Sitemap auto-generated at build time

---

## Brand Voice & Copy Tone

- Quietly luxurious, never loud
- Warm but professional
- Taglines to reference: "for the quietly luxurious", "Bridal. Meets. Editorial.", "Romance, held in time.", "Film & Digital"
- Location copy: "Colorado based, available worldwide"
- Avoid generic photography clichés ("capturing your special moments")

---

## Current State

- `index.html` — blank placeholder file
- `CLAUDE.md` — this file
- No framework or build tooling installed yet
- Existing public site at angelliproductions.com is the content and design reference

---

## Open Questions

- [ ] HoneyBook: direct API integration or just link out to HoneyBook-hosted form?
- [ ] Any print shop / licensing functionality needed for commercial work?
- [ ] Should wedding collections be hard-coded content or driven by a CMS (e.g. Sanity, Contentful) so new weddings can be added without a code deploy?
