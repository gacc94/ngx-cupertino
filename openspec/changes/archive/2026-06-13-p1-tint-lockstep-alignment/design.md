## Context

P0 corrected the raw chromatic palette, but the runtime tint layer still needs to be aligned to that baseline so accent behavior does not drift into a second color system. In this repo, `_tints.scss` is the active runtime source of truth for `data-tint` values, dark-mode overrides, and high-contrast overrides; there is no separate `_themes.scss` file in the current tree.

The current tint spec is stale in two ways: it still describes dark overrides as theme-layer behavior, and it refers to an older preset count than the actual `_tints.scss` implementation. This change updates the tint spec and the runtime numbers together so the contract matches the code.

## Goals / Non-Goals

**Goals:**
- align the named tint families in `_tints.scss` with the corrected Apple palette baseline
- keep the existing `data-tint` runtime model intact
- update light, dark, and increased-contrast tint values as one four-state unit per family
- keep `tint`, `tint-subtle`, `tint-on`, and `tint-container` internally consistent after the baseline update
- preserve the gray tint family as a guardrail against accidental churn

**Non-Goals:**
- changing semantic token meaning or introducing new semantic roles
- moving tint state logic into a new theme file or new runtime API
- altering `data-tint` semantics, default behavior, or consumer wiring
- recalculating tint values algorithmically instead of using explicit palette-aligned values

## Decisions

1. Keep tint state logic in `_tints.scss`.
   - Rationale: the repo already models active accents in `_tints.scss`, and moving the state logic elsewhere would add an unnecessary architectural split for a value-alignment change.
   - Alternatives considered: pushing dark/high-contrast overrides into a separate theme layer or generating tints indirectly from palette tokens. Rejected because both approaches obscure the actual runtime contract.

2. Treat each tint family as a four-state unit.
   - Rationale: the P0 palette work established that color parity only stays trustworthy when light, dark, and high-contrast states move together.
   - Alternatives considered: updating only base tint values and leaving derived or contrast values untouched. Rejected because it would reintroduce drift across states.

3. Preserve token names and the `data-tint` selector model.
   - Rationale: the public runtime API is already established and consumers depend on it. This phase is about numeric lockstep, not renaming.
   - Alternatives considered: renaming tint families to match palette primitives exactly or introducing a separate tint namespace. Rejected because it would create avoidable churn without improving the contract.

4. Keep the gray tint family aligned with the frozen gray baseline.
   - Rationale: gray is the stability check for the tint pass; if gray changes unexpectedly, the palette alignment has drifted.
   - Alternatives considered: excluding gray from review or treating it as a special case. Rejected because it weakens the regression guardrail.

5. Update the spec text to match the implemented runtime ownership.
   - Rationale: the current tint spec still references an outdated theme-layer pattern and an outdated preset count. The proposal must match the codebase so implementation and documentation do not diverge.
   - Alternatives considered: leaving the spec untouched and documenting the mismatch only in design notes. Rejected because the spec should be the contract.

## Risks / Trade-offs

- [Risk] `tint-on` may lose contrast on one or more families after palette alignment -> Mitigation: explicitly review the high-contrast and yellow/bright accent cases during validation.
- [Risk] `tint-subtle` and `tint-container` may feel visually off once the base tint changes -> Mitigation: keep derived tokens under review as part of the same change and smoke test tint-sensitive surfaces.
- [Risk] The tint spec could continue to drift from the runtime file if only values change -> Mitigation: update the spec delta in the same change and use the current `_tints.scss` file as the source of truth.
- [Risk] Over-editing the gray family could create unnecessary churn -> Mitigation: verify gray values against the frozen baseline and treat any change as a regression.

## Migration Plan

1. Compare every tint family in `_tints.scss` against the corrected palette baseline from P0.
2. Update the default light values first, then align dark and increased-contrast values in the same pass.
3. Re-check derived tokens (`tint-subtle`, `tint-on`, `tint-container`) for each family, especially yellow and gray.
4. Update the tint spec delta so its requirements describe the actual runtime ownership and preset count.
5. Smoke test tint-sensitive surfaces in Storybook or the playground with `data-tint` and `data-mode` variations.

Rollback is straightforward: revert the tint numeric edits and restore the previous spec wording if any family regresses visually.

## Open Questions

- None at the moment. The remaining work is value alignment plus spec synchronization.
