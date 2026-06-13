## Context

P0 through P3 stabilized the entire token system, but the maintenance rules remain implicit in the architecture docs. `libs/tokens/ARCHITECTURE.md` already documents the 5-layer architecture, chromatic palette parity table, frozen gray ramp, and state-file ownership. `libs/core/ARCHITECTURE.md` already documents semantic typing, desktop platform scope, Liquid Glass policy, and raw effect audit rules. This pass consolidates those fragments into a single maintenance contract that future contributors can follow without reopening the audit history.

## Goals / Non-Goals

**Goals:**
- document the mandatory maintenance order for future palette and token changes
- codify the layer boundaries between palette, semantic, accent, platform, and material families
- document the gray-freeze rule and the four-state update rule as hard constraints
- document the sRGB-first policy and the exception process for Display P3 usage
- ensure `_api.scss` guidance and token readmes reference the finalized maintenance contract

**Non-Goals:**
- changing any token value
- introducing new runtime APIs or token families
- rewriting the 5-layer architecture model
- adding automated enforcement of the maintenance rules

## Decisions

1. Add a dedicated "Token Maintenance" section to `libs/tokens/ARCHITECTURE.md`.
   - Rationale: the tokens architecture doc is the natural home for the maintenance contract. Contributors already look there for layer boundaries and parity tables.
   - Alternatives considered: creating a separate `MAINTENANCE.md` file. Rejected because it would fragment the documentation further.

2. Document the maintenance order as a numbered sequence of 6 mandatory steps.
   - Rationale: the Notion refinement plan defines an explicit order (check source, update palette, align tints, validate semantics, review platform/material, update docs). Encoding it in the architecture docs prevents future contributors from starting at the wrong layer.
   - Alternatives considered: leaving the order implicit in the existing parity documentation. Rejected because implicit knowledge decays over time.

3. Keep the layer-boundary contract in `libs/core/ARCHITECTURE.md` as a complement.
   - Rationale: the core architecture doc already documents semantic typing, desktop platform scope, and material policies. Cross-referencing from the tokens section creates a navigable contract without duplicating content.
   - Alternatives considered: moving all governance into tokens/ARCHITECTURE.md. Rejected because core owns the public semantic union and the runtime domain logic.

4. Document the gray-freeze and four-state rules as explicit, non-negotiable constraints.
   - Rationale: these rules were proven correct through P0 validation and need to be locked in writing so future refinements do not accidentally break them.
   - Alternatives considered: trusting the parity table to convey the rules implicitly. Rejected because the table shows what happened, not why it must be followed.

5. Document the sRGB-first policy with a lightweight P3 exception process.
   - Rationale: the policy already exists in `libs/tokens/README.md`, but it lacks an exception path. Adding one makes the rule practical rather than dogmatic.
   - Alternatives considered: forbidding P3 entirely. Rejected because well-reviewed P3 additions should be possible.

## Risks / Trade-offs

- [Risk] Documentation could still drift from implementation over time -> Mitigation: keep the maintenance rules in architecture docs that are reviewed alongside token changes.
- [Risk] The maintenance order may go unenforced without tooling -> Mitigation: reference it in the contributing guide and PR template so reviewers can check compliance.
- [Risk] Over-documenting edge cases could make the rules feel bureaucratic -> Mitigation: keep the maintenance section concise, with the numbered order as the primary deliverable.

## Migration Plan

1. Add a "Token Maintenance" section to `libs/tokens/ARCHITECTURE.md`.
2. Add a cross-reference section in `libs/core/ARCHITECTURE.md` pointing to the token maintenance contract.
3. Update `_api.scss` comments to reference the maintenance order.
4. Update token readmes if they still describe pre-refinement assumptions.
5. Add the `token-maintenance-rules` spec to the OpenSpec registry.
6. Run a documentation consistency review across all touched files.

Rollback is straightforward: revert the added documentation sections if the wording proves confusing or too broad.

## Open Questions

- None at the moment. The maintenance rules are well-defined from the P0-P3 refinement outcomes.
