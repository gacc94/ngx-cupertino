## MODIFIED Requirements

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
