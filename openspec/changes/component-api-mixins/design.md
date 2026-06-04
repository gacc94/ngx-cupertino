## Context

The design system has 3 validation layers emerging:
1. `_api.scss` in `@ngx-cupertino/tokens` — validates individual token existence
2. `_mixins.scss` in `@ngx-cupertino/core` — validates token combinations (e.g., `cup-liquid-glass`)
3. `_component-api.scss` — validates complete component patterns (e.g., `cup-button-base`)

Layer 3 is the missing piece. Components currently hardcode their SCSS with raw tokens. The `_component-api.scss` file provides semantic mixins that combine the right tokens for each component pattern.

## Goals / Non-Goals

**Goals:**
- Create mixins for all 6 Phase 1 component patterns
- Shared state mixins reusable across all components
- Use `t.token()` from the Token API Layer for build-time validation
- Barrel and package exports properly configured

**Non-Goals:**
- Do NOT refactor existing components to use these mixins (future migration)
- No new dependencies
- No SCSS for Stepper or forms-specific patterns (use shared mixins)

## Decisions

### 1. Mixins per component pattern, not per CSS property

**Decision**: `cup-button-base` sets all base styles for a button at once, instead of individual `cup-button-display`, `cup-button-padding`, etc.

**Rationale**: Component patterns are atomic — a Button always needs inline-flex, alignment, gap, sizing, padding, border-radius, font. Breaking into micro-mixins adds indirection without reuse benefit. Angular Material follows this approach with `mat.button-base()`.

### 2. Shared state mixins

**Decision**: `cup-disabled` and `cup-interactive` are shared across components, not duplicated per component.

**Rationale**: Disabled state (`opacity: 0.4; pointer-events: none`) is identical for all components. Interactive state hover/active effects are also universal. Define once, use everywhere.

### 3. Variants via parameterized mixins

**Decision**: `cup-button-variant($variant)` accepts a string parameter matching the TypeScript `CupButtonVariant` type.

**Rationale**: Keeps TypeScript and SCSS variant definitions in sync. Adding a new variant requires updating both the type in `core/constants` and the mixin. Single source of truth pattern.

### 4. Size mixins separate from base

**Decision**: `cup-button-size($size)` is a separate mixin from `cup-button-base`.

**Rationale**: Sizing is optional — a Button may use default size, or override to sm/lg. Keeping size as a separate mixin allows conditional inclusion per instance.

## Risks / Trade-offs

- **Migration cost**: Existing components need refactoring. Mitigation: this change only adds the mixins; migration is a separate change. Old and new patterns coexist.
- **Mixins tied to component patterns**: If a component changes its visual design, the mixin must change. Mitigation: mixins encapsulate the pattern — one change propagates to all consumers.
