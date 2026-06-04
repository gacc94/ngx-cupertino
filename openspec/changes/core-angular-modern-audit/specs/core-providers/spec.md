## MODIFIED Requirements

### Requirement: Environment initializer uses DOCUMENT token

The `provideEnvironmentInitializer()` callback inside `provideCupertino()` SHALL use `inject(DOCUMENT)` instead of global `document` for all DOM manipulations.

#### Scenario: DOCUMENT is injected in initializer

- **WHEN** reading `cupertino.provider.ts`
- **THEN** the initializer callback has `const doc = inject(DOCUMENT)` (or equivalent)
- **THEN** all `document.documentElement` references are replaced with `doc.documentElement`

#### Scenario: RTL direction still works

- **WHEN** config has `{ direction: 'rtl' }` and DOCUMENT token is used
- **THEN** `doc.documentElement.setAttribute("dir", "rtl")` is called (functionally identical, using injected document)

#### Scenario: a11y config still applied

- **WHEN** config has `{ a11y: { reducedMotion: 'always' } }` and DOCUMENT token is used
- **THEN** `doc.documentElement.setAttribute("data-reduced-motion", "always")` is called
