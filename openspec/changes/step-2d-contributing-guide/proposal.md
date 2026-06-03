## Why

The project has a complete CI/CD pipeline (Step 2C), a local toolchain (Step 2A), and public documentation (Step 2B), but no documented development workflow for contributors. There's no `CONTRIBUTING.md` — the file that GitHub automatically surfaces as a "Contributing" tab. Without it, there's no guide for branch naming, commit format, PR process, or the CI/CD pipeline flow. Step 2D closes this gap as the final foundation step before design token and component work begins.

## What Changes

- **Create `CONTRIBUTING.md`** at repo root with 8 sections:
  1. **Git Workflow**: GitHub Flow with mandatory rule — every change requires its own branch, never work directly on main
  2. **Branch Naming**: Convention table (`feat/`, `fix/`, `chore/`, `docs/`, `refactor/`, `test/`)
  3. **Commit Conventions**: 10 types with emojis + semver impact table
  4. **Pull Request Process**: 5 steps (push → open PR → CI passes → review → squash merge)
  5. **Development Setup**: clone, bun install, serve, build, test, format
  6. **Project Structure**: Full tree diagram
  7. **Package Architecture**: Angular Material model (tokens → core → icons/ui)
  8. **Protected Branches**: main requires PR + CI checks, step-by-step setup guide, merge options (manual vs auto-merge), bypass list empty (nobody bypasses)
- **Include 3 Mermaid diagrams** visualizing CI pipeline flow, Release pipeline flow, and Git workflow (gitGraph showing branch → commit → merge pattern)

## Capabilities

### New Capabilities

- `contributing-guide`: A `CONTRIBUTING.md` file at repo root documenting the complete development workflow — Git strategy, branch naming, commit conventions, PR process, CI/CD pipeline visualization, development setup, and branch protection

### Modified Capabilities

_None — this is a new documentation artifact._

## Impact

- **Code**: Creates `CONTRIBUTING.md` at repo root. No other files changed.
- **Dependencies**: None.
- **GitHub**: Surface "Contributing" tab on repository page, link in PR/issue creation UI.
- **Existing specs**: References `ci-workflow` and `release-workflow` specs from Step 2C via Mermaid diagrams. No spec modifications needed.
