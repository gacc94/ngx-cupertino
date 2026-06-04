## ADDED Requirements

### Requirement: CupToggle uses custom element selector

The `libs/ui/src/lib/toggle/cup-toggle.ts` file SHALL export a component with `selector: 'cup-toggle'`.

#### Scenario: Custom element selector

- **WHEN** reading `cup-toggle.ts`
- **THEN** `selector` is `'cup-toggle'`

### Requirement: CupToggle extends CupFormControl

The component SHALL extend `CupFormControl<boolean>` from `@ngx-cupertino/core`.

#### Scenario: Extends CVA base class

- **WHEN** reading `cup-toggle.ts`
- **THEN** `class CupToggle extends CupFormControl<boolean>`

### Requirement: CupToggle has model-based checked state

The component SHALL expose a `checked` signal via `model()`. Toggling the switch SHALL update the model. External model changes SHALL update the visual state.

#### Scenario: Click toggles checked

- **WHEN** the toggle switch is clicked and `checked()` is `false`
- **THEN** `checked()` becomes `true` and `onChange(true)` is called

#### Scenario: External writeValue updates visual

- **WHEN** `writeValue(true)` is called via CVA
- **THEN** the toggle visually shows checked state and `aria-checked="true"`

### Requirement: CupToggle renders label

The component SHALL accept a `label` input. When set, a label text SHALL be rendered before the switch.

#### Scenario: Label is displayed

- **WHEN** `<cup-toggle label="Wi-Fi">` is rendered
- **THEN** text "Wi-Fi" is visible before the switch button

### Requirement: CupToggle has ARIA switch role

The internal `<button>` SHALL have `role="switch"` and `[attr.aria-checked]` bound to the `checked` signal.

#### Scenario: ARIA switch role

- **WHEN** the toggle is rendered
- **THEN** the internal button has `role="switch"`
- **THEN** `aria-checked` reflects the checked state

### Requirement: CupToggle toggles on Space key

Pressing Space on the toggle switch SHALL toggle the checked state.

#### Scenario: Space toggles

- **WHEN** Space key is pressed on the toggle
- **THEN** `checked()` toggles and `onChange()` is called

### Requirement: CupToggle handles disabled state

When `disabled` is `true`, the toggle SHALL not respond to click or keyboard.

#### Scenario: Disabled prevents toggle

- **WHEN** `disabled` is `true` and the toggle is clicked
- **THEN** `checked()` does not change
