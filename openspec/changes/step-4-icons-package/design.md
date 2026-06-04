## Context

The `libs/icons/` package was generated in Step 2A as a publishable Angular library. It currently exports only `VERSION`. The design token package (Step 3, `@ngx-cupertino/tokens`) is complete and published.

Icons is Step 4 in the reorganized plan — before Core (Step 5) because:
1. Core services reference icons in their API
2. Phase 1 components use `icon` input extensively
3. Icons only depends on Tokens (simpler, independently testable)

## Goals / Non-Goals

**Goals:**
- Create `cup-icon` wrapper component using `@lucide/angular` with Cupertino styling
- Provide 55+ Lucide icons via `provideCupIcons()` global registration
- Map 60+ Apple SF Symbols to Lucide equivalents
- Support named sizes (sm=16, md=24, lg=32) and numeric px values
- Auto-detect `.fill` suffix for filled icon variants
- ARIA: decorative by default, standalone with `ariaLabel` input
- Follow Angular 2025 conventions: no `.component` suffix, Signals API, standalone

**Non-Goals:**
- No custom SVG rendering (delegated to Lucide)
- No animated icons
- No color palette per icon
- No lazy loading of individual icons

## Decisions

### 1. LucideIcon over individual icon components

**Decision**: Use `LucideIcon` dynamic component (`<svg lucideIcon="name">`) instead of per-icon components (`LucideHome`, `LucideSearch`, etc. in template).

**Rationale**: With 55+ icons and SF Symbol mapping, per-icon imports would bloat every component template. `LucideIcon` + `provideLucideIcons()` keeps templates clean and icons globally available. Verified via Context7: `@lucide/angular` supports this pattern.

### 2. File naming: `cup-icon.ts` (no `.component` suffix)

**Decision**: Component file is `cup-icon.ts`, not `cup-icon.component.ts`.

**Rationale**: Angular CLI `file-name-style-guide: '2025'` drops the `.component` suffix from component files. AGENTS.md already documents this convention. Context7 confirms modern Angular projects use this pattern.

### 3. `.fill` auto-detection via computed

**Decision**: `isFilled()` computed returns `this.fill() || this.name().endsWith('.fill')`. No separate `--cup-tint-*-dark` tokens.

**Rationale**: SF Symbols semantic API: `heart` = outline, `heart.fill` = filled. Consumer doesn't need to know Lucide internals. The mapping strips `.fill` before SF Symbol lookup.

### 4. SF Symbol mapping with fallback

**Decision**: `SF_SYMBOL_MAP[name] ?? SF_SYMBOL_MAP[cleanName] ?? cleanName` — triple fallback. SF Symbol → SF Symbol without `.fill` → raw name.

**Rationale**: Consumers can use SF Symbols (`house`), Lucide names directly (`home`), or custom registered names. The mapping is additive, not restrictive.

### 5. 1.75px default stroke width

**Decision**: `strokeWidth` default is 1.75, not Lucide's default of 2.

**Rationale**: Apple SF Symbols use 1.5-2px stroke. 1.75 matches the iOS 26 visual weight more closely than Lucide's stock 2.

### 6. Global registration via provider

**Decision**: Icons are registered once in `provideCupIcons()` and available everywhere via `LucideIcon`.

**Rationale**: Consumer calls `provideCupIcons()` in `app.config.ts` — one line. No per-component imports. Consistent with `provideCupertino()` pattern.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Lucide import names may not match exactly | Each import verified against `@lucide/angular` at implementation time. Context7 + `node_modules` check |
| 55+ icons increase bundle size | Tree-shaking: unused icons are removed. Lucide icons are ~1-2KB each |
| SF Symbol mapping may be incomplete | Fallback to raw name. Contributors can extend `SF_SYMBOL_MAP` |
| `:host` `line-height: 0` may affect layout | `display: inline-flex` + `flex-shrink: 0` keeps icon container stable |
