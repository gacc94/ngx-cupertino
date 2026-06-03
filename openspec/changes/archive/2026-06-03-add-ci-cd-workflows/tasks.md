## 1. Create CI Workflow

- [x] 1.1 Create directory: `mkdir -p .github/workflows`
- [x] 1.2 Create `.github/workflows/ci.yml` with `name: CI` and `on: pull_request: branches: [main]`
- [x] 1.3 Add checkout step: `actions/checkout@v4` with `fetch-depth: 0` (required by nx-set-shas)
- [x] 1.4 Add Bun setup: `oven-sh/setup-bun@v2` with `bun-version: latest`
- [x] 1.5 Add install step: `bun install --frozen-lockfile`
- [x] 1.6 Add Nx cache: `nrwl/nx-set-shas@v4`
- [x] 1.7 Add Biome check step: `bun biome check .` (first step, fail fast)
- [x] 1.8 Add typecheck step: `bun nx affected -t typecheck`
- [x] 1.9 Add test step: `bun nx affected -t test`
- [x] 1.10 Add build step: `bun nx affected -t build`
- [x] 1.11 Use `ubuntu-latest` runner, single job named `checks`

## 2. Create Release Workflow

- [x] 2.1 Create `.github/workflows/release.yml` with `name: Release` and `on: push: branches: [main]`
- [x] 2.2 Add permissions: `contents: write`, `pull-requests: write`
- [x] 2.3 Add Release Please step: `googleapis/release-please-action@v4` with `release-type: node`
- [x] 2.4 Use `ubuntu-latest` runner, single job named `release-please`

## 3. Final Verification

- [x] 3.1 Verify `.github/workflows/ci.yml` is valid YAML and contains all required steps
- [x] 3.2 Verify `.github/workflows/release.yml` is valid YAML and contains Release Please action
- [x] 3.3 Verify Biome format: `bun biome check --write .github/`
- [x] 3.4 Commit: `git add . && git commit -m "ci: 🔧 add ci and release workflows"`
