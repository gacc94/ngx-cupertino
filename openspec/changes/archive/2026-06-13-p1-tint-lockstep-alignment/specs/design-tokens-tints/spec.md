## MODIFIED Requirements

### Requirement: 13 tint presets exist with 4 shared stops

The `_tints.scss` partial SHALL define 13 Apple tint presets (blue, red, orange, yellow, green, mint, teal, cyan, indigo, purple, pink, brown, gray) via `[data-tint="name"]` selectors. Each preset SHALL set the shared runtime tint tokens `--cup-tint`, `--cup-tint-subtle`, `--cup-tint-on`, and `--cup-tint-container`.

#### Scenario: All 13 tints are defined

- **WHEN** reading `libs/tokens/src/lib/_tints.scss`
- **THEN** it defines `[data-tint="blue"]`, `[data-tint="brown"]`, and the other 11 tint selectors

#### Scenario: Each tint has 4 shared stops

- **WHEN** reading `libs/tokens/src/lib/_tints.scss`
- **THEN** for tint "blue", it defines `--cup-tint`, `--cup-tint-subtle`, `--cup-tint-on`, and `--cup-tint-container`

### Requirement: Tints stay state-aware within `_tints.scss`

The `_tints.scss` partial SHALL define light default values in `:root`, dark mode tint values under `[data-mode="dark"]`, and increased-contrast tint values under `@media (prefers-contrast: more)` within the same file. `:root` SHALL provide fallback tint values, and runtime tint switching SHALL continue to use the existing `data-tint` model.

#### Scenario: Light fallback is available

- **WHEN** no `[data-tint]` attribute is set
- **THEN** `:root` provides the fallback `--cup-tint` values

#### Scenario: Dark tint values override the base state

- **WHEN** `[data-mode="dark"]` and `[data-tint="blue"]` are set
- **THEN** the file overrides `--cup-tint` for the dark blue state

#### Scenario: Increased-contrast tint values are available

- **WHEN** `prefers-contrast: more` is active
- **THEN** the file provides increased-contrast overrides for tint families in both light and dark states
