## Why

`@ngx-cupertino/tokens` exports CSS custom properties via SCSS partials. Components consume tokens as raw `var(--cup-label)` strings. There is no compile-time validation — a typo like `var(--cup-label-primary)` silently produces broken CSS discovered only at runtime. Angular Material and Tailwind 4 both solve this with validation maps that fail the build if a token doesn't exist.

## What Changes

- **New file**: `libs/tokens/src/lib/_api.scss` — SCSS `$tokens` map (178 entries) + `token($name)` getter function with `@error` for invalid keys
- **Modified file**: `libs/tokens/src/_index.scss` — add `@forward 'lib/api'` to barrel
- **No component refactors** — existing `var(--cup-*)` usage continues working. Migration of components to `t.token()` is a separate future change.

## Capabilities

### New Capabilities

- `token-api`: Build-time SCSS token validation. Components can use `t.token('name')` instead of raw `var(--cup-*)`. If a token key doesn't exist in the `$tokens` map, SCSS compilation fails with a clear error message listing all valid keys. 178 tokens across 27 categories.

### Modified Capabilities

None — additive only.

## Impact

- **New file**: `libs/tokens/src/lib/_api.scss` (~200 lines)
- **Modified file**: `libs/tokens/src/_index.scss` (1 line added)
- **Breaking**: None. Backward-compatible. Existing `var(--cup-*)` references unaffected.
- **Build**: Requires adding `@use` to the SCSS partials already used by `@forward` in the barrel
