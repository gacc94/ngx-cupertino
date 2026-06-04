## 1. Implementation

- [x] 1.1 Create `libs/core/src/lib/styles/_component-api.scss` — shared state mixins (`cup-disabled`, `cup-interactive`) + typed mixins for Button, Toggle, TextField, Slider, Progress
- [x] 1.2 Add `@forward 'lib/styles/component-api'` to `libs/core/src/_index.scss` barrel
- [x] 1.3 Add `"./styles/component-api"` SCSS export to `libs/core/package.json`

## 2. Verification

- [x] 2.1 Run `bun nx build core` — build succeeds
- [x] 2.2 Run `bun biome check --write libs/core/` — formatting clean
- [x] 2.3 Commit with conventional commit message including emoji
