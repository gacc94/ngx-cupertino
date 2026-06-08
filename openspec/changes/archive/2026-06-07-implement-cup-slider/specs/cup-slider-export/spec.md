## ADDED Requirements

### Requirement: Barrel export in slider directory
The project SHALL provide a barrel export file at `libs/ui/src/lib/slider/index.ts` that exports `CupSlider`.

#### Scenario: index.ts exports CupSlider
- **WHEN** `index.ts` is imported
- **THEN** `CupSlider` is available as a named export

### Requirement: Parent barrel includes slider export
The parent barrel at `libs/ui/src/index.ts` SHALL re-export all slider symbols via `export * from './lib/slider'`.

#### Scenario: Parent barrel exports slider
- **WHEN** `@ngx-cupertino/ui` is imported
- **THEN** `CupSlider` is available as a named export
