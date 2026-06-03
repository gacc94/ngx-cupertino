## 1. Create `_colors.scss` — Color System

- [x] 1.1 Define 12 system colors in `:root` with light values (`--cup-color-red` through `--cup-color-brown`)
- [x] 1.2 Define 4 semantic label tokens (`--cup-label`, `--cup-label-secondary`, `--cup-label-tertiary`, `--cup-label-quaternary`)
- [x] 1.3 Define 4 vibrant label tokens for glass/materials
- [x] 1.4 Define 4 fill tokens (`--cup-fill-primary` through `--cup-fill-quaternary`)
- [x] 1.5 Define 4 vibrant fill tokens
- [x] 1.6 Define 6 background tokens (3 base + 3 grouped)
- [x] 1.7 Define 6 gray scale tokens (`--cup-gray` through `--cup-gray-6`)
- [x] 1.8 Define 2 separator tokens (`--cup-separator`, `--cup-separator-opaque`)
- [x] 1.9 Define link tokens (`--cup-link`, `--cup-link-visited`) and overlay token (`--cup-overlay`)

## 2. Create `_typography.scss` — Typography Scale

- [x] 2.1 Define 11 text style tokens (Large Title through Caption 2) with font shorthand values
- [x] 2.2 Define 4 font weight tokens (`--cup-font-weight-regular` through `--cup-font-weight-bold`)
- [x] 2.3 Define font family tokens (`--cup-font-family` with SF Pro stack, `--cup-font-family-mono` with SF Mono)
- [x] 2.4 Add line-clamp tokens (`--cup-line-clamp-1`, `--cup-line-clamp-2`, `--cup-line-clamp-3`)

## 3. Create `_spacing.scss` — 4px Grid & Platform Sizing

- [x] 3.1 Define 8 spacing tokens (`--cup-spacing-1` through `--cup-spacing-8`, 4px → 32px)
- [x] 3.2 Define derived tokens (`--cup-padding-horizontal`, `--cup-padding-vertical`, `--cup-gap-default`, `--cup-gap-large`)
- [x] 3.3 Define platform sizing tokens with responsive `(hover: hover) and (pointer: fine)` media query
- [x] 3.4 Define safe-area inset tokens (`--cup-safe-area-top/bottom/left/right`)

## 4. Create `_elevation.scss` — Liquid Glass, Shadows & Z-Index

- [x] 4.1 Define 3 Liquid Glass background variants with light/dark values
- [x] 4.2 Define glass effect tokens (blur levels, saturation, border)
- [x] 4.3 Define 4 box shadow elevation tokens with light/dark values
- [x] 4.4 Define 8 z-index layer tokens

## 5. Create `_radius.scss` — Border Radius

- [x] 5.1 Define 5 radius tokens (`--cup-radius-sm` through `--cup-radius-full`)

## 6. Create `_motion.scss` — Animation & Motion

- [x] 6.1 Define 4 duration tokens
- [x] 6.2 Define 6 easing curve tokens including iOS spring
- [x] 6.3 Add reduced-motion media query
- [x] 6.4 Add performance guidance comment about `will-change: transform`

## 7. Create `_themes.scss` — Light/Dark Themes

- [x] 7.1 Set `color-scheme: light dark` on `:root`
- [x] 7.2 Add dark overrides for all color/label/fill/background/gray/separator tokens
- [x] 7.3 Add dark overrides for shadow tokens
- [x] 7.4 Add dark overrides for tint base tokens
- [x] 7.5 Define `.cup-dark` class with same dark overrides for manual toggle
- [x] 7.6 Ensure no light values are defined in this file (no duplication)

## 8. Create `_tints.scss` — 12 Apple Tint Presets

- [x] 8.1 Define 12 tint presets in `:root` with 4 stops each (base, subtle, on, container)
- [x] 8.2 Ensure light values only (dark overrides in `_themes.scss`)

## 9. Create Entry Point & Package Config

- [x] 9.1 Create `libs/tokens/src/index.scss` with `@forward` for all 8 partials
- [x] 9.2 Update `libs/tokens/src/index.ts` to export `TOKENS_VERSION`
- [x] 9.3 Update `libs/tokens/ng-package.json` to include `"assets": ["src/lib/**/*.scss"]`

## 10. Final Verification

- [x] 10.1 Run `bun nx build tokens` — build succeeds
- [x] 10.2 Verify `dist/libs/tokens/src/lib/` contains all 8 partials
- [x] 10.3 Verify consumer can `@use '@ngx-cupertino/tokens'` and access `--cup-label`
- [x] 10.4 Run `bun biome check --write libs/tokens/` for formatting
- [x] 10.5 Commit: `git add . && git commit -m "feat(tokens): ✨ add design tokens — 8 SCSS partials from iOS 26 Figma"`
