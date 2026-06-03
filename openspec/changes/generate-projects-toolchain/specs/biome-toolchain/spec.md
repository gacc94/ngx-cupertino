## ADDED Requirements

### Requirement: ESLint and Prettier artifacts are removed

All ESLint and Prettier configuration files and dependencies SHALL be removed from the workspace.

#### Scenario: ESLint config files deleted

- **WHEN** listing workspace root files
- **THEN** `eslint.config.mjs` does not exist
- **THEN** `.eslintrc.json` does not exist
- **THEN** `.eslintignore` does not exist

#### Scenario: Prettier config files deleted

- **WHEN** listing workspace root files
- **THEN** `.prettierrc` does not exist
- **THEN** `.prettierignore` does not exist

#### Scenario: ESLint dependencies removed from package.json

- **WHEN** inspecting root `package.json` `devDependencies`
- **THEN** no package with `eslint` in its name is listed (including `eslint`, `@eslint/*`, `eslint-config-*`, `eslint-plugin-*`, `angular-eslint`, `typescript-eslint`, `@typescript-eslint/*`, `@nx/eslint`, `@nx/eslint-plugin`, `jsonc-eslint-parser`)

#### Scenario: Prettier dependency removed from package.json

- **WHEN** inspecting root `package.json` `devDependencies`
- **THEN** `prettier` is not listed

### Requirement: Biome is installed and initialized

The `@biomejs/biome` package SHALL be installed as a devDependency and a `biome.json` configuration file SHALL exist at the workspace root.

#### Scenario: Biome package installed

- **WHEN** `bun add -D @biomejs/biome` is executed
- **THEN** `@biomejs/biome` appears in `package.json` `devDependencies` and is available as `bun biome`

#### Scenario: Biome config initialized

- **WHEN** `bun biome init` is executed
- **THEN** a `biome.json` file exists at the workspace root

### Requirement: Biome formatter uses project conventions

The Biome formatter SHALL be configured with 4-space indentation and 120-character line width.

#### Scenario: Formatter settings

- **WHEN** reading `biome.json`
- **THEN** `"formatter"` contains `"indentWidth": 4` and `"lineWidth": 120`

### Requirement: Biome type import rule disabled

The Biome lint rule `useImportType` SHALL be disabled to align with Angular's convention of using value imports for Angular symbols (decorators, tokens, etc.).

#### Scenario: useImportType disabled

- **WHEN** reading `biome.json`
- **THEN** `"linter"` > `"rules"` > `"style"` contains `"useImportType": "off"`

### Requirement: SCSS linting excluded for component files

Component `.scss` files (those following BEM patterns) SHALL be excluded from SCSS linting to avoid false positives on BEM selectors.

#### Scenario: Component SCSS files ignored

- **WHEN** reading `biome.json` `"files"` > `"ignore"`
- **THEN** the ignore list includes a pattern matching `libs/ui/src/lib/**/*.scss` and `libs/core/src/lib/**/*.scss`

### Requirement: Biome replaces ESLint in nx.json

The `@nx/eslint/plugin` SHALL be removed from `nx.json` plugins, and the `@nx/eslint:lint` target default SHALL be removed from `targetDefaults`.

#### Scenario: ESLint Nx plugin removed

- **WHEN** reading `nx.json`
- **THEN** `"plugins"` does not contain an entry with `"plugin": "@nx/eslint/plugin"`
- **THEN** `"targetDefaults"` does not contain `"@nx/eslint:lint"`

### Requirement: Biome format command works

Running `bun biome check --write .` SHALL format all source files without errors.

#### Scenario: Format command succeeds

- **WHEN** `bun biome check --write .` is executed on the workspace
- **THEN** the command exits with code 0 and all files are formatted according to `biome.json` rules
