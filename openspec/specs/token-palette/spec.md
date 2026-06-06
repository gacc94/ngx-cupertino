# token-palette Specification

## Purpose
TBD - created by archiving change scaffold-cupertino-tokens. Update Purpose after archive.
## Requirements
### Requirement: Primitive accent colors are defined as CSS custom properties
The system SHALL define 12 system accent colors (red, orange, yellow, green, mint, teal, cyan, blue, indigo, purple, pink, brown) and 6 gray levels as CSS custom properties in `:root` within `_colors.scss`. Values SHALL match Apple's iOS 26 light mode specification.

#### Scenario: Accent colors are available as CSS vars
- **WHEN** `_colors.scss` is loaded
- **THEN** `--cup-red` resolves to `#FF3B30`
- **THEN** `--cup-blue` resolves to `#007AFF`
- **THEN** `--cup-gray-6` resolves to `#F2F2F7`

### Requirement: Semantic color assignments are defined
The system SHALL define 28 semantic color tokens in `_scheme.scss` mapping to contextual roles (labels, vibrant labels, fills, vibrant fills, backgrounds, separators, link, placeholder). Values SHALL be iOS light mode defaults using base RGB `3C3C43` with decreasing alpha.

#### Scenario: Label tokens resolve to expected values
- **WHEN** `_scheme.scss` is loaded
- **THEN** `--cup-label` resolves to `rgba(0, 0, 0, 1.0)`
- **THEN** `--cup-label-secondary` resolves to `rgba(60, 60, 67, 0.6)`
- **THEN** `--cup-label-tertiary` resolves to `rgba(60, 60, 67, 0.3)`

### Requirement: Typography tokens are defined as CSS custom properties
The system SHALL define 27 typography tokens in `_typography.scss` including 5 font stacks, 11 Dynamic Type sizes (34px → 11px), 4 font weights, 3 line-heights, 3 letter-spacing values, and a font-scale factor.

#### Scenario: Type scale tokens resolve to CSS pixel values
- **WHEN** `_typography.scss` is loaded
- **THEN** `--cup-text-body` resolves to `17px`
- **THEN** `--cup-text-large-title` resolves to `34px`
- **THEN** `--cup-text-caption2` resolves to `11px`

### Requirement: Spacing grid is defined on a 4px base
The system SHALL define 8 grid levels (4px → 40px) and 13 semantic spacing aliases in `_spacing.scss`. All values SHALL be multiples of 4.

#### Scenario: Grid scale tokens resolve to expected values
- **WHEN** `_spacing.scss` is loaded
- **THEN** `--cup-space-1` resolves to `4px`
- **THEN** `--cup-space-4` resolves to `16px`
- **THEN** `--cup-space-8` resolves to `40px`

### Requirement: Sizing tokens define component dimensions
The system SHALL define 27 sizing tokens in `_sizing.scss` covering touch targets (44/34/50px iOS), control heights, navigation chrome, and layout dimensions.

#### Scenario: Touch target tokens use iOS defaults
- **WHEN** `_sizing.scss` is loaded
- **THEN** `--cup-target-size` resolves to `44px`
- **THEN** `--cup-control-height` resolves to `44px`

### Requirement: Radius tokens define border-radius scale
The system SHALL define 8 primitive radius values (4px → 999px) and 18 semantic aliases in `_radius.scss`. iOS buttons SHALL use pill radius (999px) by default.

#### Scenario: Button radius is pill-shaped on iOS
- **WHEN** `_radius.scss` is loaded
- **THEN** `--cup-radius-button` resolves to `999px`
- **THEN** `--cup-radius-card` resolves to `16px`

### Requirement: Border tokens define widths and colors
The system SHALL define 5 border widths (0.33px → 3px) and 6 border colors in `_borders.scss`.

#### Scenario: Retina hairline uses sub-pixel width
- **WHEN** `_borders.scss` is loaded
- **THEN** `--cup-border-separator` resolves to `0.33px`
- **THEN** `--cup-border-hairline` resolves to `0.5px`

### Requirement: Opacity tokens define interaction states
The system SHALL define 9 opacity tokens in `_opacity.scss` covering interaction states (disabled 0.4, pressed 0.7, hover 0.85) and overlay opacities.

#### Scenario: Disabled elements use Apple-standard opacity
- **WHEN** `_opacity.scss` is loaded
- **THEN** `--cup-opacity-disabled` resolves to `0.4`
- **THEN** `--cup-opacity-pressed` resolves to `0.7`

### Requirement: Tint system provides active accent selection
The system SHALL define 13 named tint presets in `_tints.scss` activated via `[data-tint="name"]` attribute. Each preset SHALL set 4 derived tokens: `--cup-tint`, `--cup-tint-subtle`, `--cup-tint-on`, `--cup-tint-container`.

#### Scenario: Blue tint is the fallback
- **WHEN** no `[data-tint]` attribute is set
- **THEN** `--cup-tint` resolves to `#007AFF` from `:root` fallback

### Requirement: Elevation tokens define box-shadow scale
The system SHALL define 4 shadow levels (sm/md/lg/xl) and a shadow-color token in `_elevation.scss`.

#### Scenario: Shadow levels provide depth hierarchy
- **WHEN** `_elevation.scss` is loaded
- **THEN** `--cup-shadow-sm` uses opacity `0.06`
- **THEN** `--cup-shadow-xl` uses opacity `0.18`

### Requirement: Glass tokens define Liquid Glass material
The system SHALL define 17 tokens in `_glass.scss` covering Regular glass (sm/md/lg × 4 properties), Clear glass (4 properties), and an inset highlight token.

#### Scenario: Regular glass medium is the default size
- **WHEN** `_glass.scss` is loaded
- **THEN** `--cup-glass-bg-md` resolves to `rgba(255, 255, 255, 0.40)`
- **THEN** `--cup-glass-blur-md` resolves to `blur(30px) saturate(200%)`

### Requirement: Materials tokens define system blur effects
The system SHALL define 12 tokens in `_materials.scss` covering 5 thickness levels (ultrathin → chrome), 5 blur values, and 2 scroll edge dimensions.

#### Scenario: Material thickness levels provide progressive opacity
- **WHEN** `_materials.scss` is loaded
- **THEN** `--cup-material-ultrathin` resolves to `rgba(255, 255, 255, 0.15)`
- **THEN** `--cup-material-thick` resolves to `rgba(255, 255, 255, 0.70)`

### Requirement: Motion tokens define animation durations and easing
The system SHALL define 10 tokens in `_motion.scss` covering 4 durations (100ms → 500ms) and 6 easing curves (default, in, out, in-out, spring, ios).

#### Scenario: iOS curve has Apple's signature timing
- **WHEN** `_motion.scss` is loaded
- **THEN** `--cup-ease-ios` resolves to `cubic-bezier(0.28, 0.11, 0.32, 1)`
- **THEN** `--cup-duration-normal` resolves to `350ms`

### Requirement: Z-index tokens define stacking order
The system SHALL define 8 z-index levels (base 0 → toast 700) in `_z-index.scss` with 100-point increments.

#### Scenario: Modal floats above overlay
- **WHEN** `_z-index.scss` is loaded
- **THEN** `--cup-z-overlay` resolves to `400`
- **THEN** `--cup-z-modal` resolves to `500`

