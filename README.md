# @ngx-cupertino/ui

Angular component library implementing Apple Design System for web.

[![Angular](https://img.shields.io/badge/Angular-19%2B-red)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org)
[![Nx](https://img.shields.io/badge/Nx-22.7-blue)](https://nx.dev)
[![Bun](https://img.shields.io/badge/Bun-latest-black)](https://bun.sh)
[![Vitest](https://img.shields.io/badge/Vitest-4.x-green)](https://vitest.dev)
[![Biome](https://img.shields.io/badge/Biome-2.4-blue)](https://biomejs.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow)](./LICENSE)

## Features

- **Apple Design System** — iOS/iPadOS 26 visual language for web applications
- **37 Standalone Components** — Buttons, toggles, sheets, dialogs, pickers, navigation, and more
- **Signal-based API** — `input()`, `model()`, `output()` with `OnPush` change detection. No decorators
- **Angular Host Binding Pattern** — Industry-standard styling used by Angular Material, PrimeNG, NG-ZORRO, and Spartan UI
- **4 Publishable Packages** — `tokens`, `core`, `icons`, `ui` under the `@ngx-cupertino` scope
- **Vitest Testing** — Fast unit tests with jsdom and v8 coverage

## Installation

```bash
bun add @ngx-cupertino/ui
```

Peer dependencies:

- Angular ≥ 19
- TypeScript ≥ 5.5
- `@ngx-cupertino/tokens` (auto-installed)
- `@ngx-cupertino/core` (auto-installed)

## Quick Start

**1. Configure your app:**

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideCupertino } from '@ngx-cupertino/core';

export const appConfig: ApplicationConfig = {
    providers: [provideCupertino()],
};
```

**2. Import design tokens:**

```scss
// styles.scss
@use '@ngx-cupertino/tokens';
```

**3. Use components:**

```html
<button cup-button variant="liquid-glass">
    <cup-icon name="star" cup-prefix />
    Add to Favorites
</button>
```

## Components

37 components across 4 implementation phases:

### Phase 1 — Foundations (7 components)

| Component | Selector |
|---|---|
| Button | `[cup-button]` |
| Toggle | `cup-toggle` |
| Text Field | `cup-text-field` |
| Icon | `cup-icon` |
| Slider | `cup-slider` |
| Stepper | `cup-stepper` |
| Progress | `cup-progress` |

### Phase 2 — Content (8 components)

| Component | Selector |
|---|---|
| Badge | `cup-badge` |
| Tab Bar | `cup-tab-bar` |
| Segmented Control | `cup-segmented-control` |
| List | `cup-list` |
| Skeleton | `cup-skeleton` |
| Divider | `cup-divider` |
| Empty State | `cup-empty-state` |
| Card | `cup-card` |

### Phase 3 — Structure (12 components)

| Component | Selector |
|---|---|
| Sidebar | `cup-sidebar` |
| Toolbar | `cup-toolbar` |
| Alert | `CupAlertService` |
| Dialog | `CupDialogService` |
| Sheet | `cup-sheet` |
| Notification | `CupNotificationService` |
| Menu | `cup-menu` |
| Tooltip | `[cupTooltip]` |
| Accordion | `cup-accordion` |
| Drawer | `cup-drawer` |
| Nav Bar | `cup-nav-bar` |
| Layout | `cup-layout` |

### Phase 4 — Extended (7 components)

| Component | Selector |
|---|---|
| Action Sheet | `CupActionSheetService` |
| Context Menu | `cup-context-menu` |
| Popover | `cup-popover` |
| Picker | `cup-picker` |
| Pop-up Button | `cup-popup-button` |
| Avatar | `cup-avatar` |
| Carousel | `cup-carousel` |

### Soon (3 components)

| Component | Selector |
|---|---|
| Tabs | `cup-tabs` |
| Breadcrumb | `cup-breadcrumb` |
| Chip | `cup-chip` |

## Package Architecture

```
@ngx-cupertino/tokens  ←───  @ngx-cupertino/core  ←───  @ngx-cupertino/ui
                                                      ───  @ngx-cupertino/icons
```

| Package | Path | Purpose | Dependencies |
|---|---|---|---|
| `@ngx-cupertino/tokens` | `libs/tokens/` | CSS custom properties, SCSS theme partials | None |
| `@ngx-cupertino/core` | `libs/core/` | Providers, services, directives, mixins | `tokens` |
| `@ngx-cupertino/icons` | `libs/icons/` | Lucide icon wrapper with Cupertino styling | `core` |
| `@ngx-cupertino/ui` | `libs/ui/` | All 37 components | `tokens`, `core`, `icons` |

## Styling Conventions

This library uses the **Angular-native host binding pattern** — the industry standard used by Angular Material, PrimeNG, NG-ZORRO, and Spartan UI.

### Principles

- `host:` bindings for state classes (`[class.cup-disabled]`, `[class.cup-small]`)
- `cup-` prefixed simple classes for internal elements (`.cup-label`, `.cup-icon`)
- Variant classes directly on host (`.liquid-glass`, `.tinted`, `.filled`)
- `ViewEncapsulation.Emulated` (default Angular)
- CSS custom properties from `@ngx-cupertino/tokens`
- **No BEM** — unnecessary with Angular's style encapsulation

### Example

```typescript
@Component({
    selector: 'button[cup-button]',
    host: {
        '[class.cup-disabled]': 'disabled()',
        '[class.cup-small]': 'size() === "small"',
        '[class.cup-large]': 'size() === "large"',
        '[class.cup-full-width]': 'fullWidth()',
    },
    template: `
        @if (icon() && iconPosition() === 'start') {
            <cup-icon class="cup-icon" [name]="icon()!" />
        }
        <span class="cup-label"><ng-content /></span>
    `,
})
export class CupButton { }
```

```scss
:host {
    display: inline-flex;
    align-items: center;
    gap: var(--cup-spacing-2);
    min-height: 44px;
    cursor: pointer;
}

:host(.cup-disabled) { opacity: 0.4; pointer-events: none; }
:host(.cup-small) { min-height: 32px; }
:host(.cup-large) { min-height: 52px; }

.cup-icon { flex-shrink: 0; }
.cup-label { flex: 1; }

.liquid-glass {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(20px) saturate(1.8);
}
```

## Commit Conventions

Conventional commits with emojis enforced by Lefthook + Commitlint:

| Type | Emoji | Usage |
|---|---|---|
| `feat` | ✨ | New component or feature |
| `fix` | 🐛 | Bug fix |
| `refactor` | 📦 | Code restructuring |
| `test` | 🧪 | Test additions or changes |
| `docs` | 📝 | Documentation only |
| `perf` | 🚀 | Performance improvement |
| `ci` | 🔧 | CI/CD configuration |
| `chore` | 🚧 | Maintenance, tooling |
| `style` | 💄 | Formatting, styling |
| `build` | 🏗️ | Build system changes |

**Scopes:** `tokens`, `core`, `icons`, `ui`, `playground`, `readme`, `ci`, `repo`

## Development

```bash
# Install dependencies
bun install

# Serve the playground app
bun nx serve playground

# Run all builds
bun nx run-many -t build

# Run tests
bun nx run-many -t test
bun nx test ui

# Format and lint
bun biome check --write .

# Show project graph
bun nx graph

# Show all projects
bun nx show projects
```

## Project Structure

```
ngx-cupertino/
├── apps/
│   └── playground/            # Angular dev app (SCSS, cup prefix)
├── libs/
│   ├── tokens/                # @ngx-cupertino/tokens — design tokens
│   ├── core/                  # @ngx-cupertino/core — providers, services, directives
│   ├── icons/                 # @ngx-cupertino/icons — Lucide wrapper
│   └── ui/                    # @ngx-cupertino/ui — 37 components
├── openspec/                  # Spec-driven development artifacts
├── nx.json                    # Nx workspace configuration
├── tsconfig.base.json         # TypeScript base config (strict, ES2022, bundler)
├── biome.json                 # Biome formatter/linter config
├── lefthook.yml               # Git hooks (pre-commit: Biome, commit-msg: Commitlint)
├── commitlint.config.ts       # Commit message validation
└── LICENSE                    # MIT License
```

## License

MIT © [ngx-cupertino](./LICENSE)
