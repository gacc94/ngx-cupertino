## 1. SCSS Tokens

- [x] 1.1 Update `_themes.scss` — replace `[data-theme="dark"]` with `[data-mode="dark"]` + `[data-mode="light"]`, add `color-scheme: light dark` to `:root`, ensure all ~70 dark mode tokens are covered
- [x] 1.2 Update `_tints.scss` — replace static `:root` tint definitions with `[data-tint="blue"]` through `[data-tint="brown"]` attribute selectors (13 colors × 4 stops), add `[data-mode="dark"][data-tint="..."]` overrides, keep `:root` fallback
- [x] 1.3 Update `_api.scss` — add new tint token keys to `$tokens` map if missing

## 2. ThemeService

- [x] 2.1 Rename `applyTheme()` → `applyMode()`, set `this.document.documentElement.dataset['mode']` instead of `dataset['theme']` (using already injected `DOCUMENT` token)
- [x] 2.2 Refactor `setTint()` — set `this.document.documentElement.dataset['tint']` to tint name for `CupTintName` values, keep `style.setProperty()` only as hex fallback. Remove `toAlpha()` and `contrastColor()` from regular tint path.
- [x] 2.3 Update `currentTint` signal to store tint name string (`'blue'`) instead of hex color
- [x] 2.4 Keep `toAlpha()` and `contrastColor()` as private helpers for hex fallback only

## 3. Providers

- [x] 3.1 Update `CupConfig` interface — `tintColor: CupTintName | string`
- [x] 3.2 Update `provideCupertino()` — always call `ts.setTint()`, use `'blue'` as default, use `dataset` path for CupTintName and `style.setProperty()` path for hex strings

## 4. Cleanup

- [x] 4.1 Search and replace `data-theme` → `data-mode` across all `libs/` source files
- [x] 4.2 Verify with `grep -r "data-theme" libs/` — must be empty

## 5. Verification

- [x] 5.1 Run `bun nx build tokens` — build succeeds
- [x] 5.2 Run `bun nx build core` — build succeeds
- [x] 5.3 Run `bun nx build ui` — build succeeds
- [x] 5.4 Run `bun nx test ui` — all 97 tests pass
- [x] 5.5 Run `bun nx serve playground` — verify `data-mode` and `data-tint` on `<html>`, dark mode toggle works, tint changes apply
- [x] 5.6 Commit with conventional commit message including emoji
