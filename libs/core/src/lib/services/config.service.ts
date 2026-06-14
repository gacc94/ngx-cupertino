import { computed, Injectable, inject, type Signal, signal } from "@angular/core";
import type { CupTintInput } from "../constants/colors";
import { DEFAULT_CUP_CONFIG } from "../constants/cupertino-default-config";
import { CUP_CONFIG } from "../tokens/cup-config.token";
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
 *
 * @example
 * ```ts
 * const config = inject(CupConfigService);
 * config.updateConfig({ materials: { surfaceStyle: 'liquid-glass' } });
 * const variant = config.liquidGlassVariant(); // Signal read
 * ```
 */
@Injectable()
export class CupConfigService {
    private readonly _config = signal<CupConfig>(
        deepMerge(DEFAULT_CUP_CONFIG as CupConfig, inject(CUP_CONFIG, { optional: true }) ?? {}),
    );

    /** Read-only view of the merged runtime configuration. Use {@link updateConfig} to write. */
    readonly config: Signal<CupConfig> = this._config.asReadonly();

    readonly theme = computed<CupThemeMode>(() => this._config().theme ?? DEFAULT_CUP_CONFIG.theme);
    readonly tintColor = computed<CupTintInput>(() => this._config().tintColor ?? DEFAULT_CUP_CONFIG.tintColor);
    readonly direction = computed<"ltr" | "rtl">(() => this._config().direction ?? DEFAULT_CUP_CONFIG.direction);
    readonly surfaceStyle = computed<CupSurfaceStyle>(
        () => this._config().materials?.surfaceStyle ?? DEFAULT_CUP_CONFIG.materials.surfaceStyle,
    );
    readonly liquidGlassVariant = computed<CupLiquidGlassVariant>(
        () => this._config().materials?.liquidGlass?.variant ?? DEFAULT_CUP_CONFIG.materials.liquidGlass.variant,
    );
    readonly liquidGlassPreferredLook = computed<CupLiquidGlassPreferredLook>(
        () =>
            this._config().materials?.liquidGlass?.preferredLook ??
            DEFAULT_CUP_CONFIG.materials.liquidGlass.preferredLook,
    );
    readonly buttonDefaults = computed<CupButtonDefaults>(() => this._config().defaults?.button ?? {});
    readonly a11y = computed<CupA11yConfig>(() => this._config().a11y ?? {});

    /**
     * Applies a partial configuration update while preserving nested runtime state.
     *
     * @param partial Partial configuration to merge into the current state.
     */
    updateConfig(partial: Partial<CupConfig>): void {
        this._config.update((current) => deepMerge(current, partial));
    }
}
