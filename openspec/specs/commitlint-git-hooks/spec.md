# commitlint-git-hooks Specification

## Purpose
TBD - created by archiving change generate-projects-toolchain. Update Purpose after archive.
## Requirements
### Requirement: Lefthook is installed and configured

The `lefthook` package SHALL be installed as a devDependency and a `lefthook.yml` configuration file SHALL exist at the workspace root with git hooks installed.

#### Scenario: Lefthook package installed

- **WHEN** `bun add -D lefthook` is executed
- **THEN** `lefthook` appears in `package.json` `devDependencies`

#### Scenario: Git hooks installed

- **WHEN** `bun lefthook install` is executed
- **THEN** git hooks are configured in `.git/hooks/` pointing to lefthook

### Requirement: Pre-commit hook runs Biome

The `pre-commit` hook SHALL run Biome format and lint checks in parallel on staged files matching `*.{ts,js,json,scss,html,css}`, auto-staging fixes.

#### Scenario: Lefthook pre-commit config

- **WHEN** reading `lefthook.yml`
- **THEN** a `pre-commit` section exists with `parallel: true` and a `commands` entry named `format` that runs `bun biome check --write --no-errors-on-unmatched {staged_files}` with `stage_fixed: true`

#### Scenario: Pre-commit hook blocks on format errors

- **WHEN** a commit is attempted with a file containing a Biome formatting violation that cannot be auto-fixed
- **THEN** the commit is blocked and an error is displayed

### Requirement: Commitlint is installed and configured

The `@commitlint/cli` and `@commitlint/config-conventional` packages SHALL be installed as devDependencies, and a `commitlint.config.ts` file SHALL exist at the workspace root.

#### Scenario: Commitlint packages installed

- **WHEN** `bun add -D @commitlint/cli @commitlint/config-conventional` is executed
- **THEN** both packages appear in `package.json` `devDependencies`

#### Scenario: Commitlint config exists

- **WHEN** reading `commitlint.config.ts`
- **THEN** it exports a valid Commitlint configuration object

### Requirement: Commit message enforces conventional commits with emojis

The commit-msg hook SHALL validate commit messages against 10 allowed types each with a corresponding emoji: `feat ✨`, `fix 🐛`, `refactor 📦`, `test 🧪`, `docs 📝`, `perf 🚀`, `ci 🔧`, `chore 🚧`, `style 💄`, `build 🏗️`.

#### Scenario: Valid commit message passes

- **WHEN** a commit message `"feat(tokens): ✨ add color palette"` is validated
- **THEN** Commitlint passes without errors

#### Scenario: Unknown type fails

- **WHEN** a commit message `"update(tokens): 🔄 change colors"` is validated
- **THEN** Commitlint reports an error because `update` is not an allowed type

### Requirement: Commit scopes are restricted

Commit messages SHALL only use scopes from the allowed set: `tokens`, `core`, `icons`, `ui`, `playground`, `readme`, `ci`, `repo`.

#### Scenario: Valid scope passes

- **WHEN** a commit message `"feat(ui): ✨ add button component"` is validated
- **THEN** Commitlint passes without errors

#### Scenario: Invalid scope fails

- **WHEN** a commit message `"feat(docs): ✨ add documentation"` is validated
- **THEN** Commitlint reports an error because `docs` is not an allowed scope

### Requirement: Commit-msg hook validates via Lefthook

The `commit-msg` hook in Lefthook SHALL run Commitlint against the commit message file.

#### Scenario: Lefthook commit-msg config

- **WHEN** reading `lefthook.yml`
- **THEN** a `commit-msg` section exists with a `commands` entry named `commitlint` that runs `bun commitlint --edit {1}`

