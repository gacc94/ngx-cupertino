# @ngx-cupertino/core

[![npm version](https://img.shields.io/npm/v/@ngx-cupertino/core?label=core)](https://www.npmjs.com/package/@ngx-cupertino/core)
[![Angular](https://img.shields.io/badge/Angular-18%2B-dd0031)](https://angular.dev)

Core utilities, services, types, and base classes for @ngx-cupertino.

Includes `CupFormControl` (ControlValueAccessor base), `provideCupertino()` provider, theme service, a11y utilities, and SCSS component mixins.

## Install

```bash
npm i @ngx-cupertino/core
```

## Setup

```typescript
// app.config.ts
import { provideCupertino } from '@ngx-cupertino/core';

export const appConfig = {
    providers: [
        provideCupertino({
            theme: 'auto',      // 'auto' | 'light' | 'dark'
            tintColor: 'blue',  // 'blue' | 'pink' | 'monochrome' | custom
        }),
    ],
};
```

`provideCupertino()` auto-includes icon registration — no separate provider needed.

## Docs

https://github.com/gacc94/ngx-cupertino
