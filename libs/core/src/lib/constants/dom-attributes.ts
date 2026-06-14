import type {
    CupLiquidGlassPreferredLook,
    CupLiquidGlassVariant,
    CupSurfaceStyle,
} from "../types/cupertino-config.types";

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

/**
 * Writes a design-system dataset value to the provided root element.
 *
 * @param root The document root element that owns global visual state.
 * @param key The dataset key to write.
 * @param value The value to assign.
 */
export function setCupDataset(root: HTMLElement, key: keyof typeof CUP_DATASET_KEYS, value: string): void {
    root.dataset[CUP_DATASET_KEYS[key]] = value;
}

/**
 * Removes a design-system dataset value from the provided root element.
 *
 * @param root The document root element that owns global visual state.
 * @param key The dataset key to remove.
 */
export function removeCupDataset(root: HTMLElement, key: keyof typeof CUP_DATASET_KEYS): void {
    delete root.dataset[CUP_DATASET_KEYS[key]];
}

/**
 * Applies the current liquid glass dataset pair to the document root.
 *
 * @param root The document root element.
 * @param variant The active Liquid Glass material variant.
 * @param preferredLook The active preferred visual look.
 */
export function applyCupLiquidGlassDatasets(
    root: HTMLElement,
    variant: CupLiquidGlassVariant,
    preferredLook: CupLiquidGlassPreferredLook,
): void {
    setCupDataset(root, "liquidGlassVariant", variant);
    setCupDataset(root, "liquidGlassLook", preferredLook);
}

/**
 * Clears Liquid Glass-specific dataset attributes from the document root.
 *
 * @param root The document root element.
 */
export function clearCupLiquidGlassDatasets(root: HTMLElement): void {
    removeCupDataset(root, "liquidGlassVariant");
    removeCupDataset(root, "liquidGlassLook");
}

/**
 * Applies the global surface style and ensures dependent glass attributes are consistent.
 *
 * @param root The document root element.
 * @param style The new surface style.
 * @param variant The current Liquid Glass material variant.
 * @param preferredLook The current Liquid Glass preferred visual look.
 */
export function applyCupSurfaceDatasets(
    root: HTMLElement,
    style: CupSurfaceStyle,
    variant: CupLiquidGlassVariant,
    preferredLook: CupLiquidGlassPreferredLook,
): void {
    setCupDataset(root, "surfaceStyle", style);

    if (style === "liquid-glass") {
        applyCupLiquidGlassDatasets(root, variant, preferredLook);
        return;
    }

    clearCupLiquidGlassDatasets(root);
}
