## Why

El componente `cup-stepper` en `libs/ui/src/lib/stepper/` existe en main con funcionalidad básica pero sin integración con formularios (sin `NG_VALUE_ACCESSOR`), sin `numberAttribute`/`booleanAttribute` transforms, sin auto-repeat (mantener presionado no repite), sin soporte Shift+click para incremento ×10 (macOS HIG), sin `wrap` para ciclar min↔max, y con SCSS usando `var()` directo en vez de tokens validados. La especificación en Notion y el reporte HTML fuente documentan 9 fixes necesarios.

## What Changes

- Agregar `NG_VALUE_ACCESSOR` provider con `forwardRef` para Reactive Forms
- Agregar `numberAttribute` transform en `min`, `max`, `step`
- Agregar `booleanAttribute` transform en `showInput`, `wrap`, `autoRepeat`
- Implementar auto-repeat: `pointerdown` inicia timer con delay 400ms + interval 75ms, `pointerup`/`pointerleave` detiene
- Implementar Shift+click para incremento ×10 via `event.shiftKey` en `onKeyDown`
- Agregar `wrap` input para ciclar min↔max
- Agregar `onTouched()` en blur, pointerup, y `onInput`
- Agregar host bindings: `cup-disabled`, `cup-at-min`, `cup-at-max`
- Agregar `displayValue` computed con decimal rounding
- Separar `repeatTimeout`/`repeatInterval` tipados correctamente (sin cast)
- Reescribir SCSS: migrar de `var()` a `t.token()`
- Crear `index.ts` barrel y agregar export al barrel padre
- Implementar 20+ unit tests

## Capabilities

### New Capabilities

- `cup-stepper-component`: Componente stepper completo con 11 inputs, CVA, auto-repeat (como iOS nativo), Shift+click (macOS HIG), wrap cycle, tokenized SCSS, ARIA completa, 4 estados (default/hover/disabled/at-min-max), adaptación iOS/macOS
- `cup-stepper-export`: Barrel export para `CupStepper` en `libs/ui/src/lib/stepper/index.ts` y entrada en `libs/ui/src/index.ts`

## Impact

- **Affected code**: `libs/ui/src/lib/stepper/cup-stepper.ts` (9 fixes), `libs/ui/src/lib/stepper/cup-stepper.scss` (reescritura), `libs/ui/src/lib/stepper/cup-stepper.spec.ts` (20+ tests), `libs/ui/src/lib/stepper/index.ts` (nuevo), `libs/ui/src/index.ts` (agregar export)
- **Dependencies**: `@ngx-cupertino/core` (CupFormControl), `@ngx-cupertino/icons` (CupIcon), `@ngx-cupertino/tokens` (SCSS), `@angular/forms` (NG_VALUE_ACCESSOR)
- **No breaking changes**: API externa mantiene compatibilidad
