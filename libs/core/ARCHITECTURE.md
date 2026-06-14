# `@ngx-cupertino/core` Architecture

## Purpose

`@ngx-cupertino/core` is the runtime and styling infrastructure shared by all higher-level Cupertino components.

It owns:

- global configuration
- DOM synchronization
- theme and tint state
- material mode state
- accessibility-related runtime overrides
- shared directives, utilities, and component SCSS mixins

The package is intentionally split so that:

- Angular services own the runtime source of truth
- the provider initializes the app-wide state once
- `<html data-*>` attributes project that state to the DOM
- tokens and component styles react declaratively through CSS

## Core Goals

- Keep the runtime API small and typed
- Centralize side effects in `core`
- Avoid per-component theme/material props when the decision is global
- Support runtime updates safely
- Preserve SSR-safe DOM access through `DOCUMENT`
- Make the system extensible for future axes without flattening the config

## Main Building Blocks

### Provider Layer

- `provideCupertino()`
- `CUP_CONFIG` (defined in `lib/tokens/cup-config.token.ts`)
- `DEFAULT_CUP_CONFIG`

This layer:

- accepts the consumer's partial config
- registers the shared services through composable sub-functions (`coreProviders`, `domSyncProviders`, `a11yProviders`)
- runs an environment initializer (`eagerBoot`) that force-instantiates the DOM-sync services so their effects run at startup
- applies defaults and initial DOM synchronization

The `CUP_CONFIG` token lives in a dedicated file (not in the provider) to break the
circular dependency between `CupConfigService` and `provideCupertino()`. The initializer no
longer mutates the DOM directly: every DOM write is owned by a focused service effect.

Note: `FocusService` and `FocusTrapService` are intentionally **not** registered globally.
They are component-scoped and must be added to the `providers` array of each component that
monitors focus or traps focus.

### State Layer

- `CupConfigService`

This layer:

- stores the canonical merged runtime config in a **private** `WritableSignal` (`_config`)
- exposes a **readonly** `config` signal (via `asReadonly()`) plus computed selectors for each global axis (CQRS: writes only through `updateConfig()`)
- receives structured partial updates from specialized services

### Runtime Facades

DOM-sync services (each owns a reactive `effect()` that writes to `<html>`):

- `ThemeService` — resolves theme/tint, writes `data-mode` and `data-tint`
- `SurfaceStyleService` — writes `data-surface-style` and the glass datasets (owns all glass DOM writes, including cleanup)
- `LiquidGlassService` — write API for glass material; holds no effect of its own (DOM sync is delegated to `SurfaceStyleService`)
- `DirectionService` — writes the `dir` attribute reactively
- `A11yConfigService` — writes a11y CSS vars / attributes (`data-reduced-motion`, `--cup-focus-ring`, `--cup-min-touch-target`) reactively
- `BreakpointService` — exposes viewport/capability/a11y query signals (no DOM writes)

These services:

- own a focused domain each
- seed their state reactively from `CupConfigService` (e.g. `ThemeService` uses `linkedSignal(() => cfg.theme())`, so runtime `setTheme`/`setTint` overrides reset when config changes)
- update `CupConfigService` through `updateConfig()`
- synchronize relevant `data-*` attributes to `<html>`

Global a11y utilities (no DOM side-effects of their own): `AnnouncerService`, `KeyManagerService`.

### Styling Layer

- tokens package CSS variables
- `data-*` selectors
- core SCSS mixins

This layer:

- reads `data-mode`, `data-tint`, `data-surface-style`, and glass-related attributes
- translates runtime state into visual output

## Global Axes

### Theme

- `light`
- `dark`
- `auto`

`auto` is resolved by `ThemeService` against system preferences and projected as a concrete `data-mode="light|dark"`.

### Tint

- named tint tokens or custom palettes

Recommended usage:

- named tints for Apple-aligned system behavior
- adaptive custom palettes for branded colors that must react to light, dark, and increased-contrast contexts

Compatibility fallback:

- a single `#hex` is still accepted, but it does not express adaptive variants and should not be treated as the preferred public contract

Source of truth:

