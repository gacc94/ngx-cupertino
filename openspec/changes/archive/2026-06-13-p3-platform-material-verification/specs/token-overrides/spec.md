## MODIFIED Requirements

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
