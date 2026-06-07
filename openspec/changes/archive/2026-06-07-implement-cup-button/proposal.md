## Why

The cup-button is the first atomic component in the @ngx-cupertino/ui library. It serves as the reference implementation for the Angular Signals API pattern (no decorators, no NgModules, just `input()`, `output()`, `computed()`), the token consumption pattern (`t.token()` via `@ngx-cupertino/tokens`), the host binding architecture (`[class.cup-*]`), and the cross-platform approach (same code, tokens auto-resolve for iOS vs macOS). This validates the entire design system toolchain end-to-end.

## What Changes

- **NEW**: `libs/ui/src/lib/button/cup-button.ts` — standalone Angular component with 8 signal inputs, 1 output, inline @if template, OnPush CD
- **NEW**: `libs/ui/src/lib/button/cup-button.scss` — complete SCSS with 3 sizes, 5 variants, loading state, HC borders
- **NEW**: `libs/ui/src/lib/button/index.ts` — barrel export
- **NEW**: `libs/core/src/lib/types/component.types.ts` — shared types: CupButtonVariant, CupComponentSize, CupIconPosition

## Capabilities

### New Capabilities
- `cup-button-component`: The button component with 5 variants (filled, tinted, gray, plain, liquid-glass), 3 sizes (sm/md/lg), destructive modifier, loading spinner, icon support, full-width option, and cross-platform token adaptivity

### Modified Capabilities
None.

## Impact

- New files in `libs/ui/src/lib/button/` (3 files)
- New file in `libs/core/src/lib/types/` (1 file)
- Depends on `@ngx-cupertino/tokens` and `@ngx-cupertino/icons`
- No breaking changes
