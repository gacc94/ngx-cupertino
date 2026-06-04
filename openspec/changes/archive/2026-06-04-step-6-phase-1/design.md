## Context

`libs/ui/` is scaffolded by Nx but empty. The 6 Phase 1 components are atomic building blocks that all remaining 28 components depend on. They extend `CupFormControl<T>` from `@ngx-cupertino/core` for form integration. They use `CupIcon` from `@ngx-cupertino/icons` for icon rendering. All styles use CSS custom properties from `@ngx-cupertino/tokens`.

## Goals / Non-Goals

**Goals:**
- 6 standalone components with full ARIA, keyboard, signal API, and unit tests
- Angular 21 patterns: `OnPush`, `host:` bindings, `@if` control flow, inline templates
- CVA integration via `CupFormControl<T>` for Toggle, Text Field, Slider, Stepper
- SCSS uses only `var(--cup-*)` tokens — no hardcoded values
- Vitest unit tests covering rendering, inputs, outputs, states, ARIA, keyboard, CVA

**Non-Goals:**
- No `@angular/animations` — CSS transitions/animations only
- No `FormsModule` / `ngModel` — ReactiveFormsModule + CVA only
- No external template/SCSS files — inline `template:` and `styles:` per AGENTS.md
- No complex theming beyond variant classes on host

## Decisions

### 1. Attribute selector for Button (`button[cup-button]`)

**Decision**: Button uses `selector: 'button[cup-button]'` — attribute selector on native `<button>`.

**Rationale**: Native `<button>` provides built-in accessibility (focus, keyboard, form submission). The attribute selector adds Cupertino styling without replacing the native element. This is the pattern used by Angular Material (`button[mat-button]`).

### 2. Custom elements for non-button components

**Decision**: Toggle, Text Field, Slider, Stepper, Progress use custom element selectors (`cup-toggle`, etc.).

**Rationale**: These components wrap internal native elements (`<input>`, `<button>`) and provide complex behavior. A custom element is the correct host for composite components.

### 3. CVA via `CupFormControl<T>` base class

**Decision**: Toggle, Text Field, Slider, Stepper extend `CupFormControl<T>` from `@ngx-cupertino/core`.

**Rationale**: `CupFormControl<T>` implements `ControlValueAccessor` with signal-based `value` and `disabled` state. Components override `writeValue`/`setDisabledState` and call `onChange`/`onTouched`. Eliminates CVA boilerplate per component. Aligns with Angular 21 signal-based form patterns.

### 4. Inline templates and styles

**Decision**: Use `template:` and `styles:` in `@Component()` decorator — no separate `.html` or `.scss` files.

**Rationale**: Per AGENTS.md and Angular best practices: "Small components benefit from inline templates to keep logic and view close together." SCSS is inline as a string array. `ViewEncapsulation.Emulated` (default) scopes styles to the component.

### 5. State classes via `host:` bindings

**Decision**: Apply state classes (`.cup-disabled`, `.cup-loading`, `.cup-small`) via `host:` metadata, not via `[class.*]` in templates.

**Rationale**: Angular-native pattern used by Material, PrimeNG, NG-ZORRO. Host bindings are declarative and reactive — Angular applies/removes classes automatically when signals change. No manual class toggling in template needed.

### 6. Variants as direct host classes

**Decision**: Variant classes (`.liquid-glass`, `.tinted`, `.filled`, `.plain`) are applied directly on the host element via `host:` binding.

**Rationale**: Variants are static per instance — set once via input, applied as CSS class. SCSS uses `:host(.tinted)` selector for scoped variant styles. This is simpler than component-level theme logic.

### 7. Slider dual-render: custom visuals + native range input

**Decision**: Slider renders a custom track/thumb/fill for visual styling AND a hidden native `<input type="range">` for keyboard accessibility and screen reader support. The native input syncs with the model value.

**Rationale**: Native range input provides built-in ARIA slider role, arrow key handling, and screen reader announcements. The custom track/thumb overlay provides Cupertino styling. Both are kept in sync via `model()` two-way binding.

## Risks / Trade-offs

- **Inline styles grow large**: Complex SCSS could make `styles:` arrays unwieldy. Mitigation: extract to external `.scss` files per component if lines exceed ~100. Keep inline for now.
- **Slider custom visuals + native input**: May cause double-interaction issues if not properly layered. Mitigation: native input is visually hidden (`opacity: 0; position: absolute`) and the custom track/thumb is for visual feedback only.
- **Stepper value clamping**: User may type values outside min/max in the `<input type="number">`. Mitigation: `onInput` handler clamps value to `[min, max]` range before updating model.
