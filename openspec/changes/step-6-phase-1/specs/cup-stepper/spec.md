## ADDED Requirements

### Requirement: CupStepper uses custom element selector

The `libs/ui/src/lib/stepper/cup-stepper.ts` file SHALL export a component with `selector: 'cup-stepper'`.

#### Scenario: Selector is cup-stepper

- **WHEN** reading `cup-stepper.ts`
- **THEN** `selector` is `'cup-stepper'`

### Requirement: CupStepper extends CupFormControl

The component SHALL extend `CupFormControl<number>`.

#### Scenario: Extends CVA base class

- **WHEN** reading `cup-stepper.ts`
- **THEN** `class CupStepper extends CupFormControl<number>`

### Requirement: CupStepper has model-based value

The component SHALL expose `value` via `model<number>(0)`. Increment/decrement SHALL update the model and call `onChange`.

#### Scenario: Increment updates model

- **WHEN** increment button is clicked and value is 0
- **THEN** `value()` returns `1` and `onChange(1)` is called

### Requirement: CupStepper has min, max, step inputs

The component SHALL accept `min` (default 0), `max` (default 100), `step` (default 1) inputs.

#### Scenario: Value clamped to min

- **WHEN** decrement is called and value equals min
- **THEN** value stays at min (atMin is true, decrement button disabled)

#### Scenario: Value clamped to max

- **WHEN** increment is called and value equals max
- **THEN** value stays at max (atMax is true, increment button disabled)

### Requirement: CupStepper has atMin and atMax computed signals

The component SHALL expose `atMin` and `atMax` as computed signals. The decrement button SHALL be disabled when `atMin()`, the increment when `atMax()`.

#### Scenario: atMin computed correctly

- **WHEN** value equals min
- **THEN** `atMin()` is `true`, decrement button is disabled

### Requirement: CupStepper supports showButtons input

When `showButtons` is `false`, the +/- buttons SHALL be hidden but the input remains.

#### Scenario: Buttons hidden

- **WHEN** `showButtons` is `false`
- **THEN** no increment/decrement buttons are rendered

### Requirement: CupStepper has ARIA spinbutton role

The internal input SHALL have `role="spinbutton"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-label`.

#### Scenario: ARIA attributes set

- **WHEN** `<cup-stepper label="Quantity" [min]="1" [max]="10">` is rendered
- **THEN** the input has `role="spinbutton"`, `aria-label="Quantity"`, `aria-valuemin="1"`, `aria-valuemax="10"`

### Requirement: CupStepper handles arrow keys

Arrow Up SHALL increment by step. Arrow Down SHALL decrement by step.

#### Scenario: Arrow up increments

- **WHEN** Arrow Up is pressed
- **THEN** value increases by step
