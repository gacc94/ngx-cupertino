## MODIFIED Requirements

### Requirement: Components use external .scss files

All 6 Phase 1 components SHALL use `styleUrl: './cup-<name>.scss'` instead of inline `styles: [...]` arrays.

#### Scenario: Button uses styleUrl

- **WHEN** reading `cup-button.ts`
- **THEN** `styleUrl: './cup-button.scss'` is present
- **THEN** `styles: [...]` is NOT present

#### Scenario: All components have corresponding .scss files

- **WHEN** listing `libs/ui/src/lib/{button,toggle,text-field,slider,stepper,progress}/`
- **THEN** each directory contains `cup-<name>.scss`

### Requirement: SCSS uses component mixins

All `.scss` files SHALL use `@use '@ngx-cupertino/core' as cup` and reference `cup.cup-<name>-*` mixins from `_component-api.scss`.

#### Scenario: Button SCSS uses mixins

- **WHEN** reading `cup-button.scss`
- **THEN** it contains `@use '@ngx-cupertino/core' as cup`
- **THEN** it uses `@include cup.cup-button-base`, `@include cup.cup-button-variant(...)`, etc.

### Requirement: Visual output is unchanged

The SCSS refactor SHALL produce identical visual output. All 97 existing tests must pass.

#### Scenario: Tests pass

- **WHEN** running `bun nx test ui`
- **THEN** all 97 tests pass with zero failures
