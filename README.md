# @ngx-cupertino

Angular components implementing Apple's iOS 26 / macOS Tahoe 26 design system.

[![npm tokens](https://img.shields.io/npm/v/@ngx-cupertino/tokens?label=tokens)](https://www.npmjs.com/package/@ngx-cupertino/tokens)
[![npm core](https://img.shields.io/npm/v/@ngx-cupertino/core?label=core)](https://www.npmjs.com/package/@ngx-cupertino/core)
[![npm icons](https://img.shields.io/npm/v/@ngx-cupertino/icons?label=icons)](https://www.npmjs.com/package/@ngx-cupertino/icons)
[![npm ui](https://img.shields.io/npm/v/@ngx-cupertino/ui?label=ui)](https://www.npmjs.com/package/@ngx-cupertino/ui)
[![Angular](https://img.shields.io/badge/Angular-21%2B-dd0031)](https://angular.dev)
[![License](https://img.shields.io/badge/License-MIT-blue)](./LICENSE)

## Workspace

| Package | Description |
|---------|-------------|
| [`@ngx-cupertino/tokens`](https://www.npmjs.com/package/@ngx-cupertino/tokens) | Design tokens and SCSS API for colors, typography, spacing, motion, and more |
| [`@ngx-cupertino/core`](https://www.npmjs.com/package/@ngx-cupertino/core) | Core utilities, services, types, and base classes |
| [`@ngx-cupertino/icons`](https://www.npmjs.com/package/@ngx-cupertino/icons) | Icon system with SF Symbol to Lucide mapping |
| [`@ngx-cupertino/ui`](https://www.npmjs.com/package/@ngx-cupertino/ui) | UI components: Button, Toggle, TextField, Slider, Stepper, Progress |
| `playground` | Angular app used to exercise the component library locally |

## Getting Started

```bash
bun install
```

Run the playground app:

```bash
bun nx serve playground
```

The app runs on `http://localhost:4200` by default.

## Storybook

The `ui` library has Storybook for component docs and visual exploration.

```bash
bun nx storybook ui
```

Storybook runs on `http://localhost:4400`.

Build the static Storybook output:

```bash
bun nx build-storybook ui
```

By default Storybook reads the built packages from `dist/`. For source-mode previews, set:

```bash
STORYBOOK_PACKAGE_MODE=source bun nx storybook ui
```

## Consumer Quick Start

```bash
bun add @ngx-cupertino/ui @ngx-cupertino/core @ngx-cupertino/tokens @angular/cdk @lucide/angular
```

```ts
// app.config.ts
import { provideCupertino } from '@ngx-cupertino/core';

export const appConfig = {
    providers: [provideCupertino({ theme: 'auto', tintColor: 'blue' })],
};
```

```scss
// styles.scss
@use '@ngx-cupertino/tokens' as t;
```

```ts
import { CupButton, CupToggle, CupTextField, CupSlider, CupStepper, CupProgress } from '@ngx-cupertino/ui';
```

## Development

```bash
bun nx build tokens
bun nx build core
bun nx build icons
bun nx build ui
bun nx build-storybook ui
bun biome check .
```

## Compatibility

| Angular | Status |
|---------|--------|
| 21.x | ✅ Supported |
| 20.x | ✅ Supported |
| 19.x | ✅ Supported |
| 18.x | ✅ Supported |

## License

MIT