- named tint **color values** (light, dark, and increased-contrast) live exclusively in `@ngx-cupertino/tokens` (`semantic/_tints.scss`)
- `core` only knows the valid **names** via `CUP_TINT_NAMES`; for a named tint, `ThemeService` writes `data-tint="<name>"` and the token CSS resolves the color
- `core` does not duplicate hex values for named tints (removed in P6 to avoid drift); custom palettes (`CupTintPalette` / `#hex`) carry their own values supplied by the consumer
- to read an applied tint at runtime, read `--cup-tint` from the DOM rather than a JS constant

Default:

- `blue`

### Surface Style

- `base`
- `liquid-glass`

Default:

- `base`

### Liquid Glass Variant

- `regular`
- `clear`
- `prominent`

Default inside liquid-glass mode:

- `regular`

### Liquid Glass Preferred Look

- `system`
- `clear`
- `tinted`

Default:

- `system`

## Color Governance

### Family Contract

- palette tokens such as `red`, `blue`, and `gray-*` are raw families only; prefer semantic tokens when the UI meaning is known
- `label*` and `vibrant-label*` tokens are foreground content only
- `fill*` and `vibrant-fill*` tokens are supporting surfaces only, not page backgrounds or primary copy
- `bg*` and `bg-grouped*` tokens are structural backgrounds only
- `separator*` and border tokens are dividers and strokes only
- `tint*` tokens are accent and interaction colors for actionable, selected, or emphasized UI only
- `glass*` and `material*` tokens are material surface primitives, not semantic content colors
- platform tokens such as `control-*`, `window-*`, `focus-ring`, and `grid` are desktop semantic augmentations only

Rule:

- components must not invent new semantic color meaning locally; if a shared role is missing, document and add it in `tokens` first

### Public Semantic Token Typing

- `CupSemanticTokenName` is the public compile-time union for semantic foreground, support, background, and separator tokens
- covered families: `label*`, `vibrant-label*`, `fill*`, `vibrant-fill*`, `bg*`, `bg-grouped*`, `separator*`, `link`, `placeholder`, `text-dark`, and `text-light`
- excluded families: palette (`red`, `blue`, `gray-*`), accent (`tint*`), material (`glass*`, `material*`), and desktop platform tokens
- add new names to the union only when they represent semantic UI roles, not raw palette references or effect primitives

### Desktop Platform Scope

- `libs/tokens/src/lib/_platform.scss` is a curated desktop augmentation layer for fine-pointer contexts
- it does not promise complete AppKit parity
- new desktop tokens must map to a documented Apple semantic role before being added
- missing AppKit roles are acceptable until a concrete component needs them

### Liquid Glass Policy

- neutral glass is the default
- `tinted` glass is an emphasis mode, not a global default
- prefer tinting the surface, not the label, for primary emphasis when contrast is proven
- toolbars, tab bars, and dense control clusters should stay conservative and monochrome-first
- any tinted glass label or icon treatment must be visually reviewed in light, dark, and increased-contrast contexts

### Raw Effect Audit

- raw effect colors are allowed only for component-local photometric details such as sheen, halos, and mask cutouts
- the current P1 audit found local effect recipes in `_button.scss` and `_toggle.scss`, but no cross-component shared recipe that justified a new public token in this slice
- if the same effect recipe appears across multiple components, promote it to a shared token or mixin and document the new role

### Color Space Policy

- token values are sRGB-first by default
- Display P3 is an explicit exception path, not a parallel default
- add P3 only when the use case is intentional, documented, and reviewed in Storybook or an equivalent visual QA pass
- asset or handoff guidance must call out any wide-gamut requirement before new P3 values ship

### Token Maintenance Cross-Reference

- `libs/tokens/ARCHITECTURE.md` owns the canonical maintenance order for future palette and token refinements
- contributors should start at the palette source of truth, then move upward through tint, semantic, platform/material, and only update API/docs last

## Runtime Flow

