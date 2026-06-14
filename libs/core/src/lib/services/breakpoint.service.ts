import { BreakpointObserver, type BreakpointState, Breakpoints } from "@angular/cdk/layout";
import { computed, Injectable, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

const HOVER_QUERY = "(hover: hover)";
const TOUCH_QUERY = "(pointer: coarse)";

@Injectable()
export class BreakpointService {
    private readonly breakpointObserver = inject(BreakpointObserver);
    private readonly viewportResult = toSignal(
        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web]),
        {
            initialValue: {
                matches: false,
                breakpoints: {
                    [Breakpoints.Handset]: false,
                    [Breakpoints.Tablet]: false,
                    [Breakpoints.Web]: false,
                },
            } as BreakpointState,
        },
    );
    private readonly capabilityResult = toSignal(this.breakpointObserver.observe([HOVER_QUERY, TOUCH_QUERY]), {
        initialValue: {
            matches: false,
            breakpoints: {
                [HOVER_QUERY]: false,
                [TOUCH_QUERY]: false,
            },
        } as BreakpointState,
    });

    readonly isMobile = computed(() => this.viewportResult().breakpoints[Breakpoints.Handset] ?? false);
    readonly isTablet = computed(() => this.viewportResult().breakpoints[Breakpoints.Tablet] ?? false);
    readonly isDesktop = computed(() => this.viewportResult().breakpoints[Breakpoints.Web] ?? false);
    readonly isCompact = computed(() => this.isMobile() || this.isTablet());
    readonly hasHover = computed(() => this.capabilityResult().breakpoints[HOVER_QUERY] ?? false);
    readonly hasTouch = computed(() => this.capabilityResult().breakpoints[TOUCH_QUERY] ?? false);
}
