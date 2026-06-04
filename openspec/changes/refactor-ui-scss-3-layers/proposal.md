## Why

Phase 1 components use inline `styles: [...]` with raw `var(--cup-*)` strings. This bypasses the 3-layer token validation architecture built in Steps 3 and 5. A typo like `var(--cup-label-primary)` silently produces broken CSS with no build-time error. Extracting styles to external `.scss` files and using typed mixins from `_component-api.scss` enables full compile-time validation.

## What Changes

- **6 components** — extract inline `styles: [...]` to external `styleUrl: './cup-<name>.scss'`
- **6 new `.scss` files** — each uses `@use '@ngx-cupertino/core' as cup` and component mixins
- **6 `.ts` files modified** — remove inline `styles:` array, add `styleUrl` property

### Migration Pattern

```scss
// Before: inline styles with raw var(--cup-*)
styles: [`:host { padding: var(--cup-spacing-3); ... }`]

// After: external .scss with typed mixins
styleUrl: './cup-button.scss'
// cup-button.scss:
@use '@ngx-cupertino/core' as cup;
:host { @include cup.cup-button-base; }
:host(.filled) { @include cup.cup-button-variant('filled'); }
```

## Capabilities

### Modified Capabilities

- `cup-button`: Extract inline styles to `cup-button.scss`, use component mixins
- `cup-toggle`: Extract inline styles to `cup-toggle.scss`, use component mixins
- `cup-text-field`: Extract inline styles to `cup-text-field.scss`, use component mixins
- `cup-slider`: Extract inline styles to `cup-slider.scss`, use component mixins
- `cup-stepper`: Extract inline styles to `cup-stepper.scss`, use component mixins
- `cup-progress`: Extract inline styles to `cup-progress.scss`, use component mixins

## Impact

- **New files**: 6 `.scss` files
- **Modified files**: 6 `.ts` files (remove `styles:`, add `styleUrl`)
- **Breaking**: None. Visual output unchanged. Same CSS generated.
- **Depends on**: `_api.scss` (Step 3), `_component-api.scss` (Step 5)
