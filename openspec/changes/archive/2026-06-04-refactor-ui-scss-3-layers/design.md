## Context

Phase 1 components were implemented with inline `styles: [...]` arrays using raw `var(--cup-*)` CSS custom properties. This was correct at implementation time but the design system has since evolved: `_api.scss` (token map), `_mixins.scss` (generic mixins), and `_component-api.scss` (typed component mixins) now provide 3-layer compile-time validation.

## Goals / Non-Goals

**Goals:**
- Extract inline styles to external `.scss` files per component
- Replace raw `var(--cup-*)` with typed mixins from `_component-api.scss`
- Keep templates inline (only extract SCSS)
- Zero visual regressions

**Non-Goals:**
- No template changes
- No behavior changes
- No API changes — all inputs/outputs unchanged

## Decisions

### 1. Extract SCSS only, not templates

**Decision**: Keep `template:` inline, only extract `styles:` to `styleUrl`.

**Rationale**: Templates are small and benefit from inline co-location with component logic (Angular best practice). SCSS files grew complex enough to warrant separate files. This is consistent with Angular Material's pattern.

### 2. One `.scss` per component folder

**Decision**: `cup-button.scss` lives alongside `cup-button.ts` and `cup-button.spec.ts`.

**Rationale**: Co-located files per component pattern from AGENTS.md and Step 6 spec. Each component folder is self-contained.

### 3. Use highest available mixin layer

**Decision**: Components use Layer 3 (component mixins) where available, falling back to Layer 2 (generic mixins), and only Layer 1 (t.token()) for one-off values.

**Rationale**: Follows `docs/token-decision-flow.md`. Layer 3 mixins validate the complete component pattern. Layer 1 strings have no pattern validation.

## Risks / Trade-offs

- **Visual regression**: Extracting styles could introduce subtle CSS differences. Mitigation: `bun nx test ui` (97 tests) covers rendering, states, ARIA. Visual diff via playground.
- **Build dependency**: `.scss` files must be compiled by ng-packagr. Mitigation: `ng-package.json` already has SCSS asset config from Step 5.
