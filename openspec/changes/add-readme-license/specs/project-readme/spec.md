## ADDED Requirements

### Requirement: README.md documents the project identity

The `README.md` at workspace root SHALL contain the project name `@ngx-cupertino/ui` and a one-line description referencing Apple Design System for web.

#### Scenario: Project identity in README

- **WHEN** reading `README.md`
- **THEN** the first heading contains the project name and the description mentions Apple Design System

### Requirement: README.md includes badges section

The `README.md` SHALL include a badges section with visual indicators for Angular, TypeScript, Nx, Bun, Vitest, Biome, and MIT License.

#### Scenario: Badges present

- **WHEN** reading `README.md`
- **THEN** it contains badge image references for at least Angular, TypeScript, Nx, Bun, and MIT License using `img.shields.io` URLs

### Requirement: README.md documents features

The `README.md` SHALL include a features section listing key differentiators: Apple Design System, 37 standalone components, Signal-based API, Angular host binding styling pattern, and 4 publishable packages.

#### Scenario: Features documented

- **WHEN** reading `README.md`
- **THEN** the features section mentions "37 components", "Signal-based API", and "Angular host bindings"

### Requirement: README.md documents installation

The `README.md` SHALL include an installation section with the `bun add @ngx-cupertino/ui` command.

#### Scenario: Installation instructions

- **WHEN** reading `README.md`
- **THEN** it contains the exact command `bun add @ngx-cupertino/ui`

### Requirement: README.md documents quick start

The `README.md` SHALL include a Quick Start section with a minimal code example showing `provideCupertino()` in `app.config.ts`, `@use '@ngx-cupertino/tokens'` in `styles.scss`, and a component usage example.

#### Scenario: Quick Start code

- **WHEN** reading `README.md`
- **THEN** it contains `provideCupertino()` in a code block and a `cup-button` or `cup-icon` usage example

### Requirement: README.md documents component catalog

The `README.md` SHALL include a component table listing all 37 components grouped by implementation phase (Foundations, Content, Structure, Extended, Soon), each with its selector.

#### Scenario: Component table

- **WHEN** reading `README.md`
- **THEN** it contains a table with at least 4 phases, component names, and selectors prefixed with `cup-`

### Requirement: README.md documents package architecture

The `README.md` SHALL include a package architecture section showing the dependency flow: `tokens → core → icons/ui`.

#### Scenario: Architecture documented

- **WHEN** reading `README.md`
- **THEN** it explains the package dependency hierarchy with `@ngx-cupertino/tokens`, `core`, `ui`, and `icons`

### Requirement: README.md documents styling conventions

The `README.md` SHALL document the Angular-native styling pattern: `host:` bindings for state classes, `cup-` prefixed simple classes for internal elements, variant classes directly on host, `ViewEncapsulation.Emulated`, and CSS custom properties from `@ngx-cupertino/tokens`.

#### Scenario: Styling conventions documented

- **WHEN** reading `README.md`
- **THEN** the styling section mentions `host:` bindings, `cup-` prefixed classes, `ViewEncapsulation.Emulated`, and explicitly states "No BEM"

### Requirement: README.md documents development commands

The `README.md` SHALL include a development section with common commands: `bun nx serve playground`, `bun nx test ui`, `bun nx run-many -t build`, and `bun biome check --write .`.

#### Scenario: Development commands

- **WHEN** reading `README.md`
- **THEN** it contains at least the commands `bun nx serve playground` and `bun nx run-many -t build`

### Requirement: README.md does not reference template artifacts

The `README.md` SHALL NOT contain references to the Nx template's shop, api, Docker, Playwright, or ESLint artifacts.

#### Scenario: No template references

- **WHEN** reading `README.md`
- **THEN** it does not contain the words "shop", "Docker", "Playwright", or "ESLint" in context of template projects
