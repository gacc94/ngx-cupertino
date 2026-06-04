## ADDED Requirements

### Requirement: All directives use OnPush change detection

Every directive in `libs/core/src/lib/directives/` and the `CupFormControl` base class SHALL declare `changeDetection: ChangeDetectionStrategy.OnPush` in their `@Directive()` decorator.

#### Scenario: LiquidGlassDirective has OnPush

- **WHEN** reading `liquid-glass.directive.ts`
- **THEN** the `@Directive()` decorator includes `changeDetection: ChangeDetectionStrategy.OnPush`

#### Scenario: RippleDirective has OnPush

- **WHEN** reading `ripple.directive.ts`
- **THEN** the `@Directive()` decorator includes `changeDetection: ChangeDetectionStrategy.OnPush`

#### Scenario: CupRtlDirective has OnPush

- **WHEN** reading `rtl.directive.ts`
- **THEN** the `@Directive()` decorator includes `changeDetection: ChangeDetectionStrategy.OnPush`

#### Scenario: CupFormControl base class has OnPush

- **WHEN** reading `base-cva.ts`
- **THEN** the `@Directive()` decorator includes `changeDetection: ChangeDetectionStrategy.OnPush`
