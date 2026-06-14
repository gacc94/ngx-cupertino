import { CUP_DATASET_KEYS } from "../constants/dom-attributes";
import type {
    CupLiquidGlassPreferredLook,
    CupLiquidGlassVariant,
    CupSurfaceStyle,
} from "../types/cupertino-config.types";

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
