## Why

The @ngx-cupertino/tokens package currently has no SCSS source files — only documentation in Notion. We need to scaffold the complete token architecture (22 files, ~236 CSS custom properties) implementing the Apple Design System (iOS 26, iPadOS 26, macOS Tahoe 26) as design tokens consumable by Angular components via compile-time validated API.

## What Changes

- **NEW**: 22 SCSS source files in `libs/tokens/src/lib/` organized in 5 layers (Primitives, Semantic, Overrides, Layout, Utilities)
- **NEW**: Entry points (`_index.scss`, `index.scss`) with correct cascade order
- **NEW**: `_api.scss` with `$tokens` map (~236 entries) and `token()` validation function
- **NEW**: `_functions.scss` with 3 helper functions (cup-rem, cup-space, cup-z)
- **NEW**: `_mixins.scss` with 21 reusable pattern mixins (glass, material, interaction, transitions, layout)
- **NEW**: Architecture documentation at `libs/tokens/ARCHITECTURE.md` with Mermaid diagrams

## Capabilities

### New Capabilities
- `token-palette`: Design token definitions for colors, typography, spacing, sizing, radius, borders, opacity, elevation, glass, materials, motion, and z-index as CSS custom properties
- `token-api`: Compile-time validated token access via `token()` function and `$tokens` SCSS map
- `token-overrides`: Dark mode (`[data-mode="dark"]`), macOS platform (`@media hover+pointer`), and accessibility (`@media prefers-*`) overrides
- `token-layout`: Responsive breakpoints, column grid system, and device safe area insets
- `token-utils`: Reusable SCSS mixins and helper functions for component consumption

### Modified Capabilities
None — this is a new package implementation.

## Impact

- New source files in `libs/tokens/src/lib/` (24 files)
- New documentation in `libs/tokens/ARCHITECTURE.md`
- No breaking changes (new capability)
- Future: components in @ngx-cupertino/ui will consume these tokens via `@use '@ngx-cupertino/tokens' as t`
