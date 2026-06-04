## ADDED Requirements

### Requirement: _api.scss exists with complete token map

The `libs/tokens/src/lib/_api.scss` file SHALL exist and export a `$tokens` SCSS map with 178 entries mapping string keys to `var(--cup-*)` CSS custom property values. The `token($name)` function SHALL validate keys at compile time.

#### Scenario: File is importable from barrel

- **WHEN** `@use '@ngx-cupertino/tokens' as t` is used in a SCSS file
- **THEN** `t.token('label')` resolves to `var(--cup-label)`
- **THEN** `t.token('radius-md')` resolves to `var(--cup-radius-md)`

#### Scenario: Invalid key fails build

- **WHEN** `t.token('nonexistent')` is called and the key does not exist in `$tokens`
- **THEN** SCSS compilation fails with `@error` message containing `"nonexistent"` and the list of valid keys

#### Scenario: All source tokens are mapped

- **WHEN** comparing `$tokens` keys against all `--cup-*` properties in `libs/tokens/src/lib/_colors.scss`, `_typography.scss`, `_spacing.scss`, `_elevation.scss`, `_radius.scss`, `_motion.scss`, `_themes.scss`, `_tints.scss`
- **THEN** every `--cup-*` property has a corresponding key in `$tokens` (178 total)

### Requirement: Barrel includes api

The `libs/tokens/src/_index.scss` file SHALL include `@forward 'lib/api'`.

#### Scenario: api is forwarded

- **WHEN** reading `_index.scss`
- **THEN** it contains `@forward 'lib/api'`

### Requirement: Build succeeds

The tokens package SHALL build successfully with `bun nx build tokens`.

#### Scenario: Build passes

- **WHEN** running `bun nx build tokens`
- **THEN** the build completes without errors
