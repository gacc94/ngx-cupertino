## Why

The `@ngx-cupertino/icons` package currently has several architecture issues: `replace()` instead of `replaceAll()` for `.fill` suffix handling, no `ChangeDetectionStrategy.OnPush`, inline styles instead of external SCSS, `unknown` type for the icon map, duplicate manual icon registration, missing dev warnings for unregistered icons, and missing SF Symbol mappings for commonly used icons (`arrow-right`, `arrow-left`, `minus-circle`, `heart-crack`). These need to be fixed to match the v3/v4 spec documented in Notion.

## What Changes

- **MODIFIED**: `cup-icon.ts` — `replaceAll()` fix, `ChangeDetectionStrategy.OnPush`, host size classes, `styleUrl` external SCSS
- **NEW**: `cup-icon.scss` — external SCSS with `@use` token access, `width`/`height` defaults
- **NEW**: `lucide-icon-map.ts` — centralized kebab-name → Lucide component map
- **MODIFIED**: `provide-icons.ts` — auto-derived from `SF_SYMBOL_MAP` + `LUCIDE_ICONS`, dev warnings
- **MODIFIED**: `sf-symbol-map.ts` — add `arrow-right`, `arrow-left`, `minus-circle`, `heart.crack`
- **MODIFIED**: `ng-package.json` — add SCSS assets

## Capabilities

### Modified Capabilities
- `cup-button-component`: Not directly modified, but icons consumed by cup-button are impacted by new SF Symbol mappings

### New Capabilities
- `icons-package-v3`: Refactored icon architecture with auto-derived registration, external SCSS, type-safe icon map, and dev-mode validation

## Impact

- Files in `libs/icons/src/lib/`: cup-icon.ts, cup-icon.scss (new), lucide-icon-map.ts (new), provide-icons.ts, sf-symbol-map.ts
- Files in `libs/icons/`: ng-package.json
- No API surface changes — all existing template usages remain valid
- Backward compatible
