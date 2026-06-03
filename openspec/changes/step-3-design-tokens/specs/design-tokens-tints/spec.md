## ADDED Requirements

### Requirement: 12 tint presets exist with 4 stops each

The `_tints.scss` partial SHALL define 12 Apple tint presets (blue, green, indigo, orange, pink, purple, red, teal, yellow, gray, mint, cyan), each with 4 color stops: base, subtle, on, container.

#### Scenario: All 12 tints defined

- **WHEN** reading `libs/tokens/src/lib/_tints.scss`
- **THEN** it defines `--cup-tint-blue`, `--cup-tint-green` and 10 other tint base tokens (12 total)

#### Scenario: Each tint has 4 stops

- **WHEN** reading `libs/tokens/src/lib/_tints.scss`
- **THEN** for tint "blue", it defines `--cup-tint-blue`, `--cup-tint-blue-subtle`, `--cup-tint-blue-on`, `--cup-tint-blue-container`

### Requirement: Tints auto-switch via theme

The `_tints.scss` partial SHALL define light default values in `:root`. Dark mode tint values SHALL be overridden in `_themes.scss`, not as separate `-dark` tokens.

#### Scenario: Auto-switch pattern

- **WHEN** reading `libs/tokens/src/lib/_tints.scss`
- **THEN** it defines `--cup-tint-blue: #007AFF` in `:root`
- **WHEN** reading `libs/tokens/src/lib/_themes.scss`
- **THEN** it overrides `--cup-tint-blue: #0A84FF` in dark mode
