## Why

The `@ngx-cupertino/icons` package (`libs/icons/`) exists but contains only a placeholder `VERSION` export. Phase 1 components (Button, Slider, TextField, Stepper) all use an `icon` input — they cannot render icons without this package. Icons must be implemented before Core (Step 5) because Core services like `CupNotificationService` reference icons in their API. Icons only depends on Tokens (Step 3, already complete) for `color: var(--cup-label)` — no other dependencies.

## What Changes

- **Install `@lucide/angular`** as a dependency
- **Create `cup-icon` wrapper component** at `libs/icons/src/lib/cup-icon.ts`:
  - Wraps `LucideIcon` from `@lucide/angular` with Cupertino styling
  - Signal-based API: `name` (required), `size` (named sm/md/lg or px), `strokeWidth` (default 1.75), `fill`, `color`, `ariaLabel`
  - `.fill` suffix auto-detection: `name="heart.fill"` → `isFilled()` returns true
  - SF Symbols → Lucide mapping via `SF_SYMBOL_MAP`
  - `computed()` resolver with fallback to raw name
  - `:host` styles: `inline-flex`, `line-height: 0`, `flex-shrink: 0`
  - ARIA: decorative by default (`aria-hidden`), standalone with `ariaLabel` input
- **Create `sf-symbol-map.ts`** with 60+ SF Symbols → Lucide mappings
- **Create `provide-icons.ts`** with `provideCupIcons()` registering 55+ Lucide icons globally
- **Update entry point** `libs/icons/src/index.ts` exporting `CupIcon`, `SF_SYMBOL_MAP`, `provideCupIcons`
- **Verify** `bun nx build icons` builds successfully

## Capabilities

### New Capabilities

- `cup-icon-component`: A standalone Angular component wrapping `@lucide/angular` with Cupertino styling, named sizes, SF Symbols semantic mapping, `.fill` auto-detection, and ARIA support
- `sf-symbol-map`: A TypeScript constant mapping 60+ Apple SF Symbols names to Lucide icon names with computed resolver fallback
- `provide-icons`: A provider function registering 55+ Lucide icons globally via `provideLucideIcons()` for consumer use in `app.config.ts`
- `icons-entry`: Public API barrel exports and `ng-package.json` configuration

### Modified Capabilities

_None — this is the first implementation of the icons package._

## Impact

- **Code**: Creates 3 files in `libs/icons/src/lib/` (cup-icon.ts, sf-symbol-map.ts, provide-icons.ts). Creates entry point at `libs/icons/src/index.ts`.
- **Dependencies**: Adds `@lucide/angular` as a dependency. No runtime deps beyond `@ngx-cupertino/tokens` (already published).
- **Package**: `@ngx-cupertino/icons` becomes a functional npm package providing 55+ icons.
- **Breaking**: None. Package was empty (placeholder only).
