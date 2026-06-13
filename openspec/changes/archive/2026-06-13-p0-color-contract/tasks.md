## 1. Public tint contract

- [x] 1.1 Extend `CupTintPalette` to support optional `lightHighContrast` and `darkHighContrast` values while keeping existing `{ light, dark }` callers valid.
- [x] 1.2 Update public exports and inline docs so the tint contract clearly distinguishes adaptive palettes from fallback-only `#hex` input.

## 2. Contrast-aware runtime tint resolution

- [x] 2.1 Update `ThemeService` to resolve custom tint palettes against both appearance and `prefers-contrast: more`, with deterministic fallback behavior.
- [x] 2.2 Keep named tint handling on the existing dataset/token path and ensure runtime sync still updates the document root correctly.
- [x] 2.3 Add or update core tests for light, dark, high-contrast, fallback, and named-tint behavior.

## 3. Semantic slider token cleanup

- [x] 3.1 Replace the slider thumb `#fff` hardcode with a token-backed semantic surface value, or add the smallest new token needed if no existing token fits.
- [x] 3.2 Update slider tests or visual checks if the token change affects light/dark rendering.

## 4. Validation and documentation

- [x] 4.1 Update architecture/docs so the fallback-only hex tint path is explicit and the new adaptive contract is documented.
- [x] 4.2 Run `core`, `ui`, and Storybook validation plus the required lint/format checks.
- [x] 4.3 Confirm the change is ready for `/opsx-apply` by verifying all tasks are complete and the implementation scope matches the spec.
