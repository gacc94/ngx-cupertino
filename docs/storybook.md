# Storybook Integration Guide for @ngx-cupertino

> Comprehensive guide for integrating Storybook 10 into an Nx 22.7.5 monorepo with Angular 21 and AnalogJS Vite builder.

## Table of Contents

1. [Version Compatibility](#1-version-compatibility)
2. [Architecture Decision](#2-architecture-decision)
3. [Prerequisites](#3-prerequisites)
4. [Installation](#4-installation)
5. [Configuration](#5-configuration)
6. [SCSS Token Setup](#6-scss-token-setup)
7. [Writing Stories](#7-writing-stories)
8. [CVA Component Stories](#8-cva-component-stories)
9. [Deploy to GitHub Pages](#9-deploy-to-github-pages)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Version Compatibility

### Stack Requirements

| Package | Version | Notes |
|---------|---------|-------|
| Nx | 22.7.5 | `@nx/storybook` must match exactly |
| Angular | 21.2.9 | Standalone components, Signals API |
| Storybook | 10.4.3 | Latest stable |
| AnalogJS Storybook | 2.6.0 | Vite-based builder |
| TypeScript | ~5.9.2 | |
| Bun | latest | Package manager |

### Known Issue: Angular 21 + Storybook 10

Storybook 10.3 requires `@angular-devkit/build-angular@^21.2.9` but latest published is `21.2.7`. Add overrides to root `package.json`:

```json
"overrides": {
    "@angular-devkit/build-angular": "21.2.7",
    "@angular-devkit/core": "21.2.7"
}
```

Reported in [storybookjs/storybook#34590](https://github.com/storybookjs/storybook/discussions/34590).

### Addon Version Alignment

All `@storybook/*` packages must share the same major version as `storybook` core. If core is 10.4.3, addons must be `^10.4.3`. The Nx generator may install 8.x addons — install manually:

```bash
bun add -D @storybook/addon-essentials@^10.4.3
bun add -D @storybook/addon-interactions@^10.4.3
bun add -D @storybook/test@^10.4.3
```

---

## 2. Architecture Decision

### Why AnalogJS + Vite over Webpack

| Factor | Webpack (Nx default) | AnalogJS + Vite |
|--------|---------------------|-----------------|
| SCSS resolution | Requires `webpackFinal` with sass-loader | `stylePreprocessorOptions.loadPaths` in project.json |
| Build speed | Slower | Faster (Vite) |
| Stack alignment | Not used elsewhere | Already uses `@analogjs/vite-plugin-angular@2.2.0` |
| Module resolution | Complex | Native Vite + `viteFinal` for aliases |

**Decision**: Use `@analogjs/storybook-angular@2.6.0` with Vite.

### Strategy: Single Storybook Instance

One Storybook instance on `libs/ui`. All 6 Phase 1 components live in `libs/ui/src/lib/`. No need for composition or multiple instances.

### File Structure

```
libs/ui/
├── .storybook/
│   ├── _index.scss              # Symlink to tokens/src/lib/_index.scss
│   ├── main.ts                  # Storybook configuration
│   ├── preview.ts               # Global decorators + providers
│   ├── styles.scss              # Global styles (loads CSS custom properties)
│   └── tsconfig.json            # TypeScript config for stories
├── src/lib/
│   ├── button/
│   │   ├── cup-button.ts
│   │   └── cup-button.stories.ts
│   ├── toggle/
│   │   ├── cup-toggle.ts
│   │   └── cup-toggle.stories.ts
│   ├── text-field/
│   │   ├── cup-text-field.ts
│   │   └── cup-text-field.stories.ts
│   ├── slider/
│   │   ├── cup-slider.ts
│   │   └── cup-slider.stories.ts
│   ├── stepper/
│   │   ├── cup-stepper.ts
│   │   └── cup-stepper.stories.ts
│   └── progress/
│       ├── cup-progress.ts
│       └── cup-progress.stories.ts
└── project.json
```

---

## 3. Prerequisites

Before installing Storybook, ensure:

1. All 6 components exist in `libs/ui/src/lib/`
2. `@analogjs/vite-plugin-angular@2.2.0` is installed
3. `libs/tokens/src/lib/` contains all SCSS partials
4. Root `package.json` has the Angular devkit overrides

---

## 4. Installation

### Step 1: Add Overrides

In root `package.json`:
```json
"overrides": {
    "@angular-devkit/build-angular": "21.2.7",
    "@angular-devkit/core": "21.2.7"
}
```

Run `bun install` after adding.

### Step 2: Install Nx Storybook Plugin

```bash
bun nx add @nx/storybook
```

Installs `@nx/storybook@22.7.5` (aligned with Nx version).

### Step 3: Install AnalogJS Storybook Builder

```bash
bun add -D @analogjs/storybook-angular
```

### Step 4: Generate Storybook Configuration

```bash
bun nx g @nx/angular:storybook-configuration ui --interactionTests=true
```

This creates:
- `libs/ui/.storybook/main.ts`
- `libs/ui/.storybook/preview.ts`
- `libs/ui/.storybook/tsconfig.json`
- Storybook targets in `libs/ui/project.json`
- Auto-generated `*.stories.ts` files

### Step 5: Install Addons (Correct Version)

```bash
bun add -D @storybook/addon-essentials@^10.4.3
bun add -D @storybook/addon-interactions@^10.4.3
bun add -D @storybook/test@^10.4.3
```

### Step 6: Generate Stories for All Components

If stories weren't auto-generated:
```bash
bun nx g @nx/angular:stories --project=ui
```

### Step 7: Switch Builder to AnalogJS

Update `libs/ui/project.json` storybook targets:

```json
"storybook": {
    "executor": "@analogjs/storybook-angular:start-storybook",
    "options": {
        "port": 4400,
        "configDir": "libs/ui/.storybook",
        "compodoc": false,
        "stylePreprocessorOptions": {
            "loadPaths": ["libs/tokens/src/lib"]
        }
    },
    "configurations": {
        "ci": { "quiet": true }
    }
},
"build-storybook": {
    "executor": "@analogjs/storybook-angular:build-storybook",
    "outputs": ["{options.outputDir}"],
    "options": {
        "outputDir": "dist/storybook/ui",
        "configDir": "libs/ui/.storybook",
        "compodoc": false,
        "stylePreprocessorOptions": {
            "loadPaths": ["libs/tokens/src/lib"]
        }
    },
    "configurations": {
        "ci": { "quiet": true }
    }
}
```

> **Important**: Do NOT add `"styles"` array. AnalogJS injects the path as an absolute import that Vite cannot resolve. Import styles directly in `preview.ts` instead.

---

## 5. Configuration

### main.ts

```typescript
// libs/ui/.storybook/main.ts
import path from "node:path";
import { StorybookConfig } from "@analogjs/storybook-angular";

const config: StorybookConfig = {
    stories: ["../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
    framework: {
        name: "@analogjs/storybook-angular",
        options: {},
    },
    features: {},
    viteFinal: async (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            "@ngx-cupertino/icons": path.resolve("libs/icons/src/index.ts"),
            "@ngx-cupertino/core": path.resolve("libs/core/src/index.ts"),
            "@ngx-cupertino/tokens": path.resolve("libs/tokens/src/index.ts"),
        };
        return config;
    },
};

export default config;
```

**Key points**:
- `framework.name`: `@analogjs/storybook-angular` (not `@storybook/angular`)
- `viteFinal`: Configures Vite aliases for `@ngx-cupertino/*` packages
- Stories glob: `../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)`
- No `addons` array — Storybook 10 auto-includes essentials

### preview.ts

```typescript
// libs/ui/.storybook/preview.ts
/// <reference types="vite/client" />
import "./styles.scss";
import { provideCupertino } from "@ngx-cupertino/core";
import type { Preview } from "@storybook/angular";
import { applicationConfig, componentWrapperDecorator } from "@storybook/angular";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [
        applicationConfig({
            providers: [
                provideCupertino({ theme: "auto", tintColor: "blue" }),
            ],
        }),
        componentWrapperDecorator(
            (story) =>
                `<div data-mode="light" data-tint="blue" style="padding: 24px;">${story}</div>`,
        ),
    ],
    tags: ["autodocs"],
};

export default preview;
```

**Key points**:
- `/// <reference types="vite/client" />` — tells TypeScript that `.scss` imports are valid (Vite handles them natively). Cleaner than `typings.d.ts`.
- `import "./styles.scss"` — loads CSS custom properties globally
- `applicationConfig` — provides `provideCupertino()` as Angular provider
- `componentWrapperDecorator` — wraps every story in `data-mode="light"` and `data-tint="blue"` div
- Per [Storybook Angular docs](https://storybook.js.org/docs/angular), `applicationConfig` is the correct way to provide application-wide services for standalone components

---

## 6. SCSS Token Setup

### Why This Approach

Components use `@use 'index' as t; t.token('label')` pattern. The token `_index.scss` at `libs/tokens/src/lib/` uses `@forward` which exposes functions/mixins but doesn't generate CSS output.

For Storybook, we need the actual `:root { --cup-*: ... }` CSS custom properties. The playground app achieves this via `@use 'index' as t` in its `styles.scss`.

### styles.scss

```scss
// libs/ui/.storybook/styles.scss
@use '../../../libs/tokens/src/lib/index' as t;

*,
*::before,
*::after {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 0;
    font-family: t.token('font-sans');
    color: t.token('label');
    background: t.token('bg');
    -webkit-font-smoothing: antialiased;
}
```

**Why `@use`**: Unlike `@forward`, `@use` actually loads the SCSS partials and generates their CSS output (including `:root` blocks with `--cup-*` variables).

### stylePreprocessorOptions

In `project.json`, `loadPaths` allows component SCSS files to resolve `@use 'index' as t`:

```json
"stylePreprocessorOptions": {
    "loadPaths": ["libs/tokens/src/lib"]
}
```

This maps `@use 'index'` → `libs/tokens/src/lib/_index.scss`.

---

## 7. Writing Stories

### CSF3 Format

Storybook 10 uses Component Story Format 3. Each story file exports a `Meta` object and one or more `StoryObj`.

### Button Story Example

```typescript
// libs/ui/src/lib/button/cup-button.stories.ts
import type { Meta, StoryObj } from "@storybook/angular";
import { CupButton } from "./cup-button";

const meta: Meta<CupButton> = {
    component: CupButton,
    title: "Components/Button",
    argTypes: {
        variant: {
            control: "select",
            options: ["filled", "tinted", "gray", "plain", "liquid-glass"],
        },
        size: { control: "select", options: ["sm", "md", "lg"] },
        disabled: { control: "boolean" },
        destructive: { control: "boolean" },
        loading: { control: "boolean" },
    },
    args: {
        variant: "filled",
        size: "md",
        disabled: false,
        destructive: false,
        loading: false,
    },
};
export default meta;

type Story = StoryObj<CupButton>;

export const Filled: Story = {
    render: (args) => ({
        props: args,
        template: `<button cup-button [variant]="variant" [size]="size">
            Click me
        </button>`,
    }),
};

export const Tinted: Story = {
    args: { variant: "tinted" },
    render: (args) => ({
        props: args,
        template: `<button cup-button [variant]="variant">Tinted</button>`,
    }),
};
```

**Pattern for all stories**:
1. Import component and Storybook types
2. Define `meta` with `component`, `title`, `argTypes`, and default `args`
3. Export default `meta`
4. Define `type Story = StoryObj<Component>`
5. Each story: `export const Name: Story = { render: (args) => ({ props: args, template: `...` }) }`

### Recommended Stories Per Component

| Component | Stories |
|-----------|---------|
| CupButton | Filled, Tinted, Gray, Plain, LiquidGlass, Destructive, Disabled, Loading, Small, Large |
| CupToggle | Default, Checked, Small, Large, LabelStart, Disabled |
| CupTextField | Default, WithLabel, WithError, WithHelper, Password, Disabled |
| CupSlider | Default, WithLabel, WithTicks, WithIcons, Disabled |
| CupStepper | Default, WithLabel, Disabled, Wrap |
| CupProgress | Linear, LinearIndeterminate, Circular, Spinner |

---

## 8. CVA Component Stories

### Problem

Components extending `CupFormControl` (Toggle, TextField, Slider, Stepper) inherit `disabled` via ControlValueAccessor (`setDisabledState`). This is NOT an Angular `input()`, so `[disabled]="disabled"` in Storybook templates fails with:

```
NG0303: Can't bind to 'disabled' since it isn't a known property
```

### Solution

For non-disabled stories, simply don't bind `[disabled]`:

```typescript
export const Default: Story = {
    args: { value: 50, min: 0, max: 100 },
    render: (args) => ({
        props: args,
        template: `<cup-slider [value]="value" [min]="min" [max]="max"></cup-slider>`,
    }),
};
```

For Disabled stories, use `moduleMetadata` with `ReactiveFormsModule` and a disabled `FormControl`:

```typescript
import { FormControl, ReactiveFormsModule } from "@angular/forms";

export const Disabled: Story = {
    render: () => ({
        moduleMetadata: { imports: [ReactiveFormsModule] },
        template: `<cup-slider [formControl]="ctrl" label="Brightness"></cup-slider>`,
        props: {
            ctrl: new FormControl({ value: 60, disabled: true }),
        },
    }),
};
```

---

## 9. Deploy to GitHub Pages

### Workflow

```yaml
# .github/workflows/storybook.yml
name: Storybook

on:
    push:
        branches: [main]

permissions:
    contents: read
    pages: write
    id-token: write

jobs:
    deploy:
        environment:
            name: github-pages
            url: ${{ steps.deployment.outputs.page_url }}
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: oven-sh/setup-bun@v2
              with:
                  bun-version: latest
            - run: bun install --frozen-lockfile
            - run: bun nx build-storybook ui
            - uses: actions/upload-pages-artifact@v3
              with:
                  path: dist/storybook/ui
            - id: deployment
              uses: actions/deploy-pages@v4
```

### GitHub Configuration
- Settings → Pages → Source: **GitHub Actions**
- URL: `https://gacc94.github.io/ngx-cupertino/`

---

## 10. Troubleshooting

### Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `Can't find stylesheet to import` | sass-loader can't resolve `@use 'index'` | Use AnalogJS builder + `loadPaths` in project.json |
| `NG0303: Can't bind to 'disabled'` | `disabled` is CVA, not `input()` | Remove `[disabled]` binding; use FormControl for Disabled stories |
| `No Preview` | Decorator template not rendering | Use `componentWrapperDecorator` instead of raw `template` |
| `Could not resolve addon` | Version mismatch (8.x vs 10.x) | Install addons matching storybook core version |
| Styles not loading | `@forward` doesn't generate CSS | Use `@use` in `styles.scss` + import in `preview.ts` |
| `Module loop` in SCSS | `_index.scss` self-references | Remove `@use 'index'` from tokens `_index.scss` |
| `Failed to resolve @ngx-cupertino/icons` | Vite doesn't know path aliases | Add `viteFinal` with `resolve.alias` in main.ts |

### Normal Console Warnings

| Warning | Cause | Impact |
|---------|-------|---------|
| `ariaLabel on PopoverProvider` | Storybook internal, required in v11 | None |
| `vite-inject-mocker-entry.js 404` | Mock plugin not installed | None |
| `Angular is running in development mode` | Normal in dev | None |
| `Unable to resolve icon` | Icon not in SF_SYMBOL_MAP | Use SF names as map keys, not Lucide names |

---

## Quick Reference

```bash
# Install
bun nx add @nx/storybook
bun add -D @analogjs/storybook-angular
bun nx g @nx/angular:storybook-configuration ui --interactionTests=true

# Run
bun nx storybook ui          # Dev server on port 4400
bun nx build-storybook ui    # Static build
bun nx test-storybook ui     # Interaction tests

# Deploy (automatic via GitHub Actions)
git push origin main
```

## References

- [AnalogJS Storybook Docs](https://analogjs.org/docs/integrations/storybook) — official guide
- [Storybook Angular Docs](https://storybook.js.org/docs/angular)
- [Nx Storybook for Angular](https://nx.dev/docs/technologies/test-tools/storybook/guides/overview-angular)

### Cross-Reference with Official AnalogJS Docs

| Topic | Official AnalogJS | Our Implementation | Notes |
|-------|-------------------|-------------------|-------|
| Builder | `@analogjs/storybook-angular:start-storybook` | Same | Uses Nx `executor` convention |
| `styles` in project.json | Shows `"styles"` array | We DON'T use `"styles"` | AnalogJS injects as absolute import that Vite fails to resolve. Import via `preview.ts` instead |
| `stylePreprocessorOptions` | `loadPaths` array | Same | Works correctly |
| Path aliases for Nx | `nxViteTsPaths()` from `@nx/vite` | `resolve.alias` in `viteFinal` | Both work. `nxViteTsPaths()` is the official recommendation for Nx. Our manual aliases are simpler but don't auto-sync with tsconfig changes |
| `staticDirs` | Supported | Not used yet | Add for serving assets like favicon |
| `experimentalZoneless` | Supported | Not used | Angular 21 default, can add for performance |
| Vitest interaction testing | `@storybook/addon-vitest` + `vitest.config.ts` | Not configured yet | Can be added later |
