## 1. New Files

- [x] 1.1 Create `libs/icons/src/lib/cup-icon.scss` with `@use` token access, `:host` + `.cup-small` + `.cup-large` sizes
- [x] 1.2 Create `libs/icons/src/lib/lucide-icon-map.ts` with typed map of all 55+ icons

## 2. Modified Files

- [x] 2.1 Update `libs/icons/src/lib/cup-icon.ts` — OnPush, replaceAll, host size classes, styleUrl
- [x] 2.2 Update `libs/icons/src/lib/provide-icons.ts` — auto-derive from SF_SYMBOL_MAP + LUCIDE_ICONS, dev warnings
- [x] 2.3 Update `libs/icons/src/lib/sf-symbol-map.ts` — add arrow-right, arrow-left, minus-circle, heart.crack
- [x] 2.4 Update `libs/icons/ng-package.json` — add SCSS assets

## 3. Cleanup

- [x] 3.1 Remove inline `styles: [...]` from cup-icon.ts (moved to external SCSS)
- [x] 3.2 Remove unused imports from cup-icon.ts (LucideConfig, provideLucideConfig, LUCIDE_ICON_NAMES)

## 4. Validation

- [x] 4.1 Run `bun nx build icons` and verify compilation
- [x] 4.2 Verify all existing SF Symbol mappings still resolve correctly
- [x] 4.3 Verify new mappings (arrow-right, minus-circle, heart.crack) are registered
