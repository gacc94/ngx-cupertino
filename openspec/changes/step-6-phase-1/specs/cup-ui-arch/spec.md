## ADDED Requirements

### Requirement: Every component follows Angular 21 patterns

Every component in `libs/ui/src/lib/` SHALL NOT include `standalone: true`, SHALL use `changeDetection: ChangeDetectionStrategy.OnPush`, and SHALL use signals API (`input()`, `output()`, `model()`, `computed()`).

#### Scenario: No standalone declaration

- **WHEN** reading any component file in `libs/ui/src/lib/`
- **THEN** `standalone: true` is NOT present in the `@Component` decorator

#### Scenario: OnPush is declared

- **WHEN** reading any component file
- **THEN** `changeDetection: ChangeDetectionStrategy.OnPush` is in `@Component`

### Requirement: Files follow naming conventions

Component files SHALL be named `cup-<name>.ts` (no `.component` suffix). Test files SHALL be `cup-<name>.spec.ts`. SCSS SHALL be inline in `styles:` array.

#### Scenario: Correct file names

- **WHEN** listing `libs/ui/src/lib/button/`
- **THEN** it contains `cup-button.ts`, `cup-button.scss`, `cup-button.spec.ts`

### Requirement: State classes via host bindings

All state classes (disabled, loading, size, variant) SHALL be applied via `host:` metadata bindings, not via `[class.*]` in template.

#### Scenario: Host bindings for states

- **WHEN** `disabled` input is `true` in any component
- **THEN** the class is applied via a `host:` binding like `'[class.cup-disabled]': 'disabled()'`

### Requirement: Internal elements use cup- prefixed classes

All internal elements SHALL use simple `cup-` prefixed class names (e.g., `.cup-label`, `.cup-icon`, `.cup-spinner`, `.cup-slider-track`). No BEM or complex naming.

#### Scenario: Internal class naming

- **WHEN** inspecting internal elements of any component
- **THEN** they use classes like `.cup-label`, `.cup-icon`, `.cup-toggle-thumb`

### Requirement: All styles use CSS custom properties

All SCSS SHALL use `var(--cup-*)` tokens from `@ngx-cupertino/tokens` for colors, spacing, radii, fonts, durations, and easing. No hardcoded values except `0`, `100%`, `none`, `transparent`, `hidden`.

#### Scenario: Spacing uses tokens

- **WHEN** reading SCSS in any component
- **THEN** padding, margin, gap values use `var(--cup-spacing-*)` tokens

### Requirement: Unit tests exist per component

Every component SHALL have a `<name>.spec.ts` file using Vitest + Angular TestBed covering: rendering, inputs, outputs, keyboard, ARIA, states, and CVA (if applicable).

#### Scenario: Button spec exists

- **WHEN** reading `libs/ui/src/lib/button/cup-button.spec.ts`
- **THEN** it contains tests for rendering, variant classes, disabled state, `clicked` output, keyboard events, and ARIA attributes

### Requirement: Entry point exports all components

The `libs/ui/src/index.ts` file SHALL export all 6 components using named exports.

#### Scenario: All components exported

- **WHEN** reading `libs/ui/src/index.ts`
- **THEN** it exports `CupButton`, `CupToggle`, `CupTextField`, `CupSlider`, `CupStepper`, `CupProgress`
