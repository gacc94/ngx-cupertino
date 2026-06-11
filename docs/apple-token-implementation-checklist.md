# Apple Token Implementation Checklist

Branch: `feat/apple-token-implementation-checklist`

Purpose: turn the tokens/core audit into an executable implementation checklist for Apple-style iOS, iPadOS, and macOS support. This document is updated as implementation progresses.

## Design Contract

- [x] Use `@ngx-cupertino/tokens/src/lib/_api.scss` as the canonical Sass token contract.
- [x] Treat `_index.scss` as the aggregate public Sass entrypoint.
- [x] Keep iOS/iPadOS as the touch-first baseline in `:root` tokens.
- [x] Keep macOS/desktop compact behavior behind `@media (hover: hover) and (pointer: fine)` in `_platform.scss`.
- [x] Preserve runtime theme switching through CSS custom properties instead of Sass-only values.
- [x] Prefer Layer 3 component mixins when available, Layer 2 generic mixins when available, and Layer 1 `t.token()` only when a direct token is required.
- [x] Add missing public Sass package exports for every supported token module.
- [x] Replace stale core Sass references with validated `t.token()` names.
- [x] Replace stale Liquid Glass directive CSS variables with current glass/material tokens.
- [x] Remove hard package coupling from `@ngx-cupertino/core` to `@ngx-cupertino/icons`.

## Apple Platform Token Coverage

- [x] iOS/iPadOS baseline colors: semantic labels, fills, grouped backgrounds, separators, links, tint surfaces.
- [x] iOS/iPadOS baseline typography: SF Pro family stack, Dynamic Type-inspired text levels, weights, leading, tracking.
- [x] iOS/iPadOS baseline spacing: touch-first padding, control height, cells, navigation bars, tab bars, safe areas.
- [x] iOS/iPadOS baseline controls: toggle dimensions, slider thumb radius, full touch targets.
- [x] iOS/iPadOS baseline materials: blur/saturation material tokens and Liquid Glass levels.
- [x] macOS overrides: compact control sizes, compact typography, pointer-friendly target sizing.
- [x] macOS overrides: desktop semantic color adjustments and window/control tokens.
- [x] macOS exports: ensure platform, material, glass, window, focus, and grid modules are independently importable.
- [x] Component API: ensure shared component mixins adapt through tokens rather than hard-coded platform branches.

## Phase P0: Public API And Build Safety

- [x] `libs/tokens/package.json`: export all Sass modules forwarded by `src/lib/_index.scss`.
- [x] `libs/core/src/lib/styles/_mixins.scss`: rewrite `cup-liquid-glass()` against current glass tokens.
- [x] `libs/core/src/lib/styles/_mixins.scss`: rewrite `cup-text()` against current typography tokens.
- [x] `libs/core/src/lib/styles/_component-api.scss`: replace invalid token names with current `_api.scss` keys.
- [x] `libs/core/src/lib/styles/_animations.scss`: replace stale motion variables with current motion tokens.
- [x] `libs/core/src/lib/directives/liquid-glass.directive.ts`: use host bindings with current Liquid Glass CSS variables.
- [x] `libs/core/src/lib/providers/cupertino.provider.ts`: stop importing `provideCupIcons()` from core provider.
- [x] `libs/core/src/index.ts`: export any new provider helper only if needed. No new helper was required.

## Phase P1: Component Mixins

- [x] Button mixins use `padding-button`, `radius-button`, `font-sans`, `text-body`, `weight-semibold`, `tint`, `tint-on`, and Liquid Glass mixins.
- [x] Toggle mixins use `toggle-width`, `toggle-height`, `toggle-padding`, `toggle-thumb`, `radius-toggle`, and semantic fill/tint tokens.
- [x] Text field mixins use `padding-input`, `radius-input`, `border-color-input`, `text-body`, `placeholder`, `label`, and focus tokens.
- [x] Slider mixins use logical positioning, `tint`, semantic fill tokens, `radius-slider-thumb`, and `shadow-md`.
- [x] Progress mixins use semantic fill tokens, `tint`, `duration-fast`, and `ease-default`.
- [x] Shared state mixins use `opacity-disabled`, `opacity-hover`, `opacity-pressed`, `duration-fast`, and `ease-default`.

## Phase P2: Verification And Documentation

- [x] Build `tokens` with `bun nx build tokens`.
- [x] Build `core` with `bun nx build core`.
- [x] Run affected tests with `bun nx test core` where available.
- [x] Run style/build checks for `ui` if core Sass changes affect component consumers.
- [x] Build `playground` to verify explicit icon providers in the app shell.
- [x] Build Storybook to verify explicit icon providers in Storybook preview.
- [x] Update this checklist with completed implementation details.
- [x] Review `git diff` to ensure only intended files changed.

