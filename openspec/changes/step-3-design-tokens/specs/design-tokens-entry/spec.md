## ADDED Requirements

### Requirement: SCSS barrel exists with @forward for all partials

The `libs/tokens/src/index.scss` file SHALL contain `@forward` statements for all 8 SCSS partials: `lib/colors`, `lib/typography`, `lib/spacing`, `lib/elevation`, `lib/radius`, `lib/motion`, `lib/themes`, `lib/tints`.

#### Scenario: @forward barrel complete

- **WHEN** reading `libs/tokens/src/index.scss`
- **THEN** it contains exactly 8 `@forward` statements, one for each partial

### Requirement: TypeScript entry point exports VERSION

The `libs/tokens/src/index.ts` file SHALL export `TOKENS_VERSION` as a string constant for package build compliance.

#### Scenario: TS entry point

- **WHEN** reading `libs/tokens/src/index.ts`
- **THEN** it exports `TOKENS_VERSION = '0.0.1'`

### Requirement: ng-package.json includes SCSS assets

The `libs/tokens/ng-package.json` file SHALL include `"assets": ["src/lib/**/*.scss"]` so SCSS partials are included in the build output.

#### Scenario: Assets configured

- **WHEN** reading `libs/tokens/ng-package.json`
- **THEN** its `assets` array contains `"src/lib/**/*.scss"`

### Requirement: Build produces dist with all partials

Running `bun nx build tokens` SHALL produce a `dist/libs/tokens/` directory containing all 8 SCSS partials.

#### Scenario: Build output complete

- **WHEN** `bun nx build tokens` is executed
- **THEN** `dist/libs/tokens/src/lib/` contains all 8 partials (`_colors.scss`, `_typography.scss`, `_spacing.scss`, `_elevation.scss`, `_radius.scss`, `_motion.scss`, `_themes.scss`, `_tints.scss`)
