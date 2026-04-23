# Metaobject: `lamp_spec`

Create this definition in Shopify admin:
**Settings → Custom data → Metaobjects → Add definition**

| Setting            | Value                                      |
| ------------------ | ------------------------------------------ |
| Name               | Lamp spec                                  |
| Type (API handle)  | `lamp_spec`                                |
| Access             | Storefronts (read)                         |

### Fields

| Field key       | Type                        | Required | Notes                                       |
| --------------- | --------------------------- | -------- | ------------------------------------------- |
| `label`         | Single line text            | ✓        | e.g. "Material", "Bulb", "Dimensions"       |
| `value`         | Single line text            | ✓        | e.g. "Solid brass"                          |
| `icon`          | File (image)                |          | Optional PNG/SVG icon                       |
| `display_order` | Integer                     |          | Optional sort hint (lower = earlier)        |

### Starter entries

Create these entries under **Content → Metaobjects → Lamp spec**:

1. `material`   — label: Material,   value: Solid brass
2. `bulb`       — label: Bulb,       value: E26 · 2700K · dimmable LED
3. `dimensions` — label: Dimensions, value: H 42 cm · Ø 18 cm
4. `weight`     — label: Weight,     value: 1.8 kg
5. `power`      — label: Power,      value: USB-C · 12V / 2A
6. `warranty`   — label: Warranty,   value: 5 years

### Using in the theme

In the theme editor, open **Lamp specs** section → each **Spec** block → pick the metaobject entry.
Leave the override fields blank to use the metaobject values, or fill them in to pin a custom value.
