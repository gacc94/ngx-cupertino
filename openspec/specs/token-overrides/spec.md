# token-overrides Specification

## Purpose
TBD - created by archiving change scaffold-cupertino-tokens. Update Purpose after archive.
## Requirements
### Requirement: Dark mode overrides change palette and semantic colors
The system SHALL provide `_dark.scss` with all dark mode overrides under `[data-mode="dark"]` selector. SHALL override ~72 tokens from _colors (18), _scheme (26), _elevation (4), _glass (13), _materials (5), _borders (2), and _opacity (4).

#### Scenario: Accent colors shift brighter in dark mode
- **WHEN** `[data-mode="dark"]` is set on `<html>`
- **THEN** `--cup-red` resolves to `#FF453A` (was `#FF3B30`)
- **THEN** `--cup-blue` resolves to `#0A84FF` (was `#007AFF`)

#### Scenario: Backgrounds invert in dark mode
- **WHEN** `[data-mode="dark"]` is set on `<html>`
- **THEN** `--cup-bg` resolves to `#000000`
- **THEN** `--cup-bg-secondary` resolves to `#1C1C1E`

#### Scenario: Shadows intensify in dark mode
- **WHEN** `[data-mode="dark"]` is set on `<html>`
- **THEN** `--cup-shadow-md` opacity is approximately `0.32` (was `0.10`)

### Requirement: macOS platform overrides adapt for desktop
The system SHALL provide `_platform.scss` with all macOS overrides under `@media (hover: hover) and (pointer: fine)`. SHALL contain 4 cascade blocks (macOS light, macOS dark, macOS HC light, macOS HC dark) with ~147 declarations. SHALL define 17 macOS-exclusive tokens.

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

### Requirement: Accessibility overrides handle 3 user preferences
The system SHALL provide `_a11y.scss` with overrides for 3 media queries: `prefers-contrast: more` (~88 HC overrides), `prefers-reduced-motion: reduce` (durations → 0.01ms), and `prefers-reduced-transparency: reduce` (~22 glass/material overrides).

#### Scenario: HC mode darkens accents in light mode
- **WHEN** Increase Contrast is enabled in light mode
- **THEN** `--cup-blue` resolves to `#0040DD` (was `#007AFF`)

#### Scenario: Reduced motion disables all animations
- **WHEN** Reduce Motion is enabled
- **THEN** `--cup-duration-normal` resolves to `0.01ms` (was `350ms`)

#### Scenario: Reduced transparency makes glass opaque
- **WHEN** Reduce Transparency is enabled in light mode
- **THEN** `--cup-glass-bg-md` resolves to `rgba(255, 255, 255, 0.90)` (was `0.40`)

