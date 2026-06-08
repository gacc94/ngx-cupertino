## ADDED Requirements

### Requirement: Barrel export in stepper directory
The project SHALL provide a barrel export file at `libs/ui/src/lib/stepper/index.ts` that exports `CupStepper`.

#### Scenario: index.ts exports CupStepper
- **WHEN** `index.ts` is imported
- **THEN** `CupStepper` is available as a named export

### Requirement: Parent barrel includes stepper export
The parent barrel at `libs/ui/src/index.ts` SHALL re-export all stepper symbols via `export * from './lib/stepper'`.

#### Scenario: Parent barrel exports stepper
- **WHEN** `@ngx-cupertino/ui` is imported
- **THEN** `CupStepper` is available as a named export
