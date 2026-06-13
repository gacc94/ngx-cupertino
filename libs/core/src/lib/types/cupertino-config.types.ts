import type { CupTintInput } from "../constants/colors";
import type { CupComponentSize } from "../constants/sizes";
import type { CupButtonVariant } from "../constants/variants";

/**
 * Available color mode strategies for the design system.
 *
 * `auto` resolves to the current system preference and is projected to a
 * concrete `light` or `dark` value on the root dataset.
 */
export type CupThemeMode = "light" | "dark" | "auto";

/**
 * High-level material mode for the design system surface layer.
 *
 * `base` keeps controls on the standard project appearance.
 * `liquid-glass` enables Liquid Glass-aware controls and interactions.
 */
export type CupSurfaceStyle = "base" | "liquid-glass";

/**
 * Official Liquid Glass material variants described by Apple.
 */
export type CupLiquidGlassVariant = "regular" | "clear";

/**
 * Preferred Liquid Glass visual look applied on top of the material variant.
 *
 * `system` lets the environment decide the final appearance.
 */
export type CupLiquidGlassPreferredLook = "system" | "clear" | "tinted";

/**
 * Shared default button values resolved by components that opt into config-based defaults.
 */
export interface CupButtonDefaults {
    variant?: CupButtonVariant;
    size?: CupComponentSize;
}

/**
 * Accessibility-oriented global overrides for the design system.
 */
export interface CupA11yConfig {
    reducedMotion?: "auto" | "always" | "never";
    focusRing?: boolean;
    minTouchTarget?: number;
}

/**
 * Material-related configuration for the design system.
 */
export interface CupMaterialsConfig {
    surfaceStyle?: CupSurfaceStyle;
    liquidGlass?: {
        variant?: CupLiquidGlassVariant;
        preferredLook?: CupLiquidGlassPreferredLook;
    };
}

/**
 * Global runtime configuration for `@ngx-cupertino/core`.
 *
 * This configuration is resolved by `provideCupertino()` and synchronized to the root DOM state.
 */
export interface CupConfig {
    theme?: CupThemeMode;
    tintColor?: CupTintInput;
    direction?: "ltr" | "rtl";
    materials?: CupMaterialsConfig;
    defaults?: {
        button?: CupButtonDefaults;
    };
    a11y?: CupA11yConfig;
}
