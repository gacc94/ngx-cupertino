## Why

Phase 1 components (Button, Toggle, TextField, Slider, Stepper, Progress) are implemented and tested at the unit level. A visual playground app is needed to validate them end-to-end in a browser, verify dark mode, test interactive states, and serve as a live component catalog for development and QA.

## What Changes

- **Configure `apps/playground/`** as a standalone Angular SPA showcasing all 6 Phase 1 components
- **`app.config.ts`** — `provideCupertino({ theme: "auto" })` + `provideCupIcons()` + `provideRouter()`
- **`app.routes.ts`** — 7 lazy-loaded routes (home + button + toggle + text-field + slider + stepper + progress)
- **Root component** — Sidebar layout with dark mode toggle via `ThemeService`
- **7 demo pages** — One per component showing all variants, sizes, and states
- **Global styles** — CSS custom properties for light/dark, font reset

## Capabilities

### New Capabilities

- `playground-app`: Angular SPA at `apps/playground/` with sidebar navigation, 7 lazy-loaded routes, dark mode toggle, live component demos

### Modified Capabilities

None — new application.

## Impact

- **New files**: 9 (app config, routes, root component + template + SCSS, global styles, 7 page components)
- **Modified files**: `apps/playground/src/styles.scss` (existing stub), `apps/playground/src/app/app.config.ts` (existing stub), `apps/playground/src/app/app.routes.ts` (existing stub)
- **Dependencies**: `@ngx-cupertino/ui`, `@ngx-cupertino/core`, `@ngx-cupertino/icons`
- **Breaking**: None. Existing playground is empty scaffold.
