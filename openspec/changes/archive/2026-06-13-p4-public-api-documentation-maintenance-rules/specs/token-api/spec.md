## MODIFIED Requirements

### Requirement: $tokens map registers all CSS custom properties
The system SHALL maintain a `$tokens` SCSS map in `_api.scss` that registers every `--cup-*` CSS custom property from all 16 source files (~236 entries). Map keys SHALL be short names without the `--cup-` prefix. The `_api.scss` file SHALL reference the token maintenance order documented in the architecture so contributors working in the API layer are directed to the correct source of truth for future token changes.

#### Scenario: Token map contains all primitive colors
- **WHEN** `_api.scss` is loaded
- **THEN** `map-get($tokens, 'red')` returns `var(--cup-red)`
- **THEN** `map-get($tokens, 'blue')` returns `var(--cup-blue)`

#### Scenario: Token map contains semantic scheme tokens
- **WHEN** `_api.scss` is loaded
- **THEN** `map-get($tokens, 'label')` returns `var(--cup-label)`
- **THEN** `map-get($tokens, 'separator')` returns `var(--cup-separator)`

#### Scenario: API file documents the layer contract
- **WHEN** reading `libs/tokens/src/lib/_api.scss`
- **THEN** it contains a comment referencing the maintenance order and layer boundaries documented in the architecture
