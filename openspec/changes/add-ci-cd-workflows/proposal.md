## Why

The monorepo has no CI/CD automation. Every pull request must be manually verified (format, typecheck, build, test) — error-prone and slow. There's no automated release pipeline for publishing `@ngx-cupertino/*` packages to npm. This blocks Step 13 (Release & Publish) and creates friction in the development workflow.

## What Changes

- **Create `ci.yml`**: GitHub Actions workflow triggered on PRs to `main`:
  - Checkout + Bun setup + Nx cache with `nx-set-shas`
  - Biome format check (`bun biome check .`)
  - TypeScript check (`bun nx affected -t typecheck`)
  - Tests (`bun nx affected -t test`)
  - Build (`bun nx affected -t build`)
- **Create `release.yml`**: GitHub Actions workflow triggered on push to `main`:
  - Release Please v4 (`googleapis/release-please-action@v4`) with `release-type: node`
  - Automatically generates CHANGELOG, bumps version, creates GitHub Release
  - Optionally publishes to npm via `bun nx release publish` on release PR merge
- **No new dependencies**: Uses existing tools (Biome, Vitest, Nx). Release Please runs as a GitHub Action.

## Capabilities

### New Capabilities

- `ci-workflow`: Automated PR checks enforcing formatting (Biome), type safety (TypeScript), tests (Vitest), and builds (Nx) using Nx affected commands for optimal performance
- `release-workflow`: Automated release pipeline using Release Please for CHANGELOG generation, semantic versioning, and npm publishing of publishable packages

### Modified Capabilities

_None — this is new CI/CD infrastructure, no existing capabilities change._

## Impact

- **Code**: Creates `.github/workflows/ci.yml` and `.github/workflows/release.yml`
- **Dependencies**: None added (Release Please runs as GitHub Action, no package install needed)
- **CI/CD**: Enables automated PR validation on every push/pull request. Enables automated release pipeline for Steps 12-13
- **Breaking**: None
