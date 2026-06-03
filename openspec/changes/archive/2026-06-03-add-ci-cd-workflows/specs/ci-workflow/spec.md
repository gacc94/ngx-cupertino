## ADDED Requirements

### Requirement: CI workflow exists at correct path

The workspace SHALL contain a GitHub Actions workflow file at `.github/workflows/ci.yml` triggered on pull requests to the `main` branch.

#### Scenario: CI workflow file present

- **WHEN** listing `.github/workflows/`
- **THEN** `ci.yml` exists with valid GitHub Actions YAML syntax

#### Scenario: CI triggers on PR

- **WHEN** a pull request is opened against `main`
- **THEN** the CI workflow is triggered automatically

### Requirement: CI workflow uses Bun

The CI workflow SHALL use `oven-sh/setup-bun@v2` to install Bun and `bun install --frozen-lockfile` for dependencies.

#### Scenario: Bun setup in CI

- **WHEN** reading `.github/workflows/ci.yml`
- **THEN** it contains `oven-sh/setup-bun@v2` action and `bun install --frozen-lockfile` command

### Requirement: CI workflow uses Nx affected commands

The CI workflow SHALL use `nrwl/nx-set-shas@v4` for base/head determination and `bun nx affected` commands for format, typecheck, test, and build steps.

#### Scenario: Nx affected in CI

- **WHEN** reading `.github/workflows/ci.yml`
- **THEN** it contains `nrwl/nx-set-shas@v4` and at least one `bun nx affected` command

### Requirement: CI workflow checks Biome formatting

The CI workflow SHALL run `bun biome check .` as its first check step to fail fast on format/lint violations.

#### Scenario: Biome check in CI

- **WHEN** reading `.github/workflows/ci.yml`
- **THEN** it contains `bun biome check .` in a step that runs before test and build steps

### Requirement: CI workflow checks TypeScript

The CI workflow SHALL run `bun nx affected -t typecheck` to verify type safety on changed projects.

#### Scenario: TypeScript check in CI

- **WHEN** reading `.github/workflows/ci.yml`
- **THEN** it contains `bun nx affected -t typecheck`

### Requirement: CI workflow runs tests on affected projects

The CI workflow SHALL run `bun nx affected -t test` to execute Vitest tests on projects affected by the PR.

#### Scenario: Tests in CI

- **WHEN** reading `.github/workflows/ci.yml`
- **THEN** it contains `bun nx affected -t test`

### Requirement: CI workflow builds affected projects

The CI workflow SHALL run `bun nx affected -t build` as the final validation step.

#### Scenario: Build in CI

- **WHEN** reading `.github/workflows/ci.yml`
- **THEN** it contains `bun nx affected -t build`
