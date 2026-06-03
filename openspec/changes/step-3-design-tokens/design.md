## Context

The `libs/tokens/` package was generated in Step 2A as a publishable Angular library with Vitest. Currently it only exports `VERSION = '0.0.1'` from `src/index.ts` and has an empty `src/lib/` directory. The `ng-package.json` is configured but has no SCSS assets.

This is the first implementation step after the Foundation phase. Design tokens are the base layer — every component (Steps 7-10), the core package (Step 4), and the icons package (Step 5) depend on CSS custom properties from `@ngx-cupertino/tokens`.

All token values are validated against the iOS/iPadOS 26 Figma design kit and follow the same architectural pattern as Angular Material's theming system: partials → `@forward` barrel → consumer `@use`.

## Goals / Non-Goals

**Goals:**
- Create 100+ CSS custom properties under `--cup-` namespace organized in 8 SCSS partials
- Follow Angular Material's SCSS partial architecture (`_colors`, `_typography`, etc.)
- Support light/dark themes via `prefers-color-scheme` media query + `.cup-dark` manual toggle
- Single source of truth: light defaults in partial, dark overrides only in `_themes.scss`
- Responsive platform sizing for iOS/touch vs macOS/desktop via `(hover: hover) and (pointer: fine)`
- Expose SCSS partials as package assets so consumers can `@use '@ngx-cupertino/tokens'`

**Non-Goals:**
- No runtime JavaScript token access (theme service comes in Step 4)
- No dynamic theme switching at runtime (Step 4)
- No CSS-in-JS or CSS Modules (SCSS only)
- No token validation at build time (TypeScript types for tokens may come later)
- No per-component theme overrides (component-level theming comes in Steps 7-10)

## Decisions

### 1. SCSS partials with `@forward` barrel

**Decision**: Use 8 SCSS partials in `src/lib/` with an `index.scss` barrel using `@forward`.

**Rationale**: Angular Material uses this pattern. `@forward` makes all variables available to consumers via a single `@use` while allowing internal organization. Each partial has a single responsibility.

**Alternatives considered**:
- Single monolithic `_tokens.scss`: Harder to maintain, navigate, and review. Rejected.
- CSS file with `:root {}`: No Sass features (variables, mixins). Rejected.

### 2. Light defaults + dark overrides (no duplicate values)

**Decision**: Each partial defines light values in `:root`. `_themes.scss` ONLY overrides dark values. Never define the same token in two places.

**Rationale**: Single source of truth prevents drift between light and dark values. When a token is added/modified, only one place changes. Angular Material follows the same pattern with `light-dark()`.

**Example:**
```scss
// _colors.scss — single source of truth for light
:root { --cup-label: rgba(60,60,67,1.0); }

// _themes.scss — only dark overrides
@media (prefers-color-scheme: dark) {
    :root { --cup-label: rgba(235,235,245,1.0); }
}
```

### 3. CSS custom properties over Sass variables

**Decision**: Use CSS custom properties (`--cup-*`) exclusively. No Sass variables (`$cup-*`).

**Rationale**: CSS custom properties are runtime-changeable (theme switching), cascade naturally, and work with Angular's `host:` style bindings. Sass variables are compile-time only. Angular Material uses `--mat-sys-*` and `--mat-*` CSS custom properties exclusively.

### 4. Token naming convention: `--cup-{category}-{property}`

**Decision**: All tokens follow `--cup-{category}-{descriptor}` pattern.

**Rationale**: Consistent prefix (`cup-`) aligns with component selectors (`cup-button`). Category groups tokens logically. Angular Material uses `--mat-sys-{role}`, PrimeNG uses `--p-{category}-{property}`.

### 5. Liquid Glass: CSS approximation with 3 Apple variants

**Decision**: Use `backdrop-filter: blur() saturate()` + translucent `background` + subtle `border` for 3 Apple glass levels.

**Rationale**: Native Liquid Glass (SwiftUI) uses GPU-accelerated lensing, specular highlights, and morphing — these are impossible in CSS. The web community's best approximation uses `backdrop-filter`. Apple defines 3 explicit variants (regular, clear, prominent) which map to different `rgba()` opacities.

**Limitations**: No light refraction, no adaptive color blending, no element morphing.

### 6. Platform sizing via CSS media query

**Decision**: Use `@media (hover: hover) and (pointer: fine)` to detect desktop/mouse vs mobile/touch for control sizes.

**Rationale**: No JavaScript, no UA sniffing. CSS-only detection works on all modern browsers. Tokens auto-adapt: mobile gets 44px touch targets, desktop gets compact 28px. Same approach as `prefers-color-scheme` for theming.

### 7. Z-index scale: 8 explicit layers

**Decision**: Define `--cup-z-{layer}` tokens from 0 to 1070, each with a specific purpose.

**Rationale**: Without explicit layer definitions, overlays randomly stack. Angular Material CDK uses a z-index management system. Each layer has a defined purpose: dropdown (1000) → sticky (1020) → fixed (1030) → offcanvas (1040) → modal (1050) → popover (1060) → notification (1070).

### 8. Tints auto-switch via theme (Option B)

**Decision**: Tint values switch light/dark via theme, not separate tokens. Components use `var(--cup-tint-blue)` and the theme handles the rest.

**Rationale**: Consistent with how all other tokens work. Option A (separate `--cup-tint-blue-dark` token) would force every component to know the current theme. Option B is zero-effort for component authors.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| 100+ tokens may be too many for initial setup | Tokens are organized in 8 purpose-specific partials. Only the ones components need will be imported |
| CSS custom properties don't work in IE11 | Angular 19+ drops IE support. All modern browsers support CSS custom properties |
| `backdrop-filter` performance on low-end devices | Fallback: glass elements default to opaque backgrounds on devices without backdrop-filter support |
| Dark mode values differ from Figma on some tokens | `_themes.scss` is a single file with all dark overrides — easy to audit and correct |
| Scalability of token count | Naming convention and folder structure allow adding new tokens without refactoring existing ones |
