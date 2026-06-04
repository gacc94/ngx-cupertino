## Context

The `@ngx-cupertino/core` package was implemented as a new package in Step 5. The implementation used several legacy Angular patterns inherited from the Notion spec code samples. An audit against Angular v20+ modern best practices (Angular MCP, Context7 docs) identified 29 issues. The `@angular/cdk` peer dependency was also declared with a caret range (`^21.2.0`) when we have installed the exact stable version `21.2.14`.

## Goals / Non-Goals

**Goals:**
- Replace all global `document`/`window` references with Angular's `DOCUMENT` injection token
- Add `OnPush` to all directives for performance
- Replace `BreakpointObserver.subscribe()` with `toSignal()` for automatic cleanup
- Remove dead code (empty `ngOnInit`, empty `applyBackground()`)
- Fix import path conventions in barrel file
- Pin `@angular/cdk` peer dependency to exact stable version
- Refactor `a11y.ts` functions to accept `Document` parameter for SSR
- Modernize `RippleDirective` to use `DOCUMENT` over `Renderer2`

**Non-Goals:**
- No public API changes — all internal refactors
- No new dependencies (except `@angular/core/rxjs-interop` already in Angular 21)
- No TypeScript path aliases — evaluated and rejected (see Decisions)
- No changes to SCSS, constants, or `config.service.ts` (already compliant)

## Decisions

### 1. `DOCUMENT` token over global `document`/`window`

**Decision**: Inject `DOCUMENT` from `@angular/common` via `inject()` in all services, providers, and directives. Use `document.defaultView` for `window` access.

**Rationale**: Angular's `DOCUMENT` token is the platform-agnostic abstraction. It enables SSR (server-side rendering) compatibility and simplifies testing (mock document injection). Context7 Angular docs confirm `inject(DOCUMENT)` is the recommended pattern for v20+. For `matchMedia()`, use `this.document.defaultView?.matchMedia(...)`.

**Alternatives considered**: Keeping global `document` — rejected for SSR incompatibility. `@Inject(DOCUMENT)` in constructor — rejected in favor of `inject()` for consistency with the rest of the codebase.

### 2. `toSignal()` over manual `.subscribe()`

**Decision**: Replace `observer.observe([...]).subscribe(callback)` with `toSignal(observer.observe([...]))` and derive computed signals.

**Rationale**: `toSignal()` from `@angular/core/rxjs-interop` automatically manages subscription lifecycle (ties to injection context). Manual `.subscribe()` leaks if the service is destroyed (rare for `providedIn: 'root'` but not guaranteed). Context7 confirms `toSignal()` is stable since Angular v17+.

**Alternatives considered**: `takeUntilDestroyed()` — adds boilerplate. Manual `ngOnDestroy` cleanup — more code for same result.

### 3. `OnPush` on all directives

**Decision**: Add `changeDetection: ChangeDetectionStrategy.OnPush` to all 4 directives.

**Rationale**: Directives that only use `host:` bindings and signal inputs do not need default change detection. `OnPush` skips unnecessary CD cycles, improving performance. Angular MCP best practices guide recommends `OnPush` for all components and directives.

### 4. `DOCUMENT` over `Renderer2` in RippleDirective

**Decision**: Replace `inject(Renderer2).createElement("span")` with `inject(DOCUMENT).createElement("span")`. Replace `addEventListener` on the ripple span with `host:` metadata `'(animationend)'`.

**Rationale**: `Renderer2` is designed for Angular-specific DOM abstractions (like Web Workers). For browser-only element creation, `document.createElement` is simpler and more performant. The ripple directive only targets browser DOM. `host:` metadata for events follows Angular modern patterns (no `@HostListener`).

**Trade-off**: `Renderer2` offers platform abstraction. Since this library targets browser-only, the trade-off is acceptable.

### 5. Remove empty lifecycle hooks

**Decision**: Remove `implements OnInit`, `ngOnInit()`, and `applyBackground()` from `LiquidGlassDirective`. None perform any side effects.

**Rationale**: Dead code adds noise and maintenance burden. The `backgroundToken()` method is already called reactively via `host:` binding `[style.background]`.

### 6. Import paths without `.directive` suffix

**Decision**: Fix `index.ts` imports from `./lib/directives/liquid-glass.directive` to `./lib/directives/liquid-glass`.

**Rationale**: Per AGENTS.md conventions: include `.directive` in the filename, omit it from import specifiers. TypeScript resolves extensionless imports correctly. The filename on disk retains `liquid-glass.directive.ts`.

### 7. No TypeScript path aliases

**Decision**: Do not add TypeScript path aliases (`@ngx-cupertino/core/constants`, etc.) for internal library imports.

**Rationale**: For a library with a flat structure (~4 levels deep max), relative imports are idiomatic and compatible with ng-packagr's compilation model. Path aliases in `tsconfig` are compile-time only and do not affect the published npm package. Adding them would require `tsconfig-paths` or similar resolution in consumer projects, adding complexity without benefit. The barrel file (`index.ts`) is the public API — internal imports remain relative.

**Alternatives considered**: `compilerOptions.paths` with `@core/*` — rejected for ng-packagr incompatibility. Sub-path exports in `package.json` — already implemented for SCSS, not needed for TypeScript internal imports.

### 8. Pin `@angular/cdk` to `21.2.14`

**Decision**: Update `peerDependencies` from `"@angular/cdk": "^21.2.0"` to `"@angular/cdk": "21.2.14"`.

**Rationale**: `21.2.14` is the latest stable in the 21.x line. Using an exact version in peer dependencies prevents consumers from installing incompatible CDK versions. Angular CDK versions are tightly coupled with Angular core versions — a caret range could allow mismatched installs.

## Risks / Trade-offs

- **`DOCUMENT` injection in services**: Services with `providedIn: 'root'` must ensure `DOCUMENT` is available (it always is in browser apps). In SSR, `@angular/common` provides a platform `Document`. No risk for this library's target use case.
- **`toSignal()` requires injection context**: `BreakpointService` is `providedIn: 'root'`, so `inject()` is available at construction time. No risk.
- **`Renderer2` removal**: The ripple directive now directly creates DOM elements via `document.createElement`. If Angular ever supports non-DOM renderers (e.g., Canvas), this would break. However, Cupertino is a browser-only design system — this risk is accepted.
