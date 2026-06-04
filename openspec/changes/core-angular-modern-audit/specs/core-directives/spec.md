## MODIFIED Requirements

### Requirement: LiquidGlassDirective exists with correct selector

The `libs/core/src/lib/directives/liquid-glass.directive.ts` file SHALL export a standalone directive `LiquidGlassDirective` with selector `[cupLiquidGlass]`, `OnPush` change detection, and NO `ngOnInit` lifecycle hook.

#### Scenario: Directive is standalone and uses OnPush

- **WHEN** reading `liquid-glass.directive.ts`
- **THEN** the class has `@Directive({ selector: '[cupLiquidGlass]', host: { ... }, changeDetection: ChangeDetectionStrategy.OnPush })`
- **THEN** `standalone: true` is NOT present (default in Angular v20+)
- **THEN** the class does NOT implement `OnInit`

#### Scenario: No empty lifecycle hooks

- **WHEN** reading `liquid-glass.directive.ts`
- **THEN** there is no `ngOnInit()` method
- **THEN** there is no `applyBackground()` method (was a no-op)

### Requirement: RippleDirective uses DOCUMENT not Renderer2

The `libs/core/src/lib/directives/ripple.directive.ts` file SHALL inject `DOCUMENT` instead of `Renderer2` for DOM element creation. It SHALL use `host:` metadata for the click event. It SHALL declare `OnPush` change detection.

#### Scenario: DOCUMENT is injected

- **WHEN** reading `ripple.directive.ts`
- **THEN** `Renderer2` is NOT imported
- **THEN** `DOCUMENT` from `@angular/common` is injected
- **THEN** `changeDetection: ChangeDetectionStrategy.OnPush` is declared

#### Scenario: Click creates ripple via DOCUMENT

- **WHEN** clicking an element with `[cupRipple]`
- **THEN** a ripple span is created via `this.document.createElement("span")` not via `Renderer2`

### Requirement: CupRtlDirective uses OnPush

The `libs/core/src/lib/directives/rtl.directive.ts` file SHALL declare `changeDetection: ChangeDetectionStrategy.OnPush`.

#### Scenario: OnPush is declared

- **WHEN** reading `rtl.directive.ts`
- **THEN** `changeDetection: ChangeDetectionStrategy.OnPush` is in the `@Directive()` decorator
