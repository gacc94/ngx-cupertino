## Context

Step 1 completed workspace initialization (Nx + Angular scaffold, OpenSpec init, cleanup). The monorepo is empty — no projects, no toolchain, no publishing config. Step 2A bootstraps all four publishable libraries and the playground app, then configures every local development tool needed before any component or token work can begin.

**Current state**: `nx.json` has generic ESLint-based config, `tsconfig.base.json` uses `es2015` target with node resolution, `.prettierrc` exists, ESLint config with irrelevant module boundaries from the template. No Angular projects exist.

## Goals / Non-Goals

**Goals:**
- Scaffold 1 Angular application (`playground`) and 4 publishable libraries (`tokens`, `core`, `ui`, `icons`) via Nx generators
- Remove Cypress/Playwright e2e leftovers; Vitest is the only test runner
- Replace ESLint + Prettier with Biome as the single formatting and linting tool
- Enforce commit conventions with Lefthook + Commitlint (10 emoji types, project scopes)
- Define module boundary tags and Nx conformance rules (`tokens → core → icons/ui`)
- Configure Nx task pipeline with proper `^build` chains and caching
- Harden TypeScript config: strict mode, unused code checks, modern target/module resolution
- Create `libs/tokens/src/lib/` directory for upcoming design token SCSS partials

**Non-Goals:**
- No component implementation (Steps 7–10)
- No design token SCSS partials (Step 3)
- No core services or providers (Step 4)
- No icon component (Step 5)
- No ng-add schematic (Step 6)
- No CI/CD workflows (Step 2C)
- No README or LICENSE (Step 2B)

## Decisions

### 1. Biome over ESLint + Prettier

**Decision**: Remove all ESLint (`eslint.config.mjs`, all `@eslint/*`, `eslint`, `eslint-config-prettier`, `typescript-eslint`, `angular-eslint`) and Prettier (`.prettierrc`, `.prettierignore`) artifacts. Install `@biomejs/biome` and run `bun biome init`.

**Rationale**:
- **Speed**: Biome is Rust-based, 10–25x faster than ESLint. Pre-commit hooks stay instant.
- **Unified tool**: One config (`biome.json`) handles both formatting and linting. No need to reconcile ESLint+Prettier conflicts.
- **SCSS support**: Biome 2.1+ formats SCSS. Project uses SCSS + BEM — Biome aligns out of the box.
- **Nx integration**: `nx.json` lint target changes from `@nx/eslint:lint` to a biome command in project `package.json` scripts or `.nx` configuration.

**Alternatives considered**:
- Keep ESLint + Prettier: More mature ecosystem but slower, dual config maintenance overhead. Rejected for Bun-native speed.
- Oxlint: Faster than Biome but no formatter, no SCSS support. Rejected for lack of unified formatting.
- dprint: Fast formatter but no linter. Rejected — need both format + lint in one tool.

**Biome config**:
```json
{
  "formatter": {
    "indentWidth": 4,
    "lineWidth": 120
  },
  "linter": {
    "rules": {
      "style": {
        "useImportType": "off"
      }
    }
  },
  "css": {
    "linter": {
      "rules": {
        "noDuplicateFontNames": "off"
      }
    }
  }
}
```

Note: SCSS linting is excluded from component `.scss` files via `files.ignore` in `biome.json` because BEM selectors like `.cup-block__element--modifier` trigger false positives with certain lint rules. SCSS files in `libs/tokens/` (design token partials) are still linted.

### 2. Lefthook over Husky

**Decision**: Use `lefthook` for git hooks instead of `husky`.

**Rationale**:
- **Performance**: Lefthook is Go-based (compiled binary), zero Node.js startup overhead per hook invocation. Husky spawns a Node process.
- **Bun compatibility**: Lefthook integrates cleanly with any package manager. No `.husky/` directory with shell scripts — single `lefthook.yml` config.
- **Parallel execution**: Lefthook can run multiple checks concurrently (e.g., Biome format + Biome lint in parallel).

**Lefthook config** (`lefthook.yml`):
```yaml
pre-commit:
  parallel: true
  commands:
    format:
      glob: "*.{ts,js,json,scss,html,css}"
      run: bun biome check --write --no-errors-on-unmatched {staged_files}
      stage_fixed: true
commit-msg:
  commands:
    commitlint:
      run: bun commitlint --edit {1}
```

**Commitlint config** (`commitlint.config.ts`): Enforces 10 emoji types with project-specific scopes:
```
feat ✨ · fix 🐛 · refactor 📦 · test 🧪 · docs 📝
perf 🚀 · ci 🔧 · chore 🚧 · style 💄 · build 🏗️
```
Scopes: `tokens`, `core`, `icons`, `ui`, `playground`, `readme`, `ci`, `repo`.

### 3. Four Publishable Libraries via Nx

**Decision**: Generate each library with `--publishable --importPath=@ngx-cupertino/<name>`.

**Rationale**:
- **Independent publishing**: Each package has its own `package.json`, entry point, and `ng-package.json`. Release Please can version each independently.
- **Clear dependency hierarchy**: `tokens` (no deps) → `core` (depends on tokens) → `icons` (depends on core) and `ui` (depends on tokens+core). Module boundaries enforce this.
- **Consumer flexibility**: Users can install only `@ngx-cupertino/tokens` if they just want CSS variables, or `@ngx-cupertino/ui` for components.

