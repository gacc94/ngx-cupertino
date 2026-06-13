## ADDED Requirements

### Requirement: Semantic color families have explicit usage rules

The project SHALL define a formal color contract that states how palette, semantic, accent, material, glass, and effect colors may be used.

#### Scenario: Family boundaries are documented

- **WHEN** a contributor reads the color-governance guidance
- **THEN** it states that `label*` is foreground-only, `fill*` is supporting-surface-only, `bg*` is structural-background-only, `separator*` is separator-only, `tint*` is accent/interaction-only, and `glass*` and `material*` are material-layer only

### Requirement: Desktop platform tokens are documented as partial coverage

The project SHALL describe `_platform.scss` as a curated desktop augmentation layer and SHALL state that it does not guarantee full AppKit parity.

#### Scenario: Platform scope is explicit

- **WHEN** a contributor reads the platform token guidance
- **THEN** it states that new desktop tokens need a documented semantic role and that parity gaps are acceptable when the project only needs a subset of roles

### Requirement: Liquid Glass color usage is neutral-first

The project SHALL document that the default Liquid Glass surface is neutral and that tinted glass is an emphasis mode used sparingly and only when contrast is explicitly validated.

#### Scenario: Glass rules discourage overuse

- **WHEN** a contributor reads the glass governance guidance
- **THEN** it states that neutral glass is the default, tinted glass is optional emphasis, and dense controls or colorful labels require contrast review

### Requirement: Reused raw effect colors are either tokenized or justified

The project SHALL require repeated raw effect-only color values to be either promoted to a shared token or justified as a component-local exception.

#### Scenario: Duplicate effect colors are governed

- **WHEN** the audit finds the same raw overlay, halo, shadow, or sheen color reused across components
- **THEN** the change documentation records whether it becomes a token or remains local with a written justification
