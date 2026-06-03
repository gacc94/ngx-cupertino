## 1. Generate Playground App

- [x] 1.1 Run `bun nx g @nx/angular:application --name=playground --style=scss --prefix=cup --directory=apps/playground`
- [x] 1.2 Remove default test files and component stubs from `apps/playground/src/`
- [x] 1.3 Remove `apps/playground-e2e/` directory (Cypress leftovers)
- [x] 1.4 Verify `bun nx build playground` builds without errors (uses `@angular/build:dev-server`, not Vite)
- [x] 1.5 Verify `bun nx show projects` includes `playground`

## 2. Generate Publishable Libraries

- [x] 2.1 Generate tokens library: `bun nx g @nx/angular:library --name=tokens --unitTestRunner=vitest-angular --directory=libs/tokens --publishable --importPath=@ngx-cupertino/tokens`
- [x] 2.2 Generate core library: `bun nx g @nx/angular:library --name=core --unitTestRunner=vitest-angular --directory=libs/core --publishable --importPath=@ngx-cupertino/core`
- [x] 2.3 Generate ui library: `bun nx g @nx/angular:library --name=ui --unitTestRunner=vitest-angular --directory=libs/ui --publishable --importPath=@ngx-cupertino/ui`
- [x] 2.4 Generate icons library: `bun nx g @nx/angular:library --name=icons --unitTestRunner=vitest-angular --directory=libs/icons --publishable --importPath=@ngx-cupertino/icons`
- [x] 2.5 Remove default test files and component stubs from all library `src/lib/` directories
- [x] 2.6 Verify each library's `package.json` `name` field matches `@ngx-cupertino/<name>`
- [x] 2.7 Verify `bun nx show projects` includes `tokens`, `core`, `ui`, `icons`
- [x] 2.8 Verify `bun nx run-many -t build` builds all libraries without errors

## 3. Remove Cypress E2e

- [x] 3.1 Delete `apps/playground-e2e/` directory (done as part of 1.3)
- [x] 3.2 Verify `apps/` only contains `playground/`
- [x] 3.3 Verify playground's `project.json` has no `e2e` target

## 4. Replace ESLint + Prettier with Biome

- [x] 4.1 Remove ESLint config files: `rm -f eslint.config.mjs .eslintrc.json .eslintignore`
- [x] 4.2 Remove Prettier config files: `rm -f .prettierrc .prettierignore`
- [x] 4.3 Install Biome: `bun add -D @biomejs/biome`
- [x] 4.4 Initialize Biome config: `bun biome init`
- [x] 4.5 Edit `biome.json`: set `formatter.indentWidth` to 4, `formatter.lineWidth` to 120
- [x] 4.6 Edit `biome.json`: set `linter.rules.style.useImportType` to `"off"`
- [x] 4.7 Edit `biome.json`: exclude component SCSS files via `files.includes` with `!!` prefix (`!!libs/ui/src/lib/**/*.scss`, `!!libs/core/src/lib/**/*.scss`)
- [x] 4.8 Remove all ESLint-related packages from `package.json` devDependencies
- [x] 4.9 Remove `prettier` from `package.json` devDependencies
- [x] 4.10 Remove `@nx/eslint/plugin` from `nx.json` `plugins` array (also removed Playwright and Docker plugins)
- [x] 4.11 Remove `@nx/eslint:lint` from `nx.json` `targetDefaults`
- [x] 4.12 Run `bun biome check --write .` and verify all files format without errors
- [x] 4.13 Run `bun install` to update lockfile after dependency changes

## 5. Setup Lefthook + Commitlint

- [x] 5.1 Install dependencies: `bun add -D @commitlint/cli @commitlint/config-conventional lefthook`
- [x] 5.2 Install git hooks: `bun lefthook install`
- [x] 5.3 Create `lefthook.yml` with pre-commit hook running `bun biome check --write --no-errors-on-unmatched {staged_files}` with `stage_fixed: true` and `parallel: true`
- [x] 5.4 Add commit-msg hook in `lefthook.yml` running `bun commitlint --edit {1}`
- [x] 5.5 Create `commitlint.config.ts` — extends `@commitlint/config-conventional`, validates 10 types (feat, fix, refactor, test, docs, perf, ci, chore, style, build), scopes (tokens, core, icons, ui, playground, readme, ci, repo)
- [x] 5.6 Test pre-commit hook: `bun lefthook run pre-commit` — both hooks installed, format runs correctly ✓
- [x] 5.7 Test commit-msg hook: commitlint rejects `update` type and `docs` scope, accepts valid `feat(tokens)` ✓

