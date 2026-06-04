## ADDED Requirements

### Requirement: CupButton uses attribute selector on native button

The `libs/ui/src/lib/button/cup-button.ts` file SHALL export a component with `selector: 'button[cup-button]'` — an attribute selector on the native `<button>` element.

#### Scenario: Selector targets native button

- **WHEN** reading `cup-button.ts`
- **THEN** `selector` is `'button[cup-button]'`

### Requirement: CupButton supports 4 variants

The component SHALL accept a `variant` input with values `'liquid-glass' | 'tinted' | 'filled' | 'plain'`, defaulting to `'filled'`. Each variant SHALL apply the corresponding CSS class on the host via `[class.liquid-glass]`, etc.

#### Scenario: Default variant is filled

- **WHEN** `<button cup-button>` is rendered
- **THEN** the host element has class `filled`

#### Scenario: Tinted variant applies correct class

- **WHEN** `<button cup-button variant="tinted">` is rendered
- **THEN** the host element has class `tinted`

### Requirement: CupButton supports sizes

The component SHALL accept a `size` input with values `'sm' | 'md' | 'lg'`, defaulting to `'md'`. Size classes SHALL be applied via `host:` bindings `[class.cup-small]` and `[class.cup-large]`.

#### Scenario: Small size applies cup-small class

- **WHEN** `<button cup-button size="sm">` is rendered
- **THEN** the host element has class `cup-small`

### Requirement: CupButton supports disabled and loading states

The component SHALL accept `disabled` and `loading` boolean inputs. Disabled state SHALL set `aria-disabled` and apply `.cup-disabled` class. Loading state SHALL set `aria-busy` and apply `.cup-loading` class, and render a spinner element.

#### Scenario: Disabled button is not interactive

- **WHEN** `disabled` input is `true`
- **THEN** `aria-disabled="true"` and class `cup-disabled` are on the host

#### Scenario: Loading button shows spinner

- **WHEN** `loading` input is `true`
- **THEN** `aria-busy="true"` and class `cup-loading` are on the host, and a spinner element is rendered

### Requirement: CupButton supports icon

The component SHALL accept `icon` (string) and `iconPosition` (`'start' | 'end'`) inputs. When `icon` is set, a `<cup-icon>` SHALL be rendered at the specified position.

#### Scenario: Icon at start

- **WHEN** `<button cup-button icon="star">` is rendered
- **THEN** a `<cup-icon name="star" class="cup-icon">` appears before the content

#### Scenario: Icon at end

- **WHEN** `<button cup-button icon="star" iconPosition="end">` is rendered
- **THEN** a `<cup-icon name="star" class="cup-icon">` appears after the content

### Requirement: CupButton emits clicked on Enter and Space

The component SHALL emit `clicked` output when the button is clicked or when Enter or Space keys are pressed.

#### Scenario: Click emits clicked

- **WHEN** the host element is clicked
- **THEN** `clicked` output emits

#### Scenario: Enter key emits clicked

- **WHEN** Enter key is pressed on the host element
- **THEN** `clicked` output emits

#### Scenario: Space key emits clicked

- **WHEN** Space key is pressed on the host element
- **THEN** `clicked` output emits
