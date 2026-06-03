# release-workflow Specification

## Purpose
TBD - created by archiving change add-ci-cd-workflows. Update Purpose after archive.
## Requirements
### Requirement: Release workflow exists at correct path

The workspace SHALL contain a GitHub Actions workflow file at `.github/workflows/release.yml` triggered on pushes to the `main` branch.

#### Scenario: Release workflow file present

- **WHEN** listing `.github/workflows/`
- **THEN** `release.yml` exists with valid GitHub Actions YAML syntax

#### Scenario: Release triggers on push to main

- **WHEN** a push is made to `main`
- **THEN** the release workflow is triggered automatically

### Requirement: Release workflow uses Release Please

The release workflow SHALL use `googleapis/release-please-action@v4` with `release-type: node` to automate CHANGELOG generation and version bumping.

#### Scenario: Release Please action

- **WHEN** reading `.github/workflows/release.yml`
- **THEN** it contains `googleapis/release-please-action@v4` with a `release-type` input set to `node`

### Requirement: Release workflow has correct permissions

The release workflow SHALL declare `contents: write` and `pull-requests: write` permissions to allow Release Please to create and update release PRs.

#### Scenario: Release permissions

- **WHEN** reading `.github/workflows/release.yml`
- **THEN** it declares `permissions.contents: write` and `permissions.pull-requests: write`

### Requirement: Conformance check is excluded from CI

The CI workflow SHALL NOT include a `bun nx conformance:check` step, as this requires an Nx Powerpack enterprise license.

#### Scenario: No conformance step in CI

- **WHEN** reading `.github/workflows/ci.yml`
- **THEN** it does not contain `conformance:check`

