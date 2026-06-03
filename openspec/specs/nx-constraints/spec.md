# nx-constraints Specification

## Purpose
TBD - created by archiving change generate-projects-toolchain. Update Purpose after archive.
## Requirements
### Requirement: Projects have module boundary tags

Each project in the workspace SHALL declare a `type:*` tag in its `project.json`:

| Project | Tag |
|---|---|
| `playground` | `type:app` |
| `tokens` | `type:tokens` |
| `core` | `type:core` |
| `ui` | `type:ui` |
| `icons` | `type:icons` |

#### Scenario: Tags in project.json

- **WHEN** reading any project's `project.json`
- **THEN** the `"tags"` array contains exactly one `type:*` entry matching the project's role

### Requirement: Nx conformance enforces dependency direction

The dependency graph SHALL enforce: `tokens` depends on nothing, `core` depends on `tokens`, `icons` depends on `core`, `ui` depends on `tokens`, `core`, and `icons`. The `playground` app may depend on any library.

#### Scenario: Core cannot depend on ui

- **WHEN** `core`'s source code imports from `@ngx-cupertino/ui`
- **THEN** `bun nx conformance:check` reports a violation because `type:core` cannot depend on `type:ui`

#### Scenario: Ui can depend on tokens

- **WHEN** `ui`'s source code imports from `@ngx-cupertino/tokens`
- **THEN** `bun nx conformance:check` passes because `type:ui` is allowed to depend on `type:tokens`

#### Scenario: App can depend on all libs

- **WHEN** `playground`'s source code imports from `@ngx-cupertino/ui`
- **THEN** `bun nx conformance:check` passes because `type:app` may depend on any type

### Requirement: Nx task pipeline defines build, test, lint, typecheck

The `nx.json` `targetDefaults` SHALL define caching and dependency rules for all four task types.

#### Scenario: Build depends on upstream builds

- **WHEN** reading `nx.json` `targetDefaults`
- **THEN** the `build` target has `"cache": true` and `"dependsOn": ["^build"]`

#### Scenario: Test is cached

- **WHEN** reading `nx.json` `targetDefaults`
- **THEN** the `test` target has `"cache": true`

#### Scenario: Lint is cached

- **WHEN** reading `nx.json` `targetDefaults`
- **THEN** the `lint` target has `"cache": true`

#### Scenario: Typecheck depends on upstream builds

- **WHEN** reading `nx.json` `targetDefaults`
- **THEN** the `typecheck` target has `"cache": true` and `"dependsOn": ["^build"]`

### Requirement: Nx generators use Vitest and SCSS defaults

The `nx.json` `generators` configuration SHALL default new Angular libraries to Vitest and SCSS, and new Angular applications to Vitest (no e2e runner).

#### Scenario: Generator defaults for libraries

- **WHEN** reading `nx.json` `generators` > `@nx/angular:library`
- **THEN** `"unitTestRunner"` is `"vitest"` and `"linter"` is not set or set to `"none"`

#### Scenario: Generator defaults for applications

- **WHEN** reading `nx.json` `generators` > `@nx/angular:application`
- **THEN** `"unitTestRunner"` is `"vitest"` and `"e2eTestRunner"` is `"none"`

### Requirement: All projects build successfully

Running `bun nx run-many -t build` SHALL succeed with all five projects building without errors.

#### Scenario: Full workspace build

- **WHEN** `bun nx run-many -t build` is executed
- **THEN** all projects compile successfully and Nx reports all builds as passed

