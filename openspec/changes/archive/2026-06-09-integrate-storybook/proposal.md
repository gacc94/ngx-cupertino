## Why

El proyecto @ngx-cupertino necesita documentación interactiva para sus 6 componentes Phase 1. Storybook provee un playground visual con controls interactivos, interaction tests, y deploy automático a GitHub Pages. La guía completa está documentada en Notion (Step 7 — Documentation Site). Esta implementación sigue los 7 pasos descritos ahí: overrides, plugin, generator, SCSS config, stories, y verificación.

## What Changes

- Agregar overrides `@angular-devkit/build-angular` y `@angular-devkit/core` a `21.2.7` en root `package.json`
- Instalar `@nx/storybook@22.7.5` via `bun nx add @nx/storybook`
- Generar configuración Storybook para lib `ui` con `bun nx g @nx/angular:storybook-configuration ui --interactionTests=true`
- Configurar SCSS tokens globales en `libs/ui/.storybook/preview.ts` con decorator `data-mode="light"` y `data-tint="blue"`
- Generar stories CSF3 para los 6 componentes si no se generaron automáticamente
- Crear workflow de deploy a GitHub Pages (`storybook.yml`)

## Capabilities

### New Capabilities

- `storybook-integration`: Storybook instalado y configurado sobre `libs/ui` con SCSS tokens, decorator de theming, y stories CSF3 para los 6 componentes
- `storybook-deploy`: Workflow GitHub Actions para deploy automático a GitHub Pages en cada push a main

## Impact

- **Affected files**: `package.json` (overrides), `libs/ui/.storybook/` (main.ts, preview.ts, tsconfig.json), `libs/ui/src/lib/**/*.stories.ts` (6 stories), `libs/ui/project.json` (storybook targets), `nx.json` (plugin), `.github/workflows/storybook.yml` (nuevo)
- **Dependencies**: `@nx/storybook@22.7.5`, `storybook`, `@storybook/angular`, `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/test`
- **No breaking changes**: Componentes existentes no se modifican
