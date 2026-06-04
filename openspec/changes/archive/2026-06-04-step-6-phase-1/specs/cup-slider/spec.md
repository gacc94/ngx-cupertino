## ADDED Requirements

### Requirement: CupSlider uses custom element selector

The `libs/ui/src/lib/slider/cup-slider.ts` file SHALL export a component with `selector: 'cup-slider'`.

#### Scenario: Selector is cup-slider

- **WHEN** reading `cup-slider.ts`
- **THEN** `selector` is `'cup-slider'`

### Requirement: CupSlider extends CupFormControl

The component SHALL extend `CupFormControl<number>`.

#### Scenario: Extends CVA base class

- **WHEN** reading `cup-slider.ts`
- **THEN** `class CupSlider extends CupFormControl<number>`

### Requirement: CupSlider has model-based value

The component SHALL expose `value` via `model<number>(0)`. Moving the slider SHALL update the model and call `onChange`.

#### Scenario: Slider movement updates model

- **WHEN** slider value changes to 50
- **THEN** `value()` returns `50` and `onChange(50)` is called

### Requirement: CupSlider has min, max, step inputs

The component SHALL accept `min` (default 0), `max` (default 100), `step` (default 1) inputs.

#### Scenario: Min/max/step applied

- **WHEN** `<cup-slider [min]="10" [max]="90" [step]="5">` is rendered
- **THEN** the native range input has `min="10"`, `max="90"`, `step="5"`

### Requirement: CupSlider renders custom track/thumb and native input

The component SHALL render a custom visual track with fill and thumb, AND a visually-hidden native `<input type="range">` for accessibility.

#### Scenario: Native input exists for a11y

- **WHEN** cup-slider is rendered
- **THEN** a hidden `<input type="range">` is present with synced value/min/max/step

#### Scenario: Custom fill reflects percentage

- **WHEN** `value()` is 50, `min()` is 0, `max()` is 100
- **THEN** the fill element has `width: 50%`

### Requirement: CupSlider emits slideStart and slideEnd

The component SHALL emit `slideStart` when dragging begins and `slideEnd` when dragging ends.

#### Scenario: Slide events emit

- **WHEN** user starts dragging the slider thumb
- **THEN** `slideStart` output emits
- **WHEN** user releases the slider thumb
- **THEN** `slideEnd` output emits

### Requirement: CupSlider handles arrow keys

Arrow Left/Down SHALL decrease value by step. Arrow Right/Up SHALL increase value by step. Home SHALL set to min. End SHALL set to max.

#### Scenario: Arrow right increases

- **WHEN** Right Arrow is pressed and value is 0 with step 10
- **THEN** value becomes 10

#### Scenario: Home sets min

- **WHEN** Home is pressed and value is 50
- **THEN** value becomes min (0)
