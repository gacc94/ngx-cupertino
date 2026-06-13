# token-overrides Specification

## Purpose
TBD - created by archiving change scaffold-cupertino-tokens. Update Purpose after archive.
## Requirements
### Requirement: Dark mode overrides change palette and semantic colors
The system SHALL provide `_dark.scss` with all dark mode overrides under `[data-mode="dark"]` selector. SHALL override ~72 tokens from _colors (18), _scheme (26), _elevation (4), _glass (13), _materials (5), _borders (2), and _opacity (4). The semantic overrides SHALL preserve foreground contrast, grouped background hierarchy, and separator readability in dark mode.

#### Scenario: Accent colors shift brighter in dark mode
- **WHEN** `[data-mode="dark"]` is set on `<html>`
- **THEN** `--cup-red` resolves to `#FF453A` (was `#FF3B30`)
- **THEN** `--cup-blue` resolves to `#0A84FF` (was `#007AFF`)

#### Scenario: Semantic foreground and background roles remain readable in dark mode
- **WHEN** `[data-mode="dark"]` is set on `<html>`
- **THEN** `--cup-label`, `--cup-label-secondary`, `--cup-label-tertiary`, and `--cup-label-quaternary` remain defined for dark mode
- **THEN** `--cup-bg`, `--cup-bg-secondary`, `--cup-bg-tertiary`, `--cup-bg-grouped`, `--cup-bg-grouped-secondary`, `--cup-bg-grouped-tertiary`, `--cup-separator`, and `--cup-separator-opaque` remain defined for dark mode

#### Scenario: Shadows intensify in dark mode
- **WHEN** `[data-mode="dark"]` is set on `<html>`
- **THEN** `--cup-shadow-md` opacity is approximately `0.32` (was `0.10`)

### Requirement: macOS platform overrides adapt for desktop
The system SHALL provide `_platform.scss` with all macOS overrides under `@media (hover: hover) and (pointer: fine)`. SHALL contain 4 cascade blocks (macOS light, macOS dark, macOS HC light, macOS HC dark) with ~147 declarations. SHALL define 17 macOS-exclusive tokens. The platform layer SHALL remain a curated augmentation and SHALL NOT be treated as full AppKit parity. Platform chromatic overrides SHALL be reviewed against the corrected base palette after palette-level changes.

#### Scenario: macOS controls are smaller than iOS
- **WHEN** viewed on a device with mouse/trackpad
- **THEN** `--cup-control-height` resolves to `28px` (was `44px`)
- **THEN** `--cup-target-size` resolves to `28px` (was `44px`)

#### Scenario: macOS buttons use rounded-rect instead of pill
- **WHEN** viewed on a device with mouse/trackpad
- **THEN** `--cup-radius-button` resolves to `6px` (was `999px`)

#### Scenario: macOS has exclusive tokens for desktop UI
- **WHEN** viewed on a device with mouse/trackpad
- **THEN** `--cup-focus-ring` resolves to `rgba(0, 103, 244, 0.498)`
- **THEN** `--cup-window-bg` resolves to `#ECECEC`

#### Scenario: Platform chromatic overrides stay scoped and curated
- **WHEN** viewed on a device with mouse/trackpad
- **THEN** platform-specific green, teal, cyan, link, and accent overrides remain defined in `_platform.scss`
- **THEN** the platform layer does not expand into undocumented macOS color tokens

### Requirement: Accessibility overrides handle 3 user preferences
The system SHALL provide `_a11y.scss` with overrides for 3 media queries: `prefers-contrast: more` (~88 HC overrides), `prefers-reduced-motion: reduce` (durations → 0.01ms), and `prefers-reduced-transparency: reduce` (~22 glass/material overrides). The contrast overrides SHALL preserve semantic foreground readability and structural separation in both light and dark modes.

#### Scenario: HC mode darkens accents in light mode
- **WHEN** Increase Contrast is enabled in light mode
- **THEN** `--cup-blue` resolves to `#0040DD` (was `#007AFF`)

#### Scenario: Semantic foreground and structural tokens remain distinct in HC mode
- **WHEN** Increase Contrast is enabled in light mode or dark mode
- **THEN** `--cup-label*`, `--cup-bg*`, `--cup-separator*`, and `--cup-link` remain defined in the accessibility override layer with contrast-appropriate values

#### Scenario: Reduced motion disables all animations
- **WHEN** Reduce Motion is enabled
- **THEN** `--cup-duration-normal` resolves to `0.01ms` (was `350ms`)

#### Scenario: Reduced transparency makes glass opaque
- **WHEN** Reduce Transparency is enabled in light mode
- **THEN** `--cup-glass-bg-md` resolves to `rgba(255, 255, 255, 0.90)` (was `0.40`)
