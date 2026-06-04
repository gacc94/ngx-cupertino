## Why

Phase 1 components (Button, Progress) hardcode union types for inputs like `variant`, `size`, and `type` directly in their component files. These types are already defined (or should be) in `@ngx-cupertino/core` as the single source of truth. Duplicating type unions across components creates inconsistency risk and maintenance burden. A `CupComponentSize` type (`'sm' | 'md' | 'lg'`) is also missing from core — components use this visual sizing convention while core only defines `CupSize` for semantic sizes (`'small' | 'medium' | 'large'`).

## What Changes

- **Add `CupComponentSize` type** to `libs/core/src/lib/constants/sizes.ts`: `'sm' | 'md' | 'lg'` for visual component sizing (distinct from `CupSize` which is `'small' | 'medium' | 'large'` for semantic/label sizing)
- **Add `CupProgressType` type** to `libs/core/src/lib/constants/variants.ts`: `'linear' | 'circular'` for progress bar display modes
- **Refactor `cup-button.ts`**: replace inline union types with `CupButtonVariant` and `CupComponentSize` imported from `@ngx-cupertino/core`
- **Refactor `cup-progress.ts`**: replace inline union types with `CupProgressType` and `CupComponentSize` imported from `@ngx-cupertino/core`
- **Export new types** from `libs/core/src/index.ts`

## Capabilities

### Modified Capabilities

- `core-constants`: Add `CupComponentSize` type to `sizes.ts`. Add `CupProgressType` to `variants.ts`. Export both from index.
- `cup-button`: Replace hardcoded `variant` union with `CupButtonVariant`, `size` union with `CupComponentSize`.
- `cup-progress`: Replace hardcoded `type` union with `CupProgressType`, `size` union with `CupComponentSize`.

## Impact

- **Files modified**: 5 files (`sizes.ts`, `variants.ts`, `core/src/index.ts`, `cup-button.ts`, `cup-progress.ts`)
- **Breaking**: None. Types resolve to the same string literals. Consumers see no API change.
- **Type-safety**: Improved — if a variant/size/type is added or removed, it's updated in one place (core), and all components get the change via type imports.
