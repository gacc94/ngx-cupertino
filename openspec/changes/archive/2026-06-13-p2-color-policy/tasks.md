## 1. Semantic token typing

- [x] 1.1 Add or confirm a public typed union for semantic token names in `libs/core/src/lib/types/` and export it through the package surface if approved by the design.
- [x] 1.2 Update `libs/core/ARCHITECTURE.md` and any related token docs so contributors know which token families are covered by the semantic union.

## 2. Visual QA matrix

- [x] 2.1 Add or update Storybook stories or review docs for the main color matrix: light, dark, increased contrast, reduced transparency, base surface style, and liquid-glass surface style.
- [x] 2.2 Document which components are mandatory for screenshot coverage and which combinations are high-value only.

## 3. Color-space policy

- [x] 3.1 Document the default sRGB-first policy and the explicit Display P3 exception path in `libs/core/ARCHITECTURE.md` or the repo's design handoff docs.
- [x] 3.2 Update any token or asset guidance files that mention color values so the color-space rule is easy to find during review.

## 4. Validation

- [x] 4.1 Run targeted typecheck, Storybook, and documentation checks for the touched policy and typing files.
- [x] 4.2 Re-run `openspec status --change "p2-color-policy"` and confirm the change stays apply-ready.
