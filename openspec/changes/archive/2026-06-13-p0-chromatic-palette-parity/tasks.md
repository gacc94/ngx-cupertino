## 1. Baseline lock

- [x] 1.1 Confirm the Apple chromatic parity table values to be applied for all 12 system color families.
- [x] 1.2 Confirm the existing gray ramp remains frozen and must not change in `_colors.scss`, `_dark.scss`, or `_a11y.scss`.

## 2. Palette refinement

- [x] 2.1 Update `libs/tokens/src/lib/_colors.scss` so the 12 chromatic system colors match Apple default light values.
- [x] 2.2 Update `libs/tokens/src/lib/_dark.scss` so the 12 chromatic system colors match Apple default dark values.
- [x] 2.3 Update `libs/tokens/src/lib/_a11y.scss` so the 12 chromatic system colors match Apple increased-contrast light and dark values.

## 3. Regression guardrails

- [x] 3.1 Verify that no gray token changed while refining the chromatic palette.
- [x] 3.2 Verify that semantic and tint token files were not modified as part of this slice unless a trivial syntax adjustment was required.

## 4. Validation

- [x] 4.1 Re-check every chromatic family row against the documentation parity table after implementation.
- [x] 4.2 Rebuild token consumers and perform a visual smoke check on color-sensitive surfaces.
