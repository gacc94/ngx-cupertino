# core-directives Specification

## Purpose
TBD - created by archiving change step-5-core-package. Update Purpose after archive.
## Requirements
### Requirement: LiquidGlassDirective exists with correct selector

The `libs/core/src/lib/directives/liquid-glass.directive.ts` file SHALL export a standalone directive `LiquidGlassDirective` with selector `[cupLiquidGlass]` and `OnPush` change detection.

#### Scenario: Directive is standalone and uses OnPush

- **WHEN** reading `liquid-glass.directive.ts`
- **THEN** the class has `@Directive({ selector: '[cupLiquidGlass]', host: { ... } })` with `changeDetection: ChangeDetectionStrategy.OnPush`
- **THEN** `standalone: true` is NOT present (default in Angular v20+)

### Requirement: LiquidGlassDirective applies Liquid Glass via host bindings

The directive SHALL use `host:` bindings to apply backdrop-filter blur, saturate, background, and border from CSS custom properties.

#### Scenario: Host bindings applied

- **WHEN** inspecting the element with `[cupLiquidGlass]` in the DOM
- **THEN** computed styles include `backdrop-filter: blur(var(--cup-blur-light)) saturate(var(--cup-glass-saturation))`
- **THEN** `background: var(--cup-glass-bg-regular)` is applied
- **THEN** `border: 0.5px solid var(--cup-glass-border-light)` is applied

### Requirement: LiquidGlassDirective supports variant input

The directive SHALL accept a `cupLiquidGlass` input (same as selector) that controls the glass variant: `'regular'`, `'clear'`, or `'prominent'`.

#### Scenario: Clear variant changes background token

- **WHEN** binding `[cupLiquidGlass]="'clear'"`
- **THEN** the host element's `background` uses `var(--cup-glass-bg-clear)`

#### Scenario: Prominent variant changes background token

- **WHEN** binding `[cupLiquidGlass]="'prominent'"`
- **THEN** the host element's `background` uses `var(--cup-glass-bg-prominent)`

#### Scenario: Default is regular variant

- **WHEN** using `cupLiquidGlass` without a value or with `'regular'`
- **THEN** the host element's `background` uses `var(--cup-glass-bg-regular)`

### Requirement: RippleDirective exists with correct selector

The `libs/core/src/lib/directives/ripple.directive.ts` file SHALL export a standalone directive `RippleDirective` with selector `[cupRipple]` and `OnPush` change detection.

#### Scenario: Directive is standalone

- **WHEN** reading `ripple.directive.ts`
- **THEN** the class has `@Directive({ selector: '[cupRipple]' })`

### Requirement: RippleDirective handles click/touch events

The directive SHALL listen to `click` events on the host element and create a ripple animation effect.

#### Scenario: Click creates ripple

- **WHEN** clicking an element with `[cupRipple]`
- **THEN** a ripple animation is triggered at the click position within the element

### Requirement: CupRtlDirective exists with correct selector

The `libs/core/src/lib/directives/rtl.directive.ts` file SHALL export a standalone directive `CupRtlDirective` with selector `[cupRtl]` and `OnPush` change detection.

#### Scenario: Directive is standalone

- **WHEN** reading `rtl.directive.ts`
- **THEN** the class has `@Directive({ selector: '[cupRtl]' })`

### Requirement: CupRtlDirective applies RTL styles

The directive SHALL apply `direction: rtl` and related logical property adjustments to the host element.

#### Scenario: RTL direction is applied

- **WHEN** adding `cupRtl` attribute to an element
- **THEN** the element renders with right-to-left text direction and layout

