## Why

P0 through P2 stabilized the base palette, tint, and semantic layers, but the desktop platform layer and material/glass families still need a disciplined verification pass to confirm they stay scoped, layered, and free of accidental palette drift after the lower layers changed.

## What Changes

- Re-verify the curated desktop platform tokens in `libs/tokens/src/lib/_platform.scss` against the corrected chromatic palette and the project's documented partial-coverage policy.
- Re-check `_glass.scss` and `_materials.scss` so surface material tokens remain separate from semantic foreground and background roles.
- Update platform or material documentation only if it still encodes pre-correction assumptions about chromatic values.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `token-palette`: verify that glass and material token families remain isolated rendering primitives and are not used as substitutes for semantic content roles after the palette correction.
- `token-overrides`: verify the macOS platform layer in `_platform.scss` still reads correctly against the corrected base palette while preserving the project's documented curated-scope policy.

## Impact

- `libs/tokens/src/lib/_platform.scss`
- `libs/tokens/src/lib/_glass.scss`
- `libs/tokens/src/lib/_materials.scss`
- platform or material architecture notes and governance docs if they still reference pre-correction assumptions
- Storybook or playground smoke checks for desktop-specific and material-heavy surfaces
