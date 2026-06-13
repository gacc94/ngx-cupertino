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
- `CUP_CONFIG`
- `DEFAULT_CUP_CONFIG`

This layer:
- accepts the consumer's partial config
- registers the shared services
- runs the environment initializer
- applies defaults and initial DOM synchronization

### State Layer
- `CupConfigService`

This layer:
- stores the canonical merged runtime config in signals
- exposes computed selectors for each global axis
- receives structured partial updates from specialized services

### Runtime Facades
- `ThemeService`
- `SurfaceStyleService`
- `LiquidGlassService`

These services:
- own a focused domain each
- update `CupConfigService`
- synchronize relevant `data-*` attributes to `<html>`

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

Default inside liquid-glass mode:
- `regular`

### Liquid Glass Preferred Look
- `system`
- `clear`
- `tinted`

Default:
- `system`

## Runtime Flow

```mermaid
flowchart TD
    A[Consumer calls provideCupertino(config)] --> B[CUP_CONFIG token]
    B --> C[CupConfigService]
    D[DEFAULT_CUP_CONFIG] --> C

    C --> E[ThemeService]
    C --> F[SurfaceStyleService]
    C --> G[LiquidGlassService]

    E --> H[Resolve auto theme from system preferences]
    H --> I[Write html data-mode]
    E --> J[Write html data-tint]

    F --> K[Write html data-surface-style]
    G --> L[Write html data-liquid-glass-variant]
    G --> M[Write html data-liquid-glass-look]

    I --> N[Tokens and CSS selectors react]
    J --> N
    K --> N
    L --> N
    M --> N

    N --> O[Core mixins and components render final UI]
```

## Initialization Sequence
1. `provideCupertino()` registers services and partial config.
2. `CupConfigService` merges partial config with defaults.
3. `ThemeService` resolves `theme` and applies `data-mode`.
4. `ThemeService` applies `data-tint`.
5. Provider applies `dir` and a11y overrides.
6. `SurfaceStyleService` applies `data-surface-style`.
7. `LiquidGlassService` applies glass attributes only when the surface style is `liquid-glass`.
8. CSS tokens and mixins react globally.

## DOM Synchronization Rules

### Always Present
- `data-mode`
- `data-tint`

### Present Only When Needed
- `data-surface-style`
- `data-liquid-glass-variant`
- `data-liquid-glass-look`

Rules:
- `data-mode` should always be concrete: `light` or `dark`
- `data-tint` defaults to `blue`
- `data-surface-style` defaults to `base`
- if `surfaceStyle = base`, liquid-glass attributes are removed from the DOM
- if `surfaceStyle = liquid-glass`, the last configured material values are projected back into the DOM

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
