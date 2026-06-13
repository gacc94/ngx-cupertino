# @ngx-cupertino/ui

[![npm version](https://img.shields.io/npm/v/@ngx-cupertino/ui?label=ui)](https://www.npmjs.com/package/@ngx-cupertino/ui)
[![Angular](https://img.shields.io/badge/Angular-18%2B-dd0031)](https://angular.dev)

Angular UI components implementing Apple's iOS 26 / macOS Tahoe 26 design system.

## Install

```bash
npm i @ngx-cupertino/ui @lucide/angular @angular/cdk
```

## Components

### Button

```html
<button cup-button variant="filled">Click me</button>
<button cup-button variant="tinted">Tinted</button>
<button cup-button variant="liquid-glass">Glass</button>
```

### Toggle

```html
<cup-toggle [(checked)]="enabled">Wi-Fi</cup-toggle>
```

### Text Field

```html
<cup-text-field label="Email" type="email" placeholder="you@example.com" prefixIcon="envelope" clearable />
```

### Slider

```html
<cup-slider [(value)]="volume" label="Volume" showValue minIcon="speaker" maxIcon="speaker.wave.3" />
```

### Stepper

```html
<cup-stepper [(value)]="quantity" label="Quantity" min="0" max="99" />
```

### Progress

```html
<cup-progress [value]="65" label="Downloading..." showPercentage />
<cup-progress type="spinner" />
<cup-progress type="circular" [value]="75" label="Storage" />
```

## Compatibility

Angular 18, 19, 20, 21+. Uses Signals API, standalone components, and `ChangeDetectionStrategy.OnPush`.

## Visual QA Matrix

Use Storybook as the canonical review surface for color-sensitive components.

### Mandatory screenshot coverage

| Component  | Primary stories                                                 | Required combinations                                                |
| ---------- | --------------------------------------------------------------- | -------------------------------------------------------------------- |
| Button     | `AppleMatrix`, `LiquidGlassSurfaces`, `MacOSDesktopPushButtons` | light + dark, increased contrast, liquid-glass, desktop fine-pointer |
| Toggle     | `StateMatrix`                                                   | light + dark, increased contrast, liquid-glass, reduced transparency |
| Text Field | `WithLabel`, `WithError`, `Disabled`, `Search`                  | light + dark, increased contrast, base surface style                 |
| Slider     | `Default`, `WithTicks`, `Disabled`                              | light + dark, increased contrast, base surface style                 |
| Progress   | `Linear`, `Circular`, `Spinner`, `Sizes`                        | light + dark, increased contrast, base surface style                 |

### High-value coverage

- `Stepper`: review `Default`, `MinMax`, and `Disabled` when spacing, tint, or desktop token behavior changes
- reduced transparency on liquid-glass surfaces is highest value for `Button` and `Toggle`
- tinted glass combinations should be reviewed after the neutral baseline passes

### Review order

1. light + base surface style
2. dark + base surface style
3. increased contrast
4. liquid-glass
5. reduced transparency
6. desktop fine-pointer overrides where applicable

## Docs

https://github.com/gacc94/ngx-cupertino
