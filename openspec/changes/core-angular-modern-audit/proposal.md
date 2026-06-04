## Why

The `@ngx-cupertino/core` package was implemented in Step 5 following the Notion spec. A full audit against Angular v20+ best practices (validated via Angular MCP and Context7 docs) identified 29 issues across 8 files: direct `document`/`window` access bypassing Angular's `DOCUMENT` injection token, missing `OnPush` on directives, manual `Renderer2` DOM manipulation, `Observable.subscribe()` without lifecycle cleanup, empty lifecycle hooks, and import path convention violations. Additionally, the `@angular/cdk` dependency should reference the exact stable version `21.2.14` (current installed) rather than a caret range.

## What Changes

- **Replace all direct `document`/`window` access with `DOCUMENT` injection token** across 4 files: `cupertino.provider.ts`, `theme.service.ts`, `breakpoint.service.ts`, `a11y.ts` (18 occurrences)
- **Add `ChangeDetectionStrategy.OnPush`** to 4 directives: `LiquidGlassDirective`, `RippleDirective`, `CupRtlDirective`, `CupFormControl`
- **Replace `Renderer2` with `DOCUMENT` token** in `RippleDirective` for element creation; migrate `addEventListener` to `host:` metadata where possible
- **Replace `BreakpointObserver.subscribe()` with `toSignal()`** from `@angular/core/rxjs-interop` for automatic subscription cleanup
- **Remove empty `ngOnInit` + `applyBackground()`** in `LiquidGlassDirective` — no-op code
- **Fix import paths in `index.ts`** — remove `.directive` from import specifiers per AGENTS.md convention
- **Pin `@angular/cdk` peer dependency** to `21.2.14` (exact stable version) in `package.json`
- **Add `DOCUMENT`-based utilities** in `a11y.ts` — refactor standalone functions to accept `Document` parameter for SSR safety
- **Evaluate TypeScript path aliases** for internal library imports — determined unnecessary for a library of this size; relative paths are idiomatic and ng-packagr-compatible

## Capabilities

### New Capabilities

- `core-document-token`: All DOM access uses Angular's `DOCUMENT` injection token instead of global `document`/`window`. Enables SSR compatibility and improves testability.
- `core-onpush-directives`: All directives use `ChangeDetectionStrategy.OnPush`. Reduces unnecessary change detection cycles.
- `core-to-signal-breakpoints`: `BreakpointService` uses `toSignal()` instead of manual `.subscribe()`. Automatic subscription cleanup, no memory leaks.
- `core-ripple-modern`: `RippleDirective` uses `DOCUMENT` for element creation instead of `Renderer2`. Animation event handling via `host:` metadata.

### Modified Capabilities

- `core-directives`: `LiquidGlassDirective` removes empty `ngOnInit` lifecycle hook. `RippleDirective` replaces `Renderer2`/`ElementRef.nativeElement` with `DOCUMENT`-based approach.
- `core-services`: `ThemeService` and `BreakpointService` use `DOCUMENT` token for all DOM/window access. `BreakpointService` replaces `.subscribe()` with `toSignal()`.
- `core-providers`: `provideCupertino()` environment initializer uses `DOCUMENT` token instead of global `document`.
- `core-utils`: `a11y.ts` functions accept optional `Document` parameter for SSR-safe usage.
- `core-constants`, `core-scss`: No changes (already compliant).

## Impact

- **Files modified**: 10 files (`cupertino.provider.ts`, `theme.service.ts`, `breakpoint.service.ts`, `liquid-glass.directive.ts`, `ripple.directive.ts`, `rtl.directive.ts`, `base-cva.ts`, `a11y.ts`, `index.ts`, `package.json`)
- **New dependency**: `@angular/core/rxjs-interop` (already available in Angular 21 — `toSignal` is stable)
- **Breaking**: None. All changes are internal implementation details. Public API surface unchanged. `@angular/cdk` pin to `21.2.14` is within existing `^21.2.0` range.
- **SSR**: Previously blocked by direct `document`/`window` access. After this change, Core is SSR-ready (requires `DOCUMENT` provider from `@angular/common`).
