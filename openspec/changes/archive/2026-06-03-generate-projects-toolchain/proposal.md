## Why

After Step 1 (workspace init and cleanup), the Nx monorepo needs its core project structure — the playground app and four publishable libraries (`tokens`, `core`, `ui`, `icons`) — plus a fully configured local toolchain (Biome, Lefthook, Commitlint, module boundaries, Nx pipeline, TypeScript strict mode) before any component or token work can begin. Without this foundation, no other step can proceed.

## What Changes

- **Generate Playground App**: Angular application at `apps/playground` with SCSS, `cup` prefix, served via Vite
- **Generate 4 Publishable Libraries**:
  - `@ngx-cupertino/tokens` — design tokens
  - `@ngx-cupertino/core` — providers, services, directives, utilities
  - `@ngx-cupertino/ui` — all 37 components
  - `@ngx-cupertino/icons` — Lucide icon wrapper
- **Remove Cypress**: Delete generated `apps/playground-e2e`; Vitest is the testing standard
- **Replace ESLint with Biome**: Remove all ESLint config artifacts, install `@biomejs/biome`, init config (indentWidth=4, lineWidth=120, `useImportType=off`). SCSS linting excluded for component files.
- **Setup Lefthook + Commitlint**: Pre-commit hook runs Biome. `commitlint.config.ts` enforces 10 emoji-based conventional commit types with scopes: `tokens, core, icons, ui, playground, readme, ci, repo`.
- **Configure Module Boundaries**: Project tags (`type:app`, `type:tokens`, `type:core`, `type:icons`, `type:ui`) with Nx conformance rules in `nx.json` enforcing `tokens → core → icons/ui` dependency direction.
- **Configure Nx Task Pipeline**: `build` depends on `^build`, all targets cached (`build`, `test`, `lint`, `typecheck`).
- **Configure TypeScript Strict Mode**: `strict: true`, `noUnusedLocals`, `noUnusedParameters`, target `ES2022` / module `ESNext` / moduleResolution `bundler`.
- **Configure Global Styles**: Create `libs/tokens/src/lib/` directory for upcoming design token SCSS partials.

## Capabilities

### New Capabilities

- `playground-app`: Angular application for component development and manual testing, served via Vite with SCSS support and `cup` prefix.
- `publishable-libraries`: Four publishable Angular libraries (tokens, core, ui, icons) with Vitest, each with its own `importPath` under the `@ngx-cupertino` scope.
- `biome-toolchain`: Biome-based formatting and linting replacing ESLint, with project-specific indent/custom-property/lint rules and Lefthook pre-commit integration.
- `commitlint-git-hooks`: Lefthook + Commitlint enforcing 10 emoji-based conventional commit types with scoped validation and pre-commit Biome checks.
- `nx-constraints`: Module boundary tags with conformance rules, plus Nx task pipeline with proper `^build` dependency chains and cache configuration.
- `typescript-config`: Strict TypeScript configuration with unused code checks and modern ESNext/bundler module resolution.

### Modified Capabilities

_None — this is greenfield project scaffolding, no existing capabilities to modify._

## Impact

- **Code**: Creates `apps/playground/`, `libs/tokens/`, `libs/core/`, `libs/ui/`, `libs/icons/`. Deletes `apps/playground-e2e/`. Modifies `nx.json` (pipeline + conformance), `tsconfig.base.json` (strict mode), root `package.json` (scripts + devDeps). Removes `eslint.config.mjs`, `.eslintrc.json`, `.eslintignore`.
- **Dependencies**: Adds `@biomejs/biome`, `@commitlint/cli`, `@commitlint/config-conventional`, `lefthook`. Removes all ESLint-related dependencies.
- **CI/CD**: Pre-commit hooks via Lefthook enforce formatting and commit message conventions. Nx pipeline caching accelerates future CI.
- **Breaking**: None. No published API exists yet.
