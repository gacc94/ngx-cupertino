## Why

The current theming system uses a single `data-theme="dark"` attribute that couples two independent axes: color mode (light/dark) and accent tint (blue, indigo, etc.). A user should be able to combine ANY tint with ANY mode — indigo+dark, blue+light, etc. Currently this is impossible because tints are set imperatively via `ThemeService.setTint()` using `style.setProperty()` which overrides CSS cascade.

## What Changes

### SCSS: `_themes.scss` and `_tints.scss`

- **Replace `[data-theme="dark"]` with `[data-mode="dark"]`** — independent mode axis controlling backgrounds, labels, fills, glass, shadows, overlay, system colors (~70 tokens)
- **Replace imperative tint setters with `[data-tint="blue"]` CSS selectors** — 13 tint colors with complete light values + dark mode overrides. Tint becomes declarative via `dataset` attribute.
- **`:root` fallback** for `--cup-tint: #007AFF` when no `data-tint` is set

### ThemeService

- `setTheme(mode)` now sets `dataset['mode']` instead of `dataset['theme']`
- `setTint(tintName)` now sets `dataset['tint']` — no more manual `style.setProperty()` for `--cup-tint*` tokens
- `currentTint` signal now stores tint name (`'blue'`) not hex color
- `setTint` with custom hex (legacy) delegates to old `style.setProperty()` as fallback

### provideCupertino

- Always calls `ts.setTheme()` and `ts.setTint()` — never skips
- Defaults: `theme: 'auto'`, `tintColor: 'blue'`

### CupConfig

- `tintColor` now accepts `CupTintName` (string tint name) or plain hex string
- Removed `{ light: string; dark: string }` object type

## Capabilities

### New Capabilities

- `multi-dimensional-theming`: Independent `data-mode` (light/dark) and `data-tint` (13 colors) axes on `<html>`. Any tint works with any mode. CSS handles tint globally via attribute selectors — no imperative JS per component.

### Modified Capabilities

- `core-services`: ThemeService.setTheme() sets `data-mode`. ThemeService.setTint() sets `data-tint`. Removed manual `style.setProperty()` for tint tokens.
- `core-providers`: provideCupertino always initializes theme and tint with defaults. CupConfig.tintColor type simplified.
- `core-constants`: CupTintName union used directly for tintColor config.

## Impact

- **Files modified**: `_themes.scss`, `_tints.scss`, `theme.service.ts`, `cupertino.provider.ts`, `_api.scss`
- **Files deleted**: None (repurposed)
- **Breaking**: `data-theme` attribute replaced by `data-mode`. Any external CSS or JS relying on `[data-theme]` needs migration.
- **Migration path**: `[data-theme="dark"]` → `[data-mode="dark"]`. `ThemeService.setTint(hex)` → `ThemeService.setTint('blue')`.
