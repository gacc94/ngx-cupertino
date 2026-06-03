# design-tokens-radius Specification

## Purpose
TBD - created by archiving change step-3-design-tokens. Update Purpose after archive.
## Requirements
### Requirement: Border radius tokens exist with 5 levels

The `_radius.scss` partial SHALL define 5 border radius tokens: `--cup-radius-sm` (8px), `--cup-radius-md` (12px), `--cup-radius-lg` (16px), `--cup-radius-xl` (24px), `--cup-radius-full` (9999px).

#### Scenario: Radius scale defined

- **WHEN** reading `libs/tokens/src/lib/_radius.scss`
- **THEN** it defines `--cup-radius-sm` through `--cup-radius-full` (5 tokens) with increasing values

