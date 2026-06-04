## 1. App Configuration

- [ ] 1.1 Update `app.config.ts` — add `provideCupertino({ theme: "auto" })`, `provideCupIcons()`, `provideRouter(appRoutes)`
- [ ] 1.2 Write `app.routes.ts` — 7 lazy-loaded routes (home, button, toggle, text-field, slider, stepper, progress)
- [ ] 1.3 Update `styles.scss` — global reset with font-family, background, dark mode support

## 2. Root Component

- [ ] 2.1 Update `app.ts` — inject `ThemeService`, expose `isDark` signal, add `toggleTheme()` method
- [ ] 2.2 Update `app.html` — sidebar layout with navigation links and theme toggle button
- [ ] 2.3 Update `app.scss` — sidebar (240px), main content area, link styles, active state

## 3. Demo Pages

- [ ] 3.1 Create `home-page.ts` — welcome page with links to all component demos
- [ ] 3.2 Create `button-page.ts` — variants (4), sizes (3), states (disabled, loading), with icon
- [ ] 3.3 Create `toggle-page.ts` — default, with label, checked state, disabled
- [ ] 3.4 Create `text-field-page.ts` — placeholder, label, clearable, prefixIcon, type
- [ ] 3.5 Create `slider-page.ts` — default, custom range, disabled
- [ ] 3.6 Create `stepper-page.ts` — default, custom step, without buttons
- [ ] 3.7 Create `progress-page.ts` — linear, circular, with label

## 4. Verification

- [ ] 4.1 Run `bun nx build playground` — build succeeds
- [ ] 4.2 Run `bun biome check --write apps/playground/` — formatting clean
- [ ] 4.3 Commit with conventional commit message including emoji
