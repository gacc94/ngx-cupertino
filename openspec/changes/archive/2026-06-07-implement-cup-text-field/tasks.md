## 1. TypeScript — CupTextField Component

- [x] 1.1 Agregar imports: `booleanAttribute`, `computed`, `ElementRef`, `forwardRef`, `signal`, `CupComponentSize`, `NG_VALUE_ACCESSOR`
- [x] 1.2 Agregar `NG_VALUE_ACCESSOR` provider con `forwardRef(() => CupTextField)`
- [x] 1.3 Agregar host bindings: `cup-focused`, `cup-disabled`, `cup-readonly`, `cup-error`, `cup-filled`, `cup-small`, `cup-large`
- [x] 1.4 Agregar `booleanAttribute` transform en `readonly` y `clearable`
- [x] 1.5 Agregar nuevos inputs: `suffixIcon`, `error`, `helper`, `size`, `autocomplete`, `ariaLabel`, `name`
- [x] 1.6 Corregir `viewChild<HTMLInputElement>` → `viewChild<ElementRef<HTMLInputElement>>('inputRef')`
- [x] 1.7 Agregar `focused` signal + `onFocus()`/`onBlur()` handlers con `onTouched()`
- [x] 1.8 Agregar `inputId` auto-generado (`cup-tf-${nextId++}`) y `describedBy` computed
- [x] 1.9 Agregar `CupInputType` type union
- [x] 1.10 Actualizar template: label con `[attr.for]`, container div, prefix/suffix, clear con `tabindex="-1"`, error/helper, ARIA attrs

## 2. SCSS — Tokenized Styles

- [x] 2.1 Agregar `@use 'index' as t;` al inicio del archivo
- [x] 2.2 Renombrar clases: `.cup-text-field-*` → `.cup-label`, `.cup-input-container`, `.cup-input`, `.cup-prefix`, `.cup-suffix`, `.cup-clear`, `.cup-helper`, `.cup-error-text`
- [x] 2.3 Reemplazar `var(--cup-*)` por `t.token('token-name')`
- [x] 2.4 Implementar `:host(.cup-focused)`, `:host(.cup-disabled)`, `:host(.cup-error)`, `:host(.cup-readonly)`, `:host(.cup-filled)`, `:host(.cup-small)`, `:host(.cup-large)` con estilos correspondientes
- [x] 2.5 Agregar estilos de sizes: sm (control-height-sm, 6px 10px, text-subheadline), lg (control-height-lg, 14px 16px, text-title3)
- [x] 2.6 Agregar macOS: `@media (hover: hover) and (pointer: fine)` con fondo blanco, borde visible, radius-sm, focus glow `color-mix`
- [x] 2.7 Agregar a11y: `@media (prefers-contrast: more)` borde HC, `@media (prefers-reduced-motion: reduce)` transition none
- [x] 2.8 Agregar `.cup-error.cup-focused` regla combinada

## 3. Barrel Exports

- [x] 3.1 Crear `libs/ui/src/lib/text-field/index.ts` con `export { CupTextField } from './cup-text-field'`
- [x] 3.2 Agregar `export * from './lib/text-field'` en `libs/ui/src/index.ts`

## 4. Unit Tests (Vitest)

- [x] 4.1 Test rendering: componente se crea, input renderizado, label/placeholder/prefix/suffix renderizados
- [x] 4.2 Test input/value: onInput actualiza value, onChange llamado, writeValue sincroniza
- [x] 4.3 Test clear: show/hide, clear value, onChange(''), hide suffix when clear visible
- [x] 4.4 Test error/helper: error visible, helper visible, error hides helper, aria-invalid, aria-describedby
- [x] 4.5 Test ARIA: label/for association, aria-label fallback, disabled/readonly attributes
- [x] 4.6 Test states: cup-focused on focus/blur, cup-disabled, cup-readonly, cup-error, cup-filled, onTouched en blur
- [x] 4.7 Test sizes: cup-small y cup-large classes
- [x] 4.8 Test CVA: registerOnChange, registerOnTouched, setDisabledState, writeValue
- [x] 4.9 Test types: type propagation (email, password, etc.), default type "text"

## 5. Validation

- [x] 5.1 Ejecutar `bun run build` — verificar que compila sin errores
- [x] 5.2 Ejecutar `bun run test` — verificar que todos los tests pasan
- [x] 5.3 Verificar que no hay `var(--cup-*)` residual en el SCSS
- [x] 5.4 Verificar que Biome/formateo no reporta issues
