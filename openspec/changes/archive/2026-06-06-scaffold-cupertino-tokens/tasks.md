## 1. Utilities Layer (loaded first)

- [x] 1.1 Create `_functions.scss` with cup-rem($px), cup-space($level), cup-z($name) functions with compile-time validation
- [x] 1.2 Create `_api.scss` with full `$tokens` map (~236 entries from 17 source files) and `token($name)` validation function with `@error`
- [x] 1.3 Create `_mixins.scss` with 21 mixins: Glass (5), Interaction (3), Transitions (4), Text (2), Accessibility (1), Layout (6)

## 2. Primitives Layer

- [x] 2.1 Create `_colors.scss` — 12 system accent colors + 6 gray levels in :root (iOS light defaults)
- [x] 2.2 Create `_typography.scss` — 5 font stacks, 11 Dynamic Type sizes, 4 weights, 3 line-heights, 3 tracking, font-scale
- [x] 2.3 Create `_spacing.scss` — 8 grid levels (4→40px) + 13 semantic spacing aliases
- [x] 2.4 Create `_sizing.scss` — 3 touch targets, 6 control heights, 6 nav chrome, 12 layout dimensions
- [x] 2.5 Create `_radius.scss` — 8 primitive radii + 18 semantic aliases (button=pill on iOS)
- [x] 2.6 Create `_borders.scss` — 5 border widths (0.33→3px) + 6 border colors + retina hairline progressive enhancement
- [x] 2.7 Create `_opacity.scss` — 4 interaction states + 4 overlays + tab-inactive constant

## 3. Semantic Layer

- [x] 3.1 Create `_scheme.scss` — 28 semantic color assignments: labels (4), vibrant labels (4), fills (4), vibrant fills (4), backgrounds (6), separators (2), link, placeholder, text-dark, text-light
- [x] 3.2 Create `_tints.scss` — 13 tint presets via [data-tint] × 4 derived tokens + fallback + dark mode overrides + HC overrides (212 declarations)
- [x] 3.3 Create `_elevation.scss` — 4 shadow levels (sm/md/lg/xl) + shadow-color
- [x] 3.4 Create `_glass.scss` — Liquid Glass Regular (sm/md/lg × 4 properties), Clear (4 properties), inset highlight (17 tokens)
- [x] 3.5 Create `_materials.scss` — 5 system blur thickness levels + 5 blur values + 2 scroll edge dimensions
- [x] 3.6 Create `_motion.scss` — 4 durations (100→500ms) + 6 easing curves (default, in, out, in-out, spring, ios)
- [x] 3.7 Create `_z-index.scss` — 8 stacking levels (base 0 → toast 700) with 100-point increments

## 4. Overrides Layer

- [x] 4.1 Create `_dark.scss` — ~72 overrides under [data-mode="dark"] from _colors (18), _scheme (26), _elevation (4), _glass (13), _materials (5), _borders (2), _opacity (4)
- [x] 4.2 Create `_platform.scss` — ~147 macOS overrides across 4 blocks (light, dark, HC light, HC dark) + 17 macOS-exclusive tokens under @media (hover+pointer)
- [x] 4.3 Create `_a11y.scss` — ~115 overrides across 3 queries: prefers-contrast (HC light + dark), prefers-reduced-motion, prefers-reduced-transparency (glass + materials)

## 5. Layout Layer

- [x] 5.1 Create `_breakpoints.scss` — 3 SCSS variables ($sm: 428px, $md: 768px, $lg: 1024px) + 6 media query mixins
- [x] 5.2 Create `_grid.scss` — 6 CSS tokens (columns, gutter, margin, 3 max-widths) with tablet + desktop overrides + 4 layout mixins
- [x] 5.3 Create `_safe-areas.scss` — 4 env() insets + 3 home indicator dimensions + 4 safe area mixins

## 6. Entry Points

- [x] 6.1 Create `lib/_index.scss` — @forward all 22 files in correct cascade order (Utilities → Primitives → Semantic → Layout → Overrides → Mixins)
- [x] 6.2 Create `src/index.scss` — Sass entry point that re-exports the library public API

## 7. Internal Documentation

- [x] 7.1 Create `ARCHITECTURE.md` at `libs/tokens/` — file tree with token counts, 5-layer explanation, cascade order explanation
- [x] 7.2 Add Mermaid cascade flow diagram to ARCHITECTURE.md
- [x] 7.3 Add Mermaid file dependency diagram to ARCHITECTURE.md
- [x] 7.4 Add component consumption guide (3-layer SCSS pattern) to ARCHITECTURE.md
- [x] 7.5 Add maintenance rules (when to update _api.scss) to ARCHITECTURE.md

## 8. Validation

- [x] 8.1 Verify `_api.scss` $tokens map has all ~236 entries from all 17 source files
- [x] 8.2 Verify `_index.scss` @forward order matches the cascade sequence
- [x] 8.3 Verify all CSS custom property values match Notion documentation
- [x] 8.4 Run `bun nx build tokens` to verify SCSS compilation succeeds
- [x] 8.5 Spot-check dark mode, macOS, and HC cascade by verifying CSS custom property overrides compile correctly
