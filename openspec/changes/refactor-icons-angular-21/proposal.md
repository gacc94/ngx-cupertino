## Why

The `cup-icon` component was implemented following the Step 4 Notion spec. After Angular MCP and Context7 validation against Angular 21 best practices, 5 improvements were identified: `booleanAttribute`/`numberAttribute` transforms for better DX, `as const satisfies` for stricter TypeScript, `standalone: true` removal (redundant in v20+), and `provideCupIcons()` cleanup.

## What Changes

- **`cup-icon.ts`**: Apply `booleanAttribute` transform to `fill` input (enables `<cup-icon fill />` without `="true"`). Apply `numberAttribute` transform to `strokeWidth` input (auto-coerces string to number). Use `as const satisfies` for `SIZE_MAP`. Remove redundant `standalone: true`.
- **`provide-icons.ts`**: Remove unnecessary explicit return type annotation on `provideCupIcons()` (already returns `EnvironmentProviders` from `provideLucideIcons()`). Remove redundant imports.
- **Notion Step 4 page**: Update to reflect Angular 21 syntax.

## Capabilities

### New Capabilities

- `icons-inputs-angular21`: Apply `booleanAttribute` to `fill` input and `numberAttribute` to `strokeWidth` input — verified via Context7 Angular docs
- `icons-cleanup-angular21`: Remove redundant `standalone: true`, apply `as const satisfies` to `SIZE_MAP`, cleanup `provideCupIcons()` type annotation

### Modified Capabilities

_None — this is a refactor of existing code, no capability requirement changes._

## Impact

- **Code**: Modifies `cup-icon.ts` (5 changes) and `provide-icons.ts` (1 change). No new files.
- **Dependencies**: None.
- **Breaking**: None. All changes are backward-compatible. `<cup-icon fill />` now works (previously only `[fill]="true"`).
- **DX improvement**: Consumers can use HTML-native boolean attribute syntax.