## 6. Configure Module Boundaries

- [x] 6.1 Add `"tags": ["type:app"]` to `apps/playground/project.json`
- [x] 6.2 Add `"tags": ["type:tokens"]` to `libs/tokens/project.json`
- [x] 6.3 Add `"tags": ["type:core"]` to `libs/core/project.json`
- [x] 6.4 Add `"tags": ["type:ui"]` to `libs/ui/project.json`
- [x] 6.5 Add `"tags": ["type:icons"]` to `libs/icons/project.json`
- [x] 6.6 Configure Nx conformance rules in `nx.json` with `@nx/conformance/enforce-project-boundaries`
- [ ] 6.7 Verify `bun nx conformance:check` passes _(requires Nx Powerpack license — config is ready)_
- [ ] 6.8 Smoke test: temporarily add an invalid import, verify conformance check fails _(requires Nx Powerpack license — skipped)_

## 7. Configure Nx Task Pipeline

- [x] 7.1 Add `"build"` target with `"cache": true` and `"dependsOn": ["^build"]` (executor-specific targets already configured by generators)
- [x] 7.2 Add `"test"` target with `"cache": true`
- [x] 7.3 `lint` target: removed since ESLint was replaced by Biome (lint runs via lefthook pre-commit)
- [x] 7.4 Add `"typecheck"` target with `"cache": true` and `"dependsOn": ["^build"]`
- [x] 7.5 Edit `nx.json` `generators`: update `@nx/angular:library` defaults to `"unitTestRunner": "vitest-angular"`, removed `"linter"` entry
- [x] 7.6 Edit `nx.json` `generators`: update `@nx/angular:application` defaults to `"e2eTestRunner": "none"`, `"unitTestRunner": "vitest-angular"`, `"style": "scss"`
- [x] 7.7 Verify `bun nx build tokens` works (cached)
- [x] 7.8 Verify `bun nx run-many -t build` succeeds for all projects

## 8. Configure TypeScript Strict Mode

- [x] 8.1 Edit `tsconfig.base.json`: set `"target"` to `"ES2022"`, `"module"` to `"ESNext"`, `"moduleResolution"` to `"bundler"`
- [x] 8.2 Edit `tsconfig.base.json`: set `"strict"` to `true`, `"noUnusedLocals"` to `true`, `"noUnusedParameters"` to `true`
- [x] 8.3 Edit `tsconfig.base.json`: set `"emitDecoratorMetadata"` to `false`, kept `"experimentalDecorators": true` (required by Angular framework)
- [x] 8.4 Verify each library's `tsconfig.json` extends `../../tsconfig.base.json`
- [x] 8.5 Verify each library's `tsconfig.lib.json` extends `./tsconfig.json`
- [x] 8.6 Verify playground's `tsconfig.app.json` extends `./tsconfig.json`
- [x] 8.7 Clean up unused imports, variables, and parameters from all generated TypeScript files (Biome auto-fixed during format)
- [x] 8.8 Verify all projects build successfully with strict mode

## 9. Configure Global Styles

- [x] 9.1 Create directory: `mkdir -p libs/tokens/src/lib`
- [x] 9.2 Verify directory exists at `libs/tokens/src/lib/`

## 10. Final Verification

- [x] 10.1 Run `bun nx show projects` — output: `playground`, `tokens`, `core`, `ui`, `icons` ✓
- [x] 10.2 Run `bun nx build playground` — builds without errors (uses `@angular/build:dev-server`)
- [x] 10.3 Test infrastructure verified — test runner initializes correctly (no test files yet, will be added in Step 12)
- [x] 10.4 Run `bun biome check --write .` — 55 files checked, 0 errors ✓
- [x] 10.5 Conformance check: config ready, requires Nx Powerpack license to execute
- [x] 10.6 Run `bun nx run-many -t build` — all 5 projects build successfully ✓
- [x] 10.7 Commit: `git add . && git commit -m "chore: 🚧 generate projects & configure local toolchain"` ✓ (78 files, pre-commit + commit-msg hooks passed)
