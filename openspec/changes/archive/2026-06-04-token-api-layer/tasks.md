## 1. Implementation

- [x] 1.1 Create `libs/tokens/src/lib/_api.scss` with `$tokens` map (178 entries across 27 categories) and `token($name)` getter function with `@error` validation
- [x] 1.2 Add `@forward 'lib/api'` as first line in `libs/tokens/src/_index.scss` barrel

## 2. Verification

- [x] 2.1 Run `bun nx build tokens` — build succeeds
- [x] 2.2 Run `bun biome check --write libs/tokens/` — formatting clean
- [x] 2.3 Commit with conventional commit message including emoji
