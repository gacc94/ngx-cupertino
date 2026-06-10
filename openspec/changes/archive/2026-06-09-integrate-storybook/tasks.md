## 1. Dependency Overrides

- [x] 1.1 Agregar overrides `@angular-devkit/build-angular: 21.2.7` y `@angular-devkit/core: 21.2.7` en root package.json
- [x] 1.2 Ejecutar `bun install` para aplicar overrides

## 2. Storybook Plugin

- [x] 2.1 Ejecutar `bun nx add @nx/storybook`

## 3. Generator Configuration

- [x] 3.1 Ejecutar `bun nx g @nx/angular:storybook-configuration ui --interactionTests=true`
- [x] 3.2 Verificar que `libs/ui/.storybook/` fue creado (main.ts, preview.ts, tsconfig.json)
- [x] 3.3 Verificar que `libs/ui/project.json` tiene targets storybook, build-storybook, test-storybook

## 4. SCSS Tokens Configuration

- [x] 4.1 Configurar `libs/ui/.storybook/preview.ts` con decorator `data-mode="light"` y `data-tint="blue"`
- [x] 4.2 Configurar backgrounds addon para light/dark mode
- [x] 4.3 Si el import directo de SCSS no funciona, configurar includePaths via webpackFinal

## 5. Stories Generation

- [x] 5.1 Verificar que se generaron stories para los 6 componentes
- [x] 5.2 Si no se generaron, ejecutar `bun nx g @nx/angular:stories --project=ui`
- [x] 5.3 Personalizar CupButton stories con argTypes: variant, size, disabled, destructive
- [x] 5.4 Personalizar CupToggle stories con argTypes: checked, disabled, size
- [x] 5.5 Personalizar CupTextField stories con argTypes: type, size, disabled, clearable
- [x] 5.6 Personalizar CupSlider stories con argTypes: min, max, step, disabled
- [x] 5.7 Personalizar CupStepper stories con argTypes: min, max, step, disabled
- [x] 5.8 Personalizar CupProgress stories con argTypes: value, type, size, indeterminate

## 6. Deploy Workflow

- [x] 6.1 Crear `.github/workflows/storybook.yml` con build-storybook + deploy-pages

## 7. Verification

- [x] 7.1 Ejecutar `bun nx storybook ui` — verificar que arranca sin errores
- [x] 7.2 Verificar que los 6 componentes se muestran en la sidebar
- [x] 7.3 Verificar que los SCSS tokens se aplican correctamente
- [x] 7.4 Verificar que los controls interactivos funcionan
- [x] 7.5 Ejecutar `bun nx build-storybook ui` — verificar build estático
