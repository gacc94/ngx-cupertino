# @ngx-cupertino/tokens — Architecture

Design token system implementing the Apple Design System (iOS 26, iPadOS 26, macOS Tahoe 26) for web.

## File Tree

```
libs/tokens/src/lib/
├── _index.scss                 ← Entry point (cascade order)
│
├── ─── PRIMITIVES (7 files) ──────────────
├── _colors.scss                 18 tokens ← 12 accents + 6 grays
├── _typography.scss             27 tokens ← Fonts, type scale, weights
├── _spacing.scss                21 tokens ← 4px grid + semantic gaps
├── _sizing.scss                 27 tokens ← Targets, heights, dimensions
├── _radius.scss                 26 tokens ← Radius scale + semantic
├── _borders.scss                11 tokens ← Widths, colors, styles
├── _opacity.scss                 9 tokens ← States + overlays
│
├── ─── SEMANTIC (7 files) ────────────────
├── _scheme.scss                 28 tokens ← Labels, fills, bgs, separators
├── _tints.scss                4×13 preset ← Active accent [data-tint]
├── _elevation.scss               5 tokens ← Box shadows
├── _glass.scss                  17 tokens ← Liquid Glass (regular+clear)
├── _materials.scss              12 tokens ← System blur materials
├── _motion.scss                 10 tokens ← Durations + easing
├── _z-index.scss                 8 tokens ← Stacking order
│
├── ─── OVERRIDES (3 files) ───────────────
├── _dark.scss                  ~72 ovr    ← [data-mode="dark"]
├── _platform.scss             ~147 ovr    ← macOS (hover+pointer)
├── _a11y.scss                 ~115 ovr    ← HC, motion, transparency
│
├── ─── LAYOUT (3 files) ─────────────────
├── _breakpoints.scss          3 vars+6 mix ← Responsive queries
├── _grid.scss                  6 tokens   ← Columns, gutters, max-widths
├── _safe-areas.scss             7 tokens   ← Device insets
│
├── ─── UTILITIES (3 files) ──────────────
├── _api.scss                  ~236 map    ← Token validator + token()
├── _mixins.scss                21 mixins  ← Reusable patterns
└── _functions.scss              3 funcs   ← cup-rem, cup-space, cup-z
```

## 5-Layer Architecture

| Layer             | Files | Tokens          | What It Does                                          |
| ----------------- | ----- | --------------- | ----------------------------------------------------- |
| **1. Primitives** | 7     | ~139            | Raw values. "Here is red. Here is 16px."              |
| **2. Semantic**   | 7     | ~84 + tints     | Contextual meaning. "This is a label. This is glass." |
| **3. Overrides**  | 3     | 0 new, ~334 ovr | Dark mode, macOS, accessibility overrides             |
| **4. Layout**     | 3     | ~13 + 6 mix     | Responsive structure, grid, safe areas                |
| **5. Utilities**  | 3     | 0 tokens        | API: token(), mixins, functions — zero CSS output     |

## Cascade Order

The order in `lib/_index.scss` determines CSS specificity. Later files override earlier files.

```mermaid
graph TD
    ROOT[":root (iOS Light)"] --> DARK["[data-mode=dark]"]
    ROOT --> TINT["[data-tint=name]"]
    TINT --> TINT_DARK["[data-mode=dark][data-tint=name]"]
    ROOT --> PLATFORM["@media (hover+pointer) macOS Light"]
    PLATFORM --> PLATFORM_DARK["macOS Dark"]
    ROOT --> HC["@media (prefers-contrast) HC Light"]
    HC --> HC_DARK["HC Dark"]
    PLATFORM --> PLATFORM_HC["macOS HC Light"]
    PLATFORM_HC --> PLATFORM_HC_DARK["macOS HC Dark"]
    ROOT --> MOTION["@media (reduced-motion)"]
    ROOT --> TRANSPARENCY["@media (reduced-transparency)"]
```

## File Dependencies

```mermaid
graph LR
    FUNC[_functions.scss] --> API[_api.scss]
    API --> MIXINS[_mixins.scss]
    COLORS[_colors.scss] --> SCHEME[_scheme.scss]
    COLORS --> TINTS[_tints.scss]
    SCHEME --> DARK[_dark.scss]
    COLORS --> DARK
    ELEVATION --> DARK
    GLASS --> DARK
    MATERIALS --> DARK
    COLORS --> PLATFORM[_platform.scss]
    SCHEME --> PLATFORM
    SPACING --> PLATFORM
    SIZING --> PLATFORM
    RADIUS --> PLATFORM
    TYPOGRAPHY --> PLATFORM
    SCHEME --> A11Y[_a11y.scss]
    COLORS --> A11Y
    GLASS --> A11Y
    MATERIALS --> A11Y
    MOTION --> A11Y
    BREAKPOINTS[_breakpoints.scss] --> GRID[_grid.scss]
```

## How Components Consume Tokens (3-Layer SCSS Pattern)

```scss
@use "@ngx-cupertino/tokens" as t;

// Layer 1 — token() for single values
:host {
    min-height: t.token("control-height");
    padding: t.token("padding-button");
    border-radius: t.token("radius-button");
    font-size: t.token("text-body");
}

// Layer 2 — mixins for multi-property patterns
:host {
    @include t.cup-interactive;
    @include t.cup-focus-ring;
}
:host(.filled) {
    background: t.token("tint");
    color: t.token("tint-on");
}
:host(.cup-disabled) {
    @include t.cup-disabled;
}
```

