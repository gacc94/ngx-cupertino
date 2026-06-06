## Context

The @ngx-cupertino/tokens package is the foundation layer of the ngx-cupertino design system. It defines all design values (colors, typography, spacing, etc.) as CSS custom properties (`--cup-*`) and provides a compile-time validated SCSS API for Angular components to consume them. The token architecture is inspired by Angular Material, Carbon Design System (IBM), Primer (GitHub), and Spectrum (Adobe), following a layered approach where primitive values are separated from semantic assignments.

The complete specification resides in Notion documentation (25 reports), and now needs to be implemented as actual SCSS source files.

### Current State
- `libs/tokens/` package exists in the Nx workspace with basic Angular library setup
- No SCSS source files exist yet
- All design decisions are documented in Notion

### Constraints
- Package: `@ngx-cupertino/tokens`
- Package manager: `bun`
- Monorepo: Nx workspace
- Framework: Angular ≥ 19 with standalone components
- Must follow AGENTS.md conventions (no comments unless necessary, 4-space indent, 120 line width)
- SCSS-only output — zero CSS emitted by utility files (_api, _functions, _mixins)

## Goals / Non-Goals

**Goals:**
- Create all 22 SCSS source files with exact token values from Notion documentation
- Implement 5-layer architecture: Primitives → Semantic → Overrides → Layout → Utilities
- Provide compile-time validation via `token()` function for all ~236 CSS custom properties
- Support 4 appearance variants (Light, Dark, Light HC, Dark HC) via CSS cascade
- Generate `ARCHITECTURE.md` with Mermaid diagrams for internal documentation

**Non-Goals:**
- Angular component styling (handled by @ngx-cupertino/ui)
- Theme service runtime logic (handled by @ngx-cupertino/core)
- Figma sync or automated token extraction
- Unit tests for SCSS (separate task)

## Decisions

### D1: 5-Layer Architecture
**Decision**: Organize files into Primitives, Semantic, Overrides, Layout, and Utilities layers.
**Rationale**: Separates raw values from meaningful assignments from context overrides. Prevents circular dependencies and makes override cascade predictable. Follows industry-standard design token architecture (matches Angular Material, Carbon, Primer).
**Alternatives considered**: Flat file structure (rejected — override cascade order becomes implicit and fragile).

### D2: CSS Custom Properties Over SCSS Variables
**Decision**: Use `--cup-*` CSS custom properties in `:root` for all design tokens.
**Rationale**: CSS custom properties can be overridden at runtime via `[data-mode="dark"]` and `@media` queries. SCSS variables are compile-time only and cannot support dark mode, platform detection, or accessibility overrides.
**Alternatives considered**: SCSS variables (rejected — can't do runtime overrides). CSS-in-JS (rejected — framework-agnostic tokens are preferred).

### D3: Single Media Query Detection for macOS
**Decision**: `@media (hover: hover) and (pointer: fine)` instead of width-based breakpoints for macOS detection.
**Rationale**: Detects input capability (mouse/trackpad) which is the real differentiator between iOS and macOS controls. An iPad with keyboard gets macOS controls; an iPad touch-only keeps iOS controls. More semantically correct than guessing platform from screen width.
**Alternatives considered**: Width-based breakpoints (rejected — iPad landscape is same width as small macOS windows but should keep iOS sizing if touch-only).

### D4: Compile-Time Token Validation
**Decision**: All tokens registered in `$tokens` SCSS map in `_api.scss`. `token()` function validates at compile time with `@error` on invalid names.
**Rationale**: Catches typos and renamed tokens at build time instead of silently producing broken CSS at runtime. IDE autocomplete works on map keys. Follows the pattern established by Carbon Design System.
**Alternatives considered**: No validation (rejected — silent failures are hard to debug). Runtime validation (rejected — too late, users see broken UI).

### D5: 17px Rem Base
**Decision**: `cup-rem()` function uses 17px as the rem base (iOS body text size) instead of browser default 16px.
**Rationale**: Maps directly to Apple's Dynamic Type scale. `1rem = 17px = iOS body size` makes rem values meaningful in Apple's typography context.
**Alternatives considered**: Browser default 16px (rejected — doesn't align with Apple type scale).

### D6: Override Files Only Override, Never Define
**Decision**: `_dark.scss`, `_platform.scss`, and `_a11y.scss` only contain overrides of existing tokens. They never define new `--cup-*` custom properties.
**Rationale**: Keeps single source of truth for token definitions in the primitive/semantic layers. macOS-exclusive tokens are defined in `_platform.scss` but registered in `_api.scss`.
**Alternatives considered**: Define variants inline with `@if`/`@else` in each file (rejected — harder to audit what changes per context).

## Risks / Trade-offs

- **File count**: 22 files may seem excessive for a token package. Mitigation: Each file has a single responsibility, making maintenance predictable. The `_index.scss` entry point hides the complexity from consumers.
- **Compile-time validation overhead**: The `$tokens` map must be updated whenever tokens change. Mitigation: The `@error` message lists all valid tokens, making maintenance self-documenting.
- **CSS cascade specificity**: Complex override scenarios (iOS+HClight, macOS+HClight) require careful cascade ordering. Mitigation: The load order in `_index.scss` is documented and verified by the cascade diagram.
- **Notion as source of truth**: Token values are documented in Notion but the SCSS files are the actual source of truth after scaffolding. Mitigation: Notion pages will be updated to note that source files are authoritative.
