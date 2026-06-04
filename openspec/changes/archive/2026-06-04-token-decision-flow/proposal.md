## Why

Developers and AI agents building components need a clear, unambiguous decision tree for choosing how to reference design tokens. The 3-layer validation architecture (Token API, Generic Mixins, Component Mixins) exists but has no documented decision flow. This leads to inconsistent token usage — some components use raw `var(--cup-*)`, others use `t.token()`, others use mixins — with no clear rule for which to choose.

## What Changes

- **New file**: `docs/token-decision-flow.md` — Mermaid flowchart + 3-layer reference table + examples + quick reference
- **Modified file**: `AGENTS.md` — add "Token Decision Flow" section referencing the doc
- Code impact: none (documentation only)

## Capabilities

### New Capabilities

None — documentation-only change.

### Modified Capabilities

None.

## Impact

- **New file**: `docs/token-decision-flow.md`
- **Modified file**: `AGENTS.md` (1 section added)
- **Breaking**: None
