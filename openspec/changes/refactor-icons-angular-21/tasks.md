## 1. Refactor cup-icon.ts

- [x] 1.1 Import `booleanAttribute` and `numberAttribute` from `@angular/core`
- [x] 1.2 Apply `{ transform: booleanAttribute }` to `fill` input
- [x] 1.3 Apply `{ transform: numberAttribute }` to `strokeWidth` input
- [x] 1.4 Remove `standalone: true` from `@Component` decorator
- [x] 1.5 Change `SIZE_MAP` to use `as const satisfies Record<CupIconSize, number>`

## 2. Refactor provide-icons.ts

- [ ] 2.1 Remove explicit `: EnvironmentProviders` return type from `provideCupIcons()`

## 3. Final Verification

- [ ] 3.1 Run `bun nx build icons` — build succeeds
- [ ] 3.2 Run `bun biome check --write libs/icons/` — formatting clean
- [ ] 3.3 Commit: `git add . && git commit -m "refactor(icons): 📦 apply Angular 21 best practices — booleanAttribute, numberAttribute, remove standalone"`

- [x] 3.1 Run `bun nx build icons` — build succeeds
- [x] 3.2 Run `bun biome check --write libs/icons/` — formatting clean
- [ ] 3.3 Commit: `git add . && git commit -m "refactor(icons): 📦 apply Angular 21 best practices — booleanAttribute, numberAttribute, remove standalone"`
