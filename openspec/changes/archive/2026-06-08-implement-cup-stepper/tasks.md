## 1. TypeScript — CupStepper Component

- [x] 1.1 Agregar imports: `booleanAttribute`, `computed`, `DestroyRef`, `forwardRef`, `inject`, `model`, `numberAttribute`
- [x] 1.2 Agregar `NG_VALUE_ACCESSOR` provider con `forwardRef(() => CupStepper)`
- [x] 1.3 Agregar host bindings: `[class.cup-disabled]`, `[class.cup-at-min]`, `[class.cup-at-max]`
- [x] 1.4 Agregar `numberAttribute` en `min`, `max`, `step` y `booleanAttribute` en `showInput`, `wrap`, `autoRepeat`
- [x] 1.5 Agregar `repeatTimeout`/`repeatInterval` tipados + `DestroyRef.onDestroy(() => this.stopRepeat())`
- [x] 1.6 Agregar `displayValue` computed con decimal rounding
- [x] 1.7 Implementar `increment`/`decrement` con multiplier + wrap logic
- [x] 1.8 Implementar `onButtonDown` con auto-repeat (delay 400ms + interval 75ms) + stopRepeat
- [x] 1.9 Implementar `onButtonUp` con `onTouched()`
- [x] 1.10 Implementar `onInput` con NaN check + `onTouched()`, `onBlur` con `onTouched()`
- [x] 1.11 Implementar `onKeyDown` con ArrowUp/Down + Shift+click multiplier ×10
- [x] 1.12 Implementar `setValue` con clamp + onChange, `writeValue` con clamp sin onChange, `stopRepeat` limpiando ambos timers
- [x] 1.13 Actualizar template con label, cup-controls container, botones con pointer events, input/span condicional

## 2. SCSS — Tokenized Styles

- [x] 2.1 Agregar `@use 'index' as t;` y migrar de `var(--cup-*)` a `t.token()`
- [x] 2.2 Implementar estilos: host, label, controls, decrement/increment, input, value-display
- [x] 2.3 Implementar `:host(.cup-disabled)` con opacity y pointer-events
- [x] 2.4 Agregar macOS: `@media (hover: hover) and (pointer: fine)` con 32px compacto
- [x] 2.5 Agregar a11y: `@media (prefers-contrast: more)` border HC, `@media (prefers-reduced-motion: reduce)` transition none

## 3. Barrel Exports

- [x] 3.1 Crear `libs/ui/src/lib/stepper/index.ts` con `export { CupStepper } from './cup-stepper'`
- [x] 3.2 Agregar `export * from './lib/stepper'` en `libs/ui/src/index.ts`

## 4. Unit Tests (Vitest)

- [x] 4.1 Test rendering: botones [-][+], input con showInput, span sin showInput, label
- [x] 4.2 Test increment/decrement: step, clamp a max/min, wrap cycle
- [x] 4.3 Test auto-repeat: pointerdown inicia, pointerup/pointerleave detiene, autoRepeat=false
- [x] 4.4 Test input: typing updates value, NaN ignored, onTouched called
- [x] 4.5 Test keyboard: ArrowUp/Down, Shift+ArrowUp/Down ×10
- [x] 4.6 Test ARIA: role=spinbutton, aria-valuemin/max/now, aria-label, aria-live
- [x] 4.7 Test states: cup-disabled, cup-at-min, cup-at-max, disabled blocks interaction
- [x] 4.8 Test CVA: writeValue clamp, onChange, onTouched, setDisabledState
- [x] 4.9 Test display: displayValue rounding for step integers and decimals

## 5. Validation

- [x] 5.1 Ejecutar `bun run build` — verificar compilación sin errores
- [x] 5.2 Ejecutar `bun run test` — verificar todos los tests pasan
- [x] 5.3 Verificar que no hay `var(--cup-*)` residual en el SCSS
- [x] 5.4 Verificar que Biome/formateo no reporta issues
