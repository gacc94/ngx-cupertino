## ADDED Requirements

### Requirement: Four publishable libraries exist

The workspace SHALL contain four publishable Angular libraries generated via `@nx/angular:library` at their respective paths:

| Library | Path | Import Path |
|---|---|---|
| tokens | `libs/tokens/` | `@ngx-cupertino/tokens` |
| core | `libs/core/` | `@ngx-cupertino/core` |
| ui | `libs/ui/` | `@ngx-cupertino/ui` |
| icons | `libs/icons/` | `@ngx-cupertino/icons` |

#### Scenario: Library generation — tokens

- **WHEN** `bun nx g @nx/angular:library libs/tokens --unitTestRunner=vitest --directory=libs/tokens --publishable --importPath=@ngx-cupertino/tokens` is executed
- **THEN** `libs/tokens/` contains `project.json` with `build`, `test`, and `lint` targets, plus `src/index.ts`, `ng-package.json`, and `package.json`

#### Scenario: Library generation — core

- **WHEN** `bun nx g @nx/angular:library libs/core --unitTestRunner=vitest --directory=libs/core --publishable --importPath=@ngx-cupertino/core` is executed
- **THEN** `libs/core/` exists with the same structure as tokens

#### Scenario: Library generation — ui

- **WHEN** `bun nx g @nx/angular:library libs/ui --unitTestRunner=vitest --directory=libs/ui --publishable --importPath=@ngx-cupertino/ui` is executed
- **THEN** `libs/ui/` exists with the same structure as tokens

#### Scenario: Library generation — icons

- **WHEN** `bun nx g @nx/angular:library libs/icons --unitTestRunner=vitest --directory=libs/icons --publishable --importPath=@ngx-cupertino/icons` is executed
- **THEN** `libs/icons/` exists with the same structure as tokens

### Requirement: Libraries use Vitest for testing

Each publishable library SHALL use Vitest as its unit test runner, configured via `--unitTestRunner=vitest` at generation time.

#### Scenario: Vitest configuration

- **WHEN** inspecting any library's `project.json`
- **THEN** the `test` target uses `@nx/vitest:test` executor and `vitest.config.ts` exists in the library root

### Requirement: Libraries have correct import paths

Each library's `package.json` SHALL include the correct npm scope name in its `name` field matching the `--importPath` generator option.

#### Scenario: Package names match import paths

- **WHEN** reading `libs/tokens/package.json`
- **THEN** `"name"` is `"@ngx-cupertino/tokens"`
- **WHEN** reading `libs/core/package.json`
- **THEN** `"name"` is `"@ngx-cupertino/core"`
- **WHEN** reading `libs/ui/package.json`
- **THEN** `"name"` is `"@ngx-cupertino/ui"`
- **WHEN** reading `libs/icons/package.json`
- **THEN** `"name"` is `"@ngx-cupertino/icons"`

### Requirement: Global styles directory exists for tokens

The directory `libs/tokens/src/lib/` SHALL be created to host upcoming design token SCSS partials (Step 3).

#### Scenario: Directory creation

- **WHEN** `mkdir -p libs/tokens/src/lib` is executed
- **THEN** the directory `libs/tokens/src/lib/` exists and is writable

### Requirement: Nx workspace recognizes all projects

All five projects (playground, tokens, core, ui, icons) SHALL appear in Nx's project list.

#### Scenario: All projects listed

- **WHEN** `bun nx show projects` is executed
- **THEN** the output includes `playground`, `tokens`, `core`, `ui`, and `icons`
