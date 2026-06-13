## 1. Maintenance contract documentation

- [x] 1.1 Add a "Token Maintenance" section to `libs/tokens/ARCHITECTURE.md` with the numbered 6-step maintenance order.
- [x] 1.2 Document the gray-freeze rule and the four-state update rule as explicit hard constraints in the architecture docs.

## 2. Layer boundary and policy documentation

- [x] 2.1 Document the sRGB-first policy and the Display P3 exception process in the token architecture docs.
- [x] 2.2 Cross-reference the token maintenance contract from `libs/core/ARCHITECTURE.md` if needed.

## 3. API and readme sync

- [x] 3.1 Update `libs/tokens/src/lib/_api.scss` with a comment referencing the maintenance order and layer contract.
- [x] 3.2 Review token readmes and update wording only if they still encode pre-refinement assumptions.

## 4. Spec sync and validation

- [x] 4.1 Add the `token-maintenance-rules` spec to the OpenSpec registry.
- [x] 4.2 Update `openspec/specs/token-api/spec.md` with the maintenance contract reference requirement.
- [x] 4.3 Run `bun nx stylelint tokens` and review all touched docs for consistency.
