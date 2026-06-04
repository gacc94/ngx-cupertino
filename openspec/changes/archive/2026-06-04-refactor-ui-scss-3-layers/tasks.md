## 1. Extract SCSS Files

- [ ] 1.1 Button: Create `cup-button.scss` with `@use '@ngx-cupertino/core' as cup` + mixins. Update `cup-button.ts` to use `styleUrl`.
- [ ] 1.2 Toggle: Create `cup-toggle.scss` with mixins. Update `cup-toggle.ts` to use `styleUrl`.
- [ ] 1.3 TextField: Create `cup-text-field.scss` with mixins. Update `cup-text-field.ts` to use `styleUrl`.
- [ ] 1.4 Slider: Create `cup-slider.scss` with mixins. Update `cup-slider.ts` to use `styleUrl`.
- [ ] 1.5 Stepper: Create `cup-stepper.scss` with mixins. Update `cup-stepper.ts` to use `styleUrl`.
- [ ] 1.6 Progress: Create `cup-progress.scss` with mixins. Update `cup-progress.ts` to use `styleUrl`.

## 2. Verification

- [ ] 2.1 Run `bun nx build ui` — build succeeds
- [ ] 2.2 Run `bun nx test ui` — all 97 tests pass (zero regressions)
- [ ] 2.3 Run `bun biome check --write libs/ui/` — formatting clean
- [ ] 2.4 Commit with conventional commit message including emoji
