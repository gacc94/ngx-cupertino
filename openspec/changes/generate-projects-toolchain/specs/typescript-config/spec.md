## ADDED Requirements

### Requirement: TypeScript strict mode is enabled

The base TypeScript configuration SHALL enable `strict: true`, `noUnusedLocals: true`, and `noUnusedParameters: true` in `tsconfig.base.json`.

#### Scenario: Strict mode in tsconfig.base.json

- **WHEN** reading `tsconfig.base.json`
- **THEN** `"compilerOptions"` contains `"strict": true`, `"noUnusedLocals": true`, and `"noUnusedParameters": true`

### Requirement: Modern ECMAScript target and module resolution

The base TypeScript configuration SHALL target `ES2022` with `ESNext` module system and `bundler` module resolution.

#### Scenario: Target and module settings

- **WHEN** reading `tsconfig.base.json`
- **THEN** `"compilerOptions"` contains `"target": "ES2022"`, `"module": "ESNext"`, and `"moduleResolution": "bundler"`

### Requirement: Decorator metadata is disabled

The base TypeScript configuration SHALL NOT enable `emitDecoratorMetadata` or `experimentalDecorators`, since the project uses Signals (no class decorators).

#### Scenario: Decorator flags off

- **WHEN** reading `tsconfig.base.json`
- **THEN** `"emitDecoratorMetadata"` is either `false` or absent, and `"experimentalDecorators"` is either `false` or absent

### Requirement: Library TypeScript configs inherit from base

Each library's `tsconfig.json` SHALL extend `../../tsconfig.base.json` and each library's `tsconfig.lib.json` SHALL reference Angular compiler options for library builds.

#### Scenario: Library tsconfig extends base

- **WHEN** reading `libs/tokens/tsconfig.json`
- **THEN** it contains `"extends": "../../tsconfig.base.json"`

#### Scenario: Library tsconfig.lib.json for Angular

- **WHEN** reading `libs/tokens/tsconfig.lib.json`
- **THEN** it contains `"extends": "./tsconfig.json"` and Angular-specific `compilerOptions` for library compilation

### Requirement: App TypeScript config inherits from base with app overrides

The playground app's `tsconfig.app.json` SHALL extend `tsconfig.json` (which extends `tsconfig.base.json`), adding app-specific overrides.

#### Scenario: App tsconfig extends project tsconfig

- **WHEN** reading `apps/playground/tsconfig.app.json`
- **THEN** it contains `"extends": "./tsconfig.json"` with Angular compiler options suitable for application builds

### Requirement: No unused cleanup in generated files

All generated TypeScript files SHALL pass `noUnusedLocals` and `noUnusedParameters` checks. Any unused imports, variables, or parameters from the generator SHALL be removed.

#### Scenario: TypeScript compilation passes with strict checks

- **WHEN** `bun nx typecheck` is executed on any project
- **THEN** the TypeScript compiler reports zero errors related to unused code
