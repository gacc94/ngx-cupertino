## ADDED Requirements

### Requirement: 11 text style tokens exist

The `_typography.scss` partial SHALL define 11 text style CSS custom properties: large-title, title-1, title-2, title-3, headline, body, callout, subhead, footnote, caption-1, caption-2, each with size, weight, leading, and tracking values from the iOS 26 SF Pro type scale.

#### Scenario: All text styles defined

- **WHEN** reading `libs/tokens/src/lib/_typography.scss`
- **THEN** it defines `--cup-text-large-title` through `--cup-text-caption-2` (11 tokens)

### Requirement: Font weight tokens exist

The `_typography.scss` partial SHALL define 4 font weight tokens: `--cup-font-weight-regular` (400), `--cup-font-weight-medium` (500), `--cup-font-weight-semibold` (600), `--cup-font-weight-bold` (700).

#### Scenario: Font weights defined

- **WHEN** reading `libs/tokens/src/lib/_typography.scss`
- **THEN** it defines exactly 4 `--cup-font-weight-*` tokens

### Requirement: Font family tokens exist with SF Pro

The `_typography.scss` partial SHALL define `--cup-font-family` (system font stack including SF Pro Text/Display) and `--cup-font-family-mono` (SF Mono).

#### Scenario: Font families defined

- **WHEN** reading `libs/tokens/src/lib/_typography.scss`
- **THEN** `--cup-font-family` contains `'SF Pro Text'` and `--cup-font-family-mono` contains `'SF Mono'`
