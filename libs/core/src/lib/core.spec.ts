import {
    type ConfigurableFocusTrap,
    ConfigurableFocusTrapFactory,
    type FocusableOption,
    FocusMonitor,
    type FocusOrigin,
    LiveAnnouncer,
} from "@angular/cdk/a11y";
import { BreakpointObserver, type BreakpointState, Breakpoints } from "@angular/cdk/layout";
import { DOCUMENT } from "@angular/common";
import { Component, signal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BehaviorSubject, Subject } from "rxjs";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { CupTintPalette } from "./constants/colors";
import { LiquidGlassDirective } from "./directives/liquid-glass.directive";
import { CUP_CONFIG, provideCupertino } from "./providers/cupertino.provider";
import { DEFAULT_CUP_CONFIG } from "./providers/cupertino-default-config";
import { AnnouncerService } from "./services/announcer.service";
import { BreakpointService } from "./services/breakpoint.service";
import { CupConfigService } from "./services/config.service";
import { FocusService } from "./services/focus.service";
import { FocusTrapService } from "./services/focus-trap.service";
import { KeyManagerService } from "./services/key-manager.service";
import { LiquidGlassService } from "./services/liquid-glass.service";
import { SurfaceStyleService } from "./services/surface-style.service";
import { ThemeService } from "./services/theme.service";
import type { CupLiquidGlassVariant } from "./types/cupertino-config.types";
import { CupFormControl, CupModelControl } from "./utils/base-cva";

function resetRoot(doc: Document): void {
    const root = doc.documentElement;
    // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
    delete root.dataset["mode"];
    // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
    delete root.dataset["tint"];
    // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
    delete root.dataset["surfaceStyle"];
    // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
    delete root.dataset["liquidGlassVariant"];
    // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
    delete root.dataset["liquidGlassLook"];
    root.removeAttribute("dir");
    root.removeAttribute("data-reduced-motion");
    root.style.removeProperty("--cup-tint");
    root.style.removeProperty("--cup-tint-subtle");
    root.style.removeProperty("--cup-tint-container");
    root.style.removeProperty("--cup-tint-on");
    root.style.removeProperty("--cup-focus-ring");
    root.style.removeProperty("--cup-min-touch-target");
}

const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";
const HIGH_CONTRAST_QUERY = "(prefers-contrast: more)";

interface MockBreakpointObserver {
    observer: Pick<BreakpointObserver, "observe">;
    setDark: (matches: boolean) => void;
    setHighContrast: (matches: boolean) => void;
}

/**
 * Provides a controllable {@link BreakpointObserver} for the signal-first `ThemeService`,
 * mirroring the real CDK `observe()` contract while letting tests drive media-query state.
 */
function mockBreakpointObserver(initial: { dark?: boolean; highContrast?: boolean } = {}): MockBreakpointObserver {
    const subjects = new Map<string, BehaviorSubject<BreakpointState>>();

    const subjectFor = (query: string): BehaviorSubject<BreakpointState> => {
        let subject = subjects.get(query);
        if (!subject) {
            const matches =
                query === DARK_SCHEME_QUERY
                    ? (initial.dark ?? false)
                    : query === HIGH_CONTRAST_QUERY
                      ? (initial.highContrast ?? false)
                      : false;
            subject = new BehaviorSubject<BreakpointState>({ matches, breakpoints: { [query]: matches } });
            subjects.set(query, subject);
        }
        return subject;
    };

    const emit = (query: string, matches: boolean): void => {
        subjectFor(query).next({ matches, breakpoints: { [query]: matches } });
    };

    return {
        observer: {
            observe: (value: string | readonly string[]) => {
                const query = Array.isArray(value) ? value[0] : (value as string);
                return subjectFor(query).asObservable();
            },
        },
        setDark: (matches: boolean) => emit(DARK_SCHEME_QUERY, matches),
        setHighContrast: (matches: boolean) => emit(HIGH_CONTRAST_QUERY, matches),
    };
}

class TestControl extends CupFormControl<number> {
    emit(value: number): void {
        this.value.set(value);
        this.onChange(value);
    }

    touch(): void {
        this.onTouched();
    }
}

@Component({
    selector: "test-liquid-glass-host",
    template: '<div [cupLiquidGlass]="variant"></div>',
    imports: [LiquidGlassDirective],
})
class LiquidGlassHost {
    variant: CupLiquidGlassVariant = "regular";
}

@Component({
    selector: "test-clear-liquid-glass-host",
    template: '<div [cupLiquidGlass]="variant"></div>',
    imports: [LiquidGlassDirective],
})
class ClearLiquidGlassHost {
    variant: CupLiquidGlassVariant = "clear";
}

