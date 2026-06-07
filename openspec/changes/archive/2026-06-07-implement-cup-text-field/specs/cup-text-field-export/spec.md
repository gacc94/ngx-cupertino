## ADDED Requirements

### Requirement: Barrel export in text-field directory
The project SHALL provide a barrel export file at `libs/ui/src/lib/text-field/index.ts` that exports `CupTextField`.

#### Scenario: index.ts exports CupTextField
- **WHEN** `index.ts` is imported
- **THEN** `CupTextField` is available as a named export

### Requirement: Parent barrel includes text-field export
The parent barrel at `libs/ui/src/index.ts` SHALL re-export all text-field symbols via `export * from './lib/text-field'`.

#### Scenario: Parent barrel exports text-field
- **WHEN** `@ngx-cupertino/ui` is imported
- **THEN** `CupTextField` is available as a named export
