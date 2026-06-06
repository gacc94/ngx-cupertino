## ADDED Requirements

### Requirement: Stylelint validates SCSS across all publishable libraries
The system SHALL provide SCSS linting via Stylelint with `stylelint-config-standard-scss` for all 4 publishable libraries (tokens, core, icons, ui). Linting SHALL run via `nx-stylelint:lint` executor with Nx caching.

#### Scenario: SCSS files pass Stylelint validation
- **WHEN** `bun nx stylelint tokens` is run
- **THEN** all SCSS files in `libs/tokens/src/lib/` are validated
- **THEN** no errors are reported for correctly formatted SCSS

#### Scenario: Stylelint catches indentation errors
- **WHEN** an SCSS file has 2-space indentation instead of 4-space
- **THEN** Stylelint reports an `indentation` error

### Requirement: Cup- prefix naming conventions are enforced
The system SHALL enforce `cup-` prefix for SCSS variables (`$cup-*`), mixins (`cup-*`), functions (`cup-*`), and placeholder selectors (`%cup-*`). CSS class selectors SHALL start with `cup-`.

#### Scenario: Invalid variable name fails linting
- **WHEN** an SCSS variable is named `$my-var` instead of `$cup-my-var`
- **THEN** Stylelint reports `scss/dollar-variable-pattern` error

#### Scenario: Valid cup- prefixed names pass
- **WHEN** all variables, mixins, and functions use `cup-` prefix
- **THEN** Stylelint passes without pattern errors

### Requirement: Stylelint is integrated with CI workflow
The system SHALL include a `stylelint` job in `.github/workflows/ci.yml` that runs `bun nx affected -t stylelint` on push and pull_request to main. The job SHALL run in parallel with format, typecheck, and build jobs.

#### Scenario: CI runs Stylelint on affected projects
- **WHEN** a PR changes SCSS files in `libs/tokens/`
- **THEN** CI `stylelint` job runs only on the tokens project
- **THEN** if linting fails, the CI check fails

### Requirement: Stylelint configuration is at project root
The system SHALL have a single `.stylelintrc.json` at the project root extending `stylelint-config-standard-scss` with 4-space indentation, no IDs, modern color notation, and SCSS-specific rules for naming patterns.

#### Scenario: Root config is used by all libraries
- **WHEN** `bun nx stylelint tokens` is run
- **THEN** it uses the root `.stylelintrc.json` configuration
