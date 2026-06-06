# token-api Specification

## Purpose
TBD - created by archiving change scaffold-cupertino-tokens. Update Purpose after archive.
## Requirements
### Requirement: $tokens map registers all CSS custom properties
The system SHALL maintain a `$tokens` SCSS map in `_api.scss` that registers every `--cup-*` CSS custom property from all 16 source files (~236 entries). Map keys SHALL be short names without the `--cup-` prefix.

#### Scenario: Token map contains all primitive colors
- **WHEN** `_api.scss` is loaded
- **THEN** `map-get($tokens, 'red')` returns `var(--cup-red)`
- **THEN** `map-get($tokens, 'blue')` returns `var(--cup-blue)`

#### Scenario: Token map contains semantic scheme tokens
- **WHEN** `_api.scss` is loaded
- **THEN** `map-get($tokens, 'label')` returns `var(--cup-label)`
- **THEN** `map-get($tokens, 'separator')` returns `var(--cup-separator)`

### Requirement: token() function validates at compile time
The system SHALL provide a `token($name)` SCSS function that validates the key exists in `$tokens` and returns `var(--cup-$name)`. If the key does not exist, SHALL emit `@error` with a descriptive message listing all valid keys.

#### Scenario: Valid token compiles successfully
- **WHEN** component uses `t.token('tint')`
- **THEN** compilation succeeds and CSS output is `var(--cup-tint)`

#### Scenario: Invalid token fails at compile time
- **WHEN** component uses `t.token('typo-token-name')`
- **THEN** SCSS compilation fails with `@error 'Token "typo-token-name" does not exist'`

### Requirement: token() is the only import from the package
Components SHALL import from `@ngx-cupertino/tokens` only via `@use '...' as t` and SHALL use `t.token()` for all token access. Components SHALL NOT use raw `var(--cup-*)` directly.

#### Scenario: Component uses validated token access
- **WHEN** component SCSS uses `@use '@ngx-cupertino/tokens' as t`
- **THEN** `color: t.token('label')` compiles to `color: var(--cup-label)`

