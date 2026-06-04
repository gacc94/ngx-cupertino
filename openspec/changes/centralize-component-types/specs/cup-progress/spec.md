## MODIFIED Requirements

### Requirement: CupProgress uses types from core

The `type` input SHALL use `CupProgressType` imported from `@ngx-cupertino/core`. The `size` input SHALL use `CupComponentSize` imported from `@ngx-cupertino/core`.

#### Scenario: Type from core

- **WHEN** reading `cup-progress.ts`
- **THEN** `type` input is typed as `CupProgressType` from `@ngx-cupertino/core`

#### Scenario: Size from core

- **WHEN** reading `cup-progress.ts`
- **THEN** `size` input is typed as `CupComponentSize` from `@ngx-cupertino/core`
