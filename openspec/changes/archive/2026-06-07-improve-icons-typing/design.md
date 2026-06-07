## Context

The icons package has three type opportunities: map values can be narrowed with `as const satisfies`, the icon map can be strictly typed, and the local `CupIconSize` should stay independent of `@ngx-cupertino/core`.

## Goals / Non-Goals

**Goals:**
- Narrow `SF_SYMBOL_MAP` values to literal strings
- Strictly type `LUCIDE_ICONS` with Lucide's `IconNode` type
- Keep `CupIconSize` local to icons package

**Non-Goals:**
- Change runtime behavior
- Change public API
- Add dependency on @ngx-cupertino/core

## Decisions

### D1: `as const satisfies` over explicit type annotation
`as const satisfies` narrows literal types without losing the `as const` inference. Better than explicit `Record<>` annotation which widens values.

### D2: Local `CupIconSize` over importing `CupComponentSize`
Icons should not depend on core. The type is intentionally duplicated with a comment documenting the relationship.