## Phase P3: Core API Tightening

- [x] Normalize the public tint contract so runtime names match actual usage (`blue`, `green`, `indigo`, etc.).
- [x] Support typed tint inputs in `ThemeService` and `CupConfig`: named tint, custom hex, and explicit light/dark tint pairs.
- [x] Tighten `CupConfig` so button defaults use `CupButtonVariant` and `CupComponentSize` instead of loose strings.
- [x] Remove unsupported config branches (`notification`, `drawer`, `dialog`) from the public `CupConfig` surface.
- [x] Evolve `CupConfigService` from a thin wrapper into a typed config facade with selectors and nested updates.
- [x] Make `BreakpointService.hasHover` and `hasTouch` reactive signals instead of static constructor snapshots.
- [x] Remove stale duplicate `libs/core/src/lib/types/component.types.ts`.
- [x] Keep `CupFormControl` as the reusable CVA base and validate it with real tests.

## Phase P4: Thin Surface Cleanup And Test Coverage

- [x] Add the missing `.cup-ripple-effect` styling contract so `RippleDirective` has matching CSS behavior.
- [x] Replace the placeholder `core.spec.ts` with behavioral coverage for `ThemeService`.
- [x] Replace the placeholder `core.spec.ts` with behavioral coverage for `provideCupertino()` initialization.
- [x] Replace the placeholder `core.spec.ts` with behavioral coverage for `BreakpointService`.
- [x] Replace the placeholder `core.spec.ts` with behavioral coverage for `CupConfigService`.
- [x] Replace the placeholder `core.spec.ts` with behavioral coverage for `CupFormControl`.
- [x] Replace the placeholder `core.spec.ts` with behavioral coverage for `LiquidGlassDirective`.

## Implementation Log

- [x] 2026-06-11: Created this checklist from `main` on `feat/apple-token-implementation-checklist`.
- [x] 2026-06-11: Exported missing token Sass modules: `api`, `functions`, `sizing`, `borders`, `opacity`, `scheme`, `glass`, `materials`, `z-index`, `breakpoints`, `grid`, `safe-areas`, `dark`, `platform`, `a11y`, and `mixins`.
- [x] 2026-06-11: Rewrote core Liquid Glass Sass and directive host bindings to current glass tokens.
- [x] 2026-06-11: Rewrote component API mixins to use valid token keys from `_api.scss`.
- [x] 2026-06-11: Rewrote core animation helpers to use `duration-*` and `ease-*` tokens.
- [x] 2026-06-11: Removed the `@ngx-cupertino/core` import dependency on `@ngx-cupertino/icons`; playground and Storybook now provide icons explicitly.
- [x] 2026-06-11: Corrected published Sass export paths to match `ng-packagr` asset output under `src/`.
- [x] 2026-06-11: Verified with `bun nx build tokens --skipNxCache`, `bun nx build core --skipNxCache`, `bun nx test core --skipNxCache`, `bun nx build icons --skipNxCache`, `bun nx build ui --skipNxCache`, `bun nx build playground --skipNxCache`, and `bun nx build-storybook ui --skipNxCache`.
- [x] 2026-06-11: Reviewed `git status --short --branch` and `git diff --stat`; changed files are limited to tokens/core provider/style API, explicit consumer icon providers, Storybook preview, and this checklist. `docs/apple-ds-evaluation.md` remains an unrelated pre-existing untracked file.
- [x] 2026-06-11: Tightened `CupConfig`, exported typed tint/config primitives, and aligned tint names with the real runtime contract (`blue`, `green`, etc.).
- [x] 2026-06-11: Upgraded `ThemeService` to support named tints, custom hex tints, and explicit light/dark tint pairs that reapply correctly on theme changes.
- [x] 2026-06-11: Upgraded `CupConfigService` into a real typed facade with selectors (`theme`, `tintColor`, `direction`, `buttonDefaults`, `a11y`) and nested updates.
- [x] 2026-06-11: Made `BreakpointService` capability flags reactive and removed the stale duplicate `component.types.ts` file.
- [x] 2026-06-11: Added `.cup-ripple-effect` animation styling so `RippleDirective` now has a matching CSS contract.
- [x] 2026-06-11: Replaced the placeholder `core.spec.ts` with 7 real tests covering `ThemeService`, `CupConfigService`, `provideCupertino()`, `BreakpointService`, `CupFormControl`, and `LiquidGlassDirective`.
