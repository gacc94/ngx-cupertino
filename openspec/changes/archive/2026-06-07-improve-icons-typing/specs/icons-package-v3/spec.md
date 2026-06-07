## ADDED Requirements

### Requirement: SF_SYMBOL_MAP uses as const satisfies for literal value types
The `SF_SYMBOL_MAP` constant SHALL use `as const satisfies Record<string, string>` instead of explicit `Record<string, string>` type annotation. This narrows the inferred value types from `string` to literal string types.

#### Scenario: Values are narrowed to literal types
- **WHEN** TypeScript infers the type of `SF_SYMBOL_MAP['house']`
- **THEN** the type is `"home"` (literal) instead of `string` (widened)

### Requirement: LUCIDE_ICONS uses as const satisfies for strict icon typing
The `LUCIDE_ICONS` constant SHALL use `as const satisfies Record<string, LucideIconData>` imported from `@lucide/angular`.

#### Scenario: Values are inferred as LucideIconData
- **WHEN** TypeScript infers the type of `LUCIDE_ICONS['home']`
- **THEN** the type is `typeof LucideHome` (literal) instead of a widened type

### Requirement: CupIconSize remains locally defined
The `CupIconSize` type SHALL remain defined locally in `cup-icon.ts` with a comment `// Mirrors CupComponentSize from @ngx-cupertino/core`. The icons package SHALL NOT import from `@ngx-cupertino/core`.

#### Scenario: Icons package has no core dependency
- **WHEN** `bun nx build icons` is run
- **THEN** the build succeeds without any import from `@ngx-cupertino/core`

### Requirement: Unit tests verify SF_SYMBOL_MAP integrity
The test suite SHALL verify that SF_SYMBOL_MAP is not empty, all `.fill` keys have a non-`.fill` equivalent, and all values are non-empty strings.

#### Scenario: SF_SYMBOL_MAP has valid entries
- **WHEN** tests run
- **THEN** the map is non-empty, all values are strings, and `.fill` keys have base equivalents

### Requirement: Unit tests verify LUCIDE_ICONS consistency
The test suite SHALL verify that every value in SF_SYMBOL_MAP has a corresponding key in LUCIDE_ICONS, and no orphaned keys exist in LUCIDE_ICONS not referenced by SF_SYMBOL_MAP.

#### Scenario: Maps are consistent
- **WHEN** tests run
- **THEN** all SF_SYMBOL_MAP values have entries in LUCIDE_ICONS

### Requirement: Unit tests verify CupIcon rendering
The test suite SHALL verify CupIcon renders SF Symbol names, Lucide names, `.fill` auto-detection, aria attributes, sizes (sm/md/lg/custom), strokeWidth default, and color default.

#### Scenario: CupIcon renders star icon
- **WHEN** `<cup-icon name="star" />` is rendered
- **THEN** the Lucide star icon renders in the DOM

#### Scenario: CupIcon handles fill variants
- **WHEN** `<cup-icon name="star.fill" />` is rendered
- **THEN** `isFilled` returns `true` and the icon renders filled
