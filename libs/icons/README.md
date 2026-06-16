# @ngx-cupertino/icons

[![npm version](https://img.shields.io/npm/v/@ngx-cupertino/icons?label=icons)](https://www.npmjs.com/package/@ngx-cupertino/icons)
[![Angular](https://img.shields.io/badge/Angular-18%2B-dd0031)](https://angular.dev)

Icon system mapping Apple SF Symbol names to Lucide icons for Angular.

## Install

```bash
bun add @ngx-cupertino/icons @ngx-cupertino/tokens @lucide/angular
```

## Quick start (fastest)

Three steps: **import** the icons you need, **register** them once, **use** them by SF Symbol name.

```ts
// app.config.ts
import { provideCupIcons, houseIcon, starFillIcon, magnifyingglassIcon } from "@ngx-cupertino/icons";

export const appConfig = {
    providers: [
        // Register only what you use — the bundle grows on demand (tree-shaking).
        provideCupIcons(houseIcon, starFillIcon, magnifyingglassIcon),
    ],
};
```

```ts
// component
import { CupIcon } from "@ngx-cupertino/icons";

@Component({ imports: [CupIcon], template: `
    <cup-icon name="house" />
    <cup-icon name="star.fill" size="lg" />
    <cup-icon name="magnifyingglass" />
` })
export class Demo {}
```

That's it. Each icon you import is a named export (`houseIcon`, `starFillIcon`, …); `provideCupIcons`
registers them so `<cup-icon name="…">` can render by name. Names autocomplete via the `CupIconName`
type. Browse every available name in Storybook → **Foundations / Icon**.

## Prototyping: register everything

When you don't care about bundle size yet (demos, Storybook), register the whole built-in set:

```ts
import { provideCupIcons, ALL_ICONS } from "@ngx-cupertino/icons";

providers: [provideCupIcons(...ALL_ICONS)];
```

> ⚠️ **Don't ship `ALL_ICONS` to production apps.** It references every built-in icon, so it pulls
> the whole set into your bundle. Import individual icons (Quick start) for real apps. See
> [ARCHITECTURE.md → Bundle Size & Tree-Shaking](./ARCHITECTURE.md#bundle-size--tree-shaking).

## Usage

```html
<cup-icon name="star" size="sm" />
<cup-icon name="envelope" />
<cup-icon name="magnifyingglass" size="lg" />
<cup-icon name="heart.fill" />
```

## Behavior notes

- `name="heart.fill"` activates the filled presentation automatically (also `[fill]="true"`).
- `size` accepts named sizes (`sm`, `md`, `lg`) and numeric pixel values.
- `ariaLabel` switches the icon from decorative (`aria-hidden`) to `role="img"` mode.
- A dev-only warning fires if you render a `name` you never registered (the "blank icon" mistake).
- The component depends on the `@ngx-cupertino/tokens` Sass contract for visual sizing.

## Docs

- Technical architecture: [`ARCHITECTURE.md`](./ARCHITECTURE.md) — registration model, resolution, sizing, tree-shaking, versioning
- Root project docs: https://github.com/gacc94/ngx-cupertino
- Component development docs: use the workspace Storybook (`bun nx storybook ui`)
