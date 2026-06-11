import { DOCUMENT } from "@angular/common";
import {
    type EnvironmentProviders,
    InjectionToken,
    inject,
    makeEnvironmentProviders,
    provideEnvironmentInitializer,
} from "@angular/core";
import type { CupTintInput } from "../constants/colors";
import type { CupComponentSize } from "../constants/sizes";
import type { CupButtonVariant } from "../constants/variants";
import { BreakpointService } from "../services/breakpoint.service";
import { CupConfigService } from "../services/config.service";
import { ThemeService } from "../services/theme.service";

export type CupThemeMode = "light" | "dark" | "auto";

export interface CupButtonDefaults {
    variant?: CupButtonVariant;
    size?: CupComponentSize;
}

export interface CupA11yConfig {
    reducedMotion?: "auto" | "always" | "never";
    focusRing?: boolean;
    minTouchTarget?: number;
}

export interface CupConfig {
    theme?: CupThemeMode;
    tintColor?: CupTintInput;
    direction?: "ltr" | "rtl";
    defaults?: {
        button?: CupButtonDefaults;
    };
    a11y?: CupA11yConfig;
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
            const cfg = inject(CupConfigService);
            const doc = inject(DOCUMENT);
            ts.setTheme(cfg.theme());
            ts.setTint(cfg.tintColor());
            if (cfg.direction() === "rtl") {
                doc.documentElement.setAttribute("dir", "rtl");
            } else {
                doc.documentElement.removeAttribute("dir");
            }
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
