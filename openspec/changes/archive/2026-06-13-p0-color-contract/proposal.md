## Why

`@ngx-cupertino` already has a strong Apple-aligned color architecture, but the public tint contract is still incomplete for accessibility because custom tint input only models light and dark. At the same time, one component still hardcodes a semantic white surface, which breaks the token-first color governance rule.

## What Changes

- Extend the public custom tint contract to support increased-contrast variants.
- Make runtime custom tint resolution respond to both appearance and contrast.
- Keep single `#hex` tint input as a fallback-only convenience path.
- Replace the slider thumb white hardcode with a token-backed surface value.
- Update tests and documentation so the new tint contract is explicit and easy to consume.

## Capabilities

### New Capabilities

- `p0-color-contract`: adaptive custom tint typing, contrast-aware tint resolution, and token-backed semantic color cleanup for the P0 color contract.

### Modified Capabilities

-

## Impact

- `libs/core/src/lib/constants/colors.ts`
- `libs/core/src/lib/types/cupertino-config.types.ts`
- `libs/core/src/lib/services/theme.service.ts`
- `libs/core/src/lib/core.spec.ts`
- `libs/core/src/index.ts`
- `libs/ui/src/lib/slider/cup-slider.scss`
- possible token updates in `libs/tokens/src/lib/_scheme.scss`, `libs/tokens/src/lib/_dark.scss`, and `libs/tokens/src/lib/_api.scss` if an existing semantic surface token is not sufficient
- public API documentation and architecture docs for the tint contract
- Storybook behavior for color-related previews, if visuals are affected
