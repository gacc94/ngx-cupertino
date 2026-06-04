# icons-entry Specification

## Purpose
TBD - created by archiving change step-4-icons-package. Update Purpose after archive.
## Requirements
### Requirement: Entry point exports all public API

The `libs/icons/src/index.ts` file SHALL export `CupIcon` from `./lib/cup-icon`, `SF_SYMBOL_MAP` from `./lib/sf-symbol-map`, and `provideCupIcons` from `./lib/provide-icons`.

#### Scenario: Exports complete

- **WHEN** reading `libs/icons/src/index.ts`
- **THEN** it contains exactly 3 export statements for `CupIcon`, `SF_SYMBOL_MAP`, and `provideCupIcons`

### Requirement: ng-package.json has correct configuration

The `libs/icons/ng-package.json` file SHALL have `dest` pointing to `../../dist/libs/icons` and `lib.entryFile` pointing to `src/index.ts`.

#### Scenario: Package config

- **WHEN** reading `libs/icons/ng-package.json`
- **THEN** `dest` is `"../../dist/libs/icons"` and `lib.entryFile` is `"src/index.ts"`

### Requirement: Build produces dist output

Running `bun nx build icons` SHALL produce a `dist/libs/icons/` directory with FESM and DTS bundles.

#### Scenario: Build succeeds

- **WHEN** `bun nx build icons` is executed
- **THEN** the build completes without errors and `dist/libs/icons/` exists

