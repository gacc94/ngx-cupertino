## Why

P0 corrected the raw chromatic palette, but the runtime tint layer still needs to be checked against that new baseline so accent behavior stays numerically aligned across light, dark, and increased-contrast modes. This phase prevents the tint system from drifting into a second, inconsistent color model.

## What Changes

- Align the named tint families in `libs/tokens/src/lib/_tints.scss` with the corrected Apple chromatic baseline.
- Update light, dark, and increased-contrast tint values together so the runtime tint model stays state-aware.
- Re-evaluate derived tint stops (`tint-subtle`, `tint-on`, `tint-container`) after the base tint values are updated.
- Preserve the existing `data-tint` API and token names unless a semantic mismatch is found.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `design-tokens-tints`: align runtime tint presets with the corrected Apple palette baseline across light, dark, and increased-contrast states while preserving the existing `data-tint` model and derived tint tokens.

## Impact

- `libs/tokens/src/lib/_tints.scss`
- tint-related documentation and visual QA notes if wording or examples need to reflect the corrected palette baseline
- Storybook or token consumer smoke checks for tint-sensitive surfaces