```mermaid
flowchart TD
    A[Consumer calls provideCupertino(config)] --> B[CUP_CONFIG token]
    B --> C[CupConfigService]
    D[DEFAULT_CUP_CONFIG] --> C

    C --> E[ThemeService]
    C --> F[SurfaceStyleService]
    C --> P[DirectionService]
    C --> Q[A11yConfigService]

    E --> H[Resolve auto theme from system preferences]
    H --> I[Write html data-mode]
    E --> J[Write html data-tint]

    F --> K[Write html data-surface-style]
    F --> L[Write or clear glass datasets]
    P --> R[Write or remove html dir]
    Q --> S[Write a11y CSS vars and attributes]

    I --> N[Tokens and CSS selectors react]
    J --> N
    K --> N
    L --> N
    R --> N
    S --> N

    N --> O[Core mixins and components render final UI]
```

`LiquidGlassService` holds the glass material write API but delegates DOM projection to
`SurfaceStyleService`, which owns every glass dataset write (and its cleanup when the surface
style returns to `base`).

## Initialization Sequence

1. `provideCupertino()` registers services and partial config.
2. `CupConfigService` merges partial config with defaults.
3. `eagerBoot` force-instantiates the DOM-sync services so their effects run once at startup.
4. `ThemeService` resolves `theme` and applies `data-mode` (mode effect) and `data-tint` (tint effect, split for focused reactivity).
5. `DirectionService` applies or removes `dir`.
6. `A11yConfigService` applies a11y CSS vars / attributes.
7. `SurfaceStyleService` applies `data-surface-style` and projects glass datasets when the surface style is `liquid-glass` (or clears them for `base`).
8. CSS tokens and mixins react globally.

## DOM Synchronization Rules

### Always Present

- `data-mode`
- `data-tint`

### Present Only When Needed

- `data-surface-style`
- `data-liquid-glass-variant`
- `data-liquid-glass-look`
- `dir` (only when direction is `rtl`)
- `data-reduced-motion`, `--cup-focus-ring`, `--cup-min-touch-target` (only when the matching a11y config is set)

Rules:

- `data-mode` should always be concrete: `light` or `dark`
- `data-tint` defaults to `blue`
- `data-surface-style` defaults to `base`
- if `surfaceStyle = base`, liquid-glass attributes are removed from the DOM
- if `surfaceStyle = liquid-glass`, the last configured material values are projected back into the DOM
- `dir` is set to `rtl` only when `direction = rtl`; `ltr` removes the attribute
- a11y overrides are reactive — they update when `updateConfig({ a11y })` is called at runtime, not only at startup

## Why Services + Data Attributes

The project intentionally uses a hybrid strategy:

- services for typed runtime state
- data attributes for global DOM projection
- CSS for declarative rendering

This is preferred over:

- direct per-component props
- purely imperative `style.setProperty()` for all axes
- local state inside each component

Benefits:

- scalable across the full library
- easy to debug in the DOM
- runtime-safe and SSR-aware
- aligned with the current project direction

## Extendibility Strategy

Future axes should follow the same pattern:

1. define a closed union type
2. add defaults
3. add config selectors
4. add a focused runtime facade if the axis needs runtime mutation
5. project state to `data-*` attributes when it affects visual rendering

This keeps the package extendible without flattening the config API.

## Component Integration Model

Components should not become responsible for global configuration resolution.

Instead, they should:

- consume tokens and global DOM state indirectly through CSS
- optionally read focused services only when component-specific behavior truly needs runtime knowledge

Example:

- `cup-toggle` should not own global glass decisions
- it should react to `data-surface-style` and glass material attributes through core styles

Component-scoped services:

- `FocusService` and `FocusTrapService` are **not** global. A component that needs focus
  monitoring or focus trapping must list the service in its own `providers: []`, giving each
  component instance an isolated registry that is torn down with the component.

## Accessibility and System Preferences

`core` is the place where system-aligned behavior should enter the design system.

Examples:

- `prefers-color-scheme`
- reduced motion preferences
- transparency and contrast adjustments

Rule:

- services resolve or normalize runtime state
- DOM attributes and CSS express the visual result

## Documentation Standard

Public `core` runtime APIs should remain fully documented with TypeDoc / JSDoc.

Required coverage:

- public config types
- services
- provider
- exported constants
- public methods with side effects

## Summary

`@ngx-cupertino/core` is the bridge between:

- application-level runtime configuration
- system preferences
- DOM-level global state
- token-driven component styling

Its job is not to render every control directly, but to provide the infrastructure that makes all controls consistent, configurable, and extensible.
