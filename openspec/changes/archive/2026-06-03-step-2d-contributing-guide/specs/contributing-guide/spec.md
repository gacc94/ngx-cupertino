## ADDED Requirements

### Requirement: CONTRIBUTING.md exists at repo root

The workspace SHALL contain a `CONTRIBUTING.md` file at the repository root with valid Markdown content documenting the development workflow.

#### Scenario: CONTRIBUTING.md file present

- **WHEN** listing repository root files
- **THEN** `CONTRIBUTING.md` exists and is a valid Markdown file

### Requirement: CONTRIBUTING.md documents mandatory branch-per-change rule

The `CONTRIBUTING.md` SHALL explicitly state that every change requires its own branch from `main`, and that working directly on `main` is prohibited.

#### Scenario: Branch-per-change rule stated

- **WHEN** reading `CONTRIBUTING.md`
- **THEN** it contains an explicit statement that each feature, fix, or chore MUST have its own branch and that pushing directly to main is rejected

### Requirement: CONTRIBUTING.md documents Git workflow

The `CONTRIBUTING.md` SHALL document the GitHub Flow branching strategy: feature branches from main, Pull Requests, and no direct push to main.

#### Scenario: Git workflow documented

- **WHEN** reading `CONTRIBUTING.md`
- **THEN** it contains the terms "GitHub Flow", "Pull Request", and "feature branch" in context of the development workflow

### Requirement: CONTRIBUTING.md documents branch naming conventions

The `CONTRIBUTING.md` SHALL include a table documenting branch name prefixes: `feat/`, `fix/`, `chore/`, `docs/`, `refactor/`, `test/` with use cases and examples.

#### Scenario: Branch naming table

- **WHEN** reading `CONTRIBUTING.md`
- **THEN** it contains a table with at least 4 branch prefix entries including `feat/`, `fix/`, `chore/`, and `docs/`

### Requirement: CONTRIBUTING.md documents commit conventions

The `CONTRIBUTING.md` SHALL include a table documenting all 10 commit types (feat, fix, refactor, test, docs, perf, ci, chore, style, build) with their corresponding emojis and semver impact.

#### Scenario: Commit conventions table

- **WHEN** reading `CONTRIBUTING.md`
- **THEN** it contains a table with at least 8 commit types, emoji mappings, and semver impact indicators

### Requirement: CONTRIBUTING.md documents PR process

The `CONTRIBUTING.md` SHALL document the Pull Request process with 5 steps and mention squash merge.

#### Scenario: PR process documented

- **WHEN** reading `CONTRIBUTING.md`
- **THEN** it contains "squash merge" and describes at least 3 steps for the PR process

### Requirement: CONTRIBUTING.md documents development setup

The `CONTRIBUTING.md` SHALL include development setup instructions with `bun install` and `bun nx serve playground` commands.

#### Scenario: Dev setup instructions

- **WHEN** reading `CONTRIBUTING.md`
- **THEN** it contains `bun install` and `bun nx serve playground` in code blocks

### Requirement: CONTRIBUTING.md includes CI pipeline Mermaid diagram

The `CONTRIBUTING.md` SHALL include a Mermaid `flowchart` diagram visualizing the CI pipeline flow from Pull Request through each job to merge decision.

#### Scenario: CI diagram present

- **WHEN** reading `CONTRIBUTING.md`
- **THEN** it contains a ` ```mermaid ` code block with `flowchart` syntax showing `Pull Request`, `commitlint`, `format`, `typecheck`, `build`, and `test` nodes

### Requirement: CONTRIBUTING.md includes Release pipeline Mermaid diagram

The `CONTRIBUTING.md` SHALL include a Mermaid `flowchart` diagram visualizing the Release pipeline from push to main through Release Please to git tags per package.

#### Scenario: Release diagram present

- **WHEN** reading `CONTRIBUTING.md`
- **THEN** it contains a ` ```mermaid ` code block with `flowchart` syntax showing `Push to main`, `Release Please`, and package-specific tags

### Requirement: CONTRIBUTING.md includes Git workflow gitGraph diagram

The `CONTRIBUTING.md` SHALL include a Mermaid `gitGraph` diagram showing feature branches, commits, and merges back to main.

#### Scenario: GitGraph diagram present

- **WHEN** reading `CONTRIBUTING.md`
- **THEN** it contains a ` ```mermaid ` code block with `gitGraph` syntax showing branch creation, commits, and merges

### Requirement: CONTRIBUTING.md documents package architecture

The `CONTRIBUTING.md` SHALL document the 4-package npm publishing model with dependency relationships.

#### Scenario: Package architecture documented

- **WHEN** reading `CONTRIBUTING.md`
- **THEN** it references `@ngx-cupertino/tokens`, `@ngx-cupertino/core`, `@ngx-cupertino/icons`, and `@ngx-cupertino/ui` in context of the package architecture

### Requirement: CONTRIBUTING.md documents branch protection configuration

The `CONTRIBUTING.md` SHALL document the step-by-step process to configure branch protection on GitHub (Settings → Rules → Rulesets), including the specific fields and values for the `protect-main` ruleset.

#### Scenario: Branch protection steps documented

- **WHEN** reading `CONTRIBUTING.md`
- **THEN** it contains "Restrict deletions", "Require a pull request before merging", "Require status checks to pass", and "Block force pushes" with their configured values

### Requirement: CONTRIBUTING.md documents merge options

The `CONTRIBUTING.md` SHALL document two merge options: manual merge (default, user clicks merge) and auto-merge (GitHub merges automatically on CI green), with a recommendation table.

#### Scenario: Merge options documented

- **WHEN** reading `CONTRIBUTING.md`
- **THEN** it contains both "Manual" and "Auto-merge" options with descriptions and a recommendation for the current project phase

### Requirement: CONTRIBUTING.md documents protected branches

The `CONTRIBUTING.md` SHALL document that `main` is protected with required PR and CI checks.

#### Scenario: Protected branches documented

- **WHEN** reading `CONTRIBUTING.md`
- **THEN** it states that `main` requires Pull Request and CI checks (commitlint, format, typecheck, build, test)
