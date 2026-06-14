import { computed, Injectable, inject, signal } from "@angular/core";
import type { CupTintInput } from "../constants/colors";
import { CUP_CONFIG } from "../providers/cupertino.provider";
import { DEFAULT_CUP_CONFIG } from "../providers/cupertino-default-config";
import type {
    CupA11yConfig,
    CupButtonDefaults,
    CupConfig,
    CupLiquidGlassPreferredLook,
    CupLiquidGlassVariant,
    CupSurfaceStyle,
    CupThemeMode,
} from "../types/cupertino-config.types";

function mergeConfig(current: CupConfig, partial: Partial<CupConfig>): CupConfig {
    return {
        ...current,
        ...partial,
        materials: {
            ...current.materials,
            ...partial.materials,
            liquidGlass: {
                ...current.materials?.liquidGlass,
                ...partial.materials?.liquidGlass,
            },
        },
        defaults: {
            ...current.defaults,
            ...partial.defaults,
            button: {
                ...current.defaults?.button,
                ...partial.defaults?.button,
            },
        },
        a11y: {
            ...current.a11y,
            ...partial.a11y,
        },
    };
}

/**
 * Central signal-backed configuration store for `@ngx-cupertino/core`.
 *
 * This service owns the canonical merged runtime configuration used by all specialized
 * services and the provider initializer.
 */
@Injectable()
export class CupConfigService {
    readonly config = signal<CupConfig>(mergeConfig(DEFAULT_CUP_CONFIG, inject(CUP_CONFIG, { optional: true }) ?? {}));
    readonly theme = computed<CupThemeMode>(() => this.config().theme ?? DEFAULT_CUP_CONFIG.theme);
    readonly tintColor = computed<CupTintInput>(() => this.config().tintColor ?? DEFAULT_CUP_CONFIG.tintColor);
    readonly direction = computed<"ltr" | "rtl">(() => this.config().direction ?? DEFAULT_CUP_CONFIG.direction);
    readonly surfaceStyle = computed<CupSurfaceStyle>(
        () => this.config().materials?.surfaceStyle ?? DEFAULT_CUP_CONFIG.materials.surfaceStyle,
    );
    readonly liquidGlassVariant = computed<CupLiquidGlassVariant>(
        () => this.config().materials?.liquidGlass?.variant ?? DEFAULT_CUP_CONFIG.materials.liquidGlass.variant,
    );
    readonly liquidGlassPreferredLook = computed<CupLiquidGlassPreferredLook>(
        () =>
            this.config().materials?.liquidGlass?.preferredLook ??
            DEFAULT_CUP_CONFIG.materials.liquidGlass.preferredLook,
    );
    readonly buttonDefaults = computed<CupButtonDefaults>(() => this.config().defaults?.button ?? {});
    readonly a11y = computed<CupA11yConfig>(() => this.config().a11y ?? {});

    /**
     * Applies a partial configuration update while preserving nested runtime state.
     *
     * @param partial Partial configuration to merge into the current state.
     */
    updateConfig(partial: Partial<CupConfig>): void {
        this.config.update((current) => mergeConfig(current, partial));
    }
}
