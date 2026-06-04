## MODIFIED Requirements

### Requirement: ThemeService uses DOCUMENT injection token

The `ThemeService` SHALL inject `DOCUMENT` from `@angular/common` and use `this.document` instead of global `document` and `this.document.defaultView` instead of global `window`.

#### Scenario: ThemeService injects DOCUMENT

- **WHEN** reading `theme.service.ts`
- **THEN** the service has `private readonly document = inject(DOCUMENT)` (or equivalent)
- **THEN** all `document.documentElement` accesses use the injected document
- **THEN** `window.matchMedia(...)` uses `this.document.defaultView?.matchMedia(...)`

### Requirement: BreakpointService uses DOCUMENT and toSignal

The `BreakpointService` SHALL inject `DOCUMENT` for `window` access and SHALL use `toSignal()` instead of `.subscribe()` for the `BreakpointObserver`.

#### Scenario: BreakpointService injects DOCUMENT

- **WHEN** reading `breakpoint.service.ts`
- **THEN** `typeof window` check is replaced with `this.window` from `DOCUMENT.defaultView`
- **THEN** `window.matchMedia(...)` uses the injected document's defaultView

#### Scenario: toSignal replaces subscribe

- **WHEN** reading `breakpoint.service.ts`
- **THEN** there is no `.subscribe()` call
- **THEN** `toSignal()` is imported from `@angular/core/rxjs-interop`
- **THEN** `observer.observe([...])` result is passed to `toSignal()`
