import { BreakpointObserver, type BreakpointState, Breakpoints } from "@angular/cdk/layout";
import { TestBed } from "@angular/core/testing";
import { BehaviorSubject } from "rxjs";
import { afterEach, describe, expect, it } from "vitest";
import { BreakpointService } from "./breakpoint.service";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const FORCED_COLORS_QUERY = "(forced-colors: active)";

describe("BreakpointService", () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it("derives viewport, capability, and accessibility signals reactively", () => {
        const viewport$ = new BehaviorSubject<BreakpointState>({
            matches: true,
            breakpoints: {
                [Breakpoints.Handset]: false,
                [Breakpoints.Tablet]: false,
                [Breakpoints.Web]: true,
            },
        });
        const capability$ = new BehaviorSubject<BreakpointState>({
            matches: true,
            breakpoints: {
                "(hover: hover)": true,
                "(pointer: coarse)": false,
            },
        });
        const a11y$ = new BehaviorSubject<BreakpointState>({
            matches: false,
            breakpoints: {
                [REDUCED_MOTION_QUERY]: false,
                [FORCED_COLORS_QUERY]: false,
            },
        });

        TestBed.configureTestingModule({
            providers: [
                BreakpointService,
                {
                    provide: BreakpointObserver,
                    useValue: {
                        observe: (queries: string[]) => {
                            if (queries.includes(Breakpoints.Handset)) {
                                return viewport$.asObservable();
                            }
                            if (queries.includes(REDUCED_MOTION_QUERY)) {
                                return a11y$.asObservable();
                            }
                            return capability$.asObservable();
                        },
                    } satisfies Pick<BreakpointObserver, "observe">,
                },
            ],
        });

        const service = TestBed.inject(BreakpointService);

        expect(service.isDesktop()).toBe(true);
        expect(service.isCompact()).toBe(false);
        expect(service.hasHover()).toBe(true);
        expect(service.hasTouch()).toBe(false);
        expect(service.prefersReducedMotion()).toBe(false);
        expect(service.hasForcedColors()).toBe(false);

        viewport$.next({
            matches: true,
            breakpoints: {
                [Breakpoints.Handset]: true,
                [Breakpoints.Tablet]: false,
                [Breakpoints.Web]: false,
            },
        });
        capability$.next({
            matches: true,
            breakpoints: {
                "(hover: hover)": false,
                "(pointer: coarse)": true,
            },
        });
        a11y$.next({
            matches: true,
            breakpoints: {
                [REDUCED_MOTION_QUERY]: true,
                [FORCED_COLORS_QUERY]: true,
            },
        });

        expect(service.isMobile()).toBe(true);
        expect(service.isCompact()).toBe(true);
        expect(service.hasHover()).toBe(false);
        expect(service.hasTouch()).toBe(true);
        expect(service.prefersReducedMotion()).toBe(true);
        expect(service.hasForcedColors()).toBe(true);
    });
});
