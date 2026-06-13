## 1. Color contract docs

- [x] 1.1 Update `libs/core/ARCHITECTURE.md` with the formal color-family usage contract.
- [x] 1.2 Add short contract notes to the token partials that define semantic families: `libs/tokens/src/lib/_api.scss`, `libs/tokens/src/lib/_scheme.scss`, `libs/tokens/src/lib/_tints.scss`, and `libs/tokens/src/lib/_glass.scss`.

## 2. Platform and glass policy

- [x] 2.1 Document `libs/tokens/src/lib/_platform.scss` as a curated partial desktop layer and require a documented semantic role for new desktop tokens.
- [x] 2.2 Add neutral-first Liquid Glass guidance to `libs/tokens/src/lib/_glass.scss` and `libs/tokens/src/lib/_materials.scss`.

## 3. Raw effect audit

- [x] 3.1 Scan component styles in `libs/core/src/lib/styles/components/**` and `libs/ui/src/lib/**` for repeated raw effect colors.
- [x] 3.2 Promote repeated effect values to shared tokens or document a justified local exception.

## 4. Validation

- [x] 4.1 Run targeted lint and formatting checks on every touched documentation and style file.
- [x] 4.2 Re-run `openspec status --change "p1-color-governance"` and confirm the change stays apply-ready.
