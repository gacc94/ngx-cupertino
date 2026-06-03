## Context

Steps 2A-2C have established the local toolchain (Biome, Lefthook, Commitlint), public documentation (README, LICENSE), and CI/CD automation (GitHub Actions workflows). Step 2D is the final foundation step — it documents the complete development workflow so contributors know how to work with the project. The artifact is a single `CONTRIBUTING.md` file at the repo root.

GitHub automatically surfaces `CONTRIBUTING.md` in:
- The "Contributing" tab on the repository overview
- A link when opening a Pull Request or Issue

Source: [GitHub docs](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors)

## Goals / Non-Goals

**Goals:**
- Create `CONTRIBUTING.md` with all 8 sections documented in the Notion Step 2D plan
- Include 3 Mermaid diagrams (CI pipeline, Release pipeline, Git workflow) for visual reference
- Document the Git workflow enforced by this file itself (feature branches, PRs, no direct push to main)
- Keep content concise and actionable — each section is a quick reference, not an essay

**Non-Goals:**
- No CI/CD workflow changes (those are complete in Step 2C)
- No new tooling or dependencies
- No branch protection configuration (manual via GitHub Settings — documented but not automated)
- No PR templates (separate concern, could be a future step)

## Decisions

### 1. CONTRIBUTING.md location

**Decision**: Place at repo root (`CONTRIBUTING.md`).

**Rationale**: GitHub scans root first, then `.github/`, then `docs/`. Root is the most visible and standard location for open-source projects.

### 2. Mermaid diagrams included inline

**Decision**: Include 3 Mermaid diagrams directly in `CONTRIBUTING.md`.

**Rationale**: GitHub renders Mermaid natively in Markdown. No external tooling needed. The CI pipeline, Release pipeline, and Git workflow are complex enough to benefit from visual representation.

**Alternatives considered**:
- External images: Require hosting, go stale on updates. Rejected.
- PlantUML: Not natively rendered by GitHub. Rejected.

### 3. File structure: flat sections with tables

**Decision**: Use `##` headings for each of the 8 sections, with markdown tables for structured data (commit types, branch naming, package architecture).

**Rationale**: Flat structure is easy to scan in GitHub's rendered view. Tables provide quick reference for conventions. Consistent with README.md format.

### 4. 10 commit types with emojis documented

**Decision**: Document the full commit convention table (feat ✨, fix 🐛, refactor 📦, test 🧪, docs 📝, perf 🚀, ci 🔧, chore 🚧, style 💄, build 🏗️) with semver impact column.

**Rationale**: This table already exists in the Lefthook/Commitlint config. Documenting it in CONTRIBUTING.md makes it discoverable without reading config files. Aligns with README.md's commit conventions section.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| CONTRIBUTING.md becomes outdated as workflow evolves | Each section references existing tooling (Biome, Lefthook, CI) — changes to those tools will naturally trigger CONTRIBUTING.md updates |
| Mermaid diagrams drift from actual CI YAML | Diagrams are high-level flow. Detailed CI YAML lives in `.github/workflows/ci.yml` which is the source of truth |
| No enforcement of branch naming without branch protection | Branch naming is a convention documented for consistency. Enforcement comes from branch protection rules (2D.4, manual setup) |
