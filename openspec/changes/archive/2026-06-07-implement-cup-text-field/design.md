## Context

El componente `cup-text-field` en `libs/ui/src/lib/text-field/` existe en main con una implementación básica: 7 inputs (value, placeholder, label, type, readonly, clearable, prefixIcon), template simple con wrapper y container, SCSS con `var()` directo, y sin integración con formularios. Extiende `CupFormControl<string>` pero no provee `NG_VALUE_ACCESSOR`. No tiene host bindings para estados, ni suffix icon, ni error/helper text, ni size input, ni `booleanAttribute`, ni `viewChild` correcto.

La especificación en Notion (`378c57e973cb80f382a2d2b26a037ead`) basada en el reporte HTML fuente documenta el estado final deseado con 15 inputs, template completo, tokenized SCSS, ARIA completa, 6 estados, y 20+ unit tests.

El patrón establecido por `cup-button` y `cup-toggle` define las convenciones del proyecto: Signals API, `host:` bindings, `CupFormControl` base, `@use 'index' as t; t.token()` SCSS, `ViewEncapsulation.Emulated`, `booleanAttribute` para inputs booleanos.

## Goals / Non-Goals

**Goals:**
- Actualizar `CupTextField` para que sea un componente CVA completo usable con `formControlName` y Reactive Forms
- Implementar todos los estados visuales via host bindings (`cup-focused`, `cup-disabled`, `cup-error`, `cup-filled`, `cup-readonly`, `cup-small`, `cup-large`)
- Reescribir SCSS con `t.token()` para validación en build
- Agregar suffix icon, clear button, error/helper text, y 3 tamaños
- Implementar ARIA completa: `id` auto-generado, `label/for`, `aria-label`, `aria-invalid`, `aria-describedby`
- Adaptación iOS/macOS via media queries (`@media (hover: hover) and (pointer: fine)`)
- 20+ unit tests con Vitest cubriendo todas las funcionalidades

**Non-Goals:**
- NO migrar a `FormValueControl<T>` de Signal Forms (se usará CVA por compatibilidad)
- NO crear nuevos tokens — usa solo tokens existentes
- NO modificar `CupFormControl` base class
- NO modificar `CupIcon` o el sistema de íconos
- NO implementar label flotante (material design) — el label es estático sobre el input

## Decisions

### 1. ControlValueAccessor sobre FormValueControl
**Decisión**: Mantener `CupFormControl<string>` con `ControlValueAccessor` en vez de adoptar `FormValueControl<T>` de Signal Forms (Angular v21+).
**Razón**: Compatibilidad con Reactive Forms existentes y con el patrón establecido en `cup-toggle`. `FormValueControl` es experimental y usa `[formField]` binding que requiere migración de todos los formularios existentes. Se evaluará migración en Phase 2.
**Alternativas**: `FormValueControl` con `[formField]` — más nativo a Signals pero incompatible con `formControlName`.

### 2. inputId auto-generado vs @Input
**Decisión**: Usar `let nextId = 0` a nivel módulo para generar `cup-tf-${nextId++}`.
**Razón**: Cada instancia del componente necesita un ID único para la asociación label/input. El contador a nivel módulo es simple y determinista.
**Alternativas**: `inject(IdGenerator)` o `@Input() id` — añaden complejidad sin beneficio real.

### 3. SCSS: @use 'index' as t con t.token()
**Decisión**: `@use 'index' as t;` con `t.token()` para todos los valores de diseño.
**Razón**: El build de ng-packagr requiere que `@use` esté en styleIncludePaths. La validación en tiempo de compilación previene tokens inexistentes.
**Alternativas**: `var(--cup-*)` directo — sin validación, propenso a errores tipográficos.

### 4. macOS detection: @media query vs @include t.platform(macos)
**Decisión**: Usar `@media (hover: hover) and (pointer: fine)` para detectar macOS/desktop.
**Razón**: Coincide con el reporte HTML fuente. La detección por capacidades (hover+pointer) es más robusta que user-agent sniffing. No requiere mixin adicional.
**Alternativas**: `@include t.platform(macos)` — requiere que el token library tenga el mixin, añade acoplamiento.

### 5. label como input(string) vs <ng-content>
**Decisión**: Mantener `label` como `input<string>()` (no ng-content).
**Razón**: El label del text field es texto plano sobre el input — no necesita HTML rico. Además se necesita el texto para `aria-label` del input. A diferencia del toggle donde el label usa ng-content para mayor flexibilidad.
**Alternativas**: `<ng-content select="[label]">` — más flexible pero añade complejidad innecesaria para texto plano.

### 6. viewChild con ElementRef
**Decisión**: `viewChild<ElementRef<HTMLInputElement>>('inputRef')` en vez de `viewChild<HTMLInputElement>`.
**Razón**: Angular `viewChild` retorna `ElementRef` cuando se consulta un elemento nativo del template. El código actual en main tiene `viewChild<HTMLInputElement>` que es incorrecto — `inputEl()?.focus?.()` no tipa correctamente.
**Alternativas**: `viewChild<HTMLInputElement, ElementRef<HTMLInputElement>>` con `{read: ElementRef}` — más verboso, mismo resultado.

## Risks / Trade-offs

- **[Riesgo] @media (hover:hover) detecta dispositivos con mouse en iOS (como iPad con Magic Keyboard)** → Mitigación: El diseño macOS es un enhancement visual, no rompe funcionalidad. En iPad con mouse, el campo se verá "macOS-like" lo cual es aceptable.
- **[Riesgo] nextId++ no resetea entre navegaciones** → Mitigación: El contador es a nivel módulo — se reinicia en cada reload de la app. IDs como `cup-tf-0` a `cup-tf-50` no colisionan entre instancias.
- **[Riesgo] 15 inputs pueden afectar performance** → Mitigación: Todos son signals `input()` — Angular optimiza la detección de cambios. `OnPush` limita re-renders.
- **[Riesgo] `t.token('placeholder')` podría no existir como token** → Mitigación: Verificado contra `_api.scss` — el token `placeholder` existe. Si falla el build, se sabrá inmediatamente.
