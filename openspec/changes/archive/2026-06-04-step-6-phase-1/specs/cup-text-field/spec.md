## ADDED Requirements

### Requirement: CupTextField uses custom element selector

The `libs/ui/src/lib/text-field/cup-text-field.ts` file SHALL export a component with `selector: 'cup-text-field'`.

#### Scenario: Selector is cup-text-field

- **WHEN** reading `cup-text-field.ts`
- **THEN** `selector` is `'cup-text-field'`

### Requirement: CupTextField extends CupFormControl

The component SHALL extend `CupFormControl<string>`.

#### Scenario: Extends CVA base class

- **WHEN** reading `cup-text-field.ts`
- **THEN** `class CupTextField extends CupFormControl<string>`

### Requirement: CupTextField has model-based value

The component SHALL expose `value` via `model<string>()`. Typing in the input SHALL update the model and call `onChange`.

#### Scenario: Typing updates model

- **WHEN** user types "hello" in the input field
- **THEN** `value()` returns `"hello"` and `onChange("hello")` is called

### Requirement: CupTextField supports input attributes

The component SHALL accept inputs: `placeholder`, `label`, `type` (default `'text'`), `disabled`, `readonly`, `clearable`, `prefixIcon`.

#### Scenario: Label renders above input

- **WHEN** `<cup-text-field label="Email">` is rendered
- **THEN** a `<label>` with text "Email" appears

#### Scenario: Type sets input type

- **WHEN** `<cup-text-field type="email">` is rendered
- **THEN** the internal `<input>` has `type="email"`

#### Scenario: Clear button appears when clearable

- **WHEN** `<cup-text-field [clearable]="true" [(value)]="text">` has value
- **THEN** a clear button with `<cup-icon name="xmark">` is rendered
- **WHEN** the clear button is clicked
- **THEN** `value()` becomes empty string

#### Scenario: Prefix icon renders

- **WHEN** `<cup-text-field prefixIcon="magnifyingglass">` is rendered
- **THEN** a `<cup-icon name="magnifyingglass">` appears before the input
