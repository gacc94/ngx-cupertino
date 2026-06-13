## Context

The token refinement plan identifies chromatic palette parity as the first implementation slice because the current project already matches Apple exactly for the gray ramp but still diverges from Apple’s official system color specification across most chromatic families. This slice is intentionally narrow: it corrects palette-source numbers first and avoids semantic, tint, platform, or material reinterpretation until the base palette is trustworthy.

The captured Apple four-state specification table for all 12 chromatic families and the frozen gray ramp is recorded in [`parity-table.md`](./parity-table.md), which is the auditable source of truth for task 4.1.

## Goals / Non-Goals

**Goals:**

- align the 12 chromatic system color families with the captured Apple four-state specification table
- preserve the existing gray ramp unchanged
- keep the current file ownership model: `_colors.scss` for default light, `_dark.scss` for dark, `_a11y.scss` for increased contrast
- document that chromatic families must be updated across all four states together

**Non-Goals:**

- changing semantic token names or meanings
- refining `_tints.scss` in this slice
- reviewing platform or material layers in this slice
- introducing new public runtime APIs

## Decisions

1. Update the palette layer only.
    - Rationale: palette values are the numeric source of truth for later tint and semantic validation.
    - Alternative considered: updating semantic or tint layers at the same time. Rejected because it would make regressions harder to isolate.

2. Freeze the gray ramp.
    - Rationale: current gray values already match the captured Apple table exactly and do not need corrective churn.
    - Alternative considered: touching all palette values uniformly. Rejected because it creates risk without solving a real mismatch.

3. Preserve file ownership by state.
    - Rationale: `_colors.scss`, `_dark.scss`, and `_a11y.scss` already encode default light, dark, and accessibility state boundaries clearly.
    - Alternative considered: consolidating values into fewer files during the parity pass. Rejected because it changes architecture while fixing numbers.

## Risks / Trade-offs

- [Risk] A chromatic family may be corrected in light/dark but missed in high-contrast states → Mitigation: treat each family as a four-state unit during review.
- [Risk] A gray token may be accidentally edited while touching nearby palette lines → Mitigation: keep gray values explicitly frozen and verify them after edits.
- [Risk] Consumers may expect tint behavior to update in the same PR → Mitigation: document that tint alignment is the next planned slice, not part of this one.
- [Risk] Old specs or docs may still reference outdated token naming conventions → Mitigation: update the modified color spec alongside the proposal.

## Migration Plan

1. Compare each chromatic family in `_colors.scss`, `_dark.scss`, and `_a11y.scss` against the captured Apple table.
2. Update all four states for each affected family.
3. Verify that gray values remain unchanged.
4. Rebuild token consumers and perform a small visual smoke test on color-sensitive components.

Rollback is straightforward: revert the numeric palette edits if any consumer surfaces regress visually.

## Open Questions

- Should the follow-up tint slice reuse the corrected palette values verbatim or allow interaction-specific adjustments for `tint-subtle` and `tint-container`?
- Are there any docs outside the token refinement plan that still reference the older chromatic numbers and need later cleanup?
