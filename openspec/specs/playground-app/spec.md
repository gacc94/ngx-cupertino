# playground-app Specification

## Purpose
TBD - created by archiving change generate-projects-toolchain. Update Purpose after archive.
## Requirements
### Requirement: Playground application exists

The workspace SHALL contain an Angular application named `playground` at `apps/playground/` generated via `@nx/angular:application` with SCSS styling and the `cup` HTML prefix.

#### Scenario: App generation

- **WHEN** `bun nx g @nx/angular:application playground --style=scss --prefix=cup --directory=apps/playground` is executed
- **THEN** the directory `apps/playground/` exists with a valid Angular `project.json`, `tsconfig.app.json`, `tsconfig.spec.json`, `src/main.ts`, `src/app/app.component.ts`, and `src/styles.scss`

#### Scenario: Dev server starts

- **WHEN** `bun nx serve playground` is executed
- **THEN** the Vite dev server starts on a local port and serves the Angular application without compilation errors

### Requirement: Playground uses Vite dev server

The playground application SHALL use the Vite dev server (via `@nx/vite:plugin`) for development, not webpack-based `@angular-devkit/build-angular:browser`.

#### Scenario: Serve target uses Vite

- **WHEN** `bun nx show project playground --json` is executed
- **THEN** the output includes a `serve` target using the `@nx/vite:plugin` executor

### Requirement: No Cypress or Playwright e2e project

The workspace SHALL NOT contain an e2e project for the playground application. The directory `apps/playground-e2e/` MUST NOT exist.

#### Scenario: E2e directory removed

- **WHEN** listing `apps/` contents
- **THEN** only the `playground/` directory exists; no `playground-e2e/` directory is present

#### Scenario: No e2e target on playground

- **WHEN** `bun nx show project playground --json` is executed
- **THEN** no `e2e` target exists in the project configuration

### Requirement: HTML prefix is `cup`

All components in the playground application SHALL use the `cup` HTML prefix in their selectors.

#### Scenario: Prefix in app config

- **WHEN** the playground application is inspected
- **THEN** the Angular application builder config includes `"prefix": "cup"`

