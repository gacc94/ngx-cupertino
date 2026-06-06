## ADDED Requirements

### Requirement: cup-rem() converts pixels to rem using iOS base
The system SHALL provide a `cup-rem($px)` SCSS function that divides the input by 17 (iOS body size) and returns a rem value. SHALL emit `@error` if input is not a number.

#### Scenario: iOS body size equals 1rem
- **WHEN** `cup-rem(17)` is called
- **THEN** returns `1rem`

#### Scenario: Large title converts correctly
- **WHEN** `cup-rem(34)` is called
- **THEN** returns `2rem`

### Requirement: cup-space() provides grid shorthand with validation
The system SHALL provide a `cup-space($level)` SCSS function that returns `var(--cup-space-$level)`. SHALL validate that level is an integer 1-8. SHALL emit `@error` if level is outside range.

#### Scenario: Level 4 returns 16px grid value
- **WHEN** `cup-space(4)` is called
- **THEN** returns `var(--cup-space-4)`

#### Scenario: Invalid level fails at compile time
- **WHEN** `cup-space(9)` is called
- **THEN** SCSS compilation fails with error about valid range 1-8

### Requirement: cup-z() provides z-index shorthand with validation
The system SHALL provide a `cup-z($name)` SCSS function that returns `var(--cup-z-$name)`. SHALL validate the name against the 8 valid z-index levels. SHALL emit `@error` if name is invalid.

#### Scenario: Named z-index level resolves correctly
- **WHEN** `cup-z('modal')` is called
- **THEN** returns `var(--cup-z-modal)`

#### Scenario: Invalid z-index name fails at compile time
- **WHEN** `cup-z('header')` is called
- **THEN** SCSS compilation fails with error listing valid names

### Requirement: Mixins provide reusable multi-property patterns
The system SHALL provide 21 mixins in `_mixins.scss` organized in 6 categories: Glass & Material (5), Interaction & State (3), Transitions (4), Text (2), Accessibility (1), Layout (6).

#### Scenario: cup-glass mixin applies all 5 Liquid Glass properties
- **WHEN** `@include cup-glass('md')` is used
- **THEN** generates backdrop-filter, background, box-shadow (with inset), and border

#### Scenario: cup-interactive provides hover/press states cross-platform
- **WHEN** `@include cup-interactive` is used
- **THEN** generates opacity transitions + `:active` on all devices
- **THEN** generates `:hover` only inside `@media (hover: hover) and (pointer: fine)`

#### Scenario: cup-disabled handles disabled state
- **WHEN** `@include cup-disabled` is used
- **THEN** generates `opacity: var(--cup-opacity-disabled)` + `pointer-events: none`

### Requirement: _index.scss defines correct cascade order
The system SHALL provide `_index.scss` that `@forward`s all 22 files in the correct cascade order: Utilities → Primitives → Semantic → Layout → Overrides → Mixins. The order SHALL ensure dark → platform → a11y overrides resolve correctly.

#### Scenario: Cascade order ensures overrides work
- **WHEN** `@use '@ngx-cupertino/tokens'` is imported
- **THEN** `[data-mode="dark"]` overrides `:root` values
- **THEN** `@media (hover: hover)` overrides `[data-mode="dark"]` for macOS
- **THEN** `@media (prefers-contrast: more)` overrides both

### Requirement: ARCHITECTURE.md documents the system
The system SHALL include `libs/tokens/ARCHITECTURE.md` with file tree, layer descriptions, cascade diagrams (Mermaid), dependency graph, and maintenance rules.

#### Scenario: Architecture doc includes cascade diagram
- **WHEN** ARCHITECTURE.md is read
- **THEN** it contains a Mermaid graph showing the CSS cascade flow
- **THEN** it contains a Mermaid graph showing file dependencies
