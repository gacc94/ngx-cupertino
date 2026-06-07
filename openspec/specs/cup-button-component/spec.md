# cup-button-component Specification

## Purpose
TBD - created by archiving change implement-cup-button. Update Purpose after archive.
## Requirements
### Requirement: Button component uses Angular Signals API
The system SHALL implement `CupButton` using `input()`, `output()` from `@angular/core`. No `@Input`, `@Output`, or decorators. All boolean inputs SHALL use `{ transform: booleanAttribute }`.

#### Scenario: Boolean attribute works without explicit value
- **WHEN** template uses `<button cup-button disabled>`
- **THEN** `disabled()` signal returns `true`

#### Scenario: Component uses OnPush CD
- **WHEN** component is created
- **THEN** `ChangeDetectionStrategy.OnPush` is active

### Requirement: Dual selector supports button and anchor elements
The selector SHALL be `button[cup-button], a[cup-button]`. Both elements SHALL receive the same styling and behavior.

#### Scenario: Button element renders correctly
- **WHEN** `<button cup-button variant="filled">Save</button>` is used
- **THEN** the native button receives all state classes and token-based styles

#### Scenario: Anchor element renders correctly  
- **WHEN** `<a cup-button variant="filled" href="/url">Link</a>` is used
- **THEN** the anchor element receives all state classes, aria-disabled, and token-based styles

### Requirement: Five visual variants are supported via host class bindings
The component SHALL support 5 variants: `filled`, `tinted`, `gray`, `plain`, `liquid-glass`. Each SHALL apply via `:host(.variant)` CSS selectors.

#### Scenario: Filled variant uses tint token for background
- **WHEN** `variant = 'filled'`
- **THEN** host gets class `.filled`
- **THEN** CSS applies `background: var(--cup-tint)` and `color: var(--cup-tint-on)`

#### Scenario: Liquid-glass variant uses glass mixin
- **WHEN** `variant = 'liquid-glass'`
- **THEN** host gets class `.liquid-glass`
- **THEN** CSS applies `@include t.cup-glass('sm')`

### Requirement: Three sizes adapt for iOS and macOS automatically
The component SHALL support sizes `sm`, `md`, `lg`. Sizes SHALL resolve per-platform via tokens (`--cup-control-height` = 44px iOS / 28px macOS). No media queries in the component SCSS.

#### Scenario: Medium size uses control-height token
- **WHEN** size is `md` (default)
- **THEN** `min-height: t.token('control-height')` resolves to 44px on iOS, 28px on macOS

#### Scenario: Small size applies cup-small host class
- **WHEN** `size = 'sm'`
- **THEN** host gets class `.cup-small`
- **THEN** height, padding, font-size adjust to compact values

### Requirement: Interaction states use handleClick() gate
The component SHALL emit `clicked` output only when `disabled()` and `loading()` are both false. Click, Enter key, and Space key SHALL all route through `handleClick()`.

#### Scenario: Click emits when interactive
- **WHEN** user clicks a button with `disabled = false` and `loading = false`
- **THEN** `clicked` output emits

#### Scenario: Click is blocked when disabled
- **WHEN** user clicks a button with `disabled = true`
- **THEN** `clicked` output does NOT emit

#### Scenario: Click is blocked when loading
- **WHEN** user clicks a button with `loading = true`
- **THEN** `clicked` output does NOT emit

### Requirement: Loading state shows CSS spinner overlay
When `loading = true`, the component SHALL show a rotating spinner overlay and hide label/icon content via `opacity: 0`. Pointer events SHALL be disabled.

#### Scenario: Spinner visible during loading
- **WHEN** `loading = true`
- **THEN** `.cup-spinner` element renders and animates
- **THEN** `.cup-label` and `.cup-icon` have `opacity: 0`

### Requirement: HC mode adds visible borders
The component SHALL add 1px solid `border-color-hc` borders to filled, tinted, gray, and liquid-glass variants when `prefers-contrast: more`.

#### Scenario: HC borders appear on filled button
- **WHEN** Increase Contrast is enabled
- **THEN** filled buttons get `border: var(--cup-border-thin) solid var(--cup-border-color-hc)`

### Requirement: Shared types are in @ngx-cupertino/core
The types `CupButtonVariant`, `CupComponentSize`, `CupIconPosition` SHALL be defined in `libs/core/src/lib/types/component.types.ts` and SHALL be reusable by other components.

#### Scenario: CupComponentSize is shared
- **WHEN** `CupComponentSize` is imported
- **THEN** it provides `'sm' | 'md' | 'lg'` union type for any component

