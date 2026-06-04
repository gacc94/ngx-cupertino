# core-scss Specification

## Purpose
TBD - created by archiving change step-5-core-package. Update Purpose after archive.
## Requirements
### Requirement: SCSS barrel exists at package root

The `libs/core/src/_index.scss` file SHALL exist and forward all style partials using `@forward`.

#### Scenario: Barrel forwards partials

- **WHEN** reading `_index.scss`
- **THEN** it contains `@forward 'lib/styles/mixins'`, `@forward 'lib/styles/functions'`, and `@forward 'lib/styles/animations'`

### Requirement: Package exports SCSS via exports field

The `libs/core/package.json` file SHALL include an `exports` field with `".": { "sass": "./_index.scss" }` and sub-path exports for mixins and animations.

#### Scenario: Main SCSS export is configured

- **WHEN** a consumer uses `@use '@ngx-cupertino/core' as cup`
- **THEN** the SCSS barrel `_index.scss` is resolved

#### Scenario: Sub-path exports work

- **WHEN** a consumer uses `@use '@ngx-cupertino/core/styles/mixins' as cup-mixins`
- **THEN** the `_mixins.scss` partial is resolved

### Requirement: ng-package.json includes SCSS assets

The `libs/core/ng-package.json` file SHALL include `"assets": ["src/_index.scss", "src/lib/styles/**/*.scss"]`.

#### Scenario: SCSS files are copied to dist

- **WHEN** building `bun nx build core`
- **THEN** `dist/libs/core/_index.scss` and `dist/libs/core/src/lib/styles/` exist

### Requirement: cup-liquid-glass mixin is defined

The `libs/core/src/lib/styles/_mixins.scss` file SHALL export a `cup-liquid-glass` mixin accepting a `$variant` parameter ('regular', 'clear', or 'prominent').

#### Scenario: Regular variant

- **WHEN** calling `@include cup-liquid-glass('regular')`
- **THEN** output includes `backdrop-filter`, `saturate`, `background: var(--cup-glass-bg-regular)`, and `border: 0.5px solid var(--cup-glass-border-light)`

#### Scenario: Clear variant

- **WHEN** calling `@include cup-liquid-glass('clear')`
- **THEN** output uses `var(--cup-glass-bg-clear)` for background

#### Scenario: Prominent variant

- **WHEN** calling `@include cup-liquid-glass('prominent')`
- **THEN** output uses `var(--cup-glass-bg-prominent)` for background

### Requirement: cup-text mixin is defined

The `_mixins.scss` file SHALL export a `cup-text($style)` mixin that applies `font: var(--cup-text-#{$style})`.

#### Scenario: Body text style

- **WHEN** calling `@include cup-text('body')`
- **THEN** output is `font: var(--cup-text-body)`

### Requirement: CSS keyframe animations are defined

The `libs/core/src/lib/styles/_animations.scss` file SHALL define `@keyframes` for: `cup-slide-up`, `cup-slide-down`, `cup-fade-in`, `cup-fade-out`, `cup-scale-in`, `cup-scale-out`.

#### Scenario: Slide up animation

- **WHEN** reading `_animations.scss`
- **THEN** `@keyframes cup-slide-up` exists with `from { transform: translateY(100%); opacity: 0 }` and `to { transform: translateY(0); opacity: 1 }`

#### Scenario: Fade out animation

- **WHEN** reading `_animations.scss`
- **THEN** `@keyframes cup-fade-out` exists with `from { opacity: 1 }` and `to { opacity: 0 }`

### Requirement: Animation utility classes are defined

The `_animations.scss` file SHALL define CSS classes `.cup-slide-up`, `.cup-slide-down`, `.cup-fade-in`, `.cup-fade-out`, `.cup-scale-in`, `.cup-scale-out` that apply the corresponding keyframes with Cupertino timing tokens.

#### Scenario: Fade in class

- **WHEN** an element has class `cup-fade-in`
- **THEN** it animates with `animation: cup-fade-in var(--cup-duration-default) var(--cup-easing-default) forwards`

### Requirement: Reduced motion media query

The `_animations.scss` file SHALL include `@media (prefers-reduced-motion: reduce)` that disables animations and transitions.

#### Scenario: Reduced motion kills animations

- **WHEN** user has reduced motion preference enabled
- **THEN** all `animation-duration` and `transition-duration` are set to `0.01ms !important`

