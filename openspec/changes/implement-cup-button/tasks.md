## 1. Types

- [x] 1.1 Create `libs/core/src/lib/types/component.types.ts` with CupButtonVariant, CupComponentSize, CupIconPosition

## 2. Component Source

- [x] 2.1 Create `libs/ui/src/lib/button/cup-button.ts` with selector, OnPush, host bindings, inline template, 8 inputs, 1 output, handleClick()

## 3. Component Styles

- [x] 3.1 Create `libs/ui/src/lib/button/cup-button.scss` with base, 3 sizes, 5 variants, loading spinner, HC borders

## 4. Barrel Export

- [x] 4.1 Create `libs/ui/src/lib/button/index.ts` exporting CupButton

## 5. Validation

- [x] 5.1 Verify `bun nx build ui` compiles successfully
- [x] 5.2 Verify all token references in SCSS match registered tokens in `_api.scss`
- [x] 5.3 Verify `bun nx typecheck ui` passes
