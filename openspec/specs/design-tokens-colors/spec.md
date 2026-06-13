# design-tokens-colors Specification

## Purpose
TBD - created by archiving change step-3-design-tokens. Update Purpose after archive.
## Requirements
### Requirement: 12 system color tokens exist with four-state palette values

The palette layer SHALL define 12 system color CSS custom properties (`--cup-red`, `--cup-orange`, `--cup-yellow`, `--cup-green`, `--cup-mint`, `--cup-teal`, `--cup-cyan`, `--cup-blue`, `--cup-indigo`, `--cup-purple`, `--cup-pink`, `--cup-brown`) across all four supported states using the captured Apple system color specification table:

- default light values in `libs/tokens/src/lib/_colors.scss`
- default dark overrides in `libs/tokens/src/lib/_dark.scss`
- increased-contrast light overrides in `libs/tokens/src/lib/_a11y.scss`
- increased-contrast dark overrides in `libs/tokens/src/lib/_a11y.scss` under `[data-mode="dark"]`

#### Scenario: All 12 system colors are defined in the light palette source

- **WHEN** reading `libs/tokens/src/lib/_colors.scss`
- **THEN** it defines `--cup-red`, `--cup-orange`, `--cup-yellow`, `--cup-green`, `--cup-mint`, `--cup-teal`, `--cup-cyan`, `--cup-blue`, `--cup-indigo`, `--cup-purple`, `--cup-pink`, and `--cup-brown`

#### Scenario: Dark palette values are defined separately

- **WHEN** reading `libs/tokens/src/lib/_dark.scss`
- **THEN** it overrides the 12 chromatic system color tokens for dark mode

#### Scenario: Increased-contrast palette values are defined separately

- **WHEN** reading `libs/tokens/src/lib/_a11y.scss`
- **THEN** it overrides the 12 chromatic system color tokens for increased-contrast light and dark states

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

### Requirement: Gray scale tokens remain exact while chromatic palette values are refined

The palette layer SHALL preserve the six gray scale tokens (`--cup-gray` through `--cup-gray-6`) as exact matches to the captured Apple gray table across default light, default dark, increased-contrast light, and increased-contrast dark states.

#### Scenario: Light gray scale remains defined

- **WHEN** reading `libs/tokens/src/lib/_colors.scss`
- **THEN** it defines `--cup-gray`, `--cup-gray-2`, `--cup-gray-3`, `--cup-gray-4`, `--cup-gray-5`, and `--cup-gray-6`

#### Scenario: Dark gray scale remains defined

- **WHEN** reading `libs/tokens/src/lib/_dark.scss`
- **THEN** it overrides `--cup-gray`, `--cup-gray-2`, `--cup-gray-3`, `--cup-gray-4`, `--cup-gray-5`, and `--cup-gray-6` for dark mode

#### Scenario: Increased-contrast gray scale remains defined

- **WHEN** reading `libs/tokens/src/lib/_a11y.scss`
- **THEN** it overrides the six gray scale tokens for increased-contrast light and dark states without removing any gray family

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

