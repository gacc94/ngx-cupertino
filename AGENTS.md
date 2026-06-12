# AGENTS.md

## Project
Angular component library implementing Apple Design System for web.
- Package: @ngx-cupertino/ui
- 37 standalone components, Signal-based API, host: bindings + SCSS
- Design specs from iOS/iPadOS 26 Figma kit

## Package Manager
Use `bun` for all commands — never `npm`, `yarn`, or `pnpm`.

## Monorepo
Nx workspace. Use `bun nx` for all Nx commands.

## Framework
Angular ≥ 19 with standalone components and Signals.
No NgModules, no decorators — `input()`, `output()`, `model()` only.

## Forms
ReactiveFormsModule only. No `FormsModule`, no `ngModel`.

## Styling
Angular-native pattern (industry standard, used by Angular Material / PrimeNG / NG-ZORRO / Spartan):
- `host:` bindings for state classes (`[class.cup-disabled]`, `[class.cup-small]`)
- `cup-` prefixed simple classes for internal elements (`.cup-label`, `.cup-icon`)
- Variant classes directly on host (`.liquid-glass`, `.tinted`, `.filled`)
- CSS custom properties from `@ngx-cupertino/tokens`
- `ViewEncapsulation.Emulated` (default)
- No BEM — unnecessary with Angular's style encapsulation
- Biome: indentWidth 4, lineWidth 120

## Sass Imports

- Public consumer-facing Sass should use package imports:
  - `@use "@ngx-cupertino/tokens" as t;`
  - `@use "@ngx-cupertino/core" as cup;`
- `core`, `ui`, and `icons` source SCSS should also prefer those package imports.
- True internal Sass implementation details may still use stable local imports where needed, such as `tokens` internals or sibling partial imports.
- See [`docs/sass-imports.md`](docs/sass-imports.md) for the full rule and package contract.

## File Naming

- Components: `cup-button.ts` (no `.component.ts`)
- Directives: `liquid-glass.directive.ts`
- Services: `theme.service.ts`
- Pipes: `dynamic-type.pipe.ts`
- Types/Interfaces: `cup-config.types.ts`
- Maps/Constants: `sf-symbol-map.ts`
- Providers: `provide-icons.ts`, `cupertino.provider.ts`
- Tests: `cup-button.spec.ts`

## Code Conventions

- Signals API: `input()`, `output()`, `model()`, `computed()`, `viewChild()`, `contentChild()`, `contentChildren()`
- No decorators (`@Input`, `@Output`, `@ViewChild`)
- ReactiveFormsModule only — no `FormsModule`, no `ngModel`
- Host bindings for states: `host: { '[class.cup-disabled]': 'disabled()' }`
- `:host` + simple classes (no BEM)
- CSS logical properties (`start`/`end`, not `left`/`right`)
- All components `standalone: true`
- Prefix: `cup-`

## Commits
Conventional commits with emojis:
feat ✨ · fix 🐛 · refactor 📦 · test 🧪 · docs 📝
perf 🚀 · ci 🔧 · chore 🚧 · style 💄 · build 🏗️

## Token Decision Flow

When a component needs any design value (color, spacing, radius, typography, motion), follow the 3-layer validation architecture. Full docs: [`docs/token-decision-flow.md`](docs/token-decision-flow.md).

```
Layer 3: @include cup.cup-button-base       ← Component mixin exists? Use it
Layer 2: @include cup.cup-liquid-glass()    ← Generic mixin exists? Use it
Layer 1: t.token('label')                    ← Otherwise, use token directly
         ↑ Token missing? Add to _api.scss FIRST
```

Never use raw `var(--cup-*)` when a mixin or `t.token()` is available. Build fails at Layer 1 if token doesn't exist. Layers 2 and 3 are preferred because they validate token combinations.

## Testing
Vitest (jsdom, v8 coverage). No Jasmine, no Karma.
