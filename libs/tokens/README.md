# @ngx-cupertino/tokens

[![npm version](https://img.shields.io/npm/v/@ngx-cupertino/tokens?label=tokens)](https://www.npmjs.com/package/@ngx-cupertino/tokens)
[![Angular](https://img.shields.io/badge/Angular-18%2B-dd0031)](https://angular.dev)

Design tokens for Apple's iOS 26 / macOS Tahoe 26 design system — CSS custom properties for colors, typography, spacing, motion, and more.

## Install

```bash
npm i @ngx-cupertino/tokens
```

## Usage

```scss
// styles.scss
@use "@ngx-cupertino/tokens";
```

## Exports

```scss
@use "@ngx-cupertino/tokens"; // all tokens
@use "@ngx-cupertino/tokens/colors"; // color palette
@use "@ngx-cupertino/tokens/typography"; // fonts, sizes, weights
@use "@ngx-cupertino/tokens/spacing"; // spacing scale
@use "@ngx-cupertino/tokens/elevation"; // shadows, glass effects
@use "@ngx-cupertino/tokens/radius"; // border radius scale
@use "@ngx-cupertino/tokens/motion"; // durations, easings
@use "@ngx-cupertino/tokens/tints"; // system tint colors
```

## Semantic Token Typing

The public semantic token-name union lives in `@ngx-cupertino/core` as `CupSemanticTokenName`.

It covers semantic foreground, support, background, and separator families only. Palette,
accent, material, and platform tokens stay outside that union so the type remains focused on
role-based UI decisions.

## Color Space Policy

- token values are sRGB-first by default
- Display P3 requires explicit approval and extra QA
- do not introduce wide-gamut token values silently during routine token updates

## Maintenance Order

The canonical maintenance contract lives in `libs/tokens/ARCHITECTURE.md`. Future contributors should follow this order:

1. check Apple source and parity tables
2. update palette source values
3. align tint families
4. validate semantic stability
5. review platform and material layers
6. update API and documentation

## Docs

https://github.com/gacc94/ngx-cupertino
