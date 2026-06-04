## Context

The `cup-icon` component and `provideCupIcons()` provider were implemented in Step 4 using patterns that were current at the time. Angular 21 and Context7 validation revealed small improvements that make the API cleaner and more modern.

## Goals / Non-Goals

**Goals:**
- Enable HTML-native boolean syntax (`<cup-icon fill />`)
- Auto-coerce string values to numbers (`strokeWidth="2"`)
- Remove redundant Angular v20+ syntax (`standalone: true`)
- Apply stricter TypeScript patterns (`as const satisfies`)
- Clean up unnecessary type annotations

**Non-Goals:**
- No component API changes (all backward-compatible)
- No new file creation
- No new dependencies

## Decisions

### 1. `booleanAttribute` over manual coercion

**Decision**: Use Angular's built-in `booleanAttribute` transform instead of manual boolean parsing.

**Rationale**: Angular provides this for exactly this use case. It treats the presence of the HTML attribute as `true` and the literal string `"false"` as `false`. This matches native HTML boolean attribute behavior.

### 2. `numberAttribute` over `parseInt` in setters

**Decision**: Use Angular's built-in `numberAttribute` transform.

**Rationale**: Automatic coercion from string HTML attributes to numbers. No need for manual `parseInt` in getters/setters.

### 3. Remove `standalone: true`

**Decision**: Remove from `@Component` decorator.

**Rationale**: Angular v20+ makes standalone the default. Declaring it is redundant and adds noise.

### 4. `as const satisfies` over `: Record<K, V>`

**Decision**: Use `as const satisfies Record<CupIconSize, number>`.

**Rationale**: The `Record<>` annotation alone loses literal type information. `satisfies` validates the type while preserving literals, giving stricter type inference on `resolvedSize()`.

## Risks / Trade-offs

- None. All changes are backward-compatible. The `booleanAttribute` change is additive — `[fill]="true"` still works.
