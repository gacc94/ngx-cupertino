## ADDED Requirements

### Requirement: Component renders decrement and increment buttons
The component SHALL render two buttons with icons for decrement and increment.

#### Scenario: Decrement button renders
- **WHEN** `<cup-stepper />` is rendered
- **THEN** a button with class `.cup-decrement` and `aria-label="Decrease"` is present

#### Scenario: Increment button renders
- **WHEN** `<cup-stepper />` is rendered
- **THEN** a button with class `.cup-increment` and `aria-label="Increase"` is present

### Requirement: Decrement button disabled at min
The component SHALL disable the decrement button when value is at minimum and wrap is false.

#### Scenario: Decrement disabled at min
- **WHEN** value=0, min=0, wrap=false
- **THEN** the decrement button has `disabled` attribute

#### Scenario: Decrement enabled above min
- **WHEN** value=5, min=0, wrap=false
- **THEN** the decrement button does NOT have `disabled` attribute

### Requirement: Increment button disabled at max
The component SHALL disable the increment button when value is at maximum and wrap is false.

#### Scenario: Increment disabled at max
- **WHEN** value=100, max=100, wrap=false
- **THEN** the increment button has `disabled` attribute

### Requirement: Component renders input when showInput is true
The component SHALL render an editable `<input type="number">` when `showInput()` is true (default).

#### Scenario: Input renders with showInput
- **WHEN** `<cup-stepper />` is rendered (default showInput=true)
- **THEN** an input with class `.cup-input` and `role="spinbutton"` is present

### Requirement: Component renders value display when showInput is false
The component SHALL render a non-editable `<span>` with `aria-live="polite"` when `showInput()` is false.

#### Scenario: Span renders without showInput
- **WHEN** `<cup-stepper [showInput]="false" />` is rendered
- **THEN** a span with class `.cup-value-display` and `aria-live="polite"` is present
- **AND** no input element is present

### Requirement: Increment button increases value by step
The component SHALL increase the value by `step()` when the increment button is clicked.

#### Scenario: Increment by step
- **WHEN** value=5, step=2, increment button clicked
- **THEN** value becomes 7

### Requirement: Decrement button decreases value by step
The component SHALL decrease the value by `step()` when the decrement button is clicked.

#### Scenario: Decrement by step
- **WHEN** value=5, step=2, decrement button clicked
- **THEN** value becomes 3

### Requirement: Value clamps to max
The component SHALL clamp the value to `max()` on increment.

#### Scenario: Increment clamped at max
- **WHEN** value=99, max=100, step=5, increment button clicked
- **THEN** value becomes 100 (not 104)

### Requirement: Value clamps to min
The component SHALL clamp the value to `min()` on decrement.

#### Scenario: Decrement clamped at min
- **WHEN** value=1, min=0, step=5, decrement button clicked
- **THEN** value becomes 0 (not -4)

### Requirement: Wrap cycles value on overflow
The component SHALL cycle from max to min when incrementing past max with wrap enabled, and from min to max when decrementing past min.

#### Scenario: Wrap from max to min on increment
- **WHEN** value=100, max=100, min=0, wrap=true, increment button clicked
- **THEN** value becomes 0

#### Scenario: Wrap from min to max on decrement
- **WHEN** value=0, max=100, min=0, wrap=true, decrement button clicked
- **THEN** value becomes 100

### Requirement: Auto-repeat on hold
The component SHALL repeat increment/decrement while the button is held down, with an initial delay of 400ms and repeat interval of 75ms.

#### Scenario: Auto-repeat starts after delay
- **WHEN** increment button is held (pointerdown)
- **THEN** value increments once immediately
- **AND** after 400ms delay, value continues incrementing every 75ms

#### Scenario: Auto-repeat stops on pointerup
- **WHEN** button is released (pointerup) during auto-repeat
- **THEN** the repeat timer stops

#### Scenario: Auto-repeat stops on pointerleave
- **WHEN** cursor leaves the button (pointerleave) during auto-repeat
- **THEN** the repeat timer stops

#### Scenario: Auto-repeat disabled when autoRepeat is false
- **WHEN** autoRepeat=false and button is held
- **THEN** value increments only once, no repeat

