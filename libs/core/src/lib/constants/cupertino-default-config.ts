import type { CupConfig } from "../types/cupertino-config.types";

/**
 * Explicit design system defaults used by `core` when consumers omit optional configuration.
 */
export const DEFAULT_CUP_CONFIG = {
    theme: "auto",
    tintColor: "blue",
    direction: "ltr",
    materials: {
        surfaceStyle: "base",
        liquidGlass: {
            variant: "regular",
            preferredLook: "system",
        },
    },
} as const satisfies Pick<CupConfig, "theme" | "tintColor" | "direction" | "materials">;
