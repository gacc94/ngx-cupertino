import { DOCUMENT } from "@angular/common";
import {
    type EnvironmentProviders,
    InjectionToken,
    inject,
    makeEnvironmentProviders,
    provideEnvironmentInitializer,
} from "@angular/core";
import { BreakpointService } from "../services/breakpoint.service";
import { CupConfigService } from "../services/config.service";
import { LiquidGlassService } from "../services/liquid-glass.service";
import { SurfaceStyleService } from "../services/surface-style.service";
import { ThemeService } from "../services/theme.service";
import type { CupConfig } from "../types/cupertino-config.types";

export type {
    CupA11yConfig,
    CupButtonDefaults,
    CupConfig,
    CupLiquidGlassPreferredLook,
    CupLiquidGlassVariant,
    CupMaterialsConfig,
    CupSurfaceStyle,
    CupThemeMode,
} from "../types/cupertino-config.types";

export const CUP_CONFIG = new InjectionToken<CupConfig>("CUP_CONFIG");

/**
 * Registers the core Cupertino provider stack and synchronizes initial global runtime state.
 *
 * @param config Optional partial runtime configuration for the design system.
 * @returns Environment providers for the shared `core` runtime.
 */
export function provideCupertino(config?: CupConfig): EnvironmentProviders {
    return makeEnvironmentProviders([
        { provide: CUP_CONFIG, useValue: config ?? {} },
        ThemeService,
        BreakpointService,
        CupConfigService,
        SurfaceStyleService,
        LiquidGlassService,
        provideEnvironmentInitializer(() => {
            const ts = inject(ThemeService);
            const cfg = inject(CupConfigService);
            const surface = inject(SurfaceStyleService);
            const glass = inject(LiquidGlassService);
            const doc = inject(DOCUMENT);

            ts.setTheme(cfg.theme());
            ts.setTint(cfg.tintColor());

            if (cfg.direction() === "rtl") {
                doc.documentElement.setAttribute("dir", "rtl");
            } else {
                doc.documentElement.removeAttribute("dir");
            }

            surface.syncDom();
            glass.syncDom();

            const a11y = cfg.a11y();
            if (Object.keys(a11y).length > 0) {
                const root = doc.documentElement;
                if (a11y.reducedMotion === "always") {
                    root.setAttribute("data-reduced-motion", "always");
                } else if (a11y.reducedMotion === "never") {
                    root.removeAttribute("data-reduced-motion");
                }
                if (a11y.focusRing === false) {
                    root.style.setProperty("--cup-focus-ring", "none");
                }
                if (a11y.minTouchTarget) {
                    root.style.setProperty("--cup-min-touch-target", `${a11y.minTouchTarget}px`);
                }
            }
        }),
    ]);
}
