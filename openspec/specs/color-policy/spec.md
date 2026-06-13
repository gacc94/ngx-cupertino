# color-policy Specification

## Purpose
TBD - promoted from change p2-color-policy. Update Purpose after archive.

## Requirements

### Requirement: Semantic token names have an explicit public typing policy

The project SHALL export typed semantic token names for semantic color families and SHALL keep palette and material token names separate from that semantic union.

#### Scenario: Semantic token names are typed

- **WHEN** a contributor imports the public token-name type
- **THEN** semantic color names are available as a typed union
- **AND** palette and material names are not mixed into the same union

### Requirement: Visual QA matrices cover the main adaptive color axes

The project SHALL document a repeatable visual QA matrix that covers light, dark, increased contrast, reduced transparency, base surface style, and liquid-glass surface style.

#### Scenario: Reviewers can reproduce the matrix

- **WHEN** a contributor follows the QA guidance
- **THEN** the required state combinations for Storybook or visual snapshot review are explicit
- **AND** the guidance identifies the high-risk combinations that need coverage first

### Requirement: Color values and assets follow a documented color-space policy

The project SHALL default to sRGB for token values and SHALL only permit Display P3 when the exception is intentional, documented, and tested.

#### Scenario: Color-space guidance is explicit

- **WHEN** a contributor adds a new token value or asset
- **THEN** the guidance tells them whether sRGB is expected by default
- **AND** any P3 use requires explicit approval and extra QA
