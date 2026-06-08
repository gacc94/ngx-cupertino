## ADDED Requirements

### Requirement: Component renders custom track and thumb
The component SHALL render a custom track with a fill bar and a draggable thumb, plus a hidden native `<input type="range">`.

#### Scenario: Track and thumb are rendered
- **WHEN** `<cup-slider />` is rendered
- **THEN** a `.cup-track` element with a `.cup-fill` child is present in the DOM
- **AND** a `.cup-thumb` element with `role="slider"` is present
- **AND** a hidden `.cup-native` input with `type="range"` is present

### Requirement: Fill width reflects current value
The component SHALL set the fill bar width proportional to the current value relative to min/max range.

#### Scenario: Fill at 50% when value is halfway
- **WHEN** min=0, max=100, value=50
- **THEN** the `.cup-fill` element has `width: 50%`

#### Scenario: Fill at 0% when value equals min
- **WHEN** min=0, max=100, value=0
- **THEN** the `.cup-fill` element has `width: 0%`

### Requirement: Thumb position reflects current value
The component SHALL position the thumb at the correct horizontal percentage based on current value.

#### Scenario: Thumb at 50% when value is halfway
- **WHEN** min=0, max=100, value=50
- **THEN** the `.cup-thumb` element has `left: 50%`

### Requirement: Component integrates with Reactive Forms via CVA
The component SHALL provide `NG_VALUE_ACCESSOR` and implement `ControlValueAccessor` methods for number values.

#### Scenario: writeValue updates model
- **WHEN** `writeValue(50)` is called
- **THEN** `value()` is `50`

#### Scenario: onChange called when value changes
- **WHEN** user drags thumb to change value
- **THEN** `onChange` is called with the new value

#### Scenario: setDisabledState updates disabled
- **WHEN** `setDisabledState(true)` is called
- **THEN** `disabled()` is `true`

### Requirement: Pointer events handle drag interaction
The component SHALL use `pointerdown`/`pointermove`/`pointerup` with `setPointerCapture` for drag.

#### Scenario: pointerdown starts drag
- **WHEN** user presses pointer on the track container
- **THEN** `dragging()` becomes `true`
- **AND** `slideStart` output emits
- **AND** value updates to pointer position

#### Scenario: pointermove updates value during drag
- **WHEN** user moves pointer while dragging
- **THEN** value updates continuously to match pointer position

#### Scenario: pointerup ends drag
- **WHEN** user releases pointer
- **THEN** `dragging()` becomes `false`
- **AND** `slideEnd` output emits
- **AND** `onTouched()` is called

#### Scenario: Drag blocked when disabled
- **WHEN** `disabled()` is true and user presses pointer
- **THEN** value does not change
- **AND** `dragging()` remains `false`

### Requirement: AbortController cleans up event listeners
The component SHALL use `AbortController` to clean up pointer listeners and `DestroyRef.onDestroy()` for component destruction.

#### Scenario: Listeners cleaned on pointerup
- **WHEN** pointerup fires after drag
- **THEN** `pointermove` and `pointerup` listeners are removed via `abort()`

#### Scenario: Listeners cleaned on component destroy
- **WHEN** the component is destroyed during an active drag
- **THEN** `abortController.abort()` is called via `DestroyRef.onDestroy()`

### Requirement: Keyboard navigation with arrows, PageUp/Down, Home, End
The component SHALL support keyboard navigation on the thumb including step increments, 10% jumps, and min/max shortcuts.

#### Scenario: ArrowRight increments by step
- **WHEN** thumb is focused and ArrowRight is pressed
- **THEN** value increases by `step()`

#### Scenario: ArrowLeft decrements by step
- **WHEN** thumb is focused and ArrowLeft is pressed
- **THEN** value decreases by `step()`

#### Scenario: Home sets value to minimum
- **WHEN** thumb is focused and Home is pressed
- **THEN** value equals `min()`

#### Scenario: End sets value to maximum
- **WHEN** thumb is focused and End is pressed
- **THEN** value equals `max()`

#### Scenario: PageUp increments by 10% of range
- **WHEN** thumb is focused and PageUp is pressed
- **THEN** value increases by `(max - min) / 10`

#### Scenario: Keyboard blocked when disabled
- **WHEN** `disabled()` is true and any navigation key is pressed
- **THEN** value does not change

### Requirement: onTouched called on keyboard interaction
The component SHALL call `onTouched()` when the user interacts via keyboard.

#### Scenario: onTouched on keyboard navigation
- **WHEN** ArrowRight is pressed on the thumb
- **THEN** `onTouched()` is called

### Requirement: Value snaps to step
The component SHALL snap the value to the nearest step increment.

#### Scenario: Value snaps to step
- **WHEN** step=5 and user drags to value 23
- **THEN** value becomes 25

### Requirement: Value clamps to min/max range
The component SHALL clamp values outside the min/max range.

#### Scenario: Value clamped to max
- **WHEN** user sets value above max
- **THEN** value equals `max()`

#### Scenario: Value clamped to min
- **WHEN** user sets value below min
- **THEN** value equals `min()`

