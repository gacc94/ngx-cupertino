## MODIFIED Requirements

### Requirement: _themes.scss uses data-mode instead of data-theme

The `libs/tokens/src/lib/_themes.scss` file SHALL use `[data-mode="dark"]` and `[data-mode="light"]` selectors instead of `[data-theme="dark"]`. All ~70 dark mode token overrides SHALL be under `[data-mode="dark"]`. `:root` SHALL include `color-scheme: light dark`.

#### Scenario: Dark mode applies via data-mode attribute

- **WHEN** `<html data-mode="dark">` is set
- **THEN** all `[data-mode="dark"]` CSS custom property overrides are active
- **THEN** `--cup-background` is `#000000`, `--cup-label` is `rgba(235,235,245,1)`

#### Scenario: No more data-theme references

- **WHEN** searching for `data-theme` in `libs/tokens/src/lib/_themes.scss`
- **THEN** no occurrences are found

### Requirement: _tints.scss uses data-tint attribute selectors

The `libs/tokens/src/lib/_tints.scss` file SHALL use `[data-tint="blue"]`, `[data-tint="indigo"]`, etc. attribute selectors for all 13 tints. Each selector SHALL set `--cup-tint`, `--cup-tint-subtle`, `--cup-tint-on`, `--cup-tint-container`. `[data-mode="dark"][data-tint="..."]` SHALL override `--cup-tint` per color. `:root` SHALL have fallback tint values.

#### Scenario: Tint changes via data-tint attribute

- **WHEN** `<html data-tint="indigo">` is set
- **THEN** `--cup-tint` is `#5856D6`
- **THEN** `--cup-tint-subtle` is `rgba(88,86,214,0.15)`
- **THEN** `--cup-tint-on` is `#FFFFFF`

#### Scenario: Dark mode tint override

- **WHEN** `<html data-mode="dark" data-tint="blue">` is set
- **THEN** `--cup-tint` is `#0A84FF` (dark value, not light `#007AFF`)

### Requirement: ThemeService uses data-mode and data-tint

The `ThemeService` SHALL use its already-injected `DOCUMENT` token to set `this.document.documentElement.dataset['mode']` in `applyMode()` and `this.document.documentElement.dataset['tint']` in `setTint()`. The `currentTint` signal SHALL store the tint name string. Manual `style.setProperty()` for `--cup-tint*` SHALL be kept only as hex fallback.

#### Scenario: setTheme sets data-mode via DOCUMENT

- **WHEN** `ts.setTheme('dark')` is called
- **THEN** `this.document.documentElement.dataset['mode']` is `'dark'` (via injected `DOCUMENT` token)
- **THEN** `ts.theme()` returns `'dark'`

#### Scenario: setTint sets data-tint via DOCUMENT

- **WHEN** `ts.setTint('indigo')` is called
- **THEN** `this.document.documentElement.dataset['tint']` is `'indigo'` (via injected `DOCUMENT` token)
- **THEN** `ts.currentTint()` returns `'indigo'`

### Requirement: provideCupertino always initializes both axes

The `provideCupertino()` environment initializer SHALL always call `ts.setTheme()` with config value or `'auto'` and `ts.setTint()` with config value or `'blue'`. All DOM access SHALL use the already-injected `DOCUMENT` token.

#### Scenario: Default initialization

- **WHEN** `provideCupertino()` is called without config
- **THEN** `setTheme('auto')` and `setTint('blue')` are called

### Requirement: Zero grep for old data-theme in source

A search for `data-theme` across `libs/` SHALL return zero results.

#### Scenario: No legacy references

- **WHEN** running `grep -r "data-theme" libs/`
- **THEN** no files match
