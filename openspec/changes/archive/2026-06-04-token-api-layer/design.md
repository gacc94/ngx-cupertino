## Context

`@ngx-cupertino/tokens` has 8 SCSS partials defining 178 CSS custom properties under `--cup-*` namespace. Components consume them via `var(--cup-label)`, `var(--cup-radius-md)`, etc. There is no validation — typos in token names pass compilation silently.

## Goals / Non-Goals

**Goals:**
- SCSS map with all 178 tokens as the single source of truth
- `token()` getter function that validates keys at compile time with `@error`
- Pattern consistent with Angular Material (`mat.get-theme-color()`) and Tailwind 4 (`@theme`)
- Barrel includes `@forward 'lib/api'`

**Non-Goals:**
- Do NOT refactor existing components to use `t.token()` — future migration
- No TypeScript API — SCSS-only
- No runtime validation — SCSS compile-time only

## Decisions

### 1. SCSS map over TypeScript enum

**Decision**: SCSS `$tokens` map with `@function token()` for compile-time validation.

**Rationale**: Tokens are used exclusively in SCSS. SCSS compilation is build-time. An invalid token causes the build to fail before any CSS output. TypeScript-level validation wouldn't catch typos in `.scss` files. Angular Material uses the same approach with `mat.get-theme-color()`.

### 2. Complete token coverage

**Decision**: Include all 178 tokens from the 8 existing SCSS partials in the `$tokens` map.

**Rationale**: A partial map creates ambiguity about which tokens exist. A complete map is the definitive registry. New tokens added to other partials must also be added to the map — enforced by PR review.

### 3. `@forward 'lib/api'` first in barrel

**Decision**: Place `@forward 'lib/api'` as the first line in `_index.scss`.

**Rationale**: Signal that `api` is the primary consumer-facing module. Order of `@forward` doesn't affect functionality but communicates intent.

### 4. Aligned structure with Angular Material

**Decision**: Use key nomenclature matching the CSS property names without the `--cup-` prefix (e.g., `'label'` not `'--cup-label'`).

**Rationale**: Shorter, more readable in component SCSS. The `var(--cup-*)` resolution is internal to the map. Consumers write `t.token('label')` not `t.token('--cup-label')`.

## Risks / Trade-offs

- **Map maintenance**: New tokens must be added to both the SCSS partial and the map. Mitigation: header comment in `_api.scss` documents the requirement. PR checklist enforces it.
- **Map size**: 178 entries. Mitigation: grouped by category with clear comments. SCSS maps are compile-time only — zero runtime cost.
