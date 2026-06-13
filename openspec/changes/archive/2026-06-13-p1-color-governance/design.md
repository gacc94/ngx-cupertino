## Context

P1 from the color audit is primarily a governance and documentation pass. The runtime color system already exists, but the rules for using semantic families, the scope of desktop platform tokens, the intended use of tinted Liquid Glass, and the handling of repeated raw effect colors are only implicit today.

This change is constrained to documentation and review policy. It should not introduce new runtime color behavior or expand the existing tint contract, because that work was already handled in P0.

## Goals / Non-Goals

**Goals:**

- make the intended use of each color family explicit
- document `_platform.scss` as curated, partial desktop coverage
- define neutral-first Liquid Glass color policy
- capture a repeatable rule for raw effect-value audit and promotion

**Non-Goals:**

- changing the runtime tint API
- adding new color tokens unless the audit proves reuse
- forcing AppKit parity for desktop tokens
- automating raw-color migration with a codemod

## Decisions

1. Use `libs/core/ARCHITECTURE.md` as the canonical contract for color governance.
    - Rationale: it is the best place for rules that span `core`, `tokens`, and component usage.
    - Alternative considered: spreading rules across token partial comments only. Rejected because the contract would be too fragmented.

2. Treat `_platform.scss` as intentionally partial rather than chasing full platform parity.
    - Rationale: the project only needs a curated subset of desktop semantics, and the docs should prevent overpromising.
    - Alternative considered: expanding the token set to mirror all AppKit colors. Rejected as out of scope and likely to add maintenance cost without clear value.

3. Write Liquid Glass guidance as product policy, not as a hard runtime constraint.
    - Rationale: the right behavior depends on context, contrast, and content density; docs provide the flexibility needed for review.
    - Alternative considered: enforcing tinted-glass rules through code-level guards. Rejected because the review burden is mainly editorial and visual, not algorithmic.

4. Audit raw effect values first, then promote only real duplicates.
    - Rationale: not every `rgb(...)` overlay is a shared design primitive, and token bloat would reduce clarity.
    - Alternative considered: moving every raw effect color into tokens. Rejected because it would over-tokenize one-off polish values.

## Risks / Trade-offs

- [Risk] Documentation can drift from implementation over time → Mitigation: keep the contract close to the token and architecture files it governs.
- [Risk] Rules can become too broad and block legitimate component polish → Mitigation: keep an explicit exception path for effect-only, single-use values.
- [Risk] Token promotion can create unnecessary API surface → Mitigation: only promote repeated values that truly recur across components.
- [Risk] The governance text may be read as stricter than intended → Mitigation: call out that platform coverage is partial and that Liquid Glass policy is contextual.

## Migration Plan

1. Update the architecture guidance with the semantic color contract.
2. Update `_platform.scss` and related token docs to explain scope and intent.
3. Add the Liquid Glass policy language in the glass/material docs.
4. Run the raw effect-color audit and document any token promotion candidates.
5. Verify the written guidance is consistent with the existing token architecture.

Rollback is straightforward: revert the documentation and any token-comment changes if the governance wording proves too broad or confusing.

## Open Questions

- Should the color-governance contract live only in architecture docs, or also in a lightweight review checklist?
- Do any repeated effect colors need immediate token promotion, or is documentation-only enough for this slice?
- Should the desktop token scope include explicit examples of approved semantic roles?
