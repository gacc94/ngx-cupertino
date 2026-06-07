## Why

Three type improvements in `@ngx-cupertino/icons` to narrow types with `as const satisfies`, remove unnecessary dependency on `@ngx-cupertino/core`, and make the code more type-safe without functional changes.

## What Changes

- **MODIFIED**: `sf-symbol-map.ts` — use `as const satisfies Record<string, string>` for literal value types
- **MODIFIED**: `lucide-icon-map.ts` — use `as const satisfies Record<string, LucideIconData>` for strict icon typing
- **MODIFIED**: `cup-icon.ts` — keep `CupIconSize` local, document relationship to `CupComponentSize`

## Capabilities

### Modified Capabilities
- `icons-package-v3`: Narrower type inference for SF symbol and Lucide icon maps, local type declaration

## Impact

- Type-only changes, no runtime behavior changes
- No public API changes
- No dependency changes (icons stays independent of core)
