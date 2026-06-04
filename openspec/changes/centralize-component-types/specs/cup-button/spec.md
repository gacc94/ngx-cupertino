## MODIFIED Requirements

### Requirement: CupButton uses types from core

The `variant` input SHALL use `CupButtonVariant` type imported from `@ngx-cupertino/core`. The `size` input SHALL use `CupComponentSize` type imported from `@ngx-cupertino/core`.

#### Scenario: Variant type from core

- **WHEN** reading `cup-button.ts`
- **THEN** `variant` input is typed as `CupButtonVariant` from `@ngx-cupertino/core`, not as an inline union

#### Scenario: Size type from core

- **WHEN** reading `cup-button.ts`
- **THEN** `size` input is typed as `CupComponentSize` from `@ngx-cupertino/core`, not as an inline union
