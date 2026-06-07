## ADDED Requirements

### Requirement: Component renders native input with auto-generated ID
The component SHALL render a native `<input>` element with an auto-generated unique `id` attribute (`cup-tf-0`, `cup-tf-1`, ...) and the CSS class `.cup-input`.

#### Scenario: Input renders with default state
- **WHEN** `<cup-text-field />` is rendered
- **THEN** a native `<input>` element with class `.cup-input` is present in the DOM
- **AND** the input has a generated `id` attribute starting with `cup-tf-`

#### Scenario: IDs are unique across instances
- **WHEN** two instances of `<cup-text-field />` are rendered
- **THEN** each input has a different `id` attribute

### Requirement: Component renders label with for association
The component SHALL render a `<label>` element with text from the `label()` input and a `for` attribute matching the input's generated `id`.

#### Scenario: Label renders when provided
- **WHEN** `<cup-text-field label="Username" />` is rendered
- **THEN** a `<label>` element with text "Username" is visible
- **AND** the label's `for` attribute matches the input's `id`

#### Scenario: Label not rendered when not provided
- **WHEN** `<cup-text-field />` is rendered without label
- **THEN** no `<label>` element is present in the DOM

### Requirement: Component renders placeholder on native input
The component SHALL pass the `placeholder()` input to the native `<input>` element's `placeholder` attribute.

#### Scenario: Placeholder is displayed
- **WHEN** `<cup-text-field placeholder="Enter text" />` is rendered
- **THEN** the `<input>` element has `placeholder="Enter text"`

### Requirement: Component renders prefix icon
The component SHALL render a `CupIcon` on the left side of the input when `prefixIcon()` is provided.

#### Scenario: Prefix icon renders
- **WHEN** `<cup-text-field prefixIcon="magnifyingglass" />` is rendered
- **THEN** a `cup-icon` element with class `.cup-prefix` and name "magnifyingglass" is present

#### Scenario: No prefix icon when not provided
- **WHEN** `<cup-text-field />` is rendered without prefixIcon
- **THEN** no `.cup-prefix` element is present

### Requirement: Component renders suffix icon
The component SHALL render a `CupIcon` on the right side when `suffixIcon()` is provided and clear button is not visible.

#### Scenario: Suffix icon renders
- **WHEN** `<cup-text-field suffixIcon="envelope" />` is rendered
- **THEN** a `cup-icon` element with class `.cup-suffix` and name "envelope" is present

#### Scenario: Suffix hidden when clear is visible
- **WHEN** `<cup-text-field [clearable]="true" suffixIcon="envelope" value="text" />` is rendered
- **THEN** the suffix icon is NOT visible
- **AND** the clear button IS visible

### Requirement: Component renders clear button
The component SHALL render a clear button with `tabindex="-1"` when `clearable()` is true and `value()` is non-empty.

#### Scenario: Clear button visible when clearable and has value
- **WHEN** `<cup-text-field [clearable]="true" value="text" />` is rendered
- **THEN** a `<button>` with class `.cup-clear` is present
- **AND** the button has `tabindex="-1"`
- **AND** the button has `aria-label="Clear"`

#### Scenario: Clear button not visible when value is empty
- **WHEN** `<cup-text-field [clearable]="true" value="" />` is rendered
- **THEN** no `.cup-clear` element is present

#### Scenario: Clear button click clears value
- **WHEN** the clear button is clicked on a component with value "hello"
- **THEN** `value()` becomes `""`
- **AND** `onChange("")` is called

### Requirement: Component renders error and helper text
The component SHALL render error text (`.cup-error-text`) when `error()` is provided, or helper text (`.cup-helper`) when `helper()` is provided but no error. Error takes priority.

#### Scenario: Error text displayed
- **WHEN** `<cup-text-field error="Required field" />` is rendered
- **THEN** a `<span>` with class `.cup-helper.cup-error-text` is visible with text "Required field"
- **AND** the span has `id` equal to `inputId + '-error'`

#### Scenario: Helper text displayed when no error
- **WHEN** `<cup-text-field helper="Max 10 chars" />` is rendered
- **THEN** a `<span>` with class `.cup-helper` is visible with text "Max 10 chars"
- **AND** the span has `id` equal to `inputId + '-helper'`

#### Scenario: Error hides helper
- **WHEN** `<cup-text-field error="Invalid" helper="Help" />` is rendered
- **THEN** only the error text is visible
- **AND** the helper text is NOT rendered

### Requirement: Component updates value on input event
The component SHALL update its value and call `onChange` when the native `<input>` fires an `input` event.

#### Scenario: Typing updates value
- **WHEN** user types "hello" into the input
- **THEN** `value()` becomes "hello"
- **AND** `onChange("hello")` is called

#### Scenario: writeValue syncs external value
- **WHEN** `writeValue("external")` is called on the component
- **THEN** `value()` becomes "external"

### Requirement: Component manages focus state
The component SHALL track focus/blur via a `focused` signal and apply the `.cup-focused` host class.

#### Scenario: Focus adds cup-focused class
- **WHEN** the native input receives focus
- **THEN** the host element has class `.cup-focused`

