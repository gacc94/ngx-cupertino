## 1. TypeScript — CupSlider Component

- [x] 1.1 Agregar imports: `booleanAttribute`, `computed`, `DestroyRef`, `forwardRef`, `inject`, `model`, `numberAttribute`, `output`, `signal`
- [x] 1.2 Agregar `NG_VALUE_ACCESSOR` provider con `forwardRef(() => CupSlider)`
- [x] 1.3 Agregar host bindings: `[class.cup-disabled]`, `[class.cup-dragging]`
- [x] 1.4 Agregar `AbortController` + `destroyRef.onDestroy()` para cleanup
- [x] 1.5 Agregar `numberAttribute` en `min`, `max`, `step`, `ticks` y `booleanAttribute` en `showValue`
- [x] 1.6 Agregar inputs: `ticks`, `showValue`, `minIcon`, `maxIcon`, `ariaLabel`, `ariaValueText`, `name`
- [x] 1.7 Agregar outputs: `slideStart`, `slideEnd`
- [x] 1.8 Agregar `dragging` signal + `sliderId` auto-generado + `percentage` computed + `tickPositions` computed
- [x] 1.9 Implementar `onPointerDown` con Pointer Events + `setPointerCapture` + `AbortController` signals
- [x] 1.10 Implementar `onKeyDown` con ArrowRight/Left, ArrowUp/Down, PageUp, PageDown, Home, End + `onTouched()`
- [x] 1.11 Implementar `onNativeInput`, `updateFromPointer`, `setValue` con clamp, `snapToStep`
- [x] 1.12 Agregar `writeValue` override + `CupIcon` import
- [x] 1.13 Actualizar template: header (label+value), slider-row (minIcon+track+maxIcon), track+fill+ticks+thumb, native input oculto

## 2. SCSS — Tokenized Styles

- [x] 2.1 Agregar `@use 'index' as t;` y migrar de `var(--cup-*)` a `t.token()`
- [x] 2.2 Renombrar clases a patrón `cup-*`: header, label, value, slider-row, min/max-icon, track-container, track, fill, thumb, ticks, tick, native
- [x] 2.3 Implementar `:host(.cup-disabled)` y `:host(.cup-dragging)` con estilos correspondientes
- [x] 2.4 Implementar thumb focus-visible con `tint-subtle` ring
- [x] 2.5 Implementar `.cup-ticks` y `.cup-tick` posicionamiento absoluto
- [x] 2.6 Agregar macOS: `@media (hover: hover) and (pointer: fine)` con thumb 20px circular, track container 28px, sin drag scale
- [x] 2.7 Agregar a11y: `@media (prefers-contrast: more)` border HC, `@media (prefers-reduced-motion: reduce)` transition none

## 3. Barrel Exports

- [x] 3.1 Crear `libs/ui/src/lib/slider/index.ts` con `export { CupSlider } from './cup-slider'`
- [x] 3.2 Agregar `export * from './lib/slider'` en `libs/ui/src/index.ts`

## 4. Unit Tests (Vitest)

- [x] 4.1 Test rendering: track, thumb, label, value display, hidden native input
- [x] 4.2 Test value/percentage: computed percentage, clamped setValue, snapToStep
- [x] 4.3 Test keyboard: ArrowRight/Left/Up/Down, PageUp/Down, Home/End, disabled blocks
- [x] 4.4 Test pointer: pointerdown updates value, slideStart/slideEnd emit, disabled blocks
- [x] 4.5 Test ticks: render N ticks, tickPositions computation, no ticks when 0
- [x] 4.6 Test min/max icons: render when provided, not render when undefined
- [x] 4.7 Test ARIA: role=slider, aria-valuemin/max/now, aria-label, aria-valuetext, tabindex
- [x] 4.8 Test CVA: writeValue, registerOnChange, registerOnTouched, setDisabledState
- [x] 4.9 Test states: cup-disabled class, cup-dragging class, onTouched in keyboard + pointerup

## 5. Validation

- [x] 5.1 Ejecutar `bun run build` — verificar que compila sin errores
- [x] 5.2 Ejecutar `bun run test` — verificar que todos los tests pasan
- [x] 5.3 Verificar que no hay `var(--cup-*)` residual en el SCSS
- [x] 5.4 Verificar que Biome/formateo no reporta issues
