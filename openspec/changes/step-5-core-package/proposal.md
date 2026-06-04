## Why

The `@ngx-cupertino/core` package provides the foundational infrastructure for all Cupertino components: theme management, breakpoint detection, Liquid Glass styling, RTL support, touch ripple, and reusable form control utilities. Phase 1 components (Button, Slider, TextField, Stepper, Dialog, Drawer, Card, Tabs, DatePicker, Notification) depend on these core services and directives. Building Core now unblocks all remaining packages.

## What Changes

- **New package `@ngx-cupertino/core`** at `libs/core/` with full implementation
- **Typed constants** (`CupTints`, `CupSizes`, `CupButtonVariants`, `CupCardVariants`) using `as const` — zero runtime cost, tree-shakeable
- **`provideCupertino()`** provider with `CupConfig` injection token, auto-init via `provideEnvironmentInitializer()` — sets theme, tint, and direction on `<html>`
- **`ThemeService`** with signal-based reactive theme state (`theme`, `isDark`, `currentTint`) — supports `auto` (prefers-color-scheme), `light`, `dark` modes, derives CSS custom properties from tint
- **`BreakpointService`** with signal-based viewport breakpoints (`isMobile`, `isTablet`, `isDesktop`, `isCompact`, `hasHover`, `hasTouch`)
- **`CupConfigService`** exposing resolved config as a signal
- **3 directives**: `[cupLiquidGlass]` (Apple Liquid Glass via CSS tokens), `[cupRipple]` (Material-like touch ripple), `[cupRtl]` (RTL-aware layout)
- **SCSS barrel** (`_index.scss`) forwarding mixins, functions, and animations — consumable via `@use '@ngx-cupertino/core' as cup`
- **CSS keyframe animations**: slide up/down, fade in/out, scale in/out with reduced-motion support
- **`CupFormControl`** abstract class implementing `ControlValueAccessor` with signal-based value/disabled state
- **Utility functions**: `generateId()` for unique DOM IDs
- **Angular 21**: `standalone: true` removed (default in v20+). `OnPush` on directives. Signals API, `host:` bindings, `inject()` throughout

## Capabilities

### New Capabilities

- `core-constants`: Typed constants (CupTints, CupSizes, CupButtonVariants, CupCardVariants) with `as const` pattern. Type exports for tint names, sizes, and variant unions.
- `core-providers`: `provideCupertino()` function with `CupConfig` injection token and `provideEnvironmentInitializer()` for auto-init. Theme, tint, and direction configuration.
- `core-services`: `ThemeService` (signal-based theme with auto/light/dark, tint derivation), `BreakpointService` (signal-based viewport breakpoints via CDK BreakpointObserver), `CupConfigService` (config as signal).
- `core-directives`: `LiquidGlassDirective` (`[cupLiquidGlass]`), `RippleDirective` (`[cupRipple]`), `CupRtlDirective` (`[cupRtl]`). All standalone, OnPush, host bindings.
- `core-scss`: SCSS barrel at `_index.scss` exporting `_mixins.scss` (cup-liquid-glass, cup-text), `_functions.scss`, and `_animations.scss` (keyframe animations + reduced-motion). Package exports configured for `@use '@ngx-cupertino/core' as cup`.
- `core-utils`: `CupFormControl<T>` abstract CVA base class (signal-based, ReactiveFormsModule), `generateId()` function, a11y utility.

### Modified Capabilities

None — this is a new package.

## Impact

- **New files**: ~20 files across `libs/core/src/lib/` (constants, providers, services, directives, styles, utils) + entry point + SCSS barrel
- **Modified files**: `libs/core/ng-package.json` (add SCSS assets, update entry), `libs/core/package.json` (add SCSS exports, peer deps), `libs/core/src/index.ts` (replace stub with full exports)
- **Dependencies**: `@angular/cdk` (new), `@ngx-cupertino/tokens` (existing), `@ngx-cupertino/icons` (existing via `exports` field only for IDE resolution)
- **Breaking**: None. All new APIs. No existing code depends on Core.
- **SCSS**: Consumers must import `@use '@ngx-cupertino/core' as cup` to access mixins
