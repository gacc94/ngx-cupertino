## ADDED Requirements

### Requirement: _component-api.scss exists with typed component mixins

The `libs/core/src/lib/styles/_component-api.scss` file SHALL exist and export SCSS mixins for each Phase 1 component pattern, using `t.token()` from the Token API Layer for all CSS custom property references.

#### Scenario: File is importable

- **WHEN** `@use '@ngx-cupertino/core' as cup` is used in a component SCSS file
- **THEN** `@include cup.cup-button-base` applies all base button styles
- **THEN** `@include cup.cup-button-variant('filled')` applies filled variant styles

### Requirement: Shared state mixins exist

The file SHALL export `cup-disabled` and `cup-interactive` mixins reusable across all components.

#### Scenario: Disabled mixin

- **WHEN** `@include cup.cup-disabled` is used
- **THEN** `opacity: 0.4; pointer-events: none` is output

#### Scenario: Interactive mixin includes hover media query

- **WHEN** `@include cup.cup-interactive` is used
- **THEN** a transition and `@media (hover: hover)` block with hover/active styles is output

### Requirement: Button mixins cover base, variant, and size

The file SHALL export `cup-button-base`, `cup-button-variant($variant)`, and `cup-button-size($size)` mixins.

#### Scenario: Button base styles

- **WHEN** `@include cup.cup-button-base` is used
- **THEN** `display: inline-flex`, `min-height`, `padding`, `border-radius`, `font-family`, `font-weight`, and `cursor: pointer` are output using valid tokens

#### Scenario: Button filled variant

- **WHEN** `@include cup.cup-button-variant('filled')` is used
- **THEN** `background: var(--cup-tint)` and `color: var(--cup-tint-on)` are output

#### Scenario: Button small size

- **WHEN** `@include cup.cup-button-size('sm')` is used
- **THEN** reduced `min-height`, `padding`, and `border-radius` are output

### Requirement: Toggle, TextField, Slider, Progress mixins exist

The file SHALL export mixins for: Toggle (`cup-toggle-track`, `cup-toggle-thumb`), TextField (`cup-text-field-container`, `cup-text-field-input`), Slider (`cup-slider-track`, `cup-slider-fill`, `cup-slider-thumb`), Progress (`cup-progress-track`, `cup-progress-fill`).

#### Scenario: Toggle track mixin

- **WHEN** `@include cup.cup-toggle-track` is used
- **THEN** toggle track dimensions, background, border-radius, cursor, and transition are output

#### Scenario: Slider thumb mixin

- **WHEN** `@include cup.cup-slider-thumb` is used
- **THEN** absolute positioning, sizing, border-radius, background, box-shadow, and cursor are output

### Requirement: Barrel and package exports include component-api

The `libs/core/src/_index.scss` SHALL `@forward 'lib/styles/component-api'`. The `libs/core/package.json` SHALL export `./styles/component-api` with a `"sass"` condition.

#### Scenario: Barrel forwards component-api

- **WHEN** reading `_index.scss`
- **THEN** it contains `@forward 'lib/styles/component-api'`

#### Scenario: Package exports component-api

- **WHEN** reading `package.json`
- **THEN** `exports["./styles/component-api"].sass` resolves to `./src/lib/styles/_component-api.scss`