Components NEVER write raw `var(--cup-*)`. They always use `t.token('name')` for compile-time validation.

## Maintenance Rules

| Action                        | Update Required                                                             |
| ----------------------------- | --------------------------------------------------------------------------- |
| Add new `--cup-*` token       | Add entry to `$tokens` map in `_api.scss`                                   |
| Rename a token                | Update key in `$tokens` map. Old references fail to compile.                |
| Remove a token                | Remove from `$tokens` map. Components still referencing it fail to compile. |
| Change a token's VALUE        | No `_api.scss` change needed (map stores var() references)                  |
| Add dark/platform/HC override | No `_api.scss` change needed                                                |
| Add macOS-exclusive token     | Add entry to `$tokens` map                                                  |

## Platforms & Variants

- **Platforms**: iOS, iPadOS, macOS
- **Appearance variants**: Light, Dark, Light HC, Dark HC
- **Accessibility**: Increase Contrast, Reduce Motion, Reduce Transparency

## Semantic Typing & Color Space

- `@ngx-cupertino/core` owns the public `CupSemanticTokenName` union for semantic UI roles
- that union covers foreground, support, background, and separator families only
- palette, accent, material, and platform tokens stay out of the semantic union to avoid mixing raw values with role-based tokens
- token values default to sRGB; any Display P3 addition must be intentional, documented, and reviewed with extra visual QA

## Chromatic Palette Parity (Apple system colors)

The 12 chromatic accent families match Apple's four-state system color specification. Each
family is a **four-state unit**: any correction MUST update all four columns together. Hex is
shown in full canonical form; the parenthesised value is the short form the repo stores under
the `color-hex-length` stylelint rule.

State → file ownership:

| State                     | File            | Selector                                       |
| ------------------------- | --------------- | ---------------------------------------------- |
| Default light             | `_colors.scss`  | `:root`                                         |
| Default dark              | `_dark.scss`    | `[data-mode="dark"]`                            |
| Increased-contrast light  | `_a11y.scss`    | `@media (prefers-contrast: more) :root`         |
| Increased-contrast dark   | `_a11y.scss`    | `@media (prefers-contrast: more) [data-mode="dark"]` |

### 12 chromatic system colors

| Token           | Light               | Dark        | Contrast light | Contrast dark |
| --------------- | ------------------- | ----------- | -------------- | ------------- |
| `--cup-red`     | `#FF383C`           | `#FF4245`   | `#E9152D`      | `#FF6165`     |
| `--cup-orange`  | `#FF8D28`           | `#FF9230`   | `#C55300`      | `#FFA056`     |
| `--cup-yellow`  | `#FFCC00` (`#FC0`)  | `#FFD600`   | `#A16A00`      | `#FEDF43`     |
| `--cup-green`   | `#34C759`           | `#30D158`   | `#008932`      | `#4AD968`     |
| `--cup-mint`    | `#00C8B3`           | `#00DAC3`   | `#008575`      | `#54DFCB`     |
| `--cup-teal`    | `#00C3D0`           | `#00D2E0`   | `#008198`      | `#3BDDEC`     |
| `--cup-cyan`    | `#00C0E8`           | `#3CD3FE`   | `#007EAE`      | `#6DD9FF`     |
| `--cup-blue`    | `#0088FF` (`#08F`)  | `#0091FF`   | `#1E6EF4`      | `#5CB8FF`     |
| `--cup-indigo`  | `#6155F5`           | `#6D7CFF`   | `#564ADE`      | `#A7AAFF`     |
| `--cup-purple`  | `#CB30E0`           | `#DB34F2`   | `#B02FC2`      | `#EA8DFF`     |
| `--cup-pink`    | `#FF2D55`           | `#FF375F`   | `#E7124D`      | `#FF8AC4`     |
| `--cup-brown`   | `#AC7F5E`           | `#B78A66`   | `#956D51`      | `#DBA679`     |

### Frozen gray ramp (must NOT change while refining chromatic values)

| Token          | Light       | Dark        | Contrast light | Contrast dark |
| -------------- | ----------- | ----------- | -------------- | ------------- |
| `--cup-gray`   | `#8E8E93`   | `#8E8E93`   | `#6C6C70`      | `#AEAEB2`     |
| `--cup-gray-2` | `#AEAEB2`   | `#636366`   | `#8E8E93`      | `#7C7C80`     |
| `--cup-gray-3` | `#C7C7CC`   | `#48484A`   | `#B5B5BA`      | `#545456`     |
| `--cup-gray-4` | `#D1D1D6`   | `#3A3A3C`   | `#BCBCC0`      | `#444446`     |
| `--cup-gray-5` | `#E5E5EA`   | `#2C2C2E`   | `#D8D8DC`      | `#363638`     |
| `--cup-gray-6` | `#F2F2F7`   | `#1C1C1E`   | `#EBEBF0`      | `#242426`     |

> Semantic tokens that reference an accent (e.g. `--cup-link`) live in the Semantic layer and
> are intentionally out of scope for palette parity passes — refine them in their own slice.
