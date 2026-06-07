## Context

The icons package wraps `@lucide/angular` with Apple SF Symbol semantic mapping. The current implementation has several technical debt items documented in the v4 Pending Improvements section of the Notion spec. This change applies all 5 improvements plus the v3 architecture refactors that were already documented but not yet implemented.

## Goals / Non-Goals

**Goals:**
- Apply all v3 + v4 improvements from Notion spec
- Auto-derive `provideCupIcons()` from `SF_SYMBOL_MAP` + `LUCIDE_ICONS`
- Add external SCSS consistent with cup-button pattern
- Add type-safe `LUCIDE_ICONS` map
- Add dev-mode warnings for unregistered icons
- Add missing SF Symbol mappings

**Non-Goals:**
- Add new icons beyond the documented ones
- Change the CupIcon component API surface
- Change consumer usage patterns

## Decisions

### D1: Auto-derived registration
`provideCupIcons()` reads `SF_SYMBOL_MAP` values, looks up each in `LUCIDE_ICONS`, and registers them. Adding an icon = 2 lines in mapping files.

### D2: External SCSS with @use
Use `styleUrl: './cup-icon.scss'` + `@use '../../../../tokens/src/lib/index' as t` — same pattern validated with cup-button.

### D3: ngDevMode dev warnings
Use Angular's `ngDevMode` global for runtime validation of icon registration. Zero cost in production.

## Risks / Trade-offs

- **Breaking existing icons**: None — all 55 icons remain registered. New mappings are additive.
- **SCSS path resolution**: Same `../../../../tokens/src/lib/index` path verified with cup-button.
