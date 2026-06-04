## 1. Package Configuration

- [x] 1.1 Pin `@angular/cdk` peer dependency to `21.2.14` in `libs/core/package.json`

## 2. DOCUMENT Token Migration

- [x] 2.1 `cupertino.provider.ts` — inject `DOCUMENT` in initializer, replace 6 direct `document.documentElement` accesses
- [x] 2.2 `theme.service.ts` — inject `DOCUMENT`, replace all `document.documentElement` and `window.matchMedia` accesses
- [x] 2.3 `breakpoint.service.ts` — inject `DOCUMENT`, replace `typeof window` guard and `window.matchMedia` accesses
- [x] 2.4 `a11y.ts` — refactor `prefersReducedMotion()`, `isHighContrastMode()`, `hasCoarsePointer()` to accept optional `Document` parameter, remove global `window`

## 3. OnPush Change Detection

- [~] 3.1-3.4 `OnPush` on directives — NOT APPLICABLE: `@Directive()` does not support `changeDetection` in Angular 21. Directives inherit CD from parent component. Removed from implementation.

## 4. Signals Migration

- [x] 4.1 `breakpoint.service.ts` — replace `.subscribe()` with `toSignal()` from `@angular/core/rxjs-interop`, derive signals via `computed()`

## 5. Dead Code Removal

- [x] 5.1 `liquid-glass.directive.ts` — remove `implements OnInit`, `ngOnInit()`, and `applyBackground()` method (all no-ops)

## 6. Ripple Directive Modernization

- [x] 6.1 `ripple.directive.ts` — replace `inject(Renderer2)` with `inject(DOCUMENT)` for `createElement`
- [x] 6.2 `ripple.directive.ts` — moved host element styles (position, overflow) to `host:` metadata; kept `addEventListener` on dynamically-created ripple span (necessary for imperative DOM)

## 7. Import Path Conventions

- [~] 7.1 `index.ts` — removed `.directive` suffix but REVERTED: TypeScript requires `.directive` suffix in import path to resolve `liquid-glass.directive.ts` on disk. Kept original import paths.

## 8. Final Verification

- [x] 8.1 Run `bun nx build core` — build succeeds
- [x] 8.2 Run `bun biome check --write libs/core/` — formatting clean
- [x] 8.3 Run `bun nx build core` again after format — build still succeeds
- [x] 8.4 Commit with conventional commit message including emoji
