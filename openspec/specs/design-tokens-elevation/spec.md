# design-tokens-elevation Specification

## Purpose
TBD - created by archiving change step-3-design-tokens. Update Purpose after archive.
## Requirements
### Requirement: Liquid Glass tokens exist with 3 Apple variants

The `_elevation.scss` partial SHALL define 3 Liquid Glass background tokens mapping to Apple's regular, clear, and prominent variants with distinct light/dark opacities: `--cup-glass-bg-regular`, `--cup-glass-bg-clear`, `--cup-glass-bg-prominent`.

#### Scenario: 3 glass variants defined

- **WHEN** reading `libs/tokens/src/lib/_elevation.scss`
- **THEN** it defines `--cup-glass-bg-regular`, `--cup-glass-bg-clear`, `--cup-glass-bg-prominent` with light/dark values

### Requirement: Liquid Glass blur and effect tokens exist

The `_elevation.scss` partial SHALL define shared glass effect tokens: `--cup-blur-light` (20px), `--cup-blur-medium` (30px), `--cup-blur-heavy` (50px), `--cup-glass-saturation` (1.8), and border tokens.

#### Scenario: Glass effects defined

- **WHEN** reading `libs/tokens/src/lib/_elevation.scss`
- **THEN** it defines `--cup-blur-light`, `--cup-blur-medium`, `--cup-blur-heavy`, and `--cup-glass-saturation`

### Requirement: Box shadow elevation tokens exist with 4 levels

The `_elevation.scss` partial SHALL define 4 box shadow tokens with light/dark values: `--cup-shadow-sm`, `--cup-shadow-md`, `--cup-shadow-lg`, `--cup-shadow-xl`.

#### Scenario: Shadow levels defined

- **WHEN** reading `libs/tokens/src/lib/_elevation.scss`
- **THEN** it defines `--cup-shadow-sm` through `--cup-shadow-xl` (4 tokens)

### Requirement: Z-index scale tokens exist with 8 layers

The `_elevation.scss` partial SHALL define 8 z-index layer tokens from base (0) to notification (1070): `--cup-z-base`, `--cup-z-dropdown`, `--cup-z-sticky`, `--cup-z-fixed`, `--cup-z-offcanvas`, `--cup-z-modal`, `--cup-z-popover`, `--cup-z-notification`.

#### Scenario: Z-index scale defined

- **WHEN** reading `libs/tokens/src/lib/_elevation.scss`
- **THEN** it defines `--cup-z-dropdown` (1000), `--cup-z-fixed` (1030), `--cup-z-modal` (1050), and `--cup-z-notification` (1070)

