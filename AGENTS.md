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

## Commits
Conventional commits with emojis:
feat ✨ · fix 🐛 · refactor 📦 · test 🧪 · docs 📝
perf 🚀 · ci 🔧 · chore 🚧 · style 💄 · build 🏗️

## Testing
Vitest (jsdom, v8 coverage). No Jasmine, no Karma.
