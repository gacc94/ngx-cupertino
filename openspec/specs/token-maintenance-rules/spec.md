## ADDED Requirements

### Requirement: Maintenance order is documented and followed
The system SHALL document a mandatory 6-step maintenance order for future token changes in `libs/tokens/ARCHITECTURE.md`. The order SHALL be: (1) check Apple source and parity tables, (2) update palette source values, (3) align tint families, (4) validate semantic stability, (5) review platform and material layers, (6) update API and documentation.

#### Scenario: Maintenance order is explicit in architecture docs
- **WHEN** reading `libs/tokens/ARCHITECTURE.md`
- **THEN** it contains a "Token Maintenance" section with the numbered 6-step maintenance order

### Requirement: Layer boundaries are documented
The architecture documentation SHALL clearly separate palette, semantic, accent, platform, and material token families. No contributor SHALL confuse primitive palette tokens with semantic role tokens, accent tint tokens, or material rendering primitives.

#### Scenario: Layer contract is explicit
- **WHEN** reading the token and core architecture documentation
- **THEN** the five color families are distinctly named and described

### Requirement: Gray freeze rule is documented
The architecture documentation SHALL state that the six gray scale tokens (`--cup-gray` through `--cup-gray-6`) are frozen and SHALL NOT change unless Apple updates the official gray baseline.

#### Scenario: Gray freeze rule is explicit
- **WHEN** reading `libs/tokens/ARCHITECTURE.md`
- **THEN** it contains an explicit statement that gray tokens must not change while refining chromatic values

### Requirement: Four-state update rule is documented
The architecture documentation SHALL state that any chromatic palette update MUST be applied across all four supported states together: default light, default dark, increased-contrast light, and increased-contrast dark.

#### Scenario: Four-state rule is explicit
- **WHEN** reading `libs/tokens/ARCHITECTURE.md`
- **THEN** it contains an explicit statement that chromatic families must be updated as four-state units

### Requirement: sRGB-first policy is documented
The architecture documentation SHALL document the sRGB-first default policy and SHALL describe the lightweight exception process required for any future Display P3 token addition.

#### Scenario: sRGB-first policy is explicit
- **WHEN** reading the token architecture or README documentation
- **THEN** it states that token values default to sRGB and that Display P3 additions require explicit approval and extra visual QA

### Requirement: Maintenance rules are referenced from the API layer
The `_api.scss` file SHALL include a comment referencing the maintenance order documented in the architecture, so contributors working in the API layer are directed to the correct source of truth.

#### Scenario: API file references maintenance contract
- **WHEN** reading `libs/tokens/src/lib/_api.scss`
- **THEN** it contains a comment that points to the maintenance order in the architecture documentation
