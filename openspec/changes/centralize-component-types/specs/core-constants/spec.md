## MODIFIED Requirements

### Requirement: CupComponentSize type is exported

The `libs/core/src/lib/constants/sizes.ts` file SHALL export a `CupComponentSize` type equal to `'sm' | 'md' | 'lg'` for visual component sizing.

#### Scenario: Type resolves to shorthand sizes

- **WHEN** using `CupComponentSize` in a component input
- **THEN** it accepts `'sm'`, `'md'`, or `'lg'`

### Requirement: CupProgressType is exported

The `libs/core/src/lib/constants/variants.ts` file SHALL export a `CupProgressType` type equal to `'linear' | 'circular'`.

#### Scenario: Type resolves to progress variants

- **WHEN** using `CupProgressType` in a component input
- **THEN** it accepts `'linear'` or `'circular'`

### Requirement: New types are exported from entry point

The `libs/core/src/index.ts` file SHALL export `CupComponentSize` and `CupProgressType`.

#### Scenario: Types accessible from package

- **WHEN** importing from `@ngx-cupertino/core`
- **THEN** `CupComponentSize` and `CupProgressType` are available as named exports
