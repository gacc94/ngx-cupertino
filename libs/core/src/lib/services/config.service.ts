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

function isPlainObject(v: unknown): v is Record<string, unknown> {
    return v !== null && typeof v === "object" && !Array.isArray(v);
}

function deepMerge<T>(current: T, partial: Partial<T>): T {
    const result = { ...(current as Record<string, unknown>) };
    for (const key of Object.keys(partial as object) as (keyof T & string)[]) {
        const next = (partial as Record<string, unknown>)[key];
        if (next === undefined) continue;
        const curr = (current as Record<string, unknown>)[key];
        result[key] = isPlainObject(next) && isPlainObject(curr) ? deepMerge(curr, next) : next;
    }
    return result as T;
}

/**
 * Central signal-backed configuration store for `@ngx-cupertino/core`.
 *
 * This service owns the canonical merged runtime configuration used by all specialized
 * services and the provider initializer.
 */
@Injectable()
export class CupConfigService {
    readonly config = signal<CupConfig>(
        deepMerge(DEFAULT_CUP_CONFIG as CupConfig, inject(CUP_CONFIG, { optional: true }) ?? {}),
    );
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
        this.config.update((current) => deepMerge(current, partial));
    }
}
