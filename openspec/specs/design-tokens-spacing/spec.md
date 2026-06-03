# design-tokens-spacing Specification

## Purpose
TBD - created by archiving change step-3-design-tokens. Update Purpose after archive.
## Requirements
### Requirement: 4px grid spacing tokens exist

The `_spacing.scss` partial SHALL define 8 spacing tokens: `--cup-spacing-1` (4px) through `--cup-spacing-8` (32px) on a 4px grid.

#### Scenario: Spacing scale defined

- **WHEN** reading `libs/tokens/src/lib/_spacing.scss`
- **THEN** it defines `--cup-spacing-1` through `--cup-spacing-8` with values from 4px to 32px

### Requirement: Derived spacing tokens exist

The `_spacing.scss` partial SHALL define derived tokens: `--cup-padding-horizontal`, `--cup-padding-vertical`, `--cup-gap-default`, `--cup-gap-large`.

#### Scenario: Derived tokens defined

- **WHEN** reading `libs/tokens/src/lib/_spacing.scss`
- **THEN** it defines at least 3 derived tokens (padding, gap)

### Requirement: Platform sizing tokens exist

The `_spacing.scss` partial SHALL define responsive platform sizing tokens that adapt via `(hover: hover) and (pointer: fine)` media query: `--cup-target-size`, `--cup-control-height`, `--cup-navbar-height`.

#### Scenario: Platform sizing responsive

- **WHEN** reading `libs/tokens/src/lib/_spacing.scss`
- **THEN** it defines `--cup-target-size` (44px mobile / 28px desktop) and `--cup-control-height` with a `@media (hover: hover)` block

### Requirement: Safe-area inset tokens exist

The `_spacing.scss` partial SHALL define safe-area inset tokens using `env()`: `--cup-safe-area-top`, `--cup-safe-area-bottom`, `--cup-safe-area-left`, `--cup-safe-area-right`.

#### Scenario: Safe-area tokens defined

- **WHEN** reading `libs/tokens/src/lib/_spacing.scss`
- **THEN** it defines at least 2 safe-area tokens using `env(safe-area-inset-*)`