**Nx generator commands**:
```bash
bun nx g @nx/angular:library libs/tokens \
  --unitTestRunner=vitest --directory=libs/tokens \
  --publishable --importPath=@ngx-cupertino/tokens

bun nx g @nx/angular:library libs/core \
  --unitTestRunner=vitest --directory=libs/core \
  --publishable --importPath=@ngx-cupertino/core

bun nx g @nx/angular:library libs/ui \
  --unitTestRunner=vitest --directory=libs/ui \
  --publishable --importPath=@ngx-cupertino/ui

bun nx g @nx/angular:library libs/icons \
  --unitTestRunner=vitest --directory=libs/icons \
  --publishable --importPath=@ngx-cupertino/icons
```

**Post-generation cleanup**: Remove default test files and component stubs generated by the library schematic. Libraries start with only `src/index.ts` and `src/lib/` (empty). The library `project.json` already has `build`, `test`, `lint` targets from the generator.

### 4. Playground App via Vite

**Decision**: Generate with `@nx/angular:application`, SCSS style, `cup` prefix.

```bash
bun nx g @nx/angular:application playground \
  --style=scss --prefix=cup --directory=apps/playground
```

**Rationale**: Vite dev server (via `@nx/vite:plugin`) is significantly faster than webpack-based `@angular-devkit/build-angular:browser` for development. The `cup` prefix matches the BEM naming convention used across all components.

**Post-generation**: Remove `apps/playground-e2e/` (Cypress leftovers). Vitest handles testing; Playwright e2e may be added in Step 12 if needed.

### 5. Module Boundary Architecture

**Decision**: Five tags assigned via each project's `project.json`:

| Project | Tag | Can depend on |
|---|---|---|
| `playground` | `type:app` | Any |
| `tokens` | `type:tokens` | (none) |
| `core` | `type:core` | `type:tokens` |
| `icons` | `type:icons` | `type:core` |
| `ui` | `type:ui` | `type:tokens`, `type:core`, `type:icons` |

**Nx conformance rule** in `nx.json`:
```json
"plugins": [
  {
    "plugin": "@nx/eslint/plugin",
    "options": { "targetName": "lint" }
  }
]
```

Wait — since we're replacing ESLint with Biome, the `@nx/enforce-module-boundaries` ESLint rule won't run. **Decision**: Use Nx's built-in **project graph conformance** feature instead (available in `nx.json` `"conformance"` key or via the `@nx/enforce-module-boundaries` plugin). The boundary check runs as a separate Nx target (`conformance:check`) during CI, not tied to ESLint.

Migration: Remove `@nx/eslint/plugin` from `nx.json` plugins after Biome is installed. Add conformance config directly in `nx.json`.

### 6. Nx Task Pipeline

**Decision**: Configure `targetDefaults` in `nx.json`:

```json
{
  "build": {
    "cache": true,
    "dependsOn": ["^build"]
  },
  "test": {
    "cache": true
  },
  "lint": {
    "cache": true
  },
  "typecheck": {
    "cache": true,
    "dependsOn": ["^build"]
  }
}
```

**Rationale**:
- `build` depends on `^build`: A library builds before its consumers. Running `bun nx build ui` automatically builds `tokens` and `core` first.
- All targets cached: Local caching via Nx Cloud (`nxCloudId` already set) accelerates repeated runs.
- `typecheck` depends on `^build`: TypeScript needs `.d.ts` files from dependencies. Building deps first ensures type resolution.

### 7. TypeScript Strict Mode

**Decision**: Update `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "emitDecoratorMetadata": false,
    "experimentalDecorators": false,
    ...
  }
}
```

**Key changes**:
- `target: "ES2022"`: Angular 21+ uses native decorators, needs modern JS features.
- `moduleResolution: "bundler"`: Required by Vite and modern Angular. Replaces `"node"`.
- `strict: true`: Enables all strict checks (`strictNullChecks`, `strictFunctionTypes`, etc.).
- `noUnusedLocals` + `noUnusedParameters`: Catch dead code at compile time. Consistent with Angular team recommendations.
- `emitDecoratorMetadata: false` + `experimentalDecorators: false`: Project uses Signals (no class decorators), so these are unnecessary.

### 8. Global Styles Directory

**Decision**: Create `libs/tokens/src/lib/` directory for upcoming SCSS partials.

**Rationale**: Step 3 (Design Tokens) creates 8 SCSS partials (`_colors.scss`, `_typography.scss`, etc.) in this directory. Creating it now avoids troubleshooting generator quirks later.

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|---|---|---|
| Biome SCSS linter is less mature than stylelint | False positives on BEM selectors in component `.scss` files | Exclude component SCSS from lint via `biome.json` `files.ignore`. Keep formatting only for component files. Lint SCSS in `tokens/` and `core/`. |
| ESLint removal breaks `@nx/enforce-module-boundaries` | No boundary enforcement at dev time | Use Nx's native project graph validation (`bun nx conformance:check`) as separate CI step. Boundaries checked at CI, not pre-commit. |
| Lefthook pre-commit may slow workflow | Multi-second delay on commit | Biome's Rust-native speed keeps pre-commit <500ms for most files. `parallel: true` runs format+lint concurrently. |
| Nx generator may produce files with old patterns (decorators, modules) | Generated stubs conflict with Signal-based conventions | Post-generation cleanup removes all stub components, tests, and spec files. Libraries start empty. |
| Playground app needs `tsconfig.app.json` updates for strict mode | Strict checks may flag Angular app-specific patterns | Inherit from `tsconfig.base.json` then override app-specific settings (e.g., `noUnusedParameters: false` for route resolvers). |
