## Context

The monorepo has 5 Nx projects (1 app + 4 libs) with Biome, Lefthook, and Vitest configured locally. No CI/CD automation exists — every PR check must be performed manually. No release pipeline exists for publishing the 4 `@ngx-cupertino/*` packages to npm.

The repository is hosted on GitHub (`gacc94/ngx-cupertino`) with Nx Cloud connected (`nxCloudId: 6a1fabf8f3deb007eb231186`). GitHub Actions is the natural CI/CD platform. Builds use `bun` as package manager.

## Goals / Non-Goals

**Goals:**
- Automate PR validation: Biome format check, TypeScript typecheck, Vitest tests, Nx build — all via `nx affected` for optimal performance
- Automate release pipeline: CHANGELOG generation, version bump, npm publish via Release Please
- Use `bun` workflow setup (`oven-sh/setup-bun`) for consistency with local toolchain
- Leverage Nx Cloud remote caching to speed up CI runs (`nrwl/nx-set-shas`)
- Keep CI fast by using Nx affected commands (only run on changed projects)

**Non-Goals:**
- No deployment to GitHub Pages / Vercel (Step 11)
- No visual regression testing / Chromatic (Step 12)
- No bundle size monitoring (Step 12)
- No npm publish automation in CI (release.yml creates PRs, publish happens manually or in a future CI enhancement)
- No self-hosted runners or Docker-based CI

## Decisions

### 1. Release Please over semantic-release

**Decision**: Use `googleapis/release-please-action@v4` instead of `semantic-release` or manual versioning.

**Rationale**:
- **GitHub-native**: Release Please creates and maintains a release PR that stays open, accumulating conventional commits. Merge to publish.
- **No npm tokens in CI**: Release Please handles versioning and CHANGELOG. npm publish can be done manually or added later.
- **Monorepo support**: Release Please supports monorepos with multiple packages (`release-type: node`, `monorepo-tags: true`).
- **Conventional commits**: Already enforced by Commitlint (Step 2A.5). Release Please reads commit history to determine version bumps.

**Alternatives considered**:
- `semantic-release`: Requires npm tokens, more complex configuration, plugin-based architecture. Overkill for this stage.
- Manual versioning: Error-prone, no CHANGELOG automation. Rejected.

### 2. Nx affected commands in CI

**Decision**: Use `bun nx affected -t <target>` instead of `bun nx run-many -t <target>`.

**Rationale**:
- **Performance**: `nx affected` only runs on projects changed by the PR, using `nx-set-shas` to determine the base commit.
- **Nx Cloud integration**: Remote cache hits speed up subsequent CI runs.
- **Scalability**: When 37 components are added across 4 libs, running all tests on every PR would be wasteful.

### 3. Separate CI and Release workflows

**Decision**: Two separate workflow files (`ci.yml` and `release.yml`) instead of a single combined workflow.

**Rationale**:
- **Trigger separation**: CI runs on PRs (`pull_request`), Release runs on merge to main (`push`). Separate triggers = cleaner conditionals.
- **Permission isolation**: Release workflow needs `contents: write` and `pull-requests: write` permissions (for creating release PRs). CI doesn't need write access.
- **Failure isolation**: A release workflow failure shouldn't block PR CI, and vice versa.

### 4. Bun setup action

**Decision**: Use `oven-sh/setup-bun@v2` with `bun-version: latest`.

**Rationale**:
- Consistent with local development (AGENTS.md mandates `bun`)
- `bun install` is significantly faster than `npm ci` in CI
- `oven-sh/setup-bun` is the official, maintained GitHub Action for Bun

### 5. Job ordering: format → typecheck → test → build

**Decision**: Run Biome format check first (fastest failure), then TypeScript, then tests, then build (most expensive).

**Rationale**:
- **Fail fast**: Format violations fail in seconds. No need to run builds if formatting is wrong.
- **Progressive cost**: Each step depends on the previous — skip downstream steps on failure, save CI minutes.
- **Single job**: All checks run sequentially in one job (not matrix) to share the `bun install` step and leverage Nx cache.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| `nx affected` may miss cross-project type errors if base is wrongly calculated | `nx-set-shas` uses GitHub PR base ref. Verify with `--base` override if needed |
| Release Please may create duplicate PRs on rapid merges | Release Please maintains a single open release PR, updating it with new commits |
| CI failures on macOS-specific issues on ubuntu runners | Use `ubuntu-latest` (standard). macOS-specific code is UI styling (SCSS), not runtime logic |
| Nx Cloud token required for remote caching | `nx-cloud` action auto-authenticates with `nxCloudId` in `nx.json` |

## Open Questions

- **npm publish automation**: Should `release.yml` automatically publish to npm on release PR merge, or keep it manual? Decision: manual for now (add later in Step 13).
- **Conformance check in CI**: `bun nx conformance:check` requires Nx Powerpack license. Skip for now — document that it's ready when license obtained.
