## Context

`apps/playground/` exists as an Nx-scaffolded Angular application with an empty `app.config.ts`, `app.routes.ts`, and stub `App` component. It has a `styles.scss` and uses `@angular/build:application` builder. The purpose is to validate Phase 1 components visually.

## Goals / Non-Goals

**Goals:**
- Sidebar layout with navigation to 7 demo pages
- Dark mode toggle via `ThemeService` from `@ngx-cupertino/core`
- Lazy-loaded routes for each component demo
- Each demo page shows all variants, sizes, and states
- Global styles with CSS custom properties for light/dark

**Non-Goals:**
- No interactive state controls (forms, inputs for values)
- No Storybook integration
- No deployment configuration beyond `bun nx serve playground`
- No unit tests for the playground itself

## Decisions

### 1. Lazy-loaded routes

**Decision**: Each demo page is a standalone component loaded via `loadComponent` in routes.

**Rationale**: Angular 21 best practice. Each component demo is independent — lazy loading avoids loading all component code upfront. Matches the pattern documented in the Step 7 Notion spec.

### 2. Sidebar layout with RouterModule

**Decision**: Root component uses `RouterModule` for `<router-outlet>` and `<a routerLink>` for navigation.

**Rationale**: Standard Angular SPA pattern. Sidebar provides persistent navigation. `routerLinkActive` highlights the current page.

### 3. Dark mode via ThemeService

**Decision**: Root component injects `ThemeService` from `@ngx-cupertino/core` and calls `toggle()` on button click. `isDark` signal controls the UI label.

**Rationale**: `ThemeService` was built for this purpose. It sets `data-theme` attribute and CSS custom properties on `<html>`. No need to reimplement theme logic.

### 4. Demo pages as simple templates

**Decision**: Each demo page is a standalone component with inline template showing the component's variants, sizes, and states. No interactivity beyond what the component provides natively.

**Rationale**: Playground is for visual validation, not interactive testing. Static demos are sufficient and simpler to maintain.

### 5. Global styles with hardcoded fallbacks

**Decision**: `styles.scss` uses hardcoded CSS values (not `@use` imports) for `html, body` base styles. Components use the design token mixins from core.

**Rationale**: SCSS `@use` imports require the packages to be built first, adding complexity. The playground's global styles are minimal — just font reset and background color. Component styles use the proper mixin-based approach.

## Risks / Trade-offs

- **No token imports in global styles**: Global styles won't inherit token changes. Mitigation: minimal global styles (only `font-family` and `background`). Component-specific styles use proper token mixins.
- **Hardcoded demo values**: Demo pages use hardcoded variant/size/state values. Mitigation: this is intentional — the playground showcases static component states, not interactive controls.
