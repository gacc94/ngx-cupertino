# Changelog

## [0.1.0-alpha.1](https://github.com/gacc94/ngx-cupertino/releases/tag/v0.1.0-alpha.1) (2026-06-09)

First published alpha — 4 packages, 6 Phase 1 components.

### Features

* ui: implement cup-button component with Signals API (b5540c2)
* ui: refactor cup-toggle per Notion spec (1ec7b11)
* ui: enhance CupToggle with new features and improved styling (83a6e12)
* ui: add 6 Phase 1 components — Button, Toggle, TextField, Slider, Stepper, Progress (5ca1232)
* core: add core package — providers, services, directives, SCSS, utils (0a9047f)
* core: add typed component SCSS mixins — _component-api.scss (e732297)
* core: implement a11y utilities and process a11y config in provider (dea8673)
* icons: add cup-icon component, SF Symbol map, and icon provider (a88863f)
* tokens: add design tokens — 8 SCSS partials from iOS 26 Figma (770a3ae)
* tokens: add Token API Layer — 178-token SCSS map + token() getter (af3936e)
* tokens: add 10 toggle sizing tokens for cup-toggle (93ebf32)
* tokens: multi-dimensional theming — data-mode + data-tint, CSS-driven tints (118a96b)
* tokens: scaffold complete SCSS token architecture (7d964bc)
* playground: configure demo app with 7 component pages, sidebar, dark mode (30a0ee2)
* cup-button component + icons package refactor v3 (5b856c0)

### Bug Fixes

* icons: remove @use from cup-icon.scss, use var(--cup-*) (3b26f32)
* icons: remove as any and unknown types from icon provider (fe0acd7)
* ui: fix text-field focus in jsdom, suppress NG0304 in tests (c1ad292)
* ui: remove duplicate disabled input from CupToggle (4d3df04)
* ui: use var(--cup-*) directly in component SCSS (cad407c)
* ui: add standard appearance property alongside -moz-appearance (2ce9434)
* playground: load tokens as global styles (1003581)
* tokens: rename index.scss to _index.scss (SCSS partial convention) (7dcff8a)
* repo: remove workspaces config — caused CI bun install to fail (3ecf374)
