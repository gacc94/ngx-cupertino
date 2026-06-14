/**
 * Canonical CSS custom property references for the Liquid Glass material layer.
 *
 * Centralizing these strings prevents silent breakage when token names change
 * and enables IDE navigation to the single source of truth.
 */
export const CUP_GLASS_CSS_VARS = {
    // Regular variant
    blurMd: "var(--cup-glass-blur-md)",
    bgMd: "var(--cup-glass-bg-md)",
    borderMd: "var(--cup-glass-border-md)",
    shadowMd: "var(--cup-glass-shadow-md)",
    // Clear variant
    clearBlur: "var(--cup-glass-clear-blur)",
    clearBg: "var(--cup-glass-clear-bg)",
    clearBorder: "var(--cup-glass-clear-border)",
    // Prominent variant
    blurLg: "var(--cup-glass-blur-lg)",
    bgLg: "var(--cup-glass-bg-lg)",
    borderLg: "var(--cup-glass-border-lg)",
    shadowLg: "var(--cup-glass-shadow-lg)",
    // Shared
    inset: "var(--cup-glass-inset)",
} as const;

/**
 * Canonical dataset keys used to synchronize global design-system state to `<html>`.
 */
export const CUP_DATASET_KEYS = {
    mode: "mode",
    tint: "tint",
    surfaceStyle: "surfaceStyle",
    liquidGlassVariant: "liquidGlassVariant",
    liquidGlassLook: "liquidGlassLook",
} as const;

/**
 * Matching HTML attribute names for the exported dataset keys.
 */
export const CUP_DATA_ATTRIBUTES = {
    mode: "data-mode",
    tint: "data-tint",
    surfaceStyle: "data-surface-style",
    liquidGlassVariant: "data-liquid-glass-variant",
    liquidGlassLook: "data-liquid-glass-look",
} as const;
