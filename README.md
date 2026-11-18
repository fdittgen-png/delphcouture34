# Delph Couture 34

A French landing page for Delphine Roger's couture and costume atelier in
Castelnau-de-Guers, near Pézenas. Warm ivory, terracotta and sage, expressive
typography and photographs of her actual creations form the visual identity.

## Run and maintain

Open `index.html` in a browser, or serve the repository with any static HTTP
server. No build, package installation or Node.js runtime is required.

| File                        | Purpose                                                       |
| --------------------------- | ------------------------------------------------------------- |
| `index.html`                | Copy, portfolio, contact links, metadata and structured data  |
| `css/style.css`             | Design tokens, layout, responsive behavior and motion         |
| `js/main.js`                | Mobile menu, portfolio filters and native-dialog image viewer |
| `images/`                   | Original photographs, including WebP and JPG variants         |
| `fonts/`                    | Local Fraunces and Instrument Sans fonts, styles and licenses |
| `mentions-legales.html`     | Business, privacy and hosting information                     |
| `404.html`                  | Missing-page recovery                                         |
| `robots.txt`, `sitemap.xml` | Crawl policy and canonical page/image discovery               |

Essential content is present in HTML. Without JavaScript, visitors can view
the portfolio, open original images and contact the atelier by phone or email.
JavaScript adds filters for the six selected creations and a keyboard-operable
image viewer. Contact links open an email or telephone application; there is no
message-submission backend. Fonts are local; no analytics service or embedded
map loads with the page.

## Updating content

- Keep business details consistent across visible content, JSON-LD and the legal
  page. Confirm any new prices, opening hours or response-time promises.
- When replacing an image, update JPG/WebP paths, dimensions, alternative text,
  caption and category together. Preserve photo credits and font licenses.
- Retain `accueil`, `realisations`, `couture`, `confection`, `methode` and `contact`
  as fragment destinations for existing links.
- Keep service descriptions and FAQ answers readable in HTML. Structured data
  must describe visible content; do not add hidden text solely for crawlers.
- Update sitemap `lastmod` after substantive changes. Section fragments are not
  separate sitemap pages. Legal and 404 pages currently carry `noindex` and are
  excluded from the sitemap.
- Keep asset and local page links relative to support the GitHub project path.

## Hosting and custom-domain migration

GitHub Pages URL: <https://fdittgen-png.github.io/delphcouture34/>.

**The custom domain <https://www.delphcouture34.com/> still serves the previous
Wix site as checked on 18 November 2026.** This redesign does not change DNS.
Canonical metadata, social image URLs, JSON-LD identifiers, robots and sitemap
currently match the GitHub Pages release origin. The custom domain remains a
separate site until a future migration updates its hosting and DNS.

Before moving the custom domain:

1. Confirm the intended host and public origin; configure domain validation,
   HTTPS and DNS with the domain owner.
2. Update the canonical, social metadata/image URLs, JSON-LD identifiers, robots
   and sitemap together to match the chosen origin and deployed files.
   Update the legal page if the hosting provider changes.
3. Inventory indexed Wix URLs and configure permanent redirects on the chosen
   host. Known paths include `/me-contacter` → `/#contact`,
   `/occasions-sp%C3%A9ciales` → `/#costumes`,
   `/couturi%C3%A8re-sur-mesure` → `/#couture`, and
   `/mentions-l%C3%A9gales` → `/mentions-legales.html`. Check exact encoded paths:
   some Wix URLs use decomposed accents. GitHub Pages alone does not offer
   arbitrary server-side redirect rules.
4. Verify www/non-www behavior, HTTPS, old URLs, images, contact links, robots
   and sitemap on the public domain, then check crawling and indexing in the
   appropriate search-console tools.

The page supplies readable content and consistent business markup. Rankings,
indexing and inclusion in AI answers are external outcomes, not guaranteed
results of deployment.

## Checks after changes

Inspect desktop and mobile layouts, image loading, filters, menu and image-viewer
keyboard controls, focus restoration, reduced motion and the no-JavaScript
experience. Confirm telephone, email and map destinations; parse JSON-LD and
sitemap XML, and check local paths before publishing. These are maintenance
instructions, not a claim that every check has already passed for a revision.
