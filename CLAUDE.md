# Delph Couture 34 — implementation guide

## Scope and stack

This is a French landing page for Delphine Roger, couturière and costumière.
Keep it static and buildless: HTML, local CSS and vanilla JavaScript. There is
no frontend framework, package installation, backend, contact-form service,
analytics script or runtime CSS CDN.

- `index.html`: page content, metadata and JSON-LD.
- `css/style.css`: layout, responsive styles, motion and visual identity.
- `js/main.js`: progressive enhancement for the mobile menu, portfolio filters
  and image viewer; current year in the footer.
- `fonts/`: self-hosted Fraunces and Instrument Sans WOFF2 files, CSS and licenses.
- `images/`: original photographs, with WebP/JPG variants.
- `favicon.svg`: primary monogram icon; `favicon.ico` remains a fallback.
- `mentions-legales.html`, `404.html`, `robots.txt`, `sitemap.xml`: supporting pages
  and discovery files.

## Visual and editorial direction

An expressive artist's atelier: warm ivory, terracotta, sage, dark ink, large
Fraunces headings and generous photography. The wordmark is `delph.` with
`COUTURE 34`; **34 identifies the Hérault département**, not an atelier number.
Keep French copy concise, concrete and personal. Real creations are the proof;
do not invent customer quotes, awards, prices, deadlines or commercial promises.

The page progresses through a photographic hero, six selected creations,
four services, the artist and her process, a compact FAQ and direct contact.
Portfolio filters use `scene`, `couture` and `interieur` categories. Do not replace
the actual work with generated or unrelated stock imagery.

## Interaction and accessibility contracts

- Core content, six portfolio links and `tel:`/`mailto:` contact links work
  without JavaScript. Filtering is an enhancement, not the only way to see work.
- The menu and image viewer use native `<dialog>` elements when supported.
  Preserve Escape handling, keyboard image navigation, focus restoration and
  the direct-image fallback.
- Keep the skip link, meaningful headings and image alternatives, visible focus,
  responsive layout and reduced-motion support.
- Preserve comfortable touch targets, root-relative copy sizing, safe-area
  padding and text reflow. Keep the menu's 800px CSS breakpoint aligned with
  JavaScript's 801px resize boundary.
- The header offset follows its actual height. Short landscape screens use a
  nonsticky header, a sticky menu close row and a bounded image viewer. Keep
  close and image navigation controls visible when changing dialog layouts.
- Email actions open the visitor's mail application. Never imply that this static
  site has sent or stored a message.
- Preserve existing fragment destinations: `accueil`, `realisations`, `couture`,
  `confection`, `methode` and `contact`, even when reorganizing sections.

## Business identity and image integrity

- Delphine Roger / Delph Couture 34.
- 2, rue Bombe Cul, 34120 Castelnau-de-Guers, France.
- Phone: `+33789575561`; visible: `07 89 57 55 61`.
- Email: `roger.delphe1@orange.fr`.
- SIRET: `79429990900018`.
- Services: costumes de scène, vêtements sur mesure, robes de mariée, retouches,
  upcycling and confection d'intérieur.
- Keep photography credits: Nils Jöhnk, F. Beddok and Hand Photography. Images
  originate from the business's earlier Wix site.

## Search and deployment integrity

Initial HTML carries business facts, services and contact information. JSON-LD
links `WebSite`, `LocalBusiness`, `Person` and the service catalog; keep it aligned
with visible content. Do not add hidden FAQ content, fabricated reviews,
unverified opening hours or prices. The sitemap lists canonical pages, not
individual `#section` fragments. Its `lastmod` must represent a real update.

GitHub Pages URL: `https://fdittgen-png.github.io/delphcouture34/`.
As checked on 18 November 2026, `https://www.delphcouture34.com/` still serves Wix.
Metadata currently matches the GitHub Pages release origin, including canonical,
social image URLs, schema IDs, robots and sitemap. DNS has not been changed;
a repository update alone does not replace the Wix site. For a future custom-domain
migration, update these origin values together and redirect old Wix paths.
See `README.md` for the practical migration checklist.

Use relative asset and supporting-page links so the GitHub project subpath works.
Check desktop/mobile rendering, navigation, filters, dialog keyboard behavior,
contact destinations, no-JavaScript content and local asset paths after changes.
Do not report unperformed QA or promise search rankings or AI citations.
