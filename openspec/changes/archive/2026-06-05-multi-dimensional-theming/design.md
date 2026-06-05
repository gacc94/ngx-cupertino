## Context

The design system currently has a single theming axis: `data-theme="light|dark"` on `<html>`. Accent colors (tints) are set imperatively by `ThemeService.setTint()` which calls `document.documentElement.style.setProperty()` for `--cup-tint`, `--cup-tint-subtle`, `--cup-tint-on`, `--cup-tint-container`. This couples the tint to the service's execution order — if `setTheme()` runs after `setTint()`, the tint is lost.

The refactor separates mode and tint into two independent CSS-driven axes via `data-mode` and `data-tint` attributes on `<html>`.

## Goals / Non-Goals

**Goals:**
- Independent mode (light/dark) and tint (13 accent colors) axes
- CSS handles tint via `[data-tint]` attribute selectors — no imperative JS
- `ThemeService` only sets `dataset` attributes, not `style.setProperty()`
- `provideCupertino()` always initializes both axes with defaults
- Zero breaking changes for component SCSS — same `var(--cup-tint)` tokens work
- `_api.scss` token map updated for new tint token strategy

**Non-Goals:**
- No new tints added — same 13 colors as Step 3
- No per-component tint overrides — global tint applies to all components
- No runtime tint switching UI (playground enhancement, not part of this change)

## Decisions

### 1. CSS attribute selectors over imperative `style.setProperty()`

**Decision**: Use `[data-tint="blue"] { --cup-tint: #007AFF; }` in `_tints.scss` instead of `document.documentElement.style.setProperty('--cup-tint', '#007AFF')` in `ThemeService`.

**Rationale**: CSS is the natural home for design tokens. Attribute selectors are declarative, cascade properly, and work without JavaScript execution order concerns. Angular Material uses a similar approach with CSS class-based theming. A tint change requires only `dataset['tint'] = 'indigo'` — the CSS handles the rest.

### 2. `data-mode` over `data-theme`

**Decision**: Rename `data-theme` to `data-mode` to disambiguate from tint.

**Rationale**: "Theme" is ambiguous — is it light/dark or the accent color? "Mode" specifically means light/dark. This is consistent with operating system terminology (`prefers-color-scheme: light|dark`) and modern CSS (`color-scheme: light dark`).

### 3. Tint name over hex color in config

**Decision**: `CupConfig.tintColor` accepts `CupTintName` (string: `'blue'`, `'indigo'`, etc.) as primary type, with hex string as legacy fallback.

**Rationale**: Tint names are semantic and match the `CupTints` constant. Hex strings are fragile and don't communicate intent. Legacy hex support kept for custom brand colors.

### 4. Always initialize both axes

**Decision**: `provideCupertino()` always calls `ts.setTheme(cfg.theme ?? 'auto')` and `ts.setTint(cfg.tintColor ?? 'blue')` — never skips.

**Rationale**: CSS `:root` fallback handles the case where `data-tint` is missing. But explicit initialization ensures consistent state and prevents race conditions. The previous code skipped `setTint()` when no config was provided, causing missing `--cup-tint*` tokens.

### 5. Only `--cup-tint` changes per-color in dark mode

**Decision**: Dark mode overrides in `_tints.scss` only change `--cup-tint` (the base color). Subtle, on, and container values don't need dark overrides.

**Rationale**: Subtle (15% alpha) and container (12% alpha) values are derived from the base color via alpha blending. When the base color changes, the CSS `rgba()` values recalculate automatically. `--cup-tint-on` is always `#fff` or `#000` based on contrast — doesn't change per mode.

## Angular Modern Patterns Compliance

All modified files already follow Angular v21 best practices (validated via Angular MCP + Context7):

| Pattern | Status | Details |
|---|---|---|
| `inject(DOCUMENT)` over global `document` | ✅ Already | ThemeService and provideCupertino use `inject(DOCUMENT)` from prior audit |
| `inject()` over constructor DI | ✅ Already | No constructor injection anywhere in the codebase |
| `dataset` over `setAttribute` / Renderer2 | ✅ This change | `dataset['mode']` and `dataset['tint']` are declarative, Renderer2 not needed |
| `style.setProperty()` on injected document | ✅ Fallback | Hex tint fallback uses `this.document.documentElement.style.setProperty()` |
| No `@HostListener` / `@HostBinding` | ✅ N/A | No decorators in services or providers |
| Signals over BehaviorSubject | ✅ Already | `theme()`, `isDark()`, `currentTint()` are signals |

**Key Angular 21 rule**: `document.documentElement.dataset['mode']` requires bracket notation per TS4111 — this is correct and has `// biome-ignore` comments from prior audit.

## Risks / Trade-offs

- **`data-theme` migration**: Any external code referencing `[data-theme]` breaks. Mitigation: this is an internal design system — no external consumers exist yet. Search and replace `data-theme` → `data-mode` across the entire codebase.
- **Tint name vs hex fallback**: `setTint('blue')` uses `dataset`, `setTint('#FF0000')` uses `style.setProperty()`. Two code paths. Mitigation: documented in the method. Custom hex tints are a power-user feature.
- **CSS specificity**: `[data-mode="dark"]` has lower specificity than some component selectors. Mitigation: tokens are defined on `:root` or `<html>` level via CSS custom properties — specificity isn't relevant since they cascade via inheritance.
