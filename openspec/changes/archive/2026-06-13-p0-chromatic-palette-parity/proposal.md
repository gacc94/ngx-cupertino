## Why

The project already matches Apple exactly for the gray ramp, but most chromatic system colors are still numerically different from the captured Apple specification table. This needs to be corrected first so the token palette becomes a trustworthy baseline for later tint, semantic, and platform validation.

## What Changes

- Refine the chromatic system palette values in `libs/tokens/src/lib/_colors.scss`, `libs/tokens/src/lib/_dark.scss`, and `libs/tokens/src/lib/_a11y.scss` to match the Apple four-state specification table.
- Freeze the existing gray ramp and explicitly treat it as unchanged in this slice.
- Document that chromatic palette updates must be applied across default light, default dark, increased-contrast light, and increased-contrast dark together.
- Keep semantic and tint layers out of scope for implementation in this change, except for validation notes that confirm they will be reviewed later.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `design-tokens-colors`: refine the chromatic palette requirements so the project matches the Apple system color specification table across all four supported states while preserving the already-correct gray ramp.

## Impact

- `libs/tokens/src/lib/_colors.scss`
- `libs/tokens/src/lib/_dark.scss`
- `libs/tokens/src/lib/_a11y.scss`
- color token documentation and parity notes if needed for validation
