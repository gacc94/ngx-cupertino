## 1. Create CI Workflow

- [ ] 1.1 Create directory: `mkdir -p .github/workflows`
- [ ] 1.2 Create `.github/workflows/ci.yml` with `name: CI` and `on: pull_request: branches: [main]`
- [ ] 1.3 Add checkout step: `actions/checkout@v4` with `fetch-depth: 0` (required by nx-set-shas)
- [ ] 1.4 Add Bun setup: `oven-sh/setup-bun@v2` with `bun-version: latest`
- [ ] 1.5 Add install step: `bun install --frozen-lockfile`
- [ ] 1.6 Add Nx cache: `nrwl/nx-set-shas@v4`
- [ ] 1.7 Add Biome check step: `bun biome check .` (first step, fail fast)
- [ ] 1.8 Add typecheck step: `bun nx affected -t typecheck`
- [ ] 1.9 Add test step: `bun nx affected -t test`
- [ ] 1.10 Add build step: `bun nx affected -t build`
- [ ] 1.11 Use `ubuntu-latest` runner, single job named `checks`

## 2. Create Release Workflow

- [ ] 2.1 Create `.github/workflows/release.yml` with `name: Release` and `on: push: branches: [main]`
- [ ] 2.2 Add permissions: `contents: write`, `pull-requests: write`
- [ ] 2.3 Add Release Please step: `googleapis/release-please-action@v4` with `release-type: node`
- [ ] 2.4 Use `ubuntu-latest` runner, single job named `release-please`

## 3. Final Verification

- [ ] 3.1 Verify `.github/workflows/ci.yml` is valid YAML and contains all required steps
- [ ] 3.2 Verify `.github/workflows/release.yml` is valid YAML and contains Release Please action
- [ ] 3.3 Verify Biome format: `bun biome check --write .github/`
- [ ] 3.4 Commit: `git add . && git commit -m "ci: 🔧 add ci and release workflows"`
