## Why

The color system already has strong runtime tokens and governance, but P2 from the audit identifies three follow-up gaps that are still unresolved: compile-time safety for semantic token names, repeatable visual QA coverage, and a written color-space policy. These are needed now so contributors have a stable review model before the token surface grows further.

## What Changes

- Define a `color-policy` capability that formalizes typed semantic token exports, visual QA matrix expectations, and sRGB/P3 usage rules.
- Clarify whether semantic token names are exported as typed unions and where that typing belongs.
- Add a repeatable visual QA matrix for light, dark, increased contrast, reduced transparency, base, and liquid-glass states.
- Document a default sRGB-first policy with explicit rules for when Display P3 is allowed.

## Capabilities

### New Capabilities

- `color-policy`: formal guidance for typed semantic token names, color-state QA coverage, and color-space policy.

### Modified Capabilities

None.

## Impact

- `libs/core/ARCHITECTURE.md`
- `libs/tokens/src/lib/_api.scss`
- `libs/core/src/lib/types/` or related public typing exports if token-name typing is adopted
- `libs/ui/src/lib/**` and Storybook stories or review docs for visual QA coverage
- design handoff or asset guidance docs if present in the repo
