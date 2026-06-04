## ADDED Requirements

### Requirement: App config provides core providers

The `apps/playground/src/app/app.config.ts` file SHALL configure `provideCupertino({ theme: "auto" })`, `provideCupIcons()`, and `provideRouter(appRoutes)`.

#### Scenario: Providers are configured

- **WHEN** reading `app.config.ts`
- **THEN** it imports and calls `provideCupertino`, `provideCupIcons`, and `provideRouter`

### Requirement: Routes are lazy-loaded

The `apps/playground/src/app/app.routes.ts` file SHALL define 7 routes, each using `loadComponent` with dynamic imports.

#### Scenario: Home route exists

- **WHEN** navigating to `/`
- **THEN** the HomePage component is lazy-loaded and rendered

#### Scenario: Component routes exist

- **WHEN** navigating to `/button`, `/toggle`, `/text-field`, `/slider`, `/stepper`, `/progress`
- **THEN** the corresponding demo page component is lazy-loaded and rendered

### Requirement: Root component has sidebar layout

The `App` component SHALL render a sidebar with navigation links and a dark mode toggle button, plus a `<router-outlet>` for page content.

#### Scenario: Sidebar renders navigation

- **WHEN** the app loads
- **THEN** a sidebar with links to Home, Button, Toggle, TextField, Slider, Stepper, and Progress is visible
- **THEN** clicking a link navigates to the corresponding route

#### Scenario: Dark mode toggle works

- **WHEN** clicking the theme toggle button
- **THEN** `ThemeService.toggle()` is called and the UI updates

### Requirement: Each demo page shows component variants

Every demo page SHALL render its component with at least: all variants, all sizes, and disabled/loading states where applicable.

#### Scenario: Button page shows all variants

- **WHEN** navigating to `/button`
- **THEN** buttons with `filled`, `tinted`, `liquid-glass`, and `plain` variants are rendered

#### Scenario: Progress page shows linear and circular

- **WHEN** navigating to `/progress`
- **THEN** both linear and circular progress indicators are rendered

### Requirement: Build succeeds

The playground SHALL build successfully with `bun nx build playground`.

#### Scenario: Build passes

- **WHEN** running `bun nx build playground`
- **THEN** the build completes without errors
