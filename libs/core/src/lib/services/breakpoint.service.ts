import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { DOCUMENT } from "@angular/common";
import { computed, Injectable, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({ providedIn: "root" })
export class BreakpointService {
    private readonly bpResult = toSignal(
        inject(BreakpointObserver).observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web]),
    );

    readonly isMobile = computed(() => this.bpResult()?.breakpoints[Breakpoints.Handset] ?? false);
    readonly isTablet = computed(() => this.bpResult()?.breakpoints[Breakpoints.Tablet] ?? false);
    readonly isDesktop = computed(() => this.bpResult()?.breakpoints[Breakpoints.Web] ?? false);
    readonly isCompact = computed(() => this.isMobile() || this.isTablet());

    readonly hasHover: boolean;
    readonly hasTouch: boolean;

    constructor() {
        const win = inject(DOCUMENT).defaultView;
        this.hasHover = win ? win.matchMedia("(hover: hover)").matches : false;
        this.hasTouch = win ? win.matchMedia("(pointer: coarse)").matches : false;
    }
}
