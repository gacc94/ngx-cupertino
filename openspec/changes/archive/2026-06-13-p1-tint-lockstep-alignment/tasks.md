## 1. Baseline alignment

- [x] 1.1 Compare each tint family in `libs/tokens/src/lib/_tints.scss` against the P0 chromatic baseline and record the expected light, dark, and increased-contrast values.
- [x] 1.2 Confirm the gray tint family remains aligned with the frozen gray baseline and identify any values that must not change.

## 2. Runtime tint refinement

- [x] 2.1 Update the default light tint values in `libs/tokens/src/lib/_tints.scss` to match the corrected Apple baseline.
- [x] 2.2 Update the dark tint overrides in `libs/tokens/src/lib/_tints.scss` for every named tint family.
- [x] 2.3 Update the increased-contrast tint overrides in `libs/tokens/src/lib/_tints.scss`, including the dark high-contrast blocks.
- [x] 2.4 Re-check `tint-subtle`, `tint-on`, and `tint-container` for contrast-sensitive families after the base values change.

## 3. Spec and doc sync

- [x] 3.1 Keep `openspec/specs/design-tokens-tints/spec.md` aligned with the runtime contract by updating the preset count, selector model, and state-aware override language.
- [x] 3.2 Review tint-related architecture or token docs for any stale references to theme-layer tint overrides and update wording only if needed.

## 4. Validation

- [x] 4.1 Rebuild tint consumers or run the relevant playground/Storybook smoke checks for `data-tint` and `data-mode` states.
- [x] 4.2 Verify yellow and gray tint cases in light, dark, and increased-contrast modes to catch contrast regressions.
