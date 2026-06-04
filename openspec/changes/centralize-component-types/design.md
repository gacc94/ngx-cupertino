## Context

`@ngx-cupertino/core` already exports `CupButtonVariant` and `CupSize` types, but components aren't consuming them. The `CupSize` type uses full strings (`'small' | 'medium' | 'large'`) while components use shorthand (`'sm' | 'md' | 'lg'`) for CSS tokens and classes. These are two distinct sizing concepts and need separate types.

## Goals / Non-Goals

**Goals:**
- Add `CupComponentSize` type to core for visual component sizing
- Add `CupProgressType` type to core for progress display modes
- Refactor Button to import types from core instead of hardcoding
- Refactor Progress to import types from core instead of hardcoding

**Non-Goals:**
- No change to `CupSize` (semantic sizes remain unchanged)
- No change to component behavior or API surface
- No changes to Toggle, TextField, Slider, Stepper (no hardcoded unions to centralize)

## Decisions

### 1. `CupComponentSize` separate from `CupSize`

**Decision**: Add `CupComponentSize = 'sm' | 'md' | 'lg'` as a new type in `sizes.ts`, distinct from `CupSize = 'small' | 'medium' | 'large'`.

**Rationale**: `CupSize` is for semantic/label contexts (e.g., form field sizes, config defaults). `CupComponentSize` is for visual sizing (CSS tokens like `--cup-font-size-sm`, host classes like `.cup-small`). They serve different purposes and using the same type would blur the distinction. Angular Material uses a similar approach with separate `ThemePalette` and `ComponentSize` types.

### 2. `CupProgressType` in `variants.ts`

**Decision**: Add `CupProgressType = 'linear' | 'circular'` to `variants.ts` alongside `CupButtonVariants` and `CupCardVariants`.

**Rationale**: `variants.ts` is the logical home for component display mode enums. `CupProgressType` follows the same pattern as `CupButtonVariant` (`as const` object + derived type). Keeps all variant-like types in one file.

### 3. Components import types from core

**Decision**: Button and Progress components import `CupButtonVariant`, `CupComponentSize`, `CupProgressType` from `@ngx-cupertino/core`.

**Rationale**: Single source of truth eliminates duplication. If a new variant is added to core, all components automatically get the new type member. This is the standard pattern for design systems (Angular Material `@angular/material/core`, PrimeNG `primeng/api`, NG-ZORRO `ng-zorro-antd/core/types`).

## Risks / Trade-offs

- **`CupComponentSize` vs `CupSize` naming**: Could cause confusion. Mitigation: clear JSDoc on both types explaining the difference. `CupComponentSize` is visual, `CupSize` is semantic.
- **Import from `@ngx-cupertino/core`**: Adds a dependency edge from `ui` to `core` type-only. Mitigation: this dependency already exists (components import `CupFormControl`, `CupIcon`, etc.). Type imports add zero runtime cost.
