## Why

The color system already has semantic tokens, tint layers, and material primitives, but the usage rules are still mostly implicit. That makes it easy for component code and docs to drift away from Apple-aligned color semantics, especially around platform-specific coverage, Liquid Glass usage, and raw effect colors.

## What Changes

- Add a formal color-governance contract that explains how palette, semantic, accent, material, and effect colors are allowed to be used.
- Clarify that `_platform.scss` is a curated desktop augmentation layer, not a full AppKit parity guarantee.
- Document Liquid Glass color rules so tinted glass stays an emphasis mode, not the default.
- Audit repeated raw effect colors and promote reused values to tokens when that meaningfully reduces duplication.
- Update architecture and token docs so the color rules are easy to apply during component work and review.

## Capabilities

### New Capabilities

- `color-governance`: formal rules for semantic color usage, desktop platform scope, Liquid Glass color policy, and raw effect-value review.

### Modified Capabilities

None.

## Impact

- `libs/core/ARCHITECTURE.md`
- `libs/tokens/src/lib/_api.scss`
- `libs/tokens/src/lib/_scheme.scss`
- `libs/tokens/src/lib/_tints.scss`
- `libs/tokens/src/lib/_glass.scss`
- `libs/tokens/src/lib/_materials.scss`
- `libs/tokens/src/lib/_platform.scss`
- color-related component styles that still rely on raw values
