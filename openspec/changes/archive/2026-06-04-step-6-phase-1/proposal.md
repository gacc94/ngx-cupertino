## Why

Phase 1 implements the 6 foundational atomic components of `@ngx-cupertino/ui`: Button, Toggle, Text Field, Slider, Stepper, and Progress. These are the building blocks for all remaining components in Phases 2-4. They consume infrastructure from `@ngx-cupertino/core` (providers, services, directives, CVA base), `@ngx-cupertino/icons` (cup-icon wrapper), and `@ngx-cupertino/tokens` (CSS custom properties). Building them now unblocks the remaining 28 components.

## What Changes

- **6 new standalone components** at `libs/ui/src/lib/<name>/`:
  - **Button** (`button[cup-button]`): Attribute selector on native `<button>`. 4 variants (liquid-glass, tinted, filled, plain), 3 sizes, disabled/loading states, optional icon with position, full-width mode. `output()` clicked on Enter/Space.
  - **Toggle** (`cup-toggle`): Custom element with `model()` checked, `input()` disabled/label. Extends `CupFormControl<boolean>`. ARIA `role="switch"`. Space toggles.
  - **Text Field** (`cup-text-field`): Custom element wrapping `<input>`. `model()` value, `input()` placeholder/label/type/disabled/readonly/clearable/prefixIcon. Extends `CupFormControl<string>`. Clear button with xmark icon.
  - **Slider** (`cup-slider`): Custom element with native `<input type="range">` + custom track/thumb visuals. `model()` value, `input()` min/max/step/disabled/label, `output()` slideStart/slideEnd. Extends `CupFormControl<number>`. Arrow keys, Home/End.
  - **Stepper** (`cup-stepper`): Custom element with +/- buttons + hidden `<input type="number">`. `model()` value, `input()` min/max/step/disabled/label/showButtons, `computed()` atMin/atMax. Extends `CupFormControl<number>`. Arrow keys.
  - **Progress** (`cup-progress`): Display-only component. `input()` value/max/type (linear|circular)/size/label. `computed()` percentage. ARIA `role="progressbar"`. No keyboard.

- **Unit tests** per component using Vitest + Angular TestBed (`componentRef.setInput()`, `output().subscribe()`)

- **Entry point** at `libs/ui/src/index.ts` exporting all 6 components

- **Angular 21**: `standalone: true` removed, `OnPush` on all components, signals-only API, `host:` bindings for state classes, `@if` control flow in templates, inline `template:` and `styles:`

## Capabilities

### New Capabilities

- `cup-button`: Cupertino-styled button with 4 variants, 3 sizes, icon support, loading state, full-width, ARIA button role, Enter/Space keyboard
- `cup-toggle`: Switch toggle with model-based two-way binding, CVA integration via CupFormControl, ARIA switch role, Space keyboard
- `cup-text-field`: Text input with label, placeholder, type variants, clearable button, prefix icon, CVA integration, ARIA textbox role
- `cup-slider`: Range slider with custom track/thumb visuals, native range input for a11y, CVA integration, ARIA slider role, arrow keys + Home/End
- `cup-stepper`: Numeric stepper with increment/decrement buttons, min/max bounds, CVA integration, ARIA spinbutton role, arrow keys
- `cup-progress`: Progress indicator with linear/circular variants, ARIA progressbar role, label with percentage, display-only

### Modified Capabilities

None — all new components.

## Impact

- **New files**: 24 files (6 components × 3 files [.ts, .scss, .spec.ts] + entry point + 3 config files)
- **Package**: `libs/ui/` — existing Nx scaffold, needs implementation
- **Dependencies**: `@ngx-cupertino/core`, `@ngx-cupertino/icons`, `@ngx-cupertino/tokens`, `@angular/cdk`, `@angular/forms`
- **Breaking**: None. All new public API.
