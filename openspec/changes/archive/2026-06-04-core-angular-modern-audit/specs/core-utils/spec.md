## MODIFIED Requirements

### Requirement: CupFormControl uses OnPush

The `CupFormControl` abstract class SHALL declare `changeDetection: ChangeDetectionStrategy.OnPush` in its `@Directive()` decorator.

#### Scenario: OnPush is declared on base class

- **WHEN** reading `base-cva.ts`
- **THEN** `changeDetection: ChangeDetectionStrategy.OnPush` is in the `@Directive()` decorator

### Requirement: a11y.ts functions accept Document parameter

The utility functions in `a11y.ts` (`prefersReducedMotion`, `isHighContrastMode`, `hasCoarsePointer`) SHALL accept an optional `Document` parameter instead of using global `window`.

#### Scenario: prefersReducedMotion with parameter

- **WHEN** `prefersReducedMotion(doc)` is called
- **THEN** it uses `doc.defaultView?.matchMedia("(prefers-reduced-motion: reduce)").matches`
- **THEN** it does NOT access global `window` directly

#### Scenario: Backward compatibility without parameter

- **WHEN** `prefersReducedMotion()` is called without a document
- **THEN** it returns `false` (safe default when no document available, e.g., SSR)
