## Context

El componente `cup-stepper` existe en main con funcionalidad básica: botones [-] [+], input numérico, `atMin`/`atMax` computed, keyboard ArrowUp/Down, y `CupIcon` para los botones. Pero no tiene CVA, usa `var()` en SCSS, no tiene auto-repeat, y carece de `numberAttribute`/`booleanAttribute`. La especificación en Notion documenta el estado final.

## Goals / Non-Goals

**Goals:**
- Integrar con Reactive Forms via CVA (`CupFormControl<number>`)
- Implementar auto-repeat con delay 400ms + interval 75ms (como iOS nativo)
- Implementar Shift+click para incremento ×10 (macOS HIG)
- Agregar `wrap` para ciclar min↔max
- Marcar form como touched en blur, pointerup, y onInput
- Reescribir SCSS con `t.token()`
- 20+ unit tests

**Non-Goals:**
- NO migrar a `FormValueControl` (CVA por compatibilidad)
- NO crear tokens nuevos
- NO modificar `CupFormControl` base class

## Decisions

### 1. Auto-repeat con setTimeout + setInterval separados
**Decisión**: `repeatTimeout: ReturnType<typeof setTimeout> | null` + `repeatInterval: ReturnType<typeof setInterval> | null` como variables separadas.
**Razón**: Tipado correcto sin cast. `stopRepeat()` limpia ambas.
**Alternativas**: Una sola variable con cast `as unknown as` — frágil, confuso.

### 2. writeValue clampa sin onChange
**Decisión**: `writeValue` usa `Math.max(min, Math.min(max, v))` sin llamar `setValue` (que dispara `onChange`).
**Razón**: CVA contract: `writeValue` no debe disparar `onChange` (causa NG0100). El valor se clampa pero `onChange` no se notifica porque viene del form, no del usuario.
**Alternativas**: Usar `setValue()` → NG0100 error en forms.

### 3. onTouched en input + blur + pointerup
**Decisión**: `onTouched()` en tres lugares: `onInput`, `onBlur`, `onButtonUp`.
**Razón**: WAI-ARIA y Reactive Forms esperan `touched` tras cualquier interacción. Sin esto, validación no se muestra hasta blur.
**Alternativas**: Solo en blur → mala UX, validación tardía.

### 4. pointerdown/up/leave para auto-repeat
**Decisión**: `pointerdown` inicia, `pointerup`/`pointerleave` detienen.
**Razón**: `pointerleave` es necesario porque el usuario puede arrastrar el cursor fuera del botón mientras mantiene presionado. Sin `pointerleave`, el repeat nunca se detendría.
**Alternativas**: Solo `pointerup` → bug si el cursor sale del botón.

## Risks / Trade-offs

- **[Riesgo] setTimeout/setInterval en componente puede causar memory leak** → Mitigación: `destroyRef.onDestroy(() => this.stopRepeat())` limpia ambos timers.
- **[Riesgo] `Number(value)` en onInput acepta strings como "1e5"** → Mitigación: El input tiene `type="number"` que el browser valida. `Number.isNaN` filtra valores inválidos.
- **[Riesgo] `displayValue` llama `toFixed` con `decimals = step decimals`** → Mitigación: `toFixed` con 0 decimals para step=1 retorna mismo valor. Para step=0.5 retorna 1 decimal.
