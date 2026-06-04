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
import { ThemeService } from "../services/theme.service";

export interface CupConfig {
    theme?: "light" | "dark" | "auto";
    tintColor?: string | { light: string; dark: string };
    direction?: "ltr" | "rtl";
    defaults?: {
        button?: { variant?: string; size?: string };
        notification?: { position?: string; duration?: number };
        drawer?: { mode?: string; width?: number; breakpoint?: number };
        dialog?: { size?: string; closable?: boolean };
    };
    a11y?: {
        reducedMotion?: "auto" | "always" | "never";
        focusRing?: boolean;
        minTouchTarget?: number;
    };
}

export const CUP_CONFIG = new InjectionToken<CupConfig>("CUP_CONFIG");

export function provideCupertino(config?: CupConfig): EnvironmentProviders {
    return makeEnvironmentProviders([
        { provide: CUP_CONFIG, useValue: config ?? {} },
        ThemeService,
        BreakpointService,
        CupConfigService,
        provideEnvironmentInitializer(() => {
            const ts = inject(ThemeService);
            const cfg = inject(CUP_CONFIG);
            const doc = inject(DOCUMENT);
            if (cfg.theme) {
                ts.setTheme(cfg.theme === "auto" ? "auto" : cfg.theme);
            }
            if (cfg.tintColor) {
                const tint = typeof cfg.tintColor === "string" ? cfg.tintColor : cfg.tintColor.light;
                ts.setTint(tint);
            }
            if (cfg.direction === "rtl") {
                doc.documentElement.setAttribute("dir", "rtl");
            }
            if (cfg.a11y) {
                const root = doc.documentElement;
                if (cfg.a11y.reducedMotion === "always") {
                    root.setAttribute("data-reduced-motion", "always");
                } else if (cfg.a11y.reducedMotion === "never") {
                    root.removeAttribute("data-reduced-motion");
                }
                if (cfg.a11y.focusRing === false) {
                    root.style.setProperty("--cup-focus-ring", "none");
                }
                if (cfg.a11y.minTouchTarget) {
                    root.style.setProperty("--cup-min-touch-target", `${cfg.a11y.minTouchTarget}px`);
                }
            }
        }),
    ]);
}
