## Context

P0 through P2 corrected the base palette, tint layer, and semantic model. The desktop platform layer and material/glass families sit on top of those corrected layers and need a verification pass to confirm they still read correctly. In this repo, `_platform.scss` is a curated fine-pointer augmentation with its own chromatic overrides for green, teal, cyan, link, accent, and gray. `_glass.scss` and `_materials.scss` are neutral rendering primitives that should remain isolated from semantic content roles.

## Goals / Non-Goals

**Goals:**
- verify that the desktop chromatic overrides in `_platform.scss` still make sense against the corrected base palette
- confirm that glass and material token families remain separate from semantic foreground, background, and separator roles
- keep the curated-scope policy for the desktop layer explicit
- update only the platform or material docs that still encode pre-P0 assumptions

**Non-Goals:**
- expanding `_platform.scss` to full AppKit parity
- introducing new glass or material tokens
- moving material values into the semantic layer
- flattening the token architecture into one undifferentiated layer
- recalculating chromatic values in `_platform.scss` unless the corrected palette reveals a genuine mismatch

## Decisions

1. Treat `_platform.scss` as a curated augmentation, not a parity target.
   - Rationale: the desktop layer already documents its scope as partial, and the verification should reinforce that boundary.
   - Alternatives considered: adding uncurated macOS color tokens to close perceived gaps. Rejected because it would expand scope without documented need.

2. Keep `_glass.scss` and `_materials.scss` as neutral rendering primitives.
   - Rationale: material tokens define surface properties, not content color. Mixing them with semantic roles would collapse the layered architecture.
   - Alternatives considered: loading material tokens with semantic color references. Rejected because it would blur the contract between surface rendering and content meaning.

3. Re-check the platform tokens most likely to drift: link, accent, and chromatic overrides.
   - Rationale: `--cup-link`, `--cup-control-accent`, and the green/teal/cyan overrides are the platform tokens most directly coupled to the corrected chromatic families.
   - Alternatives considered: reviewing all ~147 platform declarations. Rejected because most platform tokens are dimensional or structural, not chromatic.

4. Update documentation only when it still describes pre-correction values or policies.
   - Rationale: this phase validates the layered architecture, not rewrites correct documentation.
   - Alternatives considered: rewriting all platform and material docs. Rejected because it would create noise without increasing confidence.

## Risks / Trade-offs

- [Risk] Platform chromatic overrides may still reference old palette values -> Mitigation: compare `_platform.scss` green, teal, cyan, link, and accent tokens against the P0-corrected palette.
- [Risk] Material tokens could be accidentally used as semantic foreground replacements in component code -> Mitigation: verify the layer contract is explicit in token comments and docs.
- [Risk] Expanding scope to full macOS parity during verification -> Mitigation: explicitly call out the curated-scope policy in the migration plan.
- [Risk] Glass tokens may appear visually different after palette changes even if their values are unchanged -> Mitigation: include material-heavy surfaces in the smoke check pass.

## Migration Plan

1. Compare the platform chromatic overrides in `_platform.scss` against the corrected four-state palette.
2. Review `_glass.scss` and `_materials.scss` for any unintended coupling to semantic roles.
3. Update the relevant spec deltas and any stale architecture or governance notes.
4. Run targeted smoke checks on desktop-specific and material-heavy surfaces in Storybook or the playground.
5. If a chromatic platform mismatch is found, patch the affected override values and re-run checks.

Rollback is straightforward: revert any platform or material token adjustments and restore previous spec wording.

## Open Questions

- None at the moment. The main unknown is whether the platform chromatic overrides for green, teal, cyan, or link need adjustment, or only documentation tightening.
