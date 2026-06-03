# AGENTS.md

## Project
Angular component library implementing Apple Design System for web.
- Package: @ngx-cupertino/ui
- 37 standalone components, Signal-based API, BEM + SCSS
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
SCSS with BEM: `.cup-block__element--modifier`
CSS custom properties from @ngx-cupertino/tokens
Biome: indentWidth 4, lineWidth 120

## Commits
Conventional commits with emojis:
feat ✨ · fix 🐛 · refactor 📦 · test 🧪 · docs 📝
perf 🚀 · ci 🔧 · chore 🚧 · style 💄 · build 🏗️

## Testing
Vitest (jsdom, v8 coverage). No Jasmine, no Karma.
