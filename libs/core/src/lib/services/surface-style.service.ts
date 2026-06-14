import { DOCUMENT } from "@angular/common";
import { computed, Injectable, inject } from "@angular/core";
import { applyCupSurfaceDatasets } from "../constants/dom-attributes";
import type { CupSurfaceStyle } from "../types/cupertino-config.types";
import { CupConfigService } from "./config.service";

/**
 * Runtime facade for the global design-system surface style.
 *
 * This service owns the `base` versus `liquid-glass` axis and projects the current
 * state to root `data-*` attributes.
 */
@Injectable()
export class SurfaceStyleService {
    readonly surfaceStyle = computed(() => this.config.surfaceStyle());
    readonly isBase = computed(() => this.surfaceStyle() === "base");
    readonly isLiquidGlass = computed(() => this.surfaceStyle() === "liquid-glass");

    private readonly config = inject(CupConfigService);
    private readonly document = inject(DOCUMENT);

    /**
     * Sets the current surface style and synchronizes the root DOM state.
     *
     * @param style The new global surface style.
     */
    setSurfaceStyle(style: CupSurfaceStyle): void {
        this.config.updateConfig({
            materials: {
                surfaceStyle: style,
            },
        });

        this.syncDom();
    }

    /** Switches the design system back to the stable base surface style. */
    useBase(): void {
        this.setSurfaceStyle("base");
    }

    /** Enables the Liquid Glass surface style for the current runtime session. */
    useLiquidGlass(): void {
        this.setSurfaceStyle("liquid-glass");
    }

    /**
     * Synchronizes the current surface state to the root DOM datasets.
     */
    syncDom(): void {
        const root = this.document.documentElement;

        applyCupSurfaceDatasets(
            root,
            this.config.surfaceStyle(),
            this.config.liquidGlassVariant(),
            this.config.liquidGlassPreferredLook(),
        );
    }
}
