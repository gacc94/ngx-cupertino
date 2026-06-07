## 1. SF Symbol Map

- [x] 1.1 Update `sf-symbol-map.ts` to use `as const satisfies Record<string, string>`
- [x] 1.2 If needed, add type assertion in `cup-icon.ts` for index access

## 2. Lucide Icon Map

- [x] 2.1 Update `lucide-icon-map.ts` to use `as const satisfies Record<string, LucideIconData>`
- [x] 2.2 Import `LucideIconData` from `@lucide/angular`

## 3. CupIconSize

- [x] 3.1 Verify `CupIconSize` is local (not imported from core)
- [x] 3.2 Add `// Mirrors CupComponentSize from @ngx-cupertino/core` comment

## 4. Unit Tests

- [x] 4.1 SF_SYMBOL_MAP tests: non-empty, .fill keys have base equivalents, all values non-empty strings
- [x] 4.2 LUCIDE_ICONS tests: non-empty, consistency with SF_SYMBOL_MAP values
- [x] 4.3 CupIcon rendering: SF Symbol name, Lucide name, .fill auto-detection, aria attributes
- [x] 4.4 CupIcon inputs: sizes (sm/md/lg/custom), strokeWidth, color, fill boolean
- [x] 4.5 provideCupIcons tests: returns provider without errors

## 5. Validation

- [x] 5.1 Run `bun nx build icons` and verify compilation
- [x] 5.2 Run `bun nx test icons` and verify tests pass
