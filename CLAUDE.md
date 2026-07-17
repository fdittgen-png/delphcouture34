# Delphine Roger — Website

## Tech Stack
- Static HTML (single page)
- Tailwind CSS via CDN (`cdn.tailwindcss.com`)
- Vanilla JavaScript (no framework, no build tools, no dependencies)
- Google Fonts: Fraunces (display), Instrument Sans (body), IBM Plex Mono (labels)
- No Node.js required

## Project Structure
```
website/
├── index.html          # Single-page site (SEO head + JSON-LD kept intact)
├── css/style.css       # Design system, stitch motif, slider, lightbox, reveals
├── js/main.js          # Nav, mobile menu, reveals, lightbox, avant/après slider, mailto form
├── images/             # Curated photos (JPG + WebP pairs, semantic names)
│   ├── village-rouge.*      # Hero left (also copied as hero.jpg for og:image)
│   ├── scene-*.*            # Costume gallery (Pièce N°1)
│   ├── theatre-couple.*
│   ├── atelier-*.*          # Sur-mesure section (Pièce N°2)
│   └── interieur-*.*        # Intérieur incl. avant/après pair (Pièce N°3)
└── CLAUDE.md
```

## Design — « Du village à la scène »
- Concept: quiet Languedoc atelier vs. flamboyant stage; split-screen day/night hero diptych
- Palette: calicot #F6F2EC, écru #EDE7DC, encre #191521, rose #A82B4F, rose clair #E387A0, fil #CFC6B8
- Signature motifs: tacking-stitch dashed lines, pattern-piece section labels (« Pièce N°1 — … », IBM Plex Mono)
- Signature interaction: avant/après drag slider (reupholstered armchair) in #confection
- Copy rule: keep French texts SHORT — photos carry the proof; one short paragraph per section max
- Sections: hero → facts strip → #realisations (dark) → #couture → #confection (écru) → #methode → #contact (dark) → footer
- Mobile-first, reduced-motion respected, keyboard-accessible lightbox/slider

## Image Source
- Original photos harvested from the old Wix site (static.wixstatic.com, media IDs prefixed b85bfa_/5a34f6_)
- Wix page URLs use NFD-decomposed accents (e.g. `couture-sce%CC%80ne`) — NFC-encoded URLs 404
- Photo credits (kept in page): Nils Jöhnk, F. Beddok, Hand Photography

## Business Info
- **Owner:** Delphine Roger
- **Business:** Delph Couture 34
- **Location:** 2 rue Bombe Cul, 34120 Castelnau-de-Guers, France
- **Phone:** 07.89.57.55.61
- **Email:** roger.delphe1@orange.fr
- **Services:** Costumes de scène, couture sur-mesure, retouches, upcycling, confection d'intérieur

## To Open Locally
Just open `index.html` in a browser. No server needed.

## Verification Notes
- Headless Chrome on this machine clamps window width to ~500 physical px and applies
  Windows display scaling — for true mobile-width screenshots, embed the page in a
  390px iframe wrapper and screenshot that.