### Requirement: Keyboard ArrowUp increments
The component SHALL increment by step on ArrowUp key.

#### Scenario: ArrowUp increments
- **WHEN** input is focused and ArrowUp pressed
- **THEN** value increases by step

### Requirement: Keyboard ArrowDown decrements
The component SHALL decrement by step on ArrowDown key.

#### Scenario: ArrowDown decrements
- **WHEN** input is focused and ArrowDown pressed
- **THEN** value decreases by step

### Requirement: Shift+Arrow multiplies step by 10
The component SHALL multiply the step by 10 when Shift is held during ArrowUp/Down.

#### Scenario: Shift+ArrowUp increments by 10x
- **WHEN** input is focused and Shift+ArrowUp pressed, step=1
- **THEN** value increases by 10

#### Scenario: Shift+ArrowDown decrements by 10x
- **WHEN** input is focused and Shift+ArrowDown pressed, step=1
- **THEN** value decreases by 10

### Requirement: Input typing updates value
The component SHALL update the value when the user types in the input.

#### Scenario: Typing updates value
- **WHEN** user types "42" in the input
- **THEN** value becomes 42

#### Scenario: NaN input ignored
- **WHEN** user types invalid text resulting in NaN
- **THEN** value does not change

### Requirement: Component calls onTouched on interaction
The component SHALL call `onTouched()` on blur, pointerup, and input.

#### Scenario: onTouched called on blur
- **WHEN** input loses focus
- **THEN** `onTouched()` is called

#### Scenario: onTouched called on input
- **WHEN** user types in the input
- **THEN** `onTouched()` is called

#### Scenario: onTouched called on button release
- **WHEN** increment/decrement button is released (pointerup)
- **THEN** `onTouched()` is called

### Requirement: Component integrates with Reactive Forms via CVA
The component SHALL provide `NG_VALUE_ACCESSOR` and implement ControlValueAccessor.

#### Scenario: writeValue clamps and sets value
- **WHEN** `writeValue(150)` is called with max=100
- **THEN** value is set to 100 (clamped)

#### Scenario: writeValue does not call onChange
- **WHEN** `writeValue(50)` is called
- **THEN** `onChange` is NOT called

#### Scenario: onChange called on increment
- **WHEN** increment button is clicked
- **THEN** `onChange` is called with new value

### Requirement: Timer cleanup on destroy
The component SHALL clean up repeat timers when destroyed.

#### Scenario: Timers cleaned on destroy
- **WHEN** the component is destroyed during an active auto-repeat
- **THEN** `clearTimeout` and `clearInterval` are called

### Requirement: Host bindings reflect state
The component SHALL apply CSS classes for disabled, at-min, and at-max states.

#### Scenario: cup-disabled when disabled
- **WHEN** `disabled()` is true
- **THEN** host element has class `.cup-disabled`

#### Scenario: cup-at-min at minimum with no wrap
- **WHEN** value equals min and wrap is false
- **THEN** host element has class `.cup-at-min`

#### Scenario: cup-at-max at maximum with no wrap
- **WHEN** value equals max and wrap is false
- **THEN** host element has class `.cup-at-max`

### Requirement: displayValue rounds to step decimals
The component SHALL round the displayed value to match the step's decimal precision.

#### Scenario: displayValue for step=1
- **WHEN** step=1, value=5
- **THEN** displayValue is 5

#### Scenario: displayValue for step=0.5
- **WHEN** step=0.5, value=3.5
- **THEN** displayValue is 3.5

### Requirement: Tokenized SCSS via @use
The component SHALL use `@use 'index' as t;` with `t.token()` for all design values.

#### Scenario: SCSS build passes
- **WHEN** `bun run build` is executed
- **THEN** SCSS compiles without errors
- **AND** no `var(--cup-*)` direct references exist

### Requirement: macOS compact sizing
The component SHALL use smaller dimensions on desktop pointer devices.

#### Scenario: macOS smaller buttons
- **WHEN** rendered on device with `hover: hover` and `pointer: fine`
- **THEN** buttons are 32×32px instead of 44×44px
