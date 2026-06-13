# Apple Chromatic Palette Parity Table

Source of truth for task 4.1. Each chromatic family is a **four-state unit**: any future
correction MUST update all four columns together. Hex values are written in full canonical
form for auditability; where the project stores an equivalent short hex (per the
`color-hex-length` stylelint rule) it is noted in parentheses.

State → file ownership:

| State | File | Selector |
| --- | --- | --- |
| Default light | `libs/tokens/src/lib/_colors.scss` | `:root` |
| Default dark | `libs/tokens/src/lib/_dark.scss` | `[data-mode="dark"]` |
| Increased-contrast light | `libs/tokens/src/lib/_a11y.scss` | `@media (prefers-contrast: more) :root` |
| Increased-contrast dark | `libs/tokens/src/lib/_a11y.scss` | `@media (prefers-contrast: more) [data-mode="dark"]` |

## 12 chromatic system colors

| Token | Light | Dark | Contrast light | Contrast dark |
| --- | --- | --- | --- | --- |
| `--cup-red` | `#FF383C` | `#FF4245` | `#E9152D` | `#FF6165` |
| `--cup-orange` | `#FF8D28` | `#FF9230` | `#C55300` | `#FFA056` |
| `--cup-yellow` | `#FFCC00` (`#FC0`) | `#FFD600` | `#A16A00` | `#FEDF43` |
| `--cup-green` | `#34C759` | `#30D158` | `#008932` | `#4AD968` |
| `--cup-mint` | `#00C8B3` | `#00DAC3` | `#008575` | `#54DFCB` |
| `--cup-teal` | `#00C3D0` | `#00D2E0` | `#008198` | `#3BDDEC` |
| `--cup-cyan` | `#00C0E8` | `#3CD3FE` | `#007EAE` | `#6DD9FF` |
| `--cup-blue` | `#0088FF` (`#08F`) | `#0091FF` | `#1E6EF4` | `#5CB8FF` |
| `--cup-indigo` | `#6155F5` | `#6D7CFF` | `#564ADE` | `#A7AAFF` |
| `--cup-purple` | `#CB30E0` | `#DB34F2` | `#B02FC2` | `#EA8DFF` |
| `--cup-pink` | `#FF2D55` | `#FF375F` | `#E7124D` | `#FF8AC4` |
| `--cup-brown` | `#AC7F5E` | `#B78A66` | `#956D51` | `#DBA679` |

## Frozen gray ramp (must NOT change in this slice)

| Token | Light | Dark | Contrast light | Contrast dark |
| --- | --- | --- | --- | --- |
| `--cup-gray` | `#8E8E93` | `#8E8E93` | `#6C6C70` | `#AEAEB2` |
| `--cup-gray-2` | `#AEAEB2` | `#636366` | `#8E8E93` | `#7C7C80` |
| `--cup-gray-3` | `#C7C7CC` | `#48484A` | `#B5B5BA` | `#545456` |
| `--cup-gray-4` | `#D1D1D6` | `#3A3A3C` | `#BCBCC0` | `#444446` |
| `--cup-gray-5` | `#E5E5EA` | `#2C2C2E` | `#D8D8DC` | `#363638` |
| `--cup-gray-6` | `#F2F2F7` | `#1C1C1E` | `#EBEBF0` | `#242426` |

## Verification log (2026-06-13)

- All 12 chromatic families defined across the four states: light (12) + dark (12) +
  increased-contrast light/dark (24) — confirmed by token count per file.
- Gray ramp unchanged vs. baseline — confirmed via `git diff` (no gray lines touched).
- Semantic tokens (`--cup-link`, fills, separators) left untouched, matching the slice
  Non-Goals.
- `bun nx build tokens`, `bun nx build core`, `bun nx build ui` succeed.
- `bun nx stylelint tokens` passes after normalizing `--cup-blue` to short hex `#08F`.
