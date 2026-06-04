## Context

The `libs/core/` directory is scaffolded (Nx-generated) but empty except for a stub `index.ts`. The Core package provides infrastructure that all Phase 1 components depend on: theme, breakpoints, styling directives, SCSS mixins, and form control utilities. It depends on `@ngx-cupertino/tokens` (for CSS custom properties) and `@angular/cdk` (for BreakpointObserver). Angular 21 patterns apply: standalone as default, signal-based state, `host:` bindings, `inject()`.

## Goals / Non-Goals

**Goals:**
- Create all 6 capability groups: constants, providers, services, directives, SCSS, utils
- Follow Angular 21 best practices: signals, OnPush, `host:` bindings, no `standalone: true`
- Zero runtime cost for constants via `as const`
- SCSS barrel consumable via `@use '@ngx-cupertino/core' as cup`
- `provideCupertino()` auto-initializes theme/tint/direction via `provideEnvironmentInitializer()`
- All components standalone, all directives OnPush

**Non-Goals:**
- No Angular animations (`@angular/animations`) — use CSS keyframes
- No `effect()` in ThemeService — manual event listeners for prefers-color-scheme
- No `ngModel` / FormsModule — ReactiveFormsModule only via CupFormControl
- No component implementations — this is infrastructure only

## Decisions

### 1. `as const` objects over TypeScript enums

**Decision**: Use `as const` objects with derived types for constants.

**Rationale**: Enums add runtime code and are not tree-shakeable. `as const` objects compile away at build time. TypeScript's `keyof typeof` and indexed access types provide equivalent type safety with zero runtime cost. Context7 Angular docs confirm this is the recommended pattern.

**Alternatives considered**: `enum` — rejected for tree-shaking. `const enum` — rejected for `isolatedModules` compatibility issues in library builds.

### 2. `provideEnvironmentInitializer()` for auto-init

**Decision**: Use `provideEnvironmentInitializer()` inside `provideCupertino()` to set theme, tint, and direction on `<html>`.

**Rationale**: Stable API (not experimental), runs during app initialization, does NOT block bootstrap. Safer than `APP_INITIALIZER` which can block rendering. Theme, tint, and direction are set via `document.documentElement.dataset` and `style.setProperty()` — no Angular context needed.

### 3. Signal-based ThemeService without `effect()`

**Decision**: ThemeService uses `signal()` for state but handles side effects (DOM attribute writes) imperatively in methods, not via `effect()`.

**Rationale**: `effect()` is designed for DOM reads and reactive side effects but can cause timing issues during initialization. Theme changes are always triggered by user action (method calls), so imperative DOM writes are simpler and more predictable. `auto` mode uses `window.matchMedia` listener callback — no Angular reactivity needed.

### 4. CSS keyframe animations over Angular `@angular/animations`

**Decision**: Define animations as pure CSS `@keyframes` in `_animations.scss`, applied via CSS classes (e.g., `.cup-fade-in`). Components use `[animate.enter]` / `[animate.leave]` pattern or host class toggling.

**Rationale**: Avoids `@angular/animations` dependency (adds bundle size, requires `BrowserAnimationsModule` or `provideAnimations()`). CSS animations are compiler-native, GPU-accelerated, and work with Angular's `@if`/`@for` control flow. Reduced-motion support via `@media (prefers-reduced-motion)` is simpler in CSS.

### 5. SCSS barrel at package root

**Decision**: Main SCSS entry point at `src/_index.scss` (forwarded via `package.json` exports), partials in `src/lib/styles/`.

**Rationale**: Angular `ng-packagr` supports SCSS `assets` in `ng-package.json`. The `package.json` `exports` field with `"sass"` condition enables `@use '@ngx-cupertino/core' as cup`. Sub-paths (e.g., `@ngx-cupertino/core/styles/mixins`) allow granular imports. This is the standard Angular library SCSS pattern.

### 6. `CupFormControl` abstract class with signals

**Decision**: Abstract `@Directive()` class implementing `ControlValueAccessor` with `signal()` for `value` and `disabled` state.

**Rationale**: Base class for all Cupertino form components (TextField, Slider, Stepper, DatePicker). Signal-based state aligns with Angular 21 patterns. Components extend this class instead of re-implementing CVA boilerplate. `@Directive()` decorator required for Angular to resolve `inject()` in the abstract class.

### 7. Directory structure follows existing conventions

**Decision**: `libs/core/src/lib/` with subdirectories: `constants/`, `providers/`, `services/`, `directives/`, `styles/`, `utils/`.

**Rationale**: Matches the pattern established by `libs/icons/`. Each subdirectory groups related functionality. File naming follows AGENTS.md conventions: no `.component` suffix for directives, kebab-case filenames.

## Risks / Trade-offs

- **`@angular/cdk` dependency**: Adds ~50KB to bundle. Mitigation: only import `BreakpointObserver` module, not the full CDK. Tree-shaking handles unused CDK code.
- **ThemeService `auto` mode listeners**: `matchMedia` listeners are not cleaned up on destroy. Mitigation: ThemeService is `providedIn: 'root'` — singleton lifetime matches the app. If needed later, add `OnDestroy` cleanup.
- **SCSS exports path resolution**: Consumer tooling must support `sass` condition in `package.json` exports. Mitigation: Angular CLI / Vite both support this. Document fallback `@use` paths.
- **`CupFormControl` abstract class with `@Directive()`**: May cause confusion about decorating abstract classes. Mitigation: clear documentation. This is the Angular-recommended pattern for CVA bases.
