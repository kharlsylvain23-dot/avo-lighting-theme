# Avo Lighting — Shopify Online Store 2.0 Theme

A minimalist, single-product Shopify theme for **Avo Lighting Co.** built around
**The Halo** — a smoked-glass mushroom table lamp on a brushed-chrome base.

Positioning follows the *Mark Builds Brands* purple-ocean playbook: instead of
selling "a lamp," the store sells "the one beautiful object that makes a rented
apartment finally feel like yours" — a hyper-specific demographic (design-forward
renters) inside a proven category.

Monochrome palette — black, white, and gray, with a pure-white accent so nothing
competes with the product. Dark mode ships out of the box via an icon toggle in
the header that remembers the visitor's choice and respects `prefers-color-scheme`.
Fully responsive. Modular Liquid sections, JSON templates, app block (`@app`)
support, and plugin/extension friendly.

## Stock imagery

Out of the box, the theme renders with Unsplash stock photos in the hero, the
alternating content blocks, the product cards, and the product page (whenever
you haven't uploaded your own image yet). Pravatar avatars fill the reviews.
Upload real imagery via **Customize → &lt;section&gt; → Image** and the stock
fallbacks disappear automatically.

## Folder structure

```
.
├── assets/                 # CSS, JS, images
├── config/                 # settings_schema.json, settings_data.json
├── layout/                 # theme.liquid (master layout)
├── locales/                # translations (en.default.json + schema)
├── sections/               # all sections + section groups
├── snippets/               # reusable partials (product-card, etc.)
└── templates/              # JSON templates for index/product/collection/cart/page/search/404
```

## Sections

Marketing / homepage:
- `hero.liquid` — headline, subheadline, image, CTA
- `transformation-steps.liquid` — numbered "how it works" steps
- `alternating-content-blocks.liquid` — alternating image/copy rows
- `benefits.liquid` — short benefit grid
- `features.liquid` — feature grid with icons
- `social-proof.liquid` — reviews / testimonials
- `comparison-table.liquid` — flexible "us vs them" table built from blocks
- `faq.liquid` — accordion via `<details>`
- `product-showcase.liquid` — best-sellers grid (collection or hand-picked)

Layout:
- `header.liquid` — logo, nav, search, account, cart (block-driven)
- `footer.liquid` — multi-column, contact, social, legal (block-driven)
- `header-group.json`, `footer-group.json` — section groups for layout

Templates:
- `main-product.liquid`, `main-collection.liquid`, `main-cart.liquid`, `main-page.liquid`

All sections include `{ "type": "@app" }` where appropriate so Shopify apps
can inject app blocks (reviews, upsells, subscriptions, etc.).

## Local development

Install Shopify CLI (https://shopify.dev/docs/themes/tools/cli):

```bash
brew install shopify/shopify/shopify-cli
```

Push to a development store / preview:

```bash
shopify theme dev --store your-store.myshopify.com
```

Run theme-check:

```bash
shopify theme check
```

## Deploying

```bash
# First push (creates an unpublished theme)
shopify theme push --unpublished --store your-store.myshopify.com

# Subsequent updates to an existing theme
shopify theme push --theme <theme-id> --store your-store.myshopify.com
```

## Git

```bash
git init
git add .
git commit -m "Initial Blueprint theme"
git remote add origin <your-repo>
git push -u origin main
```

## Customization

- Colors and typography: **Online Store → Themes → Customize → Theme settings**
- Per-section content: **Customize → click any section** in the theme editor
- App blocks: add via the **+ Add block** button inside supported sections
