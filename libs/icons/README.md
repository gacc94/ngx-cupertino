# @ngx-cupertino/icons

[![npm version](https://img.shields.io/npm/v/@ngx-cupertino/icons?label=icons)](https://www.npmjs.com/package/@ngx-cupertino/icons)
[![Angular](https://img.shields.io/badge/Angular-21%2B-dd0031)](https://angular.dev)

Icon system mapping Apple SF Symbol names to Lucide icons for Angular.

## Install

```bash
bun add @ngx-cupertino/icons @ngx-cupertino/tokens @lucide/angular
```

## Register icons

`CupIcon` does not register icons by itself. Register the built-in icon set once in your app providers:

```ts
import { provideCupIcons } from "@ngx-cupertino/icons";

export const appConfig = {
    providers: [provideCupIcons()],
};
```

You can also register only a subset of the built-in Lucide names when bundle size matters:

```ts
import { provideCupIcons } from "@ngx-cupertino/icons";

export const appConfig = {
    providers: [provideCupIcons({ names: ["star", "heart", "search"] })],
};
```

## Usage

```html
<cup-icon name="star" size="sm" />
<cup-icon name="envelope" />
<cup-icon name="magnifyingglass" size="lg" />
<cup-icon name="heart.fill" />
```

SF Symbol names such as `star`, `envelope`, and `magnifyingglass` are mapped automatically to Lucide icons.

Direct Lucide names are also supported as long as they are registered:

```html
<cup-icon name="search" />
<cup-icon name="sparkles" />
```

## Behavior notes

- `name="heart.fill"` activates the filled presentation automatically.
- `size` accepts named sizes (`sm`, `md`, `lg`) and numeric values.
- `ariaLabel` switches the icon from decorative mode to `role="img"` mode.
- The component depends on the `@ngx-cupertino/tokens` Sass contract for visual sizing.

## Docs

- Technical architecture: [`ARCHITECTURE.md`](./ARCHITECTURE.md) — resolution pipeline, registration model, sizing contract, and versioning policy
- Root project docs: https://github.com/gacc94/ngx-cupertino
- Component development docs: use the workspace Storybook (`bun nx storybook ui`)
