## Why

P0 and P1 corrected the primitive chromatic palette and the runtime tint layer, but the semantic layer still needs an explicit verification pass so role-based tokens do not drift from Apple’s intended meaning. This phase reduces the risk of semantic regressions in labels, fills, backgrounds, separators, links, and contrast overrides after the lower layers changed.

## What Changes

- Re-verify the semantic role mapping in `libs/tokens/src/lib/_scheme.scss` against Apple’s foreground and structural color semantics.
- Re-check the semantic overrides in `libs/tokens/src/lib/_dark.scss` and `libs/tokens/src/lib/_a11y.scss` so dark and high-contrast behavior still improves accessibility correctly.
- Revalidate `link`, separators, grouped backgrounds, and other coupled semantic roles against the corrected palette baseline.
- Update semantic documentation or architecture notes only if they still describe the old palette assumptions.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `token-palette`: tighten the semantic color contract for `_scheme.scss` so labels, vibrant labels, fills, backgrounds, separators, link, and placeholder remain role-correct after palette correction.
- `token-overrides`: re-verify the semantic portions of `_dark.scss` and `_a11y.scss` so dark-mode and accessibility overrides still preserve the intended semantic hierarchy.

## Impact

- `libs/tokens/src/lib/_scheme.scss`
- semantic portions of `libs/tokens/src/lib/_dark.scss`
- semantic portions of `libs/tokens/src/lib/_a11y.scss`
- semantic architecture notes or token comments if they still reflect pre-correction assumptions
- Storybook or playground smoke checks for color-sensitive semantic surfaces
