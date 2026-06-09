# CI Flow

How the CI pipeline (`ci.yml`) validates every push to main and pull request.

## Flowchart

```mermaid
flowchart TD
    T1[Push to main] --> Trigger[ci.yml triggered]
    T2[Pull request to main] --> Trigger

    Trigger --> P{Parallel jobs}

    P --> CL[commitlint]
    P --> F[format - biome]
    P --> TC[typecheck - affected]
    P --> B[build - affected]
    P --> SL[stylelint - affected]

    CL --> CLS[bun install --frozen-lockfile]
    F --> FS[bun install --frozen-lockfile]
    F --> FR[bun biome check]
    TC --> TCS[bun install --frozen-lockfile]
    TC --> TCN[nx-set-shas]
    TC --> TCR[bun nx affected -t typecheck]
    B --> BS[bun install --frozen-lockfile]
    B --> BN[nx-set-shas]
    B --> BR[bun nx affected -t build]
    SL --> SLS[bun install --frozen-lockfile]
    SL --> SLN[nx-set-shas]
    SL --> SLR[bun nx affected -t stylelint]

    B --> T[test - affected]
    T --> TS[bun install --frozen-lockfile]
    T --> TN[nx-set-shas]
    T --> TR[bun nx affected -t test]

    CLS --> CLD[Done]
    FR --> FD[Done]
    TCR --> TCD[Done]
    BR --> BD[Done]
    SLR --> SLD[Done]
    TR --> TD[Done]
```

## Job Dependencies

| Job | Depends On | Runs |
|-----|-----------|------|
| `commitlint` | none | Parallel |
| `format` | none | Parallel |
| `typecheck` | none | Parallel |
| `build` | none | Parallel |
| `stylelint` | none | Parallel |
| `test` | build | After build completes |

## Common Steps

All 6 jobs use:
- `bun install --frozen-lockfile` — deterministic dependency install
- `nrwl/nx-set-shas@v5` (except commitlint) — Nx affected detection based on git SHAs
- `bun nx affected -t <target>` (typecheck, build, stylelint, test) — only runs on changed projects
