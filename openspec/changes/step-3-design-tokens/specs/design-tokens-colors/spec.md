## ADDED Requirements

### Requirement: 12 system color tokens exist with light/dark values

The `_colors.scss` partial SHALL define 12 system color CSS custom properties (`--cup-color-{name}`) with light and dark mode values from the iOS 26 palette: red, orange, yellow, green, mint, teal, cyan, blue, indigo, purple, pink, brown.

#### Scenario: All 12 system colors defined

- **WHEN** reading `libs/tokens/src/lib/_colors.scss`
- **THEN** it defines `--cup-color-blue`, `--cup-color-green`, `--cup-color-red` and 9 other system colors in `:root`

### Requirement: Semantic label tokens exist with 4 levels

The `_colors.scss` partial SHALL define semantic text label tokens at 4 opacity levels: `--cup-label` (1.0), `--cup-label-secondary` (0.6), `--cup-label-tertiary` (0.3), `--cup-label-quaternary` (0.18) using base `rgba(60,60,67,x)` for light and `rgba(235,235,245,x)` for dark.

#### Scenario: All 4 label levels defined

- **WHEN** reading `libs/tokens/src/lib/_colors.scss`
- **THEN** it defines `--cup-label`, `--cup-label-secondary`, `--cup-label-tertiary`, `--cup-label-quaternary`

### Requirement: Vibrant label tokens exist for glass/materials

The `_colors.scss` partial SHALL define vibrant label tokens (`--cup-vibrant-label`, `--cup-vibrant-label-secondary`, `--cup-vibrant-label-tertiary`, `--cup-vibrant-label-quaternary`) using distinct opacity values for text rendered on glass/materials.

#### Scenario: Vibrant labels defined

- **WHEN** reading `libs/tokens/src/lib/_colors.scss`
- **THEN** it defines at least 3 vibrant label tokens prefixed with `--cup-vibrant-label`

### Requirement: Fill tokens exist with 4 levels

The `_colors.scss` partial SHALL define fill tokens (`--cup-fill-primary` through `--cup-fill-quaternary`) using `rgba(120,120,128,x)` base with appropriate opacity per level.

#### Scenario: Fill tokens defined

- **WHEN** reading `libs/tokens/src/lib/_colors.scss`
- **THEN** it defines `--cup-fill-primary`, `--cup-fill-secondary`, `--cup-fill-tertiary`, `--cup-fill-quaternary`

### Requirement: Background tokens exist with grouped variants

The `_colors.scss` partial SHALL define background tokens: `--cup-background`, `--cup-background-secondary`, `--cup-background-tertiary`, and grouped variants (`--cup-background-grouped`, `--cup-background-grouped-secondary`, `--cup-background-grouped-tertiary`).

#### Scenario: 6 background tokens defined

- **WHEN** reading `libs/tokens/src/lib/_colors.scss`
- **THEN** it defines at least 6 background tokens starting with `--cup-background`

### Requirement: Gray scale tokens exist with 6 levels

The `_colors.scss` partial SHALL define 6 gray scale tokens (`--cup-gray` through `--cup-gray-6`) with appropriate hex values for light/dark modes.

#### Scenario: Gray scale defined

- **WHEN** reading `libs/tokens/src/lib/_colors.scss`
- **THEN** it defines `--cup-gray`, `--cup-gray-2` through `--cup-gray-6`

### Requirement: Separator tokens exist for borders

The `_colors.scss` partial SHALL define separator tokens: `--cup-separator` (translucent) and `--cup-separator-opaque`.

#### Scenario: Separators defined

- **WHEN** reading `libs/tokens/src/lib/_colors.scss`
- **THEN** it defines `--cup-separator` and `--cup-separator-opaque`

### Requirement: Link and overlay tokens exist

The `_colors.scss` partial SHALL define `--cup-link` (referencing `--cup-color-blue`), `--cup-link-visited`, `--cup-overlay` (backdrop for modals/dialogs).

#### Scenario: Link and overlay defined

- **WHEN** reading `libs/tokens/src/lib/_colors.scss`
- **THEN** it defines `--cup-link`, `--cup-link-visited`, and `--cup-overlay`
