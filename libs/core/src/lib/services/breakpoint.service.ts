import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { computed, Injectable, inject, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class BreakpointService {
    readonly isMobile = signal(false);
    readonly isTablet = signal(false);
    readonly isDesktop = signal(false);
    readonly isCompact = computed(() => this.isMobile() || this.isTablet());
    readonly hasHover = signal(false);
    readonly hasTouch = signal(false);

    constructor() {
        const observer = inject(BreakpointObserver);
        observer.observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web]).subscribe((result) => {
            this.isMobile.set(result.breakpoints[Breakpoints.Handset]);
            this.isTablet.set(result.breakpoints[Breakpoints.Tablet]);
            this.isDesktop.set(result.breakpoints[Breakpoints.Web]);
        });
        if (typeof window !== "undefined") {
            this.hasHover.set(window.matchMedia("(hover: hover)").matches);
            this.hasTouch.set(window.matchMedia("(pointer: coarse)").matches);
        }
    }
}
