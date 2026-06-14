import { DOCUMENT } from "@angular/common";
import { computed, Injectable, inject } from "@angular/core";
import { applyCupLiquidGlassDatasets } from "../constants/dom-attributes";
import type { CupLiquidGlassPreferredLook, CupLiquidGlassVariant } from "../types/cupertino-config.types";
import { CupConfigService } from "./config.service";

/**
 * Runtime facade for the Liquid Glass material configuration.
 *
 * This service stores the chosen material variant and preferred look even when the
 * current surface style is `base`, but only projects them to the DOM when
 * `surfaceStyle = liquid-glass`.
 */
@Injectable()
export class LiquidGlassService {
    readonly variant = computed(() => this.config.liquidGlassVariant());
    readonly preferredLook = computed(() => this.config.liquidGlassPreferredLook());

    private readonly config = inject(CupConfigService);
    private readonly document = inject(DOCUMENT);

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
     * Applies a partial Liquid Glass configuration update.
     *
     * @param options Partial Liquid Glass state to persist.
     */
    configure(options: { variant?: CupLiquidGlassVariant; preferredLook?: CupLiquidGlassPreferredLook }): void {
        this.config.updateConfig({
            materials: {
                liquidGlass: options,
            },
        });

        this.syncDom();
    }

    /**
     * Synchronizes the current Liquid Glass datasets when the active surface style allows it.
     */
    syncDom(): void {
        if (this.config.surfaceStyle() !== "liquid-glass") {
            return;
        }

        applyCupLiquidGlassDatasets(
            this.document.documentElement,
            this.config.liquidGlassVariant(),
            this.config.liquidGlassPreferredLook(),
        );
    }
}
