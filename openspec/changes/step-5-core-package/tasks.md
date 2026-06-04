## 1. Setup

- [x] 1.1 Install `@angular/cdk` via `bun add @angular/cdk`
- [x] 1.2 Update `libs/core/package.json` — add `exports.sass` field and sub-path exports for mixins/animations
- [x] 1.3 Update `libs/core/ng-package.json` — add `assets` for SCSS files (`src/_index.scss`, `src/lib/styles/**/*.scss`)
- [x] 1.4 Create directory structure: `constants/`, `providers/`, `services/`, `directives/`, `styles/`, `utils/`

## 2. Constants (`libs/core/src/lib/constants/`)

- [x] 2.1 Create `colors.ts` — `CupTints` with 13 entries (BLUE→BROWN), `as const`, export `CupTintName` type
- [x] 2.2 Create `sizes.ts` — `CupSizes` (SMALL/MEDIUM/LARGE), `as const`, export `CupSize` type
- [x] 2.3 Create `variants.ts` — `CupButtonVariants` (LIQUID_GLASS/TINTED/FILLED/PLAIN) + `CupCardVariants` (ELEVATED/OUTLINED/LIQUID_GLASS), `as const`, export `CupButtonVariant` and `CupCardVariant` types

## 3. Providers (`libs/core/src/lib/providers/`)

- [x] 3.1 Create `cupertino.provider.ts` — `CupConfig` interface with all optional fields (theme, tintColor, direction, defaults, a11y)
- [x] 3.2 Define `CUP_CONFIG` injection token
- [x] 3.3 Implement `provideCupertino(config?)` — return `makeEnvironmentProviders([...])` with `CUP_CONFIG`, services, and `provideEnvironmentInitializer()`
- [x] 3.4 Implement environment initializer: set theme, set tint (handle `CupTints` object → extract light variant), set dir=rtl if configured

## 4. Services (`libs/core/src/lib/services/`)

- [x] 4.1 Create `theme.service.ts` — `ThemeService` (`providedIn: 'root'`), signals: `theme`, `isDark`, `currentTint`
- [x] 4.2 Implement `setTheme(light|dark|auto)` — set dataset attribute, handle auto via matchMedia listener
- [x] 4.3 Implement `toggle()` — switch light↔dark
- [x] 4.4 Implement `setTint(color)` — derive `--cup-tint`, `--cup-tint-subtle` (15% alpha), `--cup-tint-container` (12% alpha), `--cup-tint-on` (contrast), set dataset, update currentTint signal
- [x] 4.5 Implement private helpers: `toAlpha(hex, a)`, `contrastColor(hex)`
- [x] 4.6 Create `breakpoint.service.ts` — `BreakpointService` (`providedIn: 'root'`), signals: `isMobile`, `isTablet`, `isDesktop`, `isCompact` (computed), `hasHover`, `hasTouch`. Use `@angular/cdk/layout` BreakpointObserver
- [x] 4.7 Create `config.service.ts` — `CupConfigService` (`providedIn: 'root'`), `config` signal from injected `CUP_CONFIG`

## 5. Directives (`libs/core/src/lib/directives/`)

- [x] 5.1 Create `liquid-glass.directive.ts` — `[cupLiquidGlass]` standalone directive, OnPush, host bindings for backdrop-filter/blur/saturate/background/border. Accept variant input for regular/clear/prominent
- [x] 5.2 Create `ripple.directive.ts` — `[cupRipple]` standalone directive, OnPush. HostListener for click → create ripple animation span
- [x] 5.3 Create `rtl.directive.ts` — `[cupRtl]` standalone directive, OnPush. Apply direction:rtl and logical property adjustments

## 6. SCSS (`libs/core/src/lib/styles/`)

- [x] 6.1 Create `_mixins.scss` — `cup-liquid-glass($variant)`, `cup-text($style)`
- [x] 6.2 Create `_functions.scss` — SCSS helper functions (placeholder for future use)
- [x] 6.3 Create `_animations.scss` — `@keyframes` for slide-up/down, fade-in/out, scale-in/out + utility classes + reduced-motion media query
- [x] 6.4 Create `src/_index.scss` SCSS barrel — `@forward` all three partials

## 7. Utils (`libs/core/src/lib/utils/`)

- [x] 7.1 Create `base-cva.ts` — `CupFormControl<T>` abstract class with `@Directive()`, implements `ControlValueAccessor`, signal-based `value`/`disabled`, onChange/onTouched callbacks
- [x] 7.2 Create `id-generator.ts` — `generateId(prefix?: string)` with global counter
- [x] 7.3 Create `a11y.ts` — accessibility helper utilities (placeholder for future use)

## 8. Entry Point (`libs/core/src/index.ts`)

- [x] 8.1 Replace stub with full barrel exports: all constants, types, functions, services, directives, provideCupertino, CupConfig, CUP_CONFIG, CupFormControl, generateId

## 9. Final Verification

- [x] 9.1 Run `bun nx build core` — build succeeds
- [x] 9.2 Run `bun biome check --write libs/core/` — formatting clean
- [ ] 9.3 Commit with conventional commit message including emoji
