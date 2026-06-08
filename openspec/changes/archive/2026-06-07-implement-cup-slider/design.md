## Context

El componente `cup-slider` existe en main con funcionalidad básica: usa `mousedown`/`mousemove`/`mouseup` (solo mouse, no touch), no tiene `NG_VALUE_ACCESSOR`, usa `var()` en SCSS, tiene `margin-left: -14px` hardcoded en vez de `transform`, y carece de tick marks y min/max icons. Extiende `CupFormControl<string>` incorrectamente (debería ser `<number>`).

La especificación en Notion y el reporte HTML documentan el estado final con 13 inputs, Pointer Events unificados, AbortController para cleanup, tick marks, min/max icons, y full ARIA con `<input type="range">` oculto. El patrón establecido por `cup-button`, `cup-toggle`, y `cup-text-field` define las convenciones del proyecto.

## Goals / Non-Goals

**Goals:**
- Hacer el slider funcional en touch screens (iOS) migrando a Pointer Events
- Integrar con Reactive Forms via CVA (`CupFormControl<number>`)
- Prevenir memory leaks con `AbortController` + `DestroyRef`
- Implementar tick marks visuales y min/max icons como los sliders nativos de Apple
- Adaptar thumb shape entre iOS (rounded-rect) y macOS (circle)
- Keyboard navigation completo con PageUp/PageDown para saltos grandes
- 20+ unit tests con Vitest

**Non-Goals:**
- NO migrar a `FormValueControl` de Signal Forms (CVA por compatibilidad)
- NO crear tokens nuevos — usar solo tokens existentes
- NO modificar `CupFormControl` base class
- NO soportar sliders verticales (solo horizontal)

## Decisions

### 1. Pointer Events sobre Mouse + Touch Events separados
**Decisión**: Usar `pointerdown`/`pointermove`/`pointerup` con `setPointerCapture`.
**Razón**: Unifica mouse, touch y pen en una sola API. `setPointerCapture` evita perder el tracking si el pointer sale del elemento, eliminando la necesidad de listeners en `document`.
**Alternativas**: Mouse Events + Touch Events separados — más código, dos code paths, no soporta pen.

### 2. AbortController sobre removeEventListener manual
**Decisión**: Usar `AbortController` con `{ signal }` en `addEventListener` y llamar `abort()` para cleanup.
**Razón**: Limpia ambos listeners (`pointermove` + `pointerup`) con una sola llamada. El `destroyRef.onDestroy(() => abortController?.abort())` asegura cleanup si el componente se destruye durante drag.
**Alternativas**: `removeEventListener` manual — requiere guardar referencias a los callbacks, más propenso a errores.

### 3. <input type="range"> oculto para a11y nativa
**Decisión**: Renderizar un `<input type="range">` oculto visualmente (`.cup-native` con clip) junto al custom track/thumb.
**Razón**: El browser proporciona accesibilidad nativa para `<input type="range">` (screen readers, AT). El custom track/thumb maneja lo visual. Es el patrón "dual slider" recomendado.
**Alternativas**: Solo ARIA en el thumb div — menos accesible, no todos los screen readers soportan `role="slider"` igual de bien que un input nativo.

### 4. Thumb shape: iOS rounded-rect vs macOS circle via @media
**Decisión**: Usar `border-radius: radius-sm` (8px) por default (iOS) y `radius-slider-thumb` (50%) en `@media (hover: hover) and (pointer: fine)` (macOS).
**Razón**: iOS usa `UISlider` con thumb rounded-rect (más grande, mejor touch target). macOS usa `NSSlider` con thumb circular (más pequeño, precisión de mouse).
**Alternativas**: Un solo shape para ambos — no sigue Apple HIG.

### 5. onTouched en keyboard + pointer
**Decisión**: Llamar `onTouched()` en `onKeyDown` y en `pointerup` (no solo en pointerup).
**Razón**: WAI-ARIA espera que el control se marque como touched tras cualquier interacción del usuario, no solo drag. Sin esto, formularios no muestran errores de validación hasta que el usuario hace drag.
**Alternativas**: Solo en pointerup — formularios no detectan interacción por teclado.

## Risks / Trade-offs

- **[Riesgo] @media (hover:hover) aplica macOS styles en iPad con Magic Keyboard** → Mitigación: El diseño macOS es un enhancement visual. En iPad con mouse, el slider se ve "macOS-like" — funcionalmente correcto.
- **[Riesgo] AbortController no disponible en entornos muy antiguos** → Mitigación: Angular 21+ garantiza ES2022+. `AbortController` es soportado desde Chrome 66, Safari 12.1, Firefox 57.
- **[Riesgo] setPointerCapture puede interferir con otros elementos** → Mitigación: Se llama solo en `pointerdown` dentro del track container y se libera automáticamente en `pointerup` o via `AbortController.abort()`.
- **[Riesgo] `nextId++` no resetea entre navegaciones** → Mitigación: Se reinicia en cada reload de la app. IDs `cup-slider-0` a `cup-slider-N` no colisionan.