### Requirement: Component renders label and value display
The component SHALL render a header with label (from `label()`) and current value (when `showValue()` is true).

#### Scenario: Label renders when provided
- **WHEN** `<cup-slider label="Volume" />` is rendered
- **THEN** a `.cup-label` element with text "Volume" is visible

#### Scenario: Value display renders when showValue
- **WHEN** `<cup-slider showValue value="75" />` is rendered
- **THEN** a `.cup-value` element with text "75" is visible

#### Scenario: Header hidden without label or showValue
- **WHEN** `<cup-slider />` is rendered without label and without showValue
- **THEN** no `.cup-header` element is present

### Requirement: Tick marks render when ticks > 0
The component SHALL render tick mark dots evenly spaced across the track.

#### Scenario: Ticks render for ticks=5
- **WHEN** `<cup-slider min="0" max="100" ticks="5" />` is rendered
- **THEN** 5 `.cup-tick` elements are present
- **AND** ticks are positioned at 0%, 25%, 50%, 75%, 100%

#### Scenario: No ticks when ticks=0
- **WHEN** `<cup-slider ticks="0" />` is rendered
- **THEN** no `.cup-tick` elements are present

### Requirement: Min/Max icons render when provided
The component SHALL render `CupIcon` elements at the start and end of the track row.

#### Scenario: Min icon renders
- **WHEN** `<cup-slider minIcon="sun.min" />` is rendered
- **THEN** a `cup-icon` with class `.cup-min-icon` is present

#### Scenario: Max icon renders
- **WHEN** `<cup-slider maxIcon="sun.max" />` is rendered
- **THEN** a `cup-icon` with class `.cup-max-icon` is present

#### Scenario: No icons when not provided
- **WHEN** `<cup-slider />` is rendered without minIcon or maxIcon
- **THEN** no `.cup-min-icon` or `.cup-max-icon` elements are present

### Requirement: Host bindings reflect component state
The component SHALL apply CSS classes on the host element for disabled and dragging states.

#### Scenario: cup-disabled class when disabled
- **WHEN** `disabled()` is true
- **THEN** host element has class `.cup-disabled`

#### Scenario: cup-dragging class during drag
- **WHEN** `dragging()` is true
- **THEN** host element has class `.cup-dragging`

### Requirement: ARIA attributes on thumb
The component SHALL set appropriate ARIA attributes on the thumb element.

#### Scenario: ARIA valuation attributes
- **WHEN** `<cup-slider min="0" max="100" value="50" />` is rendered
- **THEN** thumb has `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow="50"`

#### Scenario: aria-label from label
- **WHEN** `<cup-slider label="Volume" />` is rendered
- **THEN** thumb has `aria-label="Volume"`

#### Scenario: aria-label from ariaLabel when no label
- **WHEN** `<cup-slider ariaLabel="Font size" />` is rendered without label
- **THEN** thumb has `aria-label="Font size"`

#### Scenario: aria-valuetext propagation
- **WHEN** `<cup-slider ariaValueText="75 percent" />` is rendered
- **THEN** thumb has `aria-valuetext="75 percent"`

#### Scenario: tabindex -1 when disabled
- **WHEN** `disabled()` is true
- **THEN** thumb has `tabindex="-1"`

#### Scenario: tabindex 0 when enabled
- **WHEN** `disabled()` is false
- **THEN** thumb has `tabindex="0"`

### Requirement: Native input syncs with component state
The component SHALL keep the hidden native `<input type="range">` in sync with min, max, step, and value.

#### Scenario: Native input reflects min/max/step/value
- **WHEN** `<cup-slider min="10" max="90" step="5" value="50" />` is rendered
- **THEN** the hidden input has `min="10"`, `max="90"`, `step="5"`, `value="50"`

### Requirement: Tokenized SCSS via @use
The component SHALL use `@use 'index' as t;` and reference all design values through `t.token()`.

#### Scenario: SCSS build validation passes
- **WHEN** `bun run build` is executed
- **THEN** the SCSS compiles without errors
- **AND** no `var(--cup-*)` direct references exist in the component SCSS

### Requirement: macOS visual adaptation
The component SHALL adjust thumb size, shape, and track container height for desktop pointer devices.

#### Scenario: macOS thumb is smaller and circular
- **WHEN** rendered on a device with `hover: hover` and `pointer: fine`
- **THEN** thumb is 20×20px with `border-radius: radius-slider-thumb` (circle)

#### Scenario: iOS thumb is larger and rounded-rect
- **WHEN** rendered on a touch device (no hover)
- **THEN** thumb is 28×28px with `border-radius: radius-sm` (rounded-rect)

### Requirement: Accessibility media queries
The component SHALL respond to `prefers-contrast: more` and `prefers-reduced-motion: reduce`.

#### Scenario: High contrast border
- **WHEN** `prefers-contrast: more` is active
- **THEN** track and thumb have visible high-contrast borders

#### Scenario: Reduced motion disables transitions
- **WHEN** `prefers-reduced-motion: reduce` is active
- **THEN** thumb transitions are disabled
