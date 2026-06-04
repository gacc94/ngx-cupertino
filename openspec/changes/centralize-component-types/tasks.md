## 1. Core Constants

- [ ] 1.1 Add `CupComponentSize` type (`'sm' | 'md' | 'lg'`) to `libs/core/src/lib/constants/sizes.ts`
- [ ] 1.2 Add `CupProgressType` type (`'linear' | 'circular'`) to `libs/core/src/lib/constants/variants.ts`
- [ ] 1.3 Export `CupComponentSize` and `CupProgressType` from `libs/core/src/index.ts`

## 2. Button Refactor

- [ ] 2.1 Replace hardcoded `variant` union with `CupButtonVariant` imported from `@ngx-cupertino/core`
- [ ] 2.2 Replace hardcoded `size` union with `CupComponentSize` imported from `@ngx-cupertino/core`

## 3. Progress Refactor

- [ ] 3.1 Replace hardcoded `type` union with `CupProgressType` imported from `@ngx-cupertino/core`
- [ ] 3.2 Replace hardcoded `size` union with `CupComponentSize` imported from `@ngx-cupertino/core`

## 4. Final Verification

- [ ] 4.1 Run `bun nx build core` — build succeeds
- [ ] 4.2 Run `bun nx build ui` — build succeeds
- [ ] 4.3 Run `bun nx test ui` — all 97 tests pass
- [ ] 4.4 Run `bun biome check --write libs/core/ libs/ui/` — formatting clean
- [ ] 4.5 Commit with conventional commit message including emoji
