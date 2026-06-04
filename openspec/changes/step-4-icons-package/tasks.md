## 1. Install Dependency

- [x] 1.1 Install `@lucide/angular`: `bun add @lucide/angular`

## 2. Create SF Symbol Map

- [x] 2.1 Create `libs/icons/src/lib/sf-symbol-map.ts`
- [x] 2.2 Export `SF_SYMBOL_MAP` as `Record<string, string>` with at least 60 entries
- [x] 2.3 Include fill variants mapping to same Lucide name
- [x] 2.4 Include navigation icons (house, gear, bell, magnifyingglass, person.circle)
- [x] 2.5 Include action icons (trash, pencil, plus, xmark, square.and.arrow.up)
- [x] 2.6 Include chevron icons (left, right, up, down)
- [x] 2.7 Include status icons (checkmark, exclamationmark.triangle, info.circle)

## 3. Create Icon Provider

- [x] 3.1 Create `libs/icons/src/lib/provide-icons.ts`
- [x] 3.2 Import all 55+ Lucide icons with `Lucide` PascalCase prefix from `@lucide/angular`
- [x] 3.3 Implement `provideCupIcons()` returning `EnvironmentProviders`
- [x] 3.4 Call `provideLucideIcons()` with all imported icons
- [x] 3.5 Verify imports: check `LucideTriangleAlert`, `LucideCircleStop`, `LucideBatteryFull` exist in `@lucide/angular`

## 4. Create cup-icon Component

- [x] 4.1 Create `libs/icons/src/lib/cup-icon.ts`
- [x] 4.2 Import `LucideIcon` from `@lucide/angular` and `SF_SYMBOL_MAP` from local map
- [x] 4.3 Define `CupIconSize` type (`'sm' | 'md' | 'lg'`)
- [x] 4.4 Define `SIZE_MAP` constant (sm=16, md=24, lg=32)
- [x] 4.5 Add `@Component` with selector `'cup-icon'`, standalone, imports `[LucideIcon]`
- [x] 4.6 Template: `<svg lucideIcon [name]="resolvedName()" [size]="resolvedSize()" [strokeWidth]="strokeWidth()" [color]="color()" [fill]="isFilled() ? 'currentColor' : 'none'" />`
- [x] 4.7 Inline styles: `:host { display: inline-flex; align-items: center; justify-content: center; color: var(--cup-label); line-height: 0; flex-shrink: 0; }`
- [x] 4.8 Host bindings: `[attr.aria-hidden]`, `[attr.role]`, `[attr.aria-label]` based on `ariaLabel()`
- [x] 4.9 Define inputs: `name` (required), `size` (default md), `strokeWidth` (default 1.75), `fill` (default false), `color` (default currentColor), `ariaLabel` (optional)
- [x] 4.10 Implement `resolvedName()` computed (SF Symbol → clean → fallback)
- [x] 4.11 Implement `isFilled()` computed (`fill() || name().endsWith('.fill')`)
- [x] 4.12 Implement `resolvedSize()` computed (number → number, string → SIZE_MAP lookup)

## 5. Create Entry Point

- [x] 5.1 Update `libs/icons/src/index.ts` exporting `CupIcon`, `SF_SYMBOL_MAP`, `provideCupIcons`
- [x] 5.2 Verify `libs/icons/ng-package.json` has correct dest and entryFile

## 6. Final Verification

- [x] 6.1 Run `bun nx build icons` — build succeeds
- [x] 6.2 Verify `dist/libs/icons/` contains FESM and DTS bundles
- [x] 6.3 Run `bun biome check --write libs/icons/` for formatting
- [x] 6.4 Commit: `git add . && git commit -m "feat(icons): ✨ add cup-icon component, SF Symbol map, and icon provider"`
