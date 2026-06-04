## Why

Components currently hardcode SCSS patterns with raw `var(--cup-*)` tokens. Each component duplicates the same token combinations for base styles, variants, sizes, and states. This creates inconsistency risk and makes token migration painful. The 3-layer validation model established in Step 3 (`_api.scss`) and Step 5 (`_mixins.scss`) needs a third layer: semantic mixins per component pattern that encapsulate the correct token combinations.

## What Changes

- **New file**: `libs/core/src/lib/styles/_component-api.scss` — typed SCSS mixins for each Phase 1 component pattern (Button, Toggle, TextField, Slider, Progress) plus shared states
- **Update barrel**: `libs/core/src/_index.scss` — add `@forward 'lib/styles/component-api'`
- **Update package.json**: `libs/core/package.json` — add `./styles/component-api` SCSS export

### Mixins Included

- **Shared**: `cup-disabled`, `cup-interactive`
- **Button**: `cup-button-base`, `cup-button-variant($variant)`, `cup-button-size($size)`
- **Toggle**: `cup-toggle-track`, `cup-toggle-thumb`
- **TextField**: `cup-text-field-container`, `cup-text-field-input`
- **Slider**: `cup-slider-track`, `cup-slider-fill`, `cup-slider-thumb`
- **Progress**: `cup-progress-track`, `cup-progress-fill`

## Capabilities

### New Capabilities

- `cup-component-api`: Semantic SCSS mixins that encapsulate token combinations per component pattern. Components use `@include cup.cup-button-base` instead of duplicating token lists. Mixins internally use `t.token()` from the Token API Layer for build-time validation.

### Modified Capabilities

- `core-scss`: Barrel updated with `@forward 'lib/styles/component-api'`. Package exports updated.

## Impact

- **New file**: `libs/core/src/lib/styles/_component-api.scss` (~150 lines)
- **Modified files**: `libs/core/src/_index.scss` (1 line), `libs/core/package.json` (3 lines)
- **Breaking**: None. Additive only. Existing components continue using their current SCSS until migrated.
- **Future work**: Refactor existing components to use these mixins (separate change)
