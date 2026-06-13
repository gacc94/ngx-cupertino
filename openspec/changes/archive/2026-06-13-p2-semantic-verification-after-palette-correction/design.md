## Context

P0 corrected the primitive chromatic palette and P1 aligned the runtime tint layer, but the semantic layer still needs an explicit verification pass so role-based color tokens do not drift from Apple’s intended meaning. In this repo, semantic colors live in `_scheme.scss`, with dark and high-contrast semantic overrides in `_dark.scss` and `_a11y.scss`.

This change is intentionally narrow. It validates the role hierarchy after the lower color layers changed and only tightens docs/specs if they still describe pre-correction assumptions. It should not introduce new color tokens or move semantic logic into another layer.

## Goals / Non-Goals

**Goals:**
- verify that foreground semantic roles still match Apple’s meaning after palette correction
- verify that dark and high-contrast semantic overrides still improve readability and hierarchy
- re-check the semantic tokens most coupled to the palette: `link`, separators, and grouped backgrounds
- keep semantic token names and layering stable

**Non-Goals:**
- changing primitive palette values
- changing tint behavior or tint API
- renaming semantic tokens casually
- moving semantic logic out of `_scheme.scss`, `_dark.scss`, or `_a11y.scss`
- adding new runtime dependencies or generated color systems

## Decisions

1. Keep `_scheme.scss` as the canonical source of semantic role definitions.
   - Rationale: semantic color meaning should remain role-based, not derived from the primitive palette layer or from component-level usage.
   - Alternatives considered: co-locating semantics with palette tokens or moving them into theme helpers. Rejected because it blurs the layering model and makes review harder.

2. Treat `_dark.scss` and `_a11y.scss` as override layers only.
   - Rationale: dark mode and high-contrast behavior should refine the same semantic roles, not redefine them.
   - Alternatives considered: inlining semantic values into `:root` only or introducing a separate semantic override file. Rejected because the current split already maps cleanly to runtime behavior.

3. Revalidate the coupled semantic tokens first.
   - Rationale: `link`, separators, grouped backgrounds, and label variants are the most likely to reveal drift after palette changes.
   - Alternatives considered: only spot-checking labels. Rejected because that would miss structural hierarchy regressions.

4. Update documentation only when it still encodes older assumptions.
   - Rationale: this phase is about verifying the semantic contract, not churning docs that already match the implementation.
   - Alternatives considered: rewriting all color documentation. Rejected because it would create noise without increasing confidence.

## Risks / Trade-offs

- [Risk] A semantic token may still be numerically correct but visually wrong after the palette correction -> Mitigation: validate both role meaning and contrast-sensitive surfaces, especially `link` and separator combinations.
- [Risk] Over-correcting semantic values could destabilize already-correct role behavior -> Mitigation: preserve token names and only change values or wording when there is a real semantic mismatch.
- [Risk] Documentation could lag behind the verified runtime contract -> Mitigation: update only the semantic specs or architecture notes that still reference stale assumptions.
- [Risk] High-contrast overrides may appear correct in isolation but regress in context -> Mitigation: include dark and increased-contrast smoke checks during validation.

## Migration Plan

1. Review semantic tokens in `_scheme.scss` against Apple role definitions.
2. Re-check semantic overrides in `_dark.scss` and `_a11y.scss` for dark and high-contrast behavior.
3. Update the semantic specs and any stale architecture notes only if the verification uncovers outdated wording.
4. Run semantic smoke checks in Storybook or the playground on color-sensitive surfaces.
5. If a true mismatch is found, patch the affected semantic tokens and re-run the checks.

Rollback is straightforward: revert any semantic token or documentation adjustments if the verification pass exposes a regression.

## Open Questions

- None at the moment. The main unknown is whether verification will require any actual semantic value changes, or only spec/documentation tightening.
