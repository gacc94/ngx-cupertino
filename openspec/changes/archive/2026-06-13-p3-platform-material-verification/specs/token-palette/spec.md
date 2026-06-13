## MODIFIED Requirements

### Requirement: Glass tokens define Liquid Glass material
The system SHALL define 17 tokens in `_glass.scss` covering Regular glass (sm/md/lg × 4 properties), Clear glass (4 properties), and an inset highlight token. The glass token family SHALL remain a neutral rendering primitive and SHALL not be used as a substitute for semantic foreground, background, or separator roles.

#### Scenario: Regular glass medium is the default size
- **WHEN** `_glass.scss` is loaded
- **THEN** `--cup-glass-bg-md` resolves to `rgba(255, 255, 255, 0.40)`
- **THEN** `--cup-glass-blur-md` resolves to `blur(30px) saturate(200%)`

#### Scenario: Glass tokens remain rendering primitives
- **WHEN** `_glass.scss` is loaded
- **THEN** no glass token is defined with a semantic role name or used as a content color replacement

### Requirement: Materials tokens define system blur effects
The system SHALL define 12 tokens in `_materials.scss` covering 5 thickness levels (ultrathin → chrome), 5 blur values, and 2 scroll edge dimensions. The material token family SHALL remain a neutral rendering primitive and SHALL stay isolated from the semantic color layer.

#### Scenario: Material thickness levels provide progressive opacity
- **WHEN** `_materials.scss` is loaded
- **THEN** `--cup-material-ultrathin` resolves to `rgba(255, 255, 255, 0.15)`
- **THEN** `--cup-material-thick` resolves to `rgba(255, 255, 255, 0.70)`

#### Scenario: Material tokens remain independent of semantic roles
- **WHEN** `_materials.scss` is loaded
- **THEN** no material token duplicates a semantic foreground, background, or separator token