@Component({
    selector: "test-model-control",
    template: "<span>{{ value() }}</span>",
})
class ModelControlHost extends CupModelControl<number> {}

describe("@ngx-cupertino/core", () => {
    afterEach(() => {
        resetRoot(TestBed.inject(DOCUMENT));
        TestBed.resetTestingModule();
    });

    function provideThemeService(media: MockBreakpointObserver): ThemeService {
        TestBed.configureTestingModule({
            providers: [ThemeService, { provide: BreakpointObserver, useValue: media.observer }],
        });
        const service = TestBed.inject(ThemeService);
        TestBed.tick();
        return service;
    }

    it("applies named tints through dataset without inline overrides", () => {
        const service = provideThemeService(mockBreakpointObserver());
        const doc = TestBed.inject(DOCUMENT);

        service.setTint("blue");
        TestBed.tick();

        expect(service.currentTint()).toBe("blue");
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(doc.documentElement.dataset["tint"]).toBe("blue");
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("");
    });

    it("reapplies custom tint palettes when the theme changes", () => {
        const service = provideThemeService(mockBreakpointObserver());
        const doc = TestBed.inject(DOCUMENT);
        const palette: CupTintPalette = { light: "#112233", dark: "#ddeeff" };

        service.setTheme("dark");
        service.setTint(palette);
        TestBed.tick();
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#ddeeff");
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(doc.documentElement.dataset["tint"]).toBe("custom");

        service.toggle();
        TestBed.tick();

        expect(service.theme()).toBe("light");
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#112233");
    });

    it("reapplies custom tint palettes when contrast changes", () => {
        const media = mockBreakpointObserver();
        const service = provideThemeService(media);
        const doc = TestBed.inject(DOCUMENT);
        const palette: CupTintPalette = {
            light: "#112233",
            dark: "#ddeeff",
            lightHighContrast: "#334455",
            darkHighContrast: "#ffeedd",
        };

        service.setTint(palette);
        TestBed.tick();
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#112233");

        media.setHighContrast(true);
        TestBed.tick();
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#334455");

        service.setTheme("dark");
        TestBed.tick();
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#ffeedd");

        media.setHighContrast(false);
        TestBed.tick();
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#ddeeff");
    });

    it("keeps single hex tints stable across contrast changes", () => {
        const media = mockBreakpointObserver();
        const service = provideThemeService(media);
        const doc = TestBed.inject(DOCUMENT);

        service.setTint("#123456");
        TestBed.tick();
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#123456");

        media.setHighContrast(true);
        TestBed.tick();
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#123456");

        service.setTheme("dark");
        TestBed.tick();
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#123456");
    });

    it("exposes typed config selectors and merges nested updates", () => {
        TestBed.configureTestingModule({
            providers: [
                CupConfigService,
                {
                    provide: CUP_CONFIG,
                    useValue: {
                        theme: "dark",
                        tintColor: "blue",
                        materials: {
                            surfaceStyle: "liquid-glass",
                            liquidGlass: { variant: "clear" },
                        },
                        defaults: { button: { size: "sm" } },
                    },
                },
            ],
        });

        const service = TestBed.inject(CupConfigService);

        expect(service.theme()).toBe("dark");
        expect(service.tintColor()).toBe("blue");
        expect(service.surfaceStyle()).toBe("liquid-glass");
        expect(service.liquidGlassVariant()).toBe("clear");
        expect(service.liquidGlassPreferredLook()).toBe(DEFAULT_CUP_CONFIG.materials.liquidGlass.preferredLook);
        expect(service.buttonDefaults()).toEqual({ size: "sm" });

        service.updateConfig({
            direction: "rtl",
            materials: {
                liquidGlass: { preferredLook: "tinted" },
            },
            defaults: { button: { variant: "tinted" } },
            a11y: { focusRing: false },
        });

        expect(service.direction()).toBe("rtl");
        expect(service.surfaceStyle()).toBe("liquid-glass");
        expect(service.liquidGlassVariant()).toBe("clear");
        expect(service.liquidGlassPreferredLook()).toBe("tinted");
        expect(service.buttonDefaults()).toEqual({ size: "sm", variant: "tinted" });
        expect(service.a11y()).toEqual({ focusRing: false });
    });

    it("initializes defaults from system theme resolution, blue tint, and base surface style", () => {
        const media = mockBreakpointObserver({ dark: true });
        TestBed.configureTestingModule({
            providers: [provideCupertino(), { provide: BreakpointObserver, useValue: media.observer }],
        });

        const doc = TestBed.inject(DOCUMENT);
        TestBed.inject(ThemeService);
        TestBed.tick();

        const root = doc.documentElement;

        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["mode"]).toBe("dark");
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["tint"]).toBe("blue");
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["surfaceStyle"]).toBe("base");
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["liquidGlassVariant"]).toBeUndefined();
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["liquidGlassLook"]).toBeUndefined();
    });

    it("initializes document state through provideCupertino", () => {
        const media = mockBreakpointObserver();
        TestBed.configureTestingModule({
            providers: [
                provideCupertino({
                    theme: "dark",
                    tintColor: { light: "#224466", dark: "#88bbff" },
                    direction: "rtl",
                    a11y: {
                        reducedMotion: "always",
                        focusRing: false,
                        minTouchTarget: 48,
                    },
                }),
                { provide: BreakpointObserver, useValue: media.observer },
            ],
        });

        TestBed.inject(ThemeService);
        TestBed.tick();
        const root = TestBed.inject(DOCUMENT).documentElement;

        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["mode"]).toBe("dark");
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["tint"]).toBe("custom");
        expect(root.getAttribute("dir")).toBe("rtl");
        expect(root.getAttribute("data-reduced-motion")).toBe("always");
        expect(root.style.getPropertyValue("--cup-focus-ring")).toBe("none");
        expect(root.style.getPropertyValue("--cup-min-touch-target")).toBe("48px");
        expect(root.style.getPropertyValue("--cup-tint")).toBe("#88bbff");
    });

    it("supports runtime surface style and liquid glass updates with DOM synchronization", () => {
        const media = mockBreakpointObserver();
        TestBed.configureTestingModule({
            providers: [provideCupertino(), { provide: BreakpointObserver, useValue: media.observer }],
        });

        const surface = TestBed.inject(SurfaceStyleService);
        const glass = TestBed.inject(LiquidGlassService);
        const config = TestBed.inject(CupConfigService);
        const root = TestBed.inject(DOCUMENT).documentElement;
        TestBed.tick();

        glass.setVariant("clear");
        glass.setPreferredLook("tinted");
        TestBed.tick();

        expect(config.liquidGlassVariant()).toBe("clear");
        expect(config.liquidGlassPreferredLook()).toBe("tinted");
        // base surface clears glass datasets reactively
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["liquidGlassVariant"]).toBeUndefined();

        surface.useLiquidGlass();
        TestBed.tick();

        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["surfaceStyle"]).toBe("liquid-glass");
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["liquidGlassVariant"]).toBe("clear");
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["liquidGlassLook"]).toBe("tinted");

        surface.useBase();
        TestBed.tick();

        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["surfaceStyle"]).toBe("base");
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["liquidGlassVariant"]).toBeUndefined();
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["liquidGlassLook"]).toBeUndefined();
    });

    it("derives viewport and capability signals reactively", () => {
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

        expect(service.isMobile()).toBe(true);
        expect(service.isCompact()).toBe(true);
        expect(service.hasHover()).toBe(false);
        expect(service.hasTouch()).toBe(true);
    });

    it("keeps CupFormControl as a reusable signal-based CVA base", () => {
        const control = new TestControl();
        let changed: number | null = null;
        let touched = false;

        control.registerOnChange((value) => {
            changed = value;
        });
        control.registerOnTouched(() => {
            touched = true;
        });

        control.writeValue(12);
        control.setDisabledState(true);
        control.emit(24);
        control.touch();

        expect(control.value()).toBe(24);
        expect(control.disabled()).toBe(true);
        expect(changed).toBe(24);
        expect(touched).toBe(true);
    });

    it("exposes a signal-first two-way model via CupModelControl", () => {
        const fixture = TestBed.createComponent(ModelControlHost);
        const control = fixture.componentInstance;
        fixture.detectChanges();

        expect(control.value()).toBeNull();
        expect(control.disabled()).toBe(false);

        control.value.set(42);
        fixture.detectChanges();
        expect(control.value()).toBe(42);
    });

    it("binds Liquid Glass styles from the current token contract", () => {
        const fixture = TestBed.createComponent(LiquidGlassHost);
        fixture.detectChanges();

        const directive = fixture.debugElement.children[0].injector.get(
            LiquidGlassDirective,
        ) as LiquidGlassDirective & {
            styles: () => { background: string; border: string; boxShadow: string };
        };

        expect(directive.styles().background).toBe("var(--cup-glass-bg-md)");
        expect(directive.styles().boxShadow).toContain("var(--cup-glass-shadow-md)");

        const clearFixture = TestBed.createComponent(ClearLiquidGlassHost);
        clearFixture.detectChanges();
        const clearDirective = clearFixture.debugElement.children[0].injector.get(
            LiquidGlassDirective,
        ) as LiquidGlassDirective & {
            styles: () => { background: string; border: string };
        };

        expect(clearDirective.styles().background).toBe("var(--cup-glass-clear-bg)");
        expect(clearDirective.styles().border).toBe("var(--cup-glass-clear-border)");
    });

    it("exposes FocusMonitor origin as a signal and stops cleanly", () => {
        const origin$ = new Subject<FocusOrigin>();
        const stopMonitoring = vi.fn();
        const focusVia = vi.fn();

        TestBed.configureTestingModule({
            providers: [
                FocusService,
                {
                    provide: FocusMonitor,
                    useValue: {
                        monitor: () => origin$.asObservable(),
                        stopMonitoring,
                        focusVia,
                    } as Partial<FocusMonitor>,
                },
            ],
        });

        const service = TestBed.inject(FocusService);
        const element = document.createElement("button");
        const origin = service.monitor(element);

        expect(origin()).toBeNull();

        origin$.next("keyboard");
        expect(origin()).toBe("keyboard");

        service.focusVia(element, "program");
        expect(focusVia).toHaveBeenCalledWith(element, "program", undefined);

        service.stopMonitoring(element);
        expect(stopMonitoring).toHaveBeenCalledWith(element);

        origin$.next("mouse");
        expect(origin()).toBe("keyboard");
    });

    it("delegates announcements to the CDK LiveAnnouncer", () => {
        const announce = vi.fn().mockResolvedValue(undefined);
        const clear = vi.fn();

        TestBed.configureTestingModule({
            providers: [
                AnnouncerService,
                { provide: LiveAnnouncer, useValue: { announce, clear } as Partial<LiveAnnouncer> },
            ],
        });

        const service = TestBed.inject(AnnouncerService);

        service.polite("saved");
        expect(announce).toHaveBeenCalledWith("saved", "polite");

        service.assertive("error");
        expect(announce).toHaveBeenCalledWith("error", "assertive");

        service.announce("timed", "polite", 2000);
        expect(announce).toHaveBeenCalledWith("timed", "polite", 2000);

        service.clear();
        expect(clear).toHaveBeenCalledTimes(1);
    });

    it("creates focus traps, auto-captures focus, and releases them", () => {
        const focusInitialElementWhenReady = vi.fn();
        const destroy = vi.fn();
        const trap = { focusInitialElementWhenReady, destroy } as unknown as ConfigurableFocusTrap;
        const create = vi.fn().mockReturnValue(trap);

        TestBed.configureTestingModule({
            providers: [
                FocusTrapService,
                {
                    provide: ConfigurableFocusTrapFactory,
                    useValue: { create } as Partial<ConfigurableFocusTrapFactory>,
                },
            ],
        });

        const service = TestBed.inject(FocusTrapService);
        const element = document.createElement("div");
        const created = service.create(element);

        expect(create).toHaveBeenCalledWith(element, { defer: false });
        expect(focusInitialElementWhenReady).toHaveBeenCalledTimes(1);
        expect(created).toBe(trap);

        service.release(trap);
        expect(destroy).toHaveBeenCalledTimes(1);
    });

    it("skips focus-trap auto-capture when disabled", () => {
        const focusInitialElementWhenReady = vi.fn();
        const trap = {
            focusInitialElementWhenReady,
            destroy: vi.fn(),
        } as unknown as ConfigurableFocusTrap;

        TestBed.configureTestingModule({
            providers: [
                FocusTrapService,
                {
                    provide: ConfigurableFocusTrapFactory,
                    useValue: { create: () => trap } as Partial<ConfigurableFocusTrapFactory>,
                },
            ],
        });

        const service = TestBed.inject(FocusTrapService);
        service.create(document.createElement("div"), { defer: true, autoCapture: false });

        expect(focusInitialElementWhenReady).not.toHaveBeenCalled();
    });

    it("builds a signal-driven FocusKeyManager that focuses the active option", () => {
        TestBed.configureTestingModule({ providers: [KeyManagerService] });
        const service = TestBed.inject(KeyManagerService);

        const focused: number[] = [];
        const makeOption = (id: number): FocusableOption => ({
            focus: () => focused.push(id),
        });
        const items = signal<readonly FocusableOption[]>([makeOption(0), makeOption(1), makeOption(2)]);

        const manager = service.createFocusKeyManager(items);
        manager.setActiveItem(1);

        expect(manager.activeItemIndex).toBe(1);
        expect(focused).toEqual([1]);

        manager.destroy();
    });
});
