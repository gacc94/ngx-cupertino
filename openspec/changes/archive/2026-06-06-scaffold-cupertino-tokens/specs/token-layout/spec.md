## ADDED Requirements

### Requirement: Breakpoints map to Apple device widths
The system SHALL define 3 SCSS variables in `_breakpoints.scss`: `$cup-breakpoint-sm` (428px), `$cup-breakpoint-md` (768px), `$cup-breakpoint-lg` (1024px). These SHALL be SCSS variables (not CSS custom properties) because media queries require static values at compile time.

#### Scenario: iPhone is classified as mobile
- **WHEN** viewport width is 393px (iPhone 16)
- **THEN** `@include cup-mobile` media query matches

#### Scenario: iPad portrait is classified as tablet
- **WHEN** viewport width is 820px (iPad Air 11")
- **THEN** `@include cup-tablet` media query matches

### Requirement: Breakpoint mixins provide device-class queries
The system SHALL provide 6 mixins: `cup-mobile`, `cup-tablet`, `cup-desktop`, `cup-tablet-up`, `cup-mobile-landscape`, `cup-pointer`. These SHALL generate correct CSS media queries.

#### Scenario: cup-tablet-up matches iPad and above
- **WHEN** `@include cup-tablet-up` is used
- **THEN** generates `@media (min-width: 768px)`

### Requirement: Grid tokens define responsive column system
The system SHALL define 6 CSS tokens in `_grid.scss`: `grid-columns`, `grid-gutter`, `grid-margin`, `content-max-width` (640px), `content-wide-max-width` (960px), `content-full-max-width` (1200px). Values SHALL update at tablet and desktop breakpoints.

#### Scenario: Mobile grid uses 4 columns
- **WHEN** viewport width is below 768px
- **THEN** `--cup-grid-columns` resolves to `4`
- **THEN** `--cup-grid-gutter` resolves to `16px`

#### Scenario: Desktop grid uses 12 columns
- **WHEN** viewport width is at least 1024px
- **THEN** `--cup-grid-columns` resolves to `12`
- **THEN** `--cup-grid-gutter` resolves to `24px`

### Requirement: Grid mixins provide layout patterns
The system SHALL provide 4 layout mixins in `_grid.scss`: `cup-layout-stack`, `cup-layout-sidebar-detail`, `cup-layout-triple`, `cup-grid-auto`.

#### Scenario: Sidebar+detail adapts from mobile to tablet
- **WHEN** `@include cup-layout-sidebar-detail` is used
- **THEN** on mobile it renders single column
- **THEN** on tablet it renders sidebar (320px) + detail area

### Requirement: Safe area tokens protect from hardware obstructions
The system SHALL define 7 CSS tokens in `_safe-areas.scss`: `safe-top`, `safe-bottom`, `safe-left`, `safe-right` (via `env()`) and `home-indicator-height` (5px), `home-indicator-inset` (13px), `home-indicator-width` (134px).

#### Scenario: Safe area insets use CSS env() function
- **WHEN** `_safe-areas.scss` is loaded with `viewport-fit=cover`
- **THEN** `--cup-safe-top` resolves to `env(safe-area-inset-top, 0px)`
- **THEN** `--cup-safe-bottom` resolves to `env(safe-area-inset-bottom, 0px)`

### Requirement: Safe area mixins protect content from edges
The system SHALL provide 4 safe area mixins: `cup-safe-padding`, `cup-safe-top-extend`, `cup-safe-bottom-extend`, `cup-safe-horizontal`.

#### Scenario: Nav bar extends behind top inset
- **WHEN** `@include cup-safe-top-extend` is used
- **THEN** generates `padding-top: var(--cup-safe-top)`
