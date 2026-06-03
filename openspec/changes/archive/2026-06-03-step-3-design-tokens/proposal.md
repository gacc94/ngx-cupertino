## Why

The `@ngx-cupertino/tokens` package (`libs/tokens/`) exists but contains only a placeholder `VERSION` export. No CSS custom properties are defined. Components (Steps 7-10) cannot be built without a design token foundation — they need colors, typography, spacing, elevation, radius, motion, themes, and tints as `--cup-*` CSS variables to style themselves properly. This is the first implementation step after Foundation (Steps 1-2).

## What Changes

- **Create 8 SCSS partials** in `libs/tokens/src/lib/` with all CSS custom properties:
  1. `_colors.scss` — 12 system colors, semantic labels (4 levels), vibrant labels (4), fills (4), vibrant fills (4), backgrounds (6), grays (6), separators (2), link colors, overlay
  2. `_typography.scss` — 11 text styles (Large Title → Caption 2), font weights (4), font families (SF Pro + SF Mono)
  3. `_spacing.scss` — 4px grid (8 levels), derived tokens, platform sizing (touch/desktop), safe-area insets
  4. `_elevation.scss` — Liquid Glass (3 Apple variants: regular/clear/prominent), box shadows (4 levels), z-index (8 layers)
  5. `_radius.scss` — Border radius scale (5 levels: sm → full)
  6. `_motion.scss` — Durations (4), easing curves (6 including iOS spring), performance guidance
  7. `_themes.scss` — Light/dark theme via `prefers-color-scheme` + `.cup-dark` manual toggle
  8. `_tints.scss` — 12 Apple tint presets (blue, green, indigo, orange, pink, purple, red, teal, yellow, gray, mint, cyan) with 4 stops each (base, subtle, on, container)

- **Create entry point** `libs/tokens/src/index.scss` with `@forward` for all 8 partials
- **Update entry point** `libs/tokens/src/index.ts` to export `TOKENS_VERSION`
- **Update** `libs/tokens/ng-package.json` to include SCSS partials as package assets
- **Verify** `bun nx build tokens` includes all SCSS partials in `dist/`

## Capabilities

### New Capabilities

- `design-tokens-colors`: System colors, semantic labels (primary → quaternary), vibrant labels, fills, vibrant fills, backgrounds (3 levels + 3 grouped), 6-level gray scale, separators, link color, overlay/backdrop
- `design-tokens-typography`: 11-text-style scale (Large Title → Caption2) with size/weight/leading/tracking, 4 font weights, SF Pro + SF Mono font families
- `design-tokens-spacing`: 4px grid (8 levels), derived tokens, responsive platform sizing via `(hover: hover) and (pointer: fine)`, safe-area insets for iOS notch/Safari
- `design-tokens-elevation`: Liquid Glass (3 Apple variants: regular, clear, prominent), 4 box shadow elevation levels, 8-layer z-index scale
- `design-tokens-theming`: Light/dark theme via `prefers-color-scheme` + `.cup-dark` class, 12 Apple tint presets with 4 stops each
- `design-tokens-motion`: 4 animation durations, 6 easing curves (including iOS spring), reduced-motion support, will-change performance guidance
- `design-tokens-radius`: 5-level border radius scale (sm, md, lg, xl, full)
- `design-tokens-entry`: SCSS barrel (`@forward`) and TypeScript entry point for package build compliance

### Modified Capabilities

_None — this is the first implementation of the tokens package._

## Impact

- **Code**: Creates 8 SCSS files in `libs/tokens/src/lib/`. Creates 1 SCSS barrel. Updates 1 TS file. Updates `ng-package.json`.
- **Package**: `@ngx-cupertino/tokens` becomes a functional npm package with 100+ CSS custom properties that consumers import via `@use '@ngx-cupertino/tokens'`.
- **Dependencies**: None. Pure SCSS. No runtime deps.
- **Breaking**: None. Package was empty (placeholder only).
