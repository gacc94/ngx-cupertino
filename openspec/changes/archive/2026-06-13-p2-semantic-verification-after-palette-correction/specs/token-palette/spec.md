## MODIFIED Requirements

### Requirement: Semantic color assignments are defined
The system SHALL define 28 semantic color tokens in `_scheme.scss` mapping to contextual roles (labels, vibrant labels, fills, vibrant fills, backgrounds, grouped backgrounds, separators, link, placeholder). The semantic layer SHALL preserve role-based meaning after palette correction and SHALL not derive semantic roles directly from primitive color names.

#### Scenario: Label tokens remain role-based
- **WHEN** `_scheme.scss` is loaded
- **THEN** `--cup-label`, `--cup-label-secondary`, `--cup-label-tertiary`, and `--cup-label-quaternary` remain defined as foreground semantic tokens

#### Scenario: Link remains the accent-coupled semantic token
- **WHEN** `_scheme.scss` is loaded
- **THEN** `--cup-link` remains defined as the semantic link token
- **THEN** `--cup-placeholder` remains defined as the placeholder token

#### Scenario: Background and separator hierarchy remains distinct
- **WHEN** `_scheme.scss` is loaded
- **THEN** `--cup-bg`, `--cup-bg-secondary`, `--cup-bg-tertiary`, `--cup-bg-grouped`, `--cup-bg-grouped-secondary`, `--cup-bg-grouped-tertiary`, `--cup-separator`, and `--cup-separator-opaque` remain defined as separate structural semantic tokens
