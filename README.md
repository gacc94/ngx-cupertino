# @ngx-cupertino

Angular components implementing Apple's iOS 26 / macOS Tahoe 26 design system.

[![npm tokens](https://img.shields.io/npm/v/@ngx-cupertino/tokens?label=tokens)](https://www.npmjs.com/package/@ngx-cupertino/tokens)
[![npm core](https://img.shields.io/npm/v/@ngx-cupertino/core?label=core)](https://www.npmjs.com/package/@ngx-cupertino/core)
[![npm icons](https://img.shields.io/npm/v/@ngx-cupertino/icons?label=icons)](https://www.npmjs.com/package/@ngx-cupertino/icons)
[![npm ui](https://img.shields.io/npm/v/@ngx-cupertino/ui?label=ui)](https://www.npmjs.com/package/@ngx-cupertino/ui)
[![Angular](https://img.shields.io/badge/Angular-18%2B-dd0031)](https://angular.dev)
[![License](https://img.shields.io/badge/License-MIT-blue)](./LICENSE)

## Packages

| Package | Description |
|---------|-------------|
| [`@ngx-cupertino/tokens`](https://www.npmjs.com/package/@ngx-cupertino/tokens) | Design tokens — SCSS custom properties for colors, typography, spacing, motion |
| [`@ngx-cupertino/core`](https://www.npmjs.com/package/@ngx-cupertino/core) | Core utilities, services, types, and base classes |
| [`@ngx-cupertino/icons`](https://www.npmjs.com/package/@ngx-cupertino/icons) | Icon system — SF Symbol to Lucide mapping |
| [`@ngx-cupertino/ui`](https://www.npmjs.com/package/@ngx-cupertino/ui) | UI components: Button, Toggle, TextField, Slider, Stepper, Progress |

## Quick Start

```bash
npm i @ngx-cupertino/ui @lucide/angular @angular/cdk
```

```typescript
// app.config.ts
import { provideCupertino } from '@ngx-cupertino/core';

export const appConfig = {
    providers: [
        provideCupertino({ theme: 'auto', tintColor: 'blue' }),
    ],
};
```

```scss
// styles.scss
@use '@ngx-cupertino/tokens';
```

```typescript
// In your components
import { CupButton, CupToggle, CupTextField,
         CupSlider, CupStepper, CupProgress
} from '@ngx-cupertino/ui';
```

## Compatibility

| Angular | Status |
|---------|--------|
| 18.x | ✅ Supported |
| 19.x | ✅ Supported |
| 20.x | ✅ Supported |
| 21.x | ✅ Supported |

## Development

```bash
bun install
bun run build
bun run test
bun run lint
```

## License

MIT
