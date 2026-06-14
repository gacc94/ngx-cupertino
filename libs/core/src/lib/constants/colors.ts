export type CupHex = `#${string}`;

/**
 * Adaptive custom tint palette for branded runtime tint configuration.
 *
 * Prefer this shape over a single hex string when consumers need tint values that
 * adapt to both appearance and increased-contrast contexts.
 */
export interface CupTintPalette {
    light: CupHex;
    dark: CupHex;
    lightHighContrast?: CupHex;
    darkHighContrast?: CupHex;
}

/**
 * Canonical set of named tint presets recognized by the design system.
 *
 * These names map to `data-tint="<name>"` on the document root; the actual color values
 * (light, dark, and increased-contrast variants) are owned exclusively by
 * `@ngx-cupertino/tokens` (`semantic/_tints.scss`). The token layer is the single source
 * of truth for tint colors, so values are intentionally not duplicated here.
 */
export const CUP_TINT_NAMES = [
    "blue",
    "green",
    "indigo",
    "orange",
    "pink",
    "purple",
    "red",
    "teal",
    "yellow",
    "gray",
    "mint",
    "cyan",
    "brown",
] as const;

export type CupTintName = (typeof CUP_TINT_NAMES)[number];
export type CupTintValue = CupTintPalette;

const CUP_TINT_NAME_SET = new Set<string>(CUP_TINT_NAMES);

/**
 * Public tint input accepted by `provideCupertino()` and `ThemeService`.
 *
 * Recommended usage:
 * - `CupTintName` for system-aligned named tint presets
 * - `CupTintPalette` for custom branded tints that must adapt to appearance and contrast
 *
 * A single `#hex` value is accepted as a compatibility fallback, but it is not fully
 * adaptive because it cannot express different light, dark, and high-contrast variants.
 */
export type CupTintInput = CupTintName | CupTintValue | CupHex;

export function isCupTintName(value: string): value is CupTintName {
    return CUP_TINT_NAME_SET.has(value);
}
