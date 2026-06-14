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
    BLUE: { light: "#0088FF", dark: "#0091FF", lightHighContrast: "#1E6EF4", darkHighContrast: "#5CB8FF" },
    RED: { light: "#FF383C", dark: "#FF4245", lightHighContrast: "#E9152D", darkHighContrast: "#FF6165" },
    ORANGE: { light: "#FF8D28", dark: "#FF9230", lightHighContrast: "#C55300", darkHighContrast: "#FFA056" },
    YELLOW: { light: "#FFCC00", dark: "#FFD600", lightHighContrast: "#A16A00", darkHighContrast: "#FEDF43" },
    GREEN: { light: "#34C759", dark: "#30D158", lightHighContrast: "#008932", darkHighContrast: "#4AD968" },
    MINT: { light: "#00C8B3", dark: "#00DAC3", lightHighContrast: "#008575", darkHighContrast: "#54DFCB" },
    TEAL: { light: "#00C3D0", dark: "#00D2E0", lightHighContrast: "#008198", darkHighContrast: "#3BDDEC" },
    CYAN: { light: "#00C0E8", dark: "#3CD3FE", lightHighContrast: "#007EAE", darkHighContrast: "#6DD9FF" },
    INDIGO: { light: "#6155F5", dark: "#6D7CFF", lightHighContrast: "#564ADE", darkHighContrast: "#A7AAFF" },
    PURPLE: { light: "#CB30E0", dark: "#DB34F2", lightHighContrast: "#B02FC2", darkHighContrast: "#EA8DFF" },
    PINK: { light: "#FF2D55", dark: "#FF375F", lightHighContrast: "#E7124D", darkHighContrast: "#FF8AC4" },
    BROWN: { light: "#AC7F5E", dark: "#B78A66", lightHighContrast: "#956D51", darkHighContrast: "#DBA679" },
    GRAY: { light: "#8E8E93", dark: "#8E8E93", lightHighContrast: "#6C6C70", darkHighContrast: "#AEAEB2" },
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
