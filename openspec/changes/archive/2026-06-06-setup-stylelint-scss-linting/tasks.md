## 1. Install Dependencies

- [x] 1.1 Install `stylelint`, `stylelint-config-standard-scss`, and `nx-stylelint` as dev dependencies with bun

## 2. Root Configuration

- [x] 2.1 Create `.stylelintrc.json` at project root with `stylelint-config-standard-scss`, 4-space indent, cup- prefix patterns, and SCSS-specific rules

## 3. Nx Integration

- [x] 3.1 Add `stylelint` target to `libs/tokens/project.json` with `nx-stylelint:lint` executor
- [x] 3.2 Add `stylelint` target to `libs/core/project.json` with `nx-stylelint:lint` executor
- [x] 3.3 Add `stylelint` target to `libs/icons/project.json` with `nx-stylelint:lint` executor
- [x] 3.4 Add `stylelint` target to `libs/ui/project.json` with `nx-stylelint:lint` executor
- [x] 3.5 Add `stylelint` to `nx.json` `targetDefaults` with cache enabled

## 4. CI Integration

- [x] 4.1 Add `stylelint` job to `.github/workflows/ci.yml` with `bun nx affected -t stylelint`
- [x] 4.2 Add `CI / stylelint (pull_request)` to branch protection ruleset (manual step documented)

## 5. Pre-commit Integration

- [x] 5.1 Add `stylelint` command to `lefthook.yml` pre-commit hook for staged `.scss` files

## 6. Validation

- [x] 6.1 Run `bun nx stylelint tokens` and verify all SCSS files pass
- [x] 6.2 Run `bun nx stylelint tokens` on CI-like environment to verify integration
- [x] 6.3 Test that a deliberate indentation error is caught by Stylelint
