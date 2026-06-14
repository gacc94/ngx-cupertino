import { DOCUMENT } from "@angular/common";
import { computed, effect, Injectable, inject } from "@angular/core";
import { applyCupSurfaceDatasets } from "../constants/dom-attributes";
import type { CupSurfaceStyle } from "../types/cupertino-config.types";
import { CupConfigService } from "./config.service";

/**
 * Runtime facade for the global design-system surface style.
 *
 * This service owns the `base` versus `liquid-glass` axis. An {@link effect} keeps the root
 * `data-*` attributes in sync with the configuration signals, so any update to the underlying
 * config — including direct {@link CupConfigService.updateConfig} calls — is reflected in the
 * DOM without an imperative sync step.
 */
@Injectable()
export class SurfaceStyleService {
    readonly surfaceStyle = computed(() => this.config.surfaceStyle());
    readonly isBase = computed(() => this.surfaceStyle() === "base");
    readonly isLiquidGlass = computed(() => this.surfaceStyle() === "liquid-glass");

    private readonly config = inject(CupConfigService);
    private readonly document = inject(DOCUMENT);

    constructor() {
        effect(() => {
            applyCupSurfaceDatasets(
                this.document.documentElement,
                this.config.surfaceStyle(),
                this.config.liquidGlassVariant(),
                this.config.liquidGlassPreferredLook(),
            );
        });
    }

    /**
     * Sets the current surface style. The DOM is synchronized reactively by the internal effect.
     *
     * @param style The new global surface style.
     */
    setSurfaceStyle(style: CupSurfaceStyle): void {
        this.config.updateConfig({
            materials: {
                surfaceStyle: style,
            },
        });
    }

    /** Switches the design system back to the stable base surface style. */
    useBase(): void {
        this.setSurfaceStyle("base");
    }

    /** Enables the Liquid Glass surface style for the current runtime session. */
    useLiquidGlass(): void {
        this.setSurfaceStyle("liquid-glass");
    }
}
