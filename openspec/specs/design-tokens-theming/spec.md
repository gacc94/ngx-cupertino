# design-tokens-theming Specification

## Purpose
TBD - created by archiving change step-3-design-tokens. Update Purpose after archive.
## Requirements
### Requirement: Light theme is default with CSS color-scheme

The `_themes.scss` partial SHALL set `color-scheme: light dark` on `:root`.

#### Scenario: Color scheme set

- **WHEN** reading `libs/tokens/src/lib/_themes.scss`
- **THEN** it contains `color-scheme: light dark` applied to `:root`

### Requirement: Dark theme overrides via prefers-color-scheme

The `_themes.scss` partial SHALL override color/fill/background/separator/shadow tokens inside `@media (prefers-color-scheme: dark)`, referencing values from the dark columns of the `_colors.scss` and `_elevation.scss` tables.

#### Scenario: Dark media query

- **WHEN** reading `libs/tokens/src/lib/_themes.scss`
- **THEN** it contains `@media (prefers-color-scheme: dark)` with at least `--cup-label` and `--cup-background` dark overrides

### Requirement: Manual dark mode toggle via .cup-dark class

The `_themes.scss` partial SHALL define a `.cup-dark` class with the same dark overrides as the media query for programmatic theme switching.

#### Scenario: cup-dark class

- **WHEN** reading `libs/tokens/src/lib/_themes.scss`
- **THEN** it defines `.cup-dark {}` with dark token overrides

### Requirement: Themes does not duplicate light values

The `_themes.scss` partial SHALL NOT define any light-mode token values. Light defaults are exclusively in `_colors.scss` and other partials.

#### Scenario: No light value duplication

- **WHEN** reading `libs/tokens/src/lib/_themes.scss`
- **THEN** all token definitions are inside dark-mode contexts (`@media` or `.cup-dark`), never at root `:root` level

