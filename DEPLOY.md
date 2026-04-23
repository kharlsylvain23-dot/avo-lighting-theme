# Blueprint — Deploy Notes

## Git

- **Remote (origin):** https://github.com/kharlsylvain23-dot/avo-lighting-theme.git
- **Branch:** `main`
- **Local path:** `/Users/admin/blueprint`

### Push updates

```bash
cd /Users/admin/blueprint
git add .
git commit -m "your message"
git push
```

### Clone fresh

```bash
git clone https://github.com/kharlsylvain23-dot/avo-lighting-theme.git
```

## Shopify

Install the [Shopify CLI](https://shopify.dev/docs/themes/tools/cli), then:

```bash
# Local preview against a dev store
shopify theme dev --store your-store.myshopify.com

# Push as an unpublished theme
shopify theme push --unpublished --store your-store.myshopify.com

# Overwrite an existing theme by id
shopify theme push --theme <THEME_ID> --store your-store.myshopify.com
```

## Notes

- Monochrome palette (black / white / gray) with pure-white accent.
- Dark-mode icon toggle lives in the header block `theme_toggle`; preference
  persists to `localStorage` and respects `prefers-color-scheme`.
- Stock Unsplash photos fill hero / alt-blocks / product cards / reviews until
  merchant uploads their own media.
