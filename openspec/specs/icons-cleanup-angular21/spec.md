# icons-cleanup-angular21 Specification

## Purpose
TBD - created by archiving change refactor-icons-angular-21. Update Purpose after archive.
## Requirements
### Requirement: standalone: true is removed from cup-icon

The `@Component` decorator SHALL NOT include `standalone: true` as it is the default in Angular v20+.

#### Scenario: No standalone declaration

- **WHEN** reading `cup-icon.ts`
- **THEN** the `@Component` decorator does not contain `standalone: true`

### Requirement: SIZE_MAP uses as const satisfies

The `SIZE_MAP` constant SHALL use `as const satisfies Record<CupIconSize, number>` for stricter type inference.

#### Scenario: Satisfies keyword used

- **WHEN** reading `cup-icon.ts`
- **THEN** `SIZE_MAP` declaration contains `as const satisfies`

### Requirement: provideCupIcons has no redundant type annotation

The `provideCupIcons()` function SHALL not have an explicit return type annotation since `provideLucideIcons()` already returns the correct type.

#### Scenario: No explicit return type

- **WHEN** reading `provide-icons.ts`
- **THEN** `provideCupIcons()` does not have an explicit `: EnvironmentProviders` return type

