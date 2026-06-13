type CupHex = `#${string}`;

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

export const CupTints = {
    BLUE: { light: "#007AFF", dark: "#0A84FF" },
    GREEN: { light: "#34C759", dark: "#30D158" },
    INDIGO: { light: "#5856D6", dark: "#5E5CE6" },
    ORANGE: { light: "#FF9500", dark: "#FF9F0A" },
    PINK: { light: "#FF2D55", dark: "#FF375F" },
    PURPLE: { light: "#AF52DE", dark: "#BF5AF2" },
    RED: { light: "#FF3B30", dark: "#FF453A" },
    TEAL: { light: "#30B0C7", dark: "#40C8E0" },
    YELLOW: { light: "#FFCC00", dark: "#FFD60A" },
    GRAY: { light: "#8E8E93", dark: "#8E8E93" },
    MINT: { light: "#00C7BE", dark: "#63E6E2" },
    CYAN: { light: "#32ADE6", dark: "#64D2FF" },
    BROWN: { light: "#A2845E", dark: "#AC8E68" },
} as const satisfies Record<string, CupTintPalette>;

type CupTintKey = keyof typeof CupTints;

const CUP_TINT_KEY_BY_NAME = {
    blue: "BLUE",
    green: "GREEN",
    indigo: "INDIGO",
    orange: "ORANGE",
    pink: "PINK",
    purple: "PURPLE",
    red: "RED",
    teal: "TEAL",
    yellow: "YELLOW",
    gray: "GRAY",
    mint: "MINT",
    cyan: "CYAN",
    brown: "BROWN",
} as const satisfies Record<Lowercase<CupTintKey>, CupTintKey>;

export type CupTintName = keyof typeof CUP_TINT_KEY_BY_NAME;
export type CupTintValue = CupTintPalette;

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
    return value in CUP_TINT_KEY_BY_NAME;
}

export function getCupTintPalette(name: CupTintName): CupTintPalette {
    return CupTints[CUP_TINT_KEY_BY_NAME[name]];
}
