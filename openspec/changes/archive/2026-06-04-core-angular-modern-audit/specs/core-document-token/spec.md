## ADDED Requirements

### Requirement: All DOM access uses DOCUMENT injection token

Every service, provider, and directive in `libs/core/src/lib/` that accesses `document` or `window` SHALL use Angular's `DOCUMENT` injection token from `@angular/common` via `inject(DOCUMENT)` instead of global `document` or `window`.

#### Scenario: ThemeService uses DOCUMENT

- **WHEN** reading `theme.service.ts`
- **THEN** `document.documentElement` accesses are replaced with `this.document.documentElement` where `document` is `inject(DOCUMENT)`
- **THEN** `window.matchMedia(...)` is replaced with `this.document.defaultView?.matchMedia(...)`

#### Scenario: BreakpointService uses DOCUMENT

- **WHEN** reading `breakpoint.service.ts`
- **THEN** `typeof window !== "undefined"` guard is removed
- **THEN** `window.matchMedia(...)` is replaced with `this.window?.matchMedia(...)` where `window` is derived from `inject(DOCUMENT).defaultView`

#### Scenario: provideCupertino uses DOCUMENT

- **WHEN** reading `cupertino.provider.ts`
- **THEN** `document.documentElement` in the environment initializer is replaced with `inject(DOCUMENT).documentElement`

### Requirement: a11y.ts functions accept Document parameter

The utility functions in `a11y.ts` SHALL accept an optional `Document` parameter. When called within Angular injection context, they SHALL use `inject(DOCUMENT)`. When called outside Angular context, they SHALL accept the parameter.

#### Scenario: prefersReducedMotion with injected document

- **WHEN** `prefersReducedMotion()` is called within an injection context
- **THEN** it uses `inject(DOCUMENT).defaultView?.matchMedia(...)` instead of `window.matchMedia(...)`

#### Scenario: prefersReducedMotion with explicit parameter

- **WHEN** `prefersReducedMotion(document)` is called with a `Document` instance
- **THEN** it uses the provided document's `defaultView.matchMedia(...)`
