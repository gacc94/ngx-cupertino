# core-providers Specification

## Purpose
TBD - created by archiving change step-5-core-package. Update Purpose after archive.
## Requirements
### Requirement: CupConfig interface is defined

The `libs/core/src/lib/providers/cupertino.provider.ts` file SHALL export a `CupConfig` interface with optional fields for theme, tintColor, direction, defaults (button, notification, drawer, dialog), and a11y settings.

#### Scenario: CupConfig has all optional fields

- **WHEN** reading `cupertino.provider.ts`
- **THEN** `CupConfig` includes: `theme?: 'light' | 'dark' | 'auto'`
- **THEN** `tintColor?: CupTintName | string | { light: string; dark: string }`
- **THEN** `direction?: 'ltr' | 'rtl'`
- **THEN** `defaults?: { button?, notification?, drawer?, dialog? }`
- **THEN** `a11y?: { reducedMotion?, focusRing?, minTouchTarget? }`

### Requirement: CUP_CONFIG injection token is defined

The provider file SHALL export a `CUP_CONFIG` injection token typed as `InjectionToken<CupConfig>`.

#### Scenario: Token is injectable

- **WHEN** injecting `CUP_CONFIG` in a service or component via `inject(CUP_CONFIG)`
- **THEN** it returns the `CupConfig` object passed to `provideCupertino()`, or `{}` if none provided

### Requirement: provideCupertino function is exported

The provider file SHALL export `provideCupertino(config?: CupConfig): EnvironmentProviders`.

#### Scenario: Function provides all infrastructure

- **WHEN** calling `provideCupertino()`
- **THEN** it returns `EnvironmentProviders` containing `CUP_CONFIG` provider, `ThemeService`, `BreakpointService`, `CupConfigService`, and an environment initializer

### Requirement: Environment initializer sets theme from config

The `provideEnvironmentInitializer()` inside `provideCupertino()` SHALL call `ThemeService.setTheme()` if `config.theme` is provided.

#### Scenario: Theme auto resolves to light for initial state

- **WHEN** config has `{ theme: 'auto' }`
- **THEN** `ThemeService.setTheme('auto')` is called during initialization

#### Scenario: Theme light is applied directly

- **WHEN** config has `{ theme: 'light' }`
- **THEN** `ThemeService.setTheme('light')` is called during initialization

### Requirement: Environment initializer sets tint from config

The initializer SHALL call `ThemeService.setTint()` if `config.tintColor` is provided.

#### Scenario: String tint is applied

- **WHEN** config has `{ tintColor: '#007AFF' }`
- **THEN** `ThemeService.setTint('#007AFF')` is called

#### Scenario: CupTints object tint applies light variant

- **WHEN** config has `{ tintColor: CupTints.INDIGO }` (which is `{ light: '#5856D6', dark: '#5E5CE6' }`)
- **THEN** `ThemeService.setTint('#5856D6')` is called with the light variant

### Requirement: Environment initializer sets RTL direction

If `config.direction === 'rtl'`, the initializer SHALL set `document.documentElement.setAttribute('dir', 'rtl')`.

#### Scenario: RTL is configured

- **WHEN** config has `{ direction: 'rtl' }`
- **THEN** `<html dir="rtl">` is set during initialization

#### Scenario: LTR is default, no attribute set

- **WHEN** config has `{ direction: 'ltr' }` or omits direction
- **THEN** no `dir` attribute is set on `<html>`

