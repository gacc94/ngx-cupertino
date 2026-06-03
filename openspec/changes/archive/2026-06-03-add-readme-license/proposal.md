## Why

The root README.md still contains the generic Nx Angular template with irrelevant references to shop/api apps, Docker, Playwright, and ESLint — leftovers from Step 1's workspace scaffolding. The project has no LICENSE file. Before any design token or component work begins (Steps 3+), consumers need a professional README that documents the library's purpose, install instructions, API, architecture, and conventions.

## What Changes

- **Create LICENSE file**: MIT License text at workspace root
- **Replace README.md**: Complete rewrite documenting `@ngx-cupertino/ui` with:
  - Badges (Angular, TypeScript, Nx, Bun, Vitest, Biome, MIT)
  - Features overview (Apple Design System, 37 components, Signal API, Angular host pattern)
  - Installation via `bun add @ngx-cupertino/ui`
  - Quick Start with `provideCupertino()` and component example
  - Full component table (37 components across 4 phases, with selectors)
  - Package architecture diagram (`tokens → core → icons/ui`)
  - Styling conventions (Angular-native: `host:` bindings, `cup-` prefixed classes, no BEM)
  - Development commands (`bun nx serve playground`, `bun nx test ui`, `bun nx run-many -t build`)
  - Commit conventions (10 emoji types, 8 scopes)
- **Clean root `package.json`**: Update `name` field to `ngx-cupertino` (workspace root), ensure `license: "MIT"`, remove template-specific descriptions

## Capabilities

### New Capabilities

- `project-license`: MIT License file at workspace root providing clear licensing for the entire monorepo
- `project-readme`: Comprehensive README.md documenting the library's identity, usage, architecture, and development workflow

### Modified Capabilities

_None — this is documentation artifacts, no existing capability requirements change._

## Impact

- **Code**: Creates `LICENSE` (new file). Replaces `README.md` entirely (existing file, 284 lines → new content). Updates root `package.json` (`name` field).
- **Dependencies**: None added or removed. This is documentation-only.
- **CI/CD**: README badges reference services (npm, GitHub Actions) for visual status indicators.
- **Breaking**: None. Pure documentation change.
