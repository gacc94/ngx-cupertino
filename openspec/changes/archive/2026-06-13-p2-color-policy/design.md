## Context

P0 and P1 already established the adaptive tint contract and the color-governance rules. P2 is the follow-up layer that makes the system easier to use safely: it tightens compile-time token-name guidance, turns color review into a repeatable matrix, and sets a documented stance on color spaces.

This change is mostly policy and documentation, with a small type-surface decision if semantic token names are exported. It should not alter runtime tint behavior or the existing token values.

## Goals / Non-Goals

**Goals:**

- define a stable typing policy for semantic token names
- provide a small but repeatable visual QA matrix for color-sensitive components
- document a clear sRGB-first policy with explicit Display P3 exceptions

**Non-Goals:**

- changing runtime theme or tint resolution
- redefining the semantic token families themselves
- adding broad visual regression automation infrastructure
- making Display P3 the default color space

## Decisions

1. Export semantic token-name typing from the public `core` surface only if it adds real value.
    - Rationale: `core` is already the consumer-facing runtime API boundary, so a semantic token-name type fits there better than as a scattered helper.
    - Alternative considered: generating the type from SCSS token maps. Rejected because it adds build complexity and couples TS to Sass in a way that is harder to maintain.

2. Keep the type surface narrow: semantic families only.
    - Rationale: palette and material names are useful implementation details, but they should not be mixed into the semantic union that contributors use for UI logic.
    - Alternative considered: one giant token-name union for everything. Rejected because it weakens the intent of semantic typing and is harder to review.

3. Use Storybook as the canonical visual QA surface.
    - Rationale: the repository already uses Storybook, and it is the lowest-friction place to review light/dark, contrast, transparency, and glass combinations.
    - Alternative considered: introducing a new visual test harness. Rejected because P2 is a policy follow-up, not a tooling migration.

4. Document sRGB as the default and Display P3 as an explicit exception.
    - Rationale: sRGB is the safest baseline for tokens and assets, while P3 should be reserved for deliberately approved cases with extra QA.
    - Alternative considered: allowing P3 broadly in tokens. Rejected because it increases display variability without a clear need.

## Risks / Trade-offs

- [Risk] A public token-name type can become stale if token families evolve → Mitigation: keep the type narrow and review it with token changes.
- [Risk] The QA matrix could become too large to maintain → Mitigation: keep the matrix small, prioritize high-risk combinations, and document optional cases separately.
- [Risk] Color-space policy could be misread as a hard rendering restriction → Mitigation: keep the policy framed as a default plus explicit exception process.
- [Risk] Storybook coverage may not perfectly mirror every runtime state → Mitigation: document the matrix clearly and reserve manual review for the hardest combinations.

## Migration Plan

1. Decide whether the typed semantic token-name export belongs in `core` and add the type if approved.
2. Add or update Storybook stories and review docs so the visual matrix is explicit and reproducible.
3. Document the sRGB-first policy in `core` architecture docs and any token/asset handoff docs.
4. Verify the resulting guidance is usable in code review and design review.

Rollback is straightforward: remove the type export or revert the policy docs if the change proves too noisy or too broad.

## Open Questions

- Should the semantic token-name type include platform tokens, or only foreground/background/accent semantic families?
- Which components are mandatory in the visual QA matrix versus high-value only?
- Is there any existing asset or handoff guidance that should be linked instead of duplicated?
