## Why

El componente `cup-text-field` en `libs/ui/src/lib/text-field/` existe en main con funcionalidad básica (un `<input>` sin integración de formularios, sin estados visuales, sin accesibilidad). No funciona con Reactive Forms, usa `var()` directo en SCSS en vez de tokens validados, y carece de host bindings para estados. La spec completa en Notion (basada en el reporte HTML fuente) documenta 11 fixes necesarios para alinear el componente con el Apple Design System y los estándares de la biblioteca @ngx-cupertino/ui.

## What Changes

- Agregar `NG_VALUE_ACCESSOR` provider con `forwardRef` para integración con Reactive Forms
- Agregar 7 host bindings: `cup-focused`, `cup-disabled`, `cup-readonly`, `cup-error`, `cup-filled`, `cup-small`, `cup-large`
- Agregar `booleanAttribute` transform en `readonly` y `clearable`
- Agregar 7 inputs nuevos: `suffixIcon`, `error`, `helper`, `size`, `autocomplete`, `ariaLabel`, `name`
- Corregir tipado `viewChild<HTMLInputElement>` → `viewChild<ElementRef<HTMLInputElement>>`
- Agregar `focused` signal + handlers `onFocus()`/`onBlur()` con `onTouched()`
- Agregar `inputId` auto-generado (`cup-tf-${nextId++}`) para asociación label/input
- Agregar `describedBy` computed para aria-describedby (error o helper)
- Actualizar template completo: label con `[attr.for]`, prefix/suffix icons, clear button con `tabindex="-1"`, error/helper text
- Reescribir SCSS: migrar de `var(--cup-*)` a `@use 'index' as t; t.token()`, renombrar clases, usar `:host(.cup-*)`, agregar macOS y a11y media queries
- Crear `index.ts` barrel export y agregar export al barrel padre
- Implementar 20+ unit tests cubriendo rendering, input/value, clear, error/helper, ARIA, states, sizes, CVA, types
- Mantener `extends CupFormControl<string>` con `ControlValueAccessor`

## Capabilities

### New Capabilities

- `cup-text-field-component`: Componente text field completo con 15 inputs, tokenized SCSS, Reactive Forms CVA, ARIA completa, 3 sizes (sm/md/lg), 6 estados visuales, prefix/suffix icons, clear button, error/helper text, adaptación iOS/macOS
- `cup-text-field-export`: Barrel export para `CupTextField` en `libs/ui/src/lib/text-field/index.ts` y entrada en `libs/ui/src/index.ts`

### Modified Capabilities

<!-- No se modifican specs existentes. El componente es nuevo. -->

## Impact

- **Affected code**: `libs/ui/src/lib/text-field/cup-text-field.ts` (11 fixes), `libs/ui/src/lib/text-field/cup-text-field.scss` (reescritura completa), `libs/ui/src/lib/text-field/cup-text-field.spec.ts` (20+ tests nuevos), `libs/ui/src/lib/text-field/index.ts` (nuevo), `libs/ui/src/index.ts` (agregar export)
- **Dependencies**: `@ngx-cupertino/core` (CupFormControl, CupComponentSize), `@ngx-cupertino/icons` (CupIcon), `@ngx-cupertino/tokens` (SCSS tokens via `@use 'index' as t`), `@angular/forms` (NG_VALUE_ACCESSOR, ReactiveFormsModule)
- **No breaking changes**: El componente compilará y funcionará con la misma API externa, con capacidades adicionales y estilos corregidos
