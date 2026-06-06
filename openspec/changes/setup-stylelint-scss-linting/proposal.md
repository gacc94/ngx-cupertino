## Why

Biome does not support SCSS syntax — it only handles standard CSS. The project's 22 SCSS files have no automated linting, meaning 4-space indentation, `$cup-` variable naming conventions, and SCSS best practices are not enforced. Stylelint with `stylelint-config-standard-scss` solves this gap, ensuring SCSS quality matches the TypeScript quality enforced by Biome.

## What Changes

- **NEW**: Install `stylelint`, `stylelint-config-standard-scss`, and `nx-stylelint` as dev dependencies
- **NEW**: Root `.stylelintrc.json` with 4-space indent, cup- prefix patterns, and SCSS-specific rules
- **NEW**: `stylelint` target in `project.json` for all 4 libraries (tokens, core, icons, ui)
- **NEW**: `stylelint` entry in `nx.json` `targetDefaults` with cache enabled
- **NEW**: `stylelint` job in `.github/workflows/ci.yml` using `nx affected`
- **NEW**: `stylelint` command in `lefthook.yml` pre-commit hook

## Capabilities

### New Capabilities
- `scss-linting`: Automated SCSS linting via Stylelint with Nx integration, covering all 4 publishable libraries

### Modified Capabilities
None.

## Impact

- New dev dependencies: stylelint, stylelint-config-standard-scss, nx-stylelint
- New config file: `.stylelintrc.json`
- Modified files: `libs/*/project.json` (4), `nx.json`, `.github/workflows/ci.yml`, `lefthook.yml`
- CI requires manual branch protection update to add `CI / stylelint (pull_request)` check
