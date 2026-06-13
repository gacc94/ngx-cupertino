## 1. Platform layer verification

- [x] 1.1 Compare the platform chromatic overrides in `libs/tokens/src/lib/_platform.scss` (green, teal, cyan, link, accent, gray) against the corrected four-state palette.
- [x] 1.2 Confirm that the platform scope stays curated and no undocumented macOS tokens have been introduced.

## 2. Material layer verification

- [x] 2.1 Review `libs/tokens/src/lib/_glass.scss` to confirm glass token families remain neutral rendering primitives and do not duplicate semantic roles.
- [x] 2.2 Review `libs/tokens/src/lib/_materials.scss` to confirm material tokens remain neutral surface primitives isolated from foreground and background semantics.

## 3. Spec and doc sync

- [x] 3.1 Update `openspec/specs/token-palette/spec.md` so the glass and material requirements explicitly require isolation from the semantic layer.
- [x] 3.2 Update `openspec/specs/token-overrides/spec.md` so the macOS platform requirement reinforces the curated-scope policy.
- [x] 3.3 Review platform and material architecture notes or governance docs and update wording only if they still reference pre-correction assumptions.

## 4. Validation

- [x] 4.1 Run targeted lint/build or Storybook/playground smoke checks for desktop-specific and material-heavy surfaces affected by `_platform.scss`, `_glass.scss`, and `_materials.scss`.
- [x] 4.2 Verify platform green, teal, cyan, link, and accent tokens in desktop light and dark modes to catch any chromatic drift.
