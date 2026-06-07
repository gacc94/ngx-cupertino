## Context

The cup-button is the flagship atomic component. It establishes the component architecture pattern that all subsequent components follow: Signals API with `input()`/`output()`, host bindings for state classes, inline `@if` templates, `OnPush` change detection, and token consumption via `t.token()`.

## Goals / Non-Goals

**Goals:**
- Implement cup-button exactly as documented in Notion (sections I-XI)
- Validate the design system toolchain: tokens → core types → component
- Support dual selector: `<button cup-button>` for actions, `<a cup-button>` for navigation
- All 5 variants rendered correctly in light/dark/HC modes
- All 3 sizes × 2 platforms resolved automatically via tokens

**Non-Goals:**
- Unit tests (separate task)
- Playground demo page (separate task)
- Touch ripple effect (Phase 2)

## Decisions

### D1: Inline template over separate HTML file
The Notion spec uses an inline template string. Following this keeps the component definition self-contained in one file.

### D2: Host bindings for all state classes
No wrapper div. State classes (`.cup-small`, `.filled`, `.cup-disabled`) are applied directly on the native `<button>` via `host:` bindings. This is the Angular Material pattern.

### D3: handleClick() as single gate
All interaction paths (click, Enter key, Space key) route through one method that checks `!disabled() && !loading()`. Prevents double-submission and ensures consistent behavior.

### D4: Destructive as a modifier on top of any variant
`destructive` input overrides background/text/color with red tokens regardless of variant. This avoids combinatorial explosion of variant × destructive states.

## Risks / Trade-offs

- **Inline template**: No HTML syntax highlighting in editors. Mitigation: VSCode extension `angular-language-server` handles inline templates.
- **Loading spinner**: CSS-only spinner (no SVG/Lottie). Sufficient for MVP.
