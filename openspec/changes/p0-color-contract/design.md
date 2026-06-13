## Context

`@ngx-cupertino` already has a layered color system with palette, semantic, tint, material, and accessibility overrides. The problem is that the public custom tint contract exposed from `core` is still only a two-state light/dark palette, while the CSS token system already understands increased contrast for named tints and semantic colors.

There is also one UI regression in the slider track/thumb styling: the thumb background is hardcoded to semantic white instead of being sourced from a token-backed surface.

This change touches `core` types, `ThemeService`, the slider SCSS, and the public docs/tests that explain the contract.

## Goals / Non-Goals

**Goals:**

- Support adaptive custom tint palettes with increased contrast variants.
- Resolve custom tint values at runtime using both appearance and contrast.
- Preserve named tint behavior through the existing token/data-attribute path.
- Keep bare `#hex` tint input as a compatibility fallback.
- Remove the slider thumb hardcoded white and replace it with a token-backed surface.
- Keep the change backward compatible for existing consumers that already pass `{ light, dark }` tint palettes.

**Non-Goals:**

- Redesign the entire token system.
- Change the visual values of the existing named tint presets.
- Introduce new color-space dependencies or a P3-specific rendering pipeline.
- Rewrite Storybook color infrastructure beyond what is needed to validate this P0.
- Rename the existing public tint concept if the current type can be extended safely.

## Decisions

### Extend `CupTintPalette` instead of introducing a new exported type

We will keep the existing `CupTintPalette` name and add optional `lightHighContrast` and `darkHighContrast` fields.

Why: this is the smallest API surface change and preserves compatibility for existing consumers that already pass `light` and `dark`.

Alternative considered: introduce a new `CupAdaptiveTintPalette` type and migrate callers.
Rejected because it adds naming churn without any functional benefit.

### Keep contrast-aware tint resolution inside `ThemeService`

`ThemeService` will remain the runtime owner of theme and tint synchronization because it already owns document-root updates and current theme resolution.

Why: this keeps the implementation centralized and avoids splitting DOM concerns into `CupConfigService` or a separate runtime helper service.

Alternative considered: move tint resolution into `CupConfigService` or export a shared resolution utility.
Rejected because `ThemeService` is already the single place that writes the resolved color state to the document root.

### Resolve custom tint palettes with a small priority order

Runtime resolution will select the best matching value in this order: high-contrast light, high-contrast dark, regular light, regular dark.

Why: this matches the Apple guidance that custom colors should adapt to both appearance and increased contrast.

Alternative considered: derive high-contrast custom tint values by manipulating alpha or luminance at runtime.
Rejected because the palette should remain explicit and predictable.

### Leave named tint presets token-driven

Named tint values will continue to be driven by CSS selectors and token layers instead of being re-resolved in TypeScript.

Why: the existing token system already handles named tint adaptation well, and duplicating that logic in runtime code would create drift.

Alternative considered: unify named and custom tint resolution in TypeScript.
Rejected because it would duplicate CSS behavior and increase maintenance cost.

### Replace the slider thumb white with an existing semantic surface token first

The preferred implementation is to use an existing semantic token such as a control/surface background token.

Why: this keeps the fix small and preserves the semantic token-first architecture.

Alternative considered: create a new dedicated slider-thumb token immediately.
Rejected for P0 because a new token should only be introduced if no existing token fits after visual review.

## Risks / Trade-offs

- [Risk] High-contrast custom palettes may be omitted by consumers. → Mitigation: the runtime must fall back to regular light/dark values when the high-contrast fields are not provided.
- [Risk] `matchMedia('(prefers-contrast: more)')` may not be available in every environment. → Mitigation: treat contrast detection as optional and default to the regular palette path when unsupported.
- [Risk] The slider thumb token choice may not look correct on every platform. → Mitigation: start with the most appropriate existing token and only introduce a dedicated token if visual QA proves it necessary.
- [Risk] Public docs may imply that single `#hex` is a full adaptive palette. → Mitigation: document it explicitly as fallback-only.

## Migration Plan

1. Extend the public tint type contract with optional high-contrast fields.
2. Update `ThemeService` to resolve custom palettes using both appearance and contrast.
3. Add or update tests to cover default and increased-contrast runtime behavior.
4. Update public docs and architecture notes so the fallback-only hex path is explicit.
5. Replace the slider thumb hardcoded white with a token-backed semantic surface.
6. Run core, ui, and Storybook validation.

Rollback is straightforward because the type change is additive and the runtime behavior change is localized to `ThemeService`.

## Open Questions

- Should the slider thumb use an existing token such as `control-bg`, or should we add a dedicated thumb surface token if visual QA says the existing token is not a fit?
- Do we want to formally deprecate bare `#hex` tint input in a later change, or keep it indefinitely as a fallback convenience path?
- Should future work derive `subtle`, `container`, and `on` variants from the adaptive custom palette, or keep the current derivation model for now?
