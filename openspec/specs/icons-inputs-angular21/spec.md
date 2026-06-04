# icons-inputs-angular21 Specification

## Purpose
TBD - created by archiving change refactor-icons-angular-21. Update Purpose after archive.
## Requirements
### Requirement: fill input uses booleanAttribute transform

The `fill` input SHALL use `booleanAttribute` transform to allow HTML-native boolean attribute syntax.

#### Scenario: HTML-native boolean

- **WHEN** template has `<cup-icon name="heart" fill />`
- **THEN** `fill()` returns `true` without requiring `[fill]="true"` binding

#### Scenario: Explicit binding still works

- **WHEN** template has `<cup-icon name="heart" [fill]="true" />`
- **THEN** `fill()` returns `true`

### Requirement: strokeWidth input uses numberAttribute transform

The `strokeWidth` input SHALL use `numberAttribute` transform to auto-coerce string values to numbers.

#### Scenario: String attribute coerce

- **WHEN** template has `<cup-icon name="heart" strokeWidth="2" />`
- **THEN** `strokeWidth()` returns `2` (number, not string)

