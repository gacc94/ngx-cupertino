## Context

El proyecto es un monorepo Nx 22.7.5 con Angular 21.2.9. La lib `ui` contiene 6 componentes standalone con Signals API y SCSS tokenizado via `@ngx-cupertino/tokens`. Storybook se integrará como una única instancia sobre `libs/ui`, usando el formato CSF3 y configurando los tokens globales via decorator en `preview.ts`.

Issue conocido: Storybook 10.3 requiere `@angular-devkit/build-angular@^21.2.9` pero la última publicada es `21.2.7`. Se agregan overrides en root `package.json`.

## Goals / Non-Goals

**Goals:**
- Storybook funcionando con `bun nx storybook ui`
- Stories CSF3 para los 6 componentes con argTypes interactivos
- SCSS tokens cargados globalmente (data-mode, data-tint)
- Deploy automático a GitHub Pages vía GitHub Actions

**Non-Goals:**
- NO modificar componentes existentes
- NO modificar CI/CD existente (ci.yml, release.yml)
- NO modificar package.json de las 4 libs
- NO implementar Chromatic (opcional Phase 2)

## Decisions

### 1. Builder: Nx default vs AnalogJS
**Decisión**: Usar el builder default de Nx (webpack).
**Razón**: El generator `@nx/angular:storybook-configuration` configura automáticamente el builder correcto para la versión de Angular. Si falla, considerar `@analogjs/storybook-angular` como alternativa.
**Alternativas**: `@analogjs/storybook-angular` con Vite — requiere migración manual del builder.

### 2. SCSS tokens: decorator wrapper vs includePaths
**Decisión**: Usar decorator wrapper en `preview.ts` con `data-mode="light"` y `data-tint="blue"`.
**Razón**: Los componentes dependen de CSS custom properties globales (`--cup-*`). El decorator envuelve cada story en un div con los data attributes correctos. Si el import directo de SCSS no funciona, usar `webpackFinal` con `includePaths`.
**Alternativas**: `includePaths` en project.json — más complejo, depende del builder.

### 3. Stories: CSF3 tradicional vs CSF Next
**Decisión**: Usar CSF3 tradicional (`Meta<Component>` + `StoryObj<Component>`).
**Razón**: Nx 22.7.5 genera stories en este formato. Es compatible con Storybook 10.
**Alternativas**: CSF Next (`preview.meta()`) — más nuevo, no soportado por el generator de Nx actual.

## Risks / Trade-offs

- **[Riesgo] @angular-devkit overrides pueden romper otros paquetes** → Mitigación: Solo se pinea a 21.2.7 (la última publicada). Si hay conflictos, evaluar `@analogjs/storybook-angular`.
- **[Riesgo] Storybook build puede ser lento** → Mitigación: Nx caching acelera builds subsecuentes. Build-storybook separado del CI principal.
- **[Riesgo] webpackFinal puede no aplicarse si el builder usa Vite** → Mitigación: Verificar el builder después del generator. Si usa Vite, usar `viteFinal` en vez de `webpackFinal`.
