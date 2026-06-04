## 1. Setup

- [x] 1.1 Create folder structure: `libs/ui/src/lib/{button,toggle,text-field,slider,stepper,progress}/`
- [x] 1.2 Verify `libs/ui/package.json` has correct peer dependencies (`@angular/cdk`, `@angular/common`, `@angular/core`, `@angular/forms`, `@ngx-cupertino/core`, `@ngx-cupertino/icons`, `@ngx-cupertino/tokens`)
- [x] 1.3 Verify `libs/ui/ng-package.json` has correct config

## 2. Button (`button[cup-button]`)

- [x] 2.1 Create `cup-button.ts` — `@Component` with attribute selector, `OnPush`, inline template + styles, `host:` bindings for classes, `imports: [CupIcon]`
- [x] 2.2 Implement signals: `input()` variant/size/disabled/loading/fullWidth/icon/iconPosition, `output()` clicked
- [x] 2.3 Implement template: `@if` icon start, `<ng-content>`, `@if` icon end, `@if` spinner
- [x] 2.4 Implement SCSS: host styles, state classes (:host.cup-disabled/loading/small/large/full-width), variant classes (:host.liquid-glass/tinted/filled/plain), internal elements (.cup-icon, .cup-label, .cup-spinner)
- [x] 2.5 Implement keyboard: Enter/Space emit `clicked` via `(keydown)` host binding
- [x] 2.6 Implement ARIA: `[attr.aria-disabled]`, `[attr.aria-busy]` on host
- [x] 2.7 Create `cup-button.spec.ts` — tests: render, variant classes, disabled, loading, icon, clicked output, keyboard, ARIA

## 3. Toggle (`cup-toggle`)

- [x] 3.1 Create `cup-toggle.ts` — extends `CupFormControl<boolean>`, `OnPush`
- [x] 3.2 Implement `model()` checked, `input()` disabled/label
- [x] 3.3 Implement template: label, button with track + thumb, `@if` label
- [x] 3.4 Implement SCSS: host, label, track, thumb, checked state, disabled state
- [x] 3.5 Implement CVA: `writeValue` updates checked model, `setDisabledState`, `onChange`/`onTouched` from base
- [x] 3.6 Implement keyboard: Space toggles with `.prevent` modifier
- [x] 3.7 Implement ARIA: `role="switch"`, `[attr.aria-checked]`, `[attr.aria-disabled]`
- [x] 3.8 Create `cup-toggle.spec.ts` — tests: render, label, toggle click, toggle Space, disabled prevents, CVA writeValue/registerOnChange/setDisabledState, ARIA

## 4. Text Field (`cup-text-field`)

- [x] 4.1 Create `cup-text-field.ts` — extends `CupFormControl<string>`, `OnPush`
- [x] 4.2 Implement `model()` value, `input()` placeholder/label/type/disabled/readonly/clearable/prefixIcon, `viewChild()` inputEl
- [x] 4.3 Implement template: label, input container, prefix icon, `<input>`, clear button with xmark icon
- [x] 4.4 Implement SCSS: host, wrapper, label, input container, input, prefix, clear button, disabled/readonly states
- [x] 4.5 Implement CVA: `writeValue` updates model, input event calls `onChange`, blur calls `onTouched`
- [x] 4.6 Implement clearable: button clears value and focuses input
- [x] 4.7 Implement ARIA: `aria-label`, `aria-invalid`, `aria-describedby` on input
- [x] 4.8 Create `cup-text-field.spec.ts` — tests: render, label, placeholder, type, value input, clearable, prefixIcon, disabled/readonly, CVA, ARIA

## 5. Slider (`cup-slider`)

- [x] 5.1 Create `cup-slider.ts` — extends `CupFormControl<number>`, `OnPush`
- [x] 5.2 Implement `model()` value, `input()` min/max/step/disabled/label, `output()` slideStart/slideEnd, `computed()` percentage
- [x] 5.3 Implement template: label, custom track + fill + thumb, hidden native `<input type="range">`
- [x] 5.4 Implement SCSS: host, container, label, track, fill, thumb, native input (visually hidden), disabled state
- [x] 5.5 Implement CVA: `writeValue` updates model, input event calls `onChange`, touch events call `onTouched`
- [x] 5.6 Implement drag: mousedown on track/thumb, mousemove/mouseup via `document` listeners
- [x] 5.7 Implement keyboard: Arrow keys, Home, End on native range input (built-in browser behavior)
- [x] 5.8 Implement ARIA: `role="slider"`, `aria-valuemin/max/now` on native input
- [x] 5.9 Create `cup-slider.spec.ts` — tests: render, value, min/max/step, fill percentage, slideStart/slideEnd, keyboard arrows, CVA, ARIA

## 6. Stepper (`cup-stepper`)

- [x] 6.1 Create `cup-stepper.ts` — extends `CupFormControl<number>`, `OnPush`
- [x] 6.2 Implement `model()` value, `input()` min/max/step/disabled/label/showButtons, `computed()` atMin/atMax
- [x] 6.3 Implement template: label, controls container, decrement button (-), hidden `<input type="number">`, increment button (+), `@if showButtons`
- [x] 6.4 Implement SCSS: host, container, label, controls, buttons, input, disabled state
- [x] 6.5 Implement CVA: `writeValue` updates model, input event calls `onChange`, blur calls `onTouched`
- [x] 6.6 Implement value clamping: input value clamped to [min, max], increment/decrement wrap at bounds
- [x] 6.7 Implement ARIA: `role="spinbutton"`, `aria-valuemin/max/now`, `aria-label` on input
- [x] 6.8 Create `cup-stepper.spec.ts` — tests: render, label, increment/decrement, min/max bounds, atMin/atMax computed, showButtons, keyboard, CVA, ARIA

## 7. Progress (`cup-progress`)

- [x] 7.1 Create `cup-progress.ts` — `@Component`, `OnPush`, does NOT extend CupFormControl
- [x] 7.2 Implement `input()` value/max/type/size/label, `computed()` percentage
- [x] 7.3 Implement template: `@if linear` track + fill + label, `@else circular` SVG ring
- [x] 7.4 Implement SCSS: host, linear track/fill, circular SVG track/fill, label
- [x] 7.5 Implement ARIA: `role="progressbar"`, `aria-valuenow/min/max`, `aria-label` on progress element
- [x] 7.6 Create `cup-progress.spec.ts` — tests: render linear, render circular, value/max, percentage computed, label, ARIA progressbar attributes

## 8. Entry Point & Package

- [x] 8.1 Write `libs/ui/src/index.ts` with 6 named exports
- [x] 8.2 Remove any existing stub content in `libs/ui/src/`

## 9. Final Verification

- [x] 9.1 Run `bun nx build ui` — build succeeds
- [x] 9.2 Run `bun biome check --write libs/ui/` — formatting clean
- [x] 9.3 Run `bun nx test ui` — all test suites pass (97/97 ✅)
- [x] 9.4 Commit with conventional commit message including emoji
