import { BreakpointObserver, type BreakpointState, Breakpoints } from "@angular/cdk/layout";
import { computed, Injectable, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

const HOVER_QUERY = "(hover: hover)";
const TOUCH_QUERY = "(pointer: coarse)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const FORCED_COLORS_QUERY = "(forced-colors: active)";

/**
 * Reactive viewport, input-capability, and accessibility-preference store.
 *
 * Every reading is a signal derived from the CDK {@link BreakpointObserver} (which tears down
 * its subscriptions automatically). Unlike the legacy one-shot `matchMedia` helpers, these
 * signals update live when the user changes a system preference.
 *
 * @example
 * ```ts
 * export class AppComponent {
 *   private readonly bp = inject(BreakpointService);
 *   readonly compact = this.bp.isCompact;            // Signal<boolean>
 *   readonly reducedMotion = this.bp.prefersReducedMotion;
 * }
 * ```
 */
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
    private readonly a11yResult = toSignal(
        this.breakpointObserver.observe([REDUCED_MOTION_QUERY, FORCED_COLORS_QUERY]),
        {
            initialValue: {
                matches: false,
                breakpoints: {
                    [REDUCED_MOTION_QUERY]: false,
                    [FORCED_COLORS_QUERY]: false,
                },
            } as BreakpointState,
        },
    );

    /** Whether the active viewport matches the CDK handset breakpoint. */
    readonly isMobile = computed(() => this.viewportResult().breakpoints[Breakpoints.Handset] ?? false);
    /** Whether the active viewport matches the CDK tablet breakpoint. */
    readonly isTablet = computed(() => this.viewportResult().breakpoints[Breakpoints.Tablet] ?? false);
    /** Whether the active viewport matches the CDK web breakpoint. */
    readonly isDesktop = computed(() => this.viewportResult().breakpoints[Breakpoints.Web] ?? false);
    /** Whether the viewport is in a compact (mobile or tablet) layout. */
    readonly isCompact = computed(() => this.isMobile() || this.isTablet());
    /** Whether the primary pointer supports hover. */
    readonly hasHover = computed(() => this.capabilityResult().breakpoints[HOVER_QUERY] ?? false);
    /** Whether the primary pointer is coarse (touch). */
    readonly hasTouch = computed(() => this.capabilityResult().breakpoints[TOUCH_QUERY] ?? false);
    /** Whether the user requested reduced motion at the system level. */
    readonly prefersReducedMotion = computed(() => this.a11yResult().breakpoints[REDUCED_MOTION_QUERY] ?? false);
    /**
     * Whether the OS is in a forced-colors mode (e.g. Windows High Contrast).
     *
     * Distinct from {@link ThemeService.isHighContrast}, which tracks the CSS
     * `(prefers-contrast: more)` preference.
     */
    readonly hasForcedColors = computed(() => this.a11yResult().breakpoints[FORCED_COLORS_QUERY] ?? false);
}
