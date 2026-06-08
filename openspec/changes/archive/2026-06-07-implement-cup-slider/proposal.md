## Why

El componente `cup-slider` en `libs/ui/src/lib/slider/` existe en main con funcionalidad básica de mouse solo, sin integración con formularios, sin touch support (crítico para iOS), sin SCSS tokenizado, y con memory leak potencial por listeners de eventos no limpiados. No soporta tick marks ni min/max icons como los sliders nativos de Apple. La especificación en Notion y el reporte HTML fuente documentan 13 fixes necesarios para alinear el componente con el Apple Design System y los estándares de @ngx-cupertino/ui.

## What Changes

- Agregar `NG_VALUE_ACCESSOR` provider con `forwardRef` para Reactive Forms
- Migrar de `mousedown`/`mousemove`/`mouseup` a Pointer Events (`pointerdown`/`pointermove`/`pointerup`) con `setPointerCapture` — unifica mouse + touch + pen
- Agregar `AbortController` para cleanup de listeners + `DestroyRef.onDestroy()` — previene memory leaks
- Agregar `onTouched()` en keyboard navigation y pointerup
- Agregar `numberAttribute` transform en `min`, `max`, `step`, `ticks` y `booleanAttribute` en `showValue`
- Agregar 7 inputs nuevos: `ticks`, `showValue`, `minIcon`, `maxIcon`, `ariaLabel`, `ariaValueText`, `name`
- Agregar `tickPositions` computed y `dragging` signal + host binding `[class.cup-dragging]`
- Agregar `sliderId` auto-generado para label/input association
- Eliminar `#nativeInput` template variable (código muerto)
- Reescribir SCSS: migrar de `var(--cup-*)` a `t.token()`, renombrar clases, thumb shape iOS/macOS, tick marks, min/max icons layout, tamaño touch target
- A11y: ARIA completa en thumb, `<input type="range">` oculto para browser, keyboard PageUp/PageDown
- Crear `index.ts` barrel y agregar export al barrel padre
- Implementar 20+ unit tests

## Capabilities

### New Capabilities

- `cup-slider-component`: Componente slider completo con 13 inputs, Pointer Events + touch, tokenized SCSS, Reactive Forms CVA, ARIA completa, tick marks, min/max icons, 4 estados (default/dragging/disabled/focus), adaptación iOS/macOS
- `cup-slider-export`: Barrel export para `CupSlider` en `libs/ui/src/lib/slider/index.ts` y entrada en `libs/ui/src/index.ts`

### Modified Capabilities

<!-- No se modifican specs existentes. El componente es nuevo. -->

## Impact

- **Affected code**: `libs/ui/src/lib/slider/cup-slider.ts` (13 fixes), `libs/ui/src/lib/slider/cup-slider.scss` (reescritura completa), `libs/ui/src/lib/slider/cup-slider.spec.ts` (20+ tests), `libs/ui/src/lib/slider/index.ts` (nuevo), `libs/ui/src/index.ts` (agregar export)
- **Dependencies**: `@ngx-cupertino/core` (CupFormControl), `@ngx-cupertino/icons` (CupIcon), `@ngx-cupertino/tokens` (SCSS tokens), `@angular/forms` (NG_VALUE_ACCESSOR)
- **Breaking change en eventos**: Los outputs de eventos pasan de `mousedown`/`mousemove`/`mouseup` a Pointer Events unificados — los consumidores que escuchaban eventos de mouse directos deberán migrar. Los outputs `slideStart`/`slideEnd` permanecen compatibles.
- **No breaking changes en API pública**: Inputs y outputs declarados mantienen compatibilidad hacia atrás
