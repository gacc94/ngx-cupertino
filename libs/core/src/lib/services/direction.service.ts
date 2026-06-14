import { DOCUMENT } from "@angular/common";
import { effect, Injectable, inject } from "@angular/core";
import { CupConfigService } from "./config.service";

/**
 * Synchronizes the `dir` attribute on `<html>` with the reactive config signal.
 *
 * Replaces the one-shot `setAttribute` + `effect({ injector })` anti-pattern that
 * previously lived in the `provideEnvironmentInitializer` callback.
 */
@Injectable()
export class DirectionService {
    private readonly cfg = inject(CupConfigService);
    private readonly document = inject(DOCUMENT);

    constructor() {
        effect(() => {
            if (this.cfg.direction() === "rtl") {
                this.document.documentElement.setAttribute("dir", "rtl");
            } else {
                this.document.documentElement.removeAttribute("dir");
            }
        });
    }
}
