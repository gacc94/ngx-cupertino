import { DOCUMENT } from "@angular/common";
import { effect, Injectable, inject } from "@angular/core";
import { CupConfigService } from "./config.service";

/**
 * Reactively projects `a11y` config onto root-level CSS custom properties and data attributes.
 *
 * Replaces the one-shot imperative block that previously lived in `provideEnvironmentInitializer`.
 * All a11y settings now react to `CupConfigService.updateConfig({ a11y: ... })` calls at runtime.
 */
@Injectable()
export class A11yConfigService {
    private readonly cfg = inject(CupConfigService);
    private readonly document = inject(DOCUMENT);

    constructor() {
        effect(() => {
            const a11y = this.cfg.a11y();
            const root = this.document.documentElement;

            if (a11y.reducedMotion && a11y.reducedMotion !== "auto") {
                root.setAttribute("data-reduced-motion", a11y.reducedMotion);
            } else {
                root.removeAttribute("data-reduced-motion");
            }

            if (a11y.focusRing === false) {
                root.style.setProperty("--cup-focus-ring", "none");
            } else {
                root.style.removeProperty("--cup-focus-ring");
            }

            if (a11y.minTouchTarget) {
                root.style.setProperty("--cup-min-touch-target", `${a11y.minTouchTarget}px`);
            } else {
                root.style.removeProperty("--cup-min-touch-target");
            }
        });
    }
}
