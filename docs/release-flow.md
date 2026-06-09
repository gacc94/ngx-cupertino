# Release Flow

How the release pipeline (`release.yml`) automates npm publishing via Release Please and Trusted Publishing (OIDC).

Release Please uses a PAT (`RELEASE_PLEASE_PAT`) so its PRs trigger CI automatically. Extra files in `release-please-config.json` sync versions to all `libs/*/package.json`.

## Flowchart

```mermaid
flowchart TD
    A[Push to main] --> B[release.yml triggered]
    B --> C[Job: release-please\nPAT token for CI triggers]

    C --> D{Releases created?}
    D -->|NO| E[Create/update release PR]
    E --> F[PR with version bump\n+ CHANGELOG\n+ lib versions synced]
    F --> G[CI runs on PR:\ncommitlint, format, typecheck,\nbuild, stylelint, test]
    G --> H{CI passes?}
    H -->|NO| I[PR blocked]
    H -->|YES| J[Developer merges PR]
    J --> A

    D -->|YES| K[GitHub Release + git tag]
    K --> L[Job: publish\nid-token: write]
    L --> M[checkout + setup-bun + bun install]
    M --> N[bun nx run-many build\ntokens, icons, core, ui]
    N --> O[setup-node + npm install -g npm@latest]
    O --> P[npm publish tokens\n--provenance --tag latest]
    P --> Q[npm publish core\n--provenance --tag latest]
    Q --> R[npm publish icons\n--provenance --tag latest]
    R --> S[npm publish ui\n--provenance --tag latest]
    S --> T[Published to npmjs.com\nTrusted Publishing OIDC]

    style I fill:#f8d7da
    style T fill:#d4edda
    style K fill:#fff3cd
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant GH as GitHub Actions
    participant RP as Release Please
    participant OIDC as npm OIDC
    participant npm as npm Registry

    Dev->>GH: push to main
    GH->>RP: run release-please (PAT token)
    RP->>GH: create/update Release PR
    Note over GH: CI runs on PR automatically
    Dev->>GH: merge Release PR
    GH->>RP: run release-please again
    RP->>GH: create GitHub Release + git tag
    RP->>GH: releases_created = true
    GH->>GH: publish job starts
    GH->>GH: bun install + nx run-many build
    GH->>GH: update npm for OIDC support
    GH->>OIDC: exchange OIDC token
    OIDC-->>GH: npm auth token
    GH->>npm: publish tokens (--provenance)
    GH->>npm: publish core (--provenance)
    GH->>npm: publish icons (--provenance)
    GH->>npm: publish ui (--provenance)
    npm-->>Dev: 4 packages published
```
