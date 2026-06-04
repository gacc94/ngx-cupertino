# core-services Specification

## Purpose
TBD - created by archiving change step-5-core-package. Update Purpose after archive.
## Requirements
### Requirement: ThemeService is provided in root

The `libs/core/src/lib/services/theme.service.ts` file SHALL export `ThemeService` as an `@Injectable({ providedIn: 'root' })` class.

#### Scenario: Service is a singleton

- **WHEN** injecting `ThemeService` in any component or service
- **THEN** it returns the same instance throughout the app

### Requirement: ThemeService has reactive theme state

The service SHALL expose `theme` as `signal<'light' | 'dark'>`, `isDark` as `computed<boolean>`, and `currentTint` as `signal<string>`.

#### Scenario: Initial theme is light

- **WHEN** `ThemeService` is instantiated
- **THEN** `theme()` returns `'light'` and `isDark()` returns `false`

#### Scenario: Setting theme updates signal

- **WHEN** calling `setTheme('dark')`
- **THEN** `theme()` returns `'dark'` and `isDark()` returns `true`

### Requirement: setTheme supports auto mode

The `setTheme(theme: 'light' | 'dark' | 'auto')` method SHALL use `window.matchMedia('(prefers-color-scheme: dark)')` when `theme` is `'auto'`, and listen for changes via `addEventListener`.

#### Scenario: Auto respects system preference

- **WHEN** calling `setTheme('auto')` and system preference is dark
- **THEN** `theme()` returns `'dark'`

#### Scenario: Auto updates on system change

- **WHEN** `setTheme('auto')` is active and system preference changes
- **THEN** `theme()` signal updates to match the new preference

### Requirement: toggle switches between light and dark

The `toggle()` method SHALL switch `theme` from `'light'` to `'dark'` or vice versa.

#### Scenario: Toggle from light to dark

- **WHEN** current theme is `'light'` and `toggle()` is called
- **THEN** `theme()` returns `'dark'`

### Requirement: setTheme sets data-theme attribute on html

When `setTheme()` is called, the method SHALL set `document.documentElement.dataset['theme']` to the resolved theme value.

#### Scenario: Theme attribute after setTheme

- **WHEN** calling `setTheme('dark')`
- **THEN** `<html data-theme="dark">` is set on the document

### Requirement: setTint derives CSS custom properties

The `setTint(color: string)` method SHALL set `--cup-tint`, `--cup-tint-subtle` (15% alpha), `--cup-tint-container` (12% alpha), and `--cup-tint-on` (contrast color, black or white) on `document.documentElement.style`. It SHALL also set `dataset['tint']` and update the `currentTint` signal.

#### Scenario: Tint CSS variables are set

- **WHEN** calling `setTint('#FF9500')`
- **THEN** `--cup-tint` is `#FF9500`
- **THEN** `--cup-tint-subtle` is `rgba(255,149,0,0.15)`
- **THEN** `--cup-tint-container` is `rgba(255,149,0,0.12)`
- **THEN** `--cup-tint-on` is `#000000` (dark text on orange)
- **THEN** `currentTint()` returns `'#FF9500'`
- **THEN** `<html data-tint="#FF9500">` is set

#### Scenario: Contrast color is white for dark tints

- **WHEN** calling `setTint('#007AFF')` (blue)
- **THEN** `--cup-tint-on` is `#FFFFFF`

### Requirement: BreakpointService has signal-based breakpoints

The `libs/core/src/lib/services/breakpoint.service.ts` file SHALL export `BreakpointService` with signals `isMobile`, `isTablet`, `isDesktop` (all `signal<boolean>`), and computed `isCompact` for mobile OR tablet. It SHALL also have `hasHover` and `hasTouch` signals.

#### Scenario: Breakpoints from CDK BreakpointObserver

- **WHEN** viewport width is below 768px
- **THEN** `isMobile()` returns `true` and `isCompact()` returns `true`
- **WHEN** viewport width is between 768px and 1024px
- **THEN** `isTablet()` returns `true` and `isCompact()` returns `true`
- **WHEN** viewport width is above 1024px
- **THEN** `isDesktop()` returns `true` and `isCompact()` returns `false`

### Requirement: CupConfigService exposes config as signal

The `libs/core/src/lib/services/config.service.ts` file SHALL export `CupConfigService` with a `config` signal that returns the injected `CUP_CONFIG` value.

#### Scenario: Config signal reflects injected config

- **WHEN** `provideCupertino({ theme: 'dark' })` is used and `CupConfigService` is injected
- **THEN** `config()` returns an object with `{ theme: 'dark' }`

