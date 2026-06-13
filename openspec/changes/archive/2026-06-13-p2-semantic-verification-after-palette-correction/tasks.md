## 1. Baseline semantic review

- [x] 1.1 Compare the semantic role mapping in `libs/tokens/src/lib/_scheme.scss` against Apple foreground and structural color guidance after the palette correction.
- [x] 1.2 Confirm that `link`, separators, grouped backgrounds, and placeholder remain distinct semantic roles and note any mismatch.

## 2. Override verification

- [x] 2.1 Review the semantic portions of `libs/tokens/src/lib/_dark.scss` to confirm dark-mode labels, backgrounds, separators, and link behavior still preserve hierarchy.
- [x] 2.2 Review the semantic portions of `libs/tokens/src/lib/_a11y.scss` to confirm increased-contrast semantic overrides still improve readability in both light and dark modes.

## 3. Spec and doc sync

- [x] 3.1 Update `openspec/specs/token-palette/spec.md` so the semantic color contract explicitly reflects the post-palette-correction role-based model.
- [x] 3.2 Update `openspec/specs/token-overrides/spec.md` so dark and accessibility override requirements explicitly cover the semantic layer.
- [x] 3.3 Update semantic architecture notes or token comments only if they still reference pre-correction assumptions.

## 4. Validation

- [x] 4.1 Run targeted lint/build or Storybook/playground smoke checks for semantic color surfaces affected by `_scheme.scss`, `_dark.scss`, and `_a11y.scss`.
- [x] 4.2 Verify label, link, separator, and grouped-background cases in light, dark, and increased-contrast modes to catch semantic regressions.
