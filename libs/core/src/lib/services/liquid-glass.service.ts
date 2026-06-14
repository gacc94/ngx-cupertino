import { computed, Injectable, inject } from "@angular/core";
import type { CupLiquidGlassPreferredLook, CupLiquidGlassVariant } from "../types/cupertino-config.types";
import { CupConfigService } from "./config.service";

/**
 * Runtime facade for the Liquid Glass material configuration.
 *
 * This service stores the chosen material variant and preferred look even when the current
 * surface style is `base`. DOM synchronization is owned entirely by {@link SurfaceStyleService},
 * which already tracks all three glass signals in its `effect()` and handles both activation
 * and cleanup. This service is responsible only for the write API.
 */
@Injectable()
export class LiquidGlassService {
    readonly variant = computed(() => this.config.liquidGlassVariant());
    readonly preferredLook = computed(() => this.config.liquidGlassPreferredLook());

    private readonly config = inject(CupConfigService);

    /**
     * Sets the Liquid Glass material variant.
     *
     * @param variant The official Liquid Glass material variant to persist.
     */
    setVariant(variant: CupLiquidGlassVariant): void {
        this.configure({ variant });
    }

    /**
     * Sets the preferred visual look applied to the active Liquid Glass variant.
     *
     * @param preferredLook The preferred visual look to persist.
     */
    setPreferredLook(preferredLook: CupLiquidGlassPreferredLook): void {
        this.configure({ preferredLook });
    }

    /**
     * Applies a partial Liquid Glass configuration update. The DOM is synchronized reactively by
     * {@link SurfaceStyleService}'s effect.
     *
     * @param options Partial Liquid Glass state to persist.
     */
    configure(options: { variant?: CupLiquidGlassVariant; preferredLook?: CupLiquidGlassPreferredLook }): void {
        this.config.updateConfig({
            materials: {
                liquidGlass: options,
            },
        });
    }
}
