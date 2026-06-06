## Context

Biome v1.9 added CSS support but explicitly does not handle SCSS dialects (`$variables`, `@mixin`, `@include`, `@use`, `@forward`, `&` nesting). The project has 22 SCSS files in `libs/tokens/src/lib/` with 4-space indentation that Biome cannot enforce. Stylelint is the industry-standard SCSS linter with `stylelint-config-standard-scss` providing SCSS-specific rules including variable naming patterns, mixin patterns, and redundant nesting detection.

## Goals / Non-Goals

**Goals:**
- Add SCSS linting for all 4 publishable libraries (tokens, core, icons, ui)
- Enforce 4-space indentation in SCSS
- Enforce `cup-` naming convention for variables, mixins, functions, and selectors
- Integrate with Nx task pipeline for caching and `nx affected` support
- Add to CI workflow as a parallel check

**Non-Goals:**
- SCSS formatting (Stylelint lints but doesn't format; formatting handled by VSCode/Prettier)
- Replacing Biome for TypeScript/JSON/CSS (Biome remains primary formatter/linter)
- Converting existing SCSS files (already follow conventions)

## Decisions

### D1: Stylelint over Biome for SCSS
**Decision**: Use Stylelint (not wait for Biome SCSS support).
**Rationale**: Biome has no timeline for SCSS support. Stylelint is mature, has `stylelint-config-standard-scss` with 80+ SCSS rules, and integrates with `nx-stylelint` for Nx caching.

### D2: nx-stylelint executor
**Decision**: Use `nx-stylelint:lint` executor via community plugin.
**Rationale**: Provides Nx cache integration, respects task pipeline, and works with `nx affected` for CI. Listed in Nx plugin registry.

### D3: One root config
**Decision**: Single `.stylelintrc.json` at project root, referenced by all libraries.
**Rationale**: The 4 libraries share the same SCSS conventions (4-space, cup- prefix). A single config avoids duplication.

## Risks / Trade-offs

- **nx-stylelint is a community plugin**: May break on Nx major version upgrades. Mitigation: It's a thin wrapper over stylelint CLI — easy to replace with a custom executor if needed.
- **CI job adds latency**: Parallel job, doesn't block other checks. Adds ~30s to pipeline.
- **Lefthook pre-commit**: May slow commits on large SCSS changes. Mitigation: Caching enabled in nx.json.
