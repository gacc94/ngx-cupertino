import { DOCUMENT } from "@angular/common";
import {
    type EnvironmentProviders,
    effect,
    InjectionToken,
    Injector,
    inject,
    makeEnvironmentProviders,
    provideEnvironmentInitializer,
} from "@angular/core";
import { AnnouncerService } from "../services/announcer.service";
import { BreakpointService } from "../services/breakpoint.service";
import { CupConfigService } from "../services/config.service";
import { FocusService } from "../services/focus.service";
import { FocusTrapService } from "../services/focus-trap.service";
import { KeyManagerService } from "../services/key-manager.service";
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
        FocusService,
        AnnouncerService,
        FocusTrapService,
        KeyManagerService,
        provideEnvironmentInitializer(() => {
            const ts = inject(ThemeService);
            const cfg = inject(CupConfigService);
            const doc = inject(DOCUMENT);
            const injector = inject(Injector);

            // Seed the theme/tint signals from config; their own effects sync the DOM.
            // SurfaceStyleService and LiquidGlassService self-sync via effects on construction.
            inject(SurfaceStyleService);
            inject(LiquidGlassService);
            ts.setTheme(cfg.theme());
            ts.setTint(cfg.tintColor());

            // Reactive `dir` sync — reflects later updateConfig({ direction }) calls.
            effect(
                () => {
                    if (cfg.direction() === "rtl") {
                        doc.documentElement.setAttribute("dir", "rtl");
                    } else {
                        doc.documentElement.removeAttribute("dir");
                    }
                },
                { injector },
            );

            // One-shot a11y CSS vars / attributes — these are static config, not reactive.
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