#### Scenario: Blur removes cup-focused class and calls onTouched
- **WHEN** the native input loses focus
- **THEN** the host element does NOT have class `.cup-focused`
- **AND** `onTouched()` is called

### Requirement: Host bindings reflect component state
The component SHALL apply CSS classes to its host element based on signal values.

#### Scenario: cup-disabled class when disabled
- **WHEN** `disabled()` is true
- **THEN** host element has class `.cup-disabled`

#### Scenario: cup-readonly class when readonly
- **WHEN** `readonly()` is true
- **THEN** host element has class `.cup-readonly`

#### Scenario: cup-error class when error
- **WHEN** `error()` is non-empty
- **THEN** host element has class `.cup-error`

#### Scenario: cup-filled class when value is non-empty
- **WHEN** `value()` is non-empty
- **THEN** host element has class `.cup-filled`

#### Scenario: cup-small class for sm size
- **WHEN** `size()` is `'sm'`
- **THEN** host element has class `.cup-small`

#### Scenario: cup-large class for lg size
- **WHEN** `size()` is `'lg'`
- **THEN** host element has class `.cup-large`

### Requirement: ARIA attributes for accessibility
The component SHALL set appropriate ARIA attributes on the native input.

#### Scenario: aria-label when no visible label
- **WHEN** `<cup-text-field placeholder="Search" />` is rendered without `label` and without `ariaLabel`
- **THEN** the input has `aria-label="Search"`

#### Scenario: aria-label from ariaLabel input
- **WHEN** `<cup-text-field ariaLabel="Email address" />` is rendered
- **THEN** the input has `aria-label="Email address"`

#### Scenario: no aria-label when label exists
- **WHEN** `<cup-text-field label="Username" placeholder="Enter..." />` is rendered
- **THEN** the input does NOT have an `aria-label` attribute

#### Scenario: aria-invalid when error
- **WHEN** `<cup-text-field error="Invalid" />` is rendered
- **THEN** the input has `aria-invalid="true"`

#### Scenario: aria-describedby links to error id
- **WHEN** `<cup-text-field error="Required" />` is rendered
- **THEN** the input's `aria-describedby` equals the error span's `id`

#### Scenario: aria-describedby links to helper id
- **WHEN** `<cup-text-field helper="Enter your name" />` is rendered
- **THEN** the input's `aria-describedby` equals the helper span's `id`

### Requirement: Component supports input types
The component SHALL pass the `type()` input to the native input's `type` attribute.

#### Scenario: Type propagation
- **WHEN** `<cup-text-field type="email" />` is rendered
- **THEN** the input has `type="email"`

#### Scenario: Default type is text
- **WHEN** `<cup-text-field />` is rendered without type
- **THEN** the input has `type="text"`

### Requirement: Component integrates with Reactive Forms via CVA
The component SHALL provide `NG_VALUE_ACCESSOR` and implement `ControlValueAccessor` methods.

#### Scenario: registerOnChange stores callback
- **WHEN** `registerOnChange(fn)` is called
- **THEN** `fn` is called when value changes via user input

#### Scenario: writeValue updates model
- **WHEN** `writeValue("test")` is called
- **THEN** `value()` is `"test"`

#### Scenario: setDisabledState updates disabled
- **WHEN** `setDisabledState(true)` is called
- **THEN** `disabled()` is `true`

### Requirement: Component disables native input when disabled
The component SHALL set the `disabled` attribute on the native `<input>` when the `disabled()` signal is true.

#### Scenario: Native input disabled
- **WHEN** `disabled()` is true
- **THEN** the native input has `disabled` attribute

### Requirement: Component sets readonly on native input
The component SHALL set the `readonly` attribute on the native `<input>` when `readonly()` is true.

#### Scenario: Native input readonly
- **WHEN** `readonly()` is true
- **THEN** the native input has `readonly` attribute

### Requirement: Component exposes name and autocomplete attributes
The component SHALL pass `name()` and `autocomplete()` inputs to the native input element.

#### Scenario: Name and autocomplete on input
- **WHEN** `<cup-text-field name="email" autocomplete="email" />` is rendered
- **THEN** the input has `name="email"` and `autocomplete="email"`

### Requirement: Component uses tokenized SCSS via @use
The component SHALL use `@use 'index' as t;` and reference all design values through `t.token()`.

#### Scenario: SCSS build validation passes
- **WHEN** `bun run build` is executed
- **THEN** the SCSS compiles without errors
- **AND** no `var(--cup-*)` direct references exist in the component SCSS

### Requirement: Component adapts visual style for macOS
The component SHALL apply macOS-specific styles when a hover-capable pointer device is detected.

#### Scenario: macOS background and border
- **WHEN** rendered on a device with `hover: hover` and `pointer: fine`
- **THEN** the input container has a white background and visible border

### Requirement: Component respects accessibility media queries
The component SHALL respond to `prefers-contrast: more` and `prefers-reduced-motion: reduce`.

#### Scenario: High contrast mode
- **WHEN** `prefers-contrast: more` is active
- **THEN** the input container has a visible high-contrast border

#### Scenario: Reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is active
- **THEN** transitions are disabled on the input container and clear button
