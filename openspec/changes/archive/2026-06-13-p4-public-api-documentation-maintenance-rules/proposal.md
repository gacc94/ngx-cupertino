## Why

P0 through P3 finalized the palette, tint, semantic, and platform/material layers, but the maintenance rules are still implicit. A consolidated documentation pass ensures future contributors can evolve the token system predictably without reopening the full audit history.

## What Changes

- Document the maintenance order for future token changes in the architecture docs.
- Codify the layer boundaries between palette, semantic, accent, platform, and material families.
- Document the gray-freeze rule, the four-state update rule, the sRGB-first policy, and the P3 exception process.
- Update `_api.scss` guidance and token readmes where needed to reference the finalized maintenance contract.

## Capabilities

### New Capabilities

- `token-maintenance-rules`: formal documentation of the maintenance order, layer boundaries, and update policies that must be followed when evolving the token system.

### Modified Capabilities

- `token-api`: update the token API documentation and `_api.scss` contract guidance to reference the finalized maintenance rules and layer contract.

## Impact

- `libs/tokens/ARCHITECTURE.md`
- `libs/core/ARCHITECTURE.md`
- `libs/tokens/src/lib/_api.scss`
- token readmes and architecture docs referencing color layers
