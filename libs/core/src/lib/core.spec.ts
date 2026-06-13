import { BreakpointObserver, type BreakpointState, Breakpoints } from "@angular/cdk/layout";
import { DOCUMENT } from "@angular/common";
import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BehaviorSubject } from "rxjs";
import { afterEach, describe, expect, it } from "vitest";
import type { CupTintPalette } from "./constants/colors";
import { LiquidGlassDirective, type LiquidGlassVariant } from "./directives/liquid-glass.directive";
import { CUP_CONFIG, provideCupertino } from "./providers/cupertino.provider";
import { DEFAULT_CUP_CONFIG } from "./providers/cupertino-default-config";
import { BreakpointService } from "./services/breakpoint.service";
import { CupConfigService } from "./services/config.service";
import { LiquidGlassService } from "./services/liquid-glass.service";
import { SurfaceStyleService } from "./services/surface-style.service";
import { ThemeService } from "./services/theme.service";
import { CupFormControl } from "./utils/base-cva";

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

function mockMatchMedia(
    doc: Document,
    options: { colorSchemeDark?: boolean; highContrast?: boolean } = {},
): { setColorSchemeDark: (matches: boolean) => void; setHighContrast: (matches: boolean) => void } {
    const win = doc.defaultView;

    if (!win) {
        return {
            setColorSchemeDark() {},
            setHighContrast() {},
        };
    }

    let colorSchemeDark = options.colorSchemeDark ?? false;
    let highContrast = options.highContrast ?? false;
    const listeners = new Map<string, Set<(e: MediaQueryListEvent) => void>>();

    const getMatches = (query: string): boolean => {
        if (query === "(prefers-color-scheme: dark)") {
            return colorSchemeDark;
        }

        if (query === "(prefers-contrast: more)") {
            return highContrast;
        }

        return false;
    };

    const emit = (query: string): void => {
        const callbacks = listeners.get(query);
        if (!callbacks) {
            return;
        }

        const event = { matches: getMatches(query), media: query } as MediaQueryListEvent;
        callbacks.forEach((listener) => {
            listener(event);
        });
    };

    Object.defineProperty(win, "matchMedia", {
        configurable: true,
        writable: true,
        value: (query: string) => ({
            get matches() {
                return getMatches(query);
            },
            media: query,
            onchange: null,
            addEventListener(_type: string, listener: (e: MediaQueryListEvent) => void) {
                const callbacks = listeners.get(query) ?? new Set<(e: MediaQueryListEvent) => void>();
                callbacks.add(listener);
                listeners.set(query, callbacks);
            },
            removeEventListener(_type: string, listener: (e: MediaQueryListEvent) => void) {
                listeners.get(query)?.delete(listener);
            },
            addListener() {},
            removeListener() {},
            dispatchEvent() {
                return true;
            },
        }),
    });

    return {
        setColorSchemeDark(matches: boolean) {
            colorSchemeDark = matches;
            emit("(prefers-color-scheme: dark)");
        },
        setHighContrast(matches: boolean) {
            highContrast = matches;
            emit("(prefers-contrast: more)");
        },
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
    variant: LiquidGlassVariant = "regular";
}

@Component({
    selector: "test-clear-liquid-glass-host",
    template: '<div [cupLiquidGlass]="variant"></div>',
    imports: [LiquidGlassDirective],
})
class ClearLiquidGlassHost {
    variant: LiquidGlassVariant = "clear";
}

describe("@ngx-cupertino/core", () => {
    afterEach(() => {
        resetRoot(TestBed.inject(DOCUMENT));
        TestBed.resetTestingModule();
    });

    it("applies named tints through dataset without inline overrides", () => {
        const service = TestBed.inject(ThemeService);
        const doc = TestBed.inject(DOCUMENT);

        service.setTint("blue");

        expect(service.currentTint()).toBe("blue");
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(doc.documentElement.dataset["tint"]).toBe("blue");
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("");
    });

    it("reapplies custom tint palettes when the theme changes", () => {
        const service = TestBed.inject(ThemeService);
        const doc = TestBed.inject(DOCUMENT);
        const palette: CupTintPalette = { light: "#112233", dark: "#ddeeff" };

        service.setTheme("dark");
        service.setTint(palette);
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#ddeeff");
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(doc.documentElement.dataset["tint"]).toBe("custom");

        service.toggle();

        expect(service.theme()).toBe("light");
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#112233");
    });

    it("reapplies custom tint palettes when contrast changes", () => {
        const service = TestBed.inject(ThemeService);
        const doc = TestBed.inject(DOCUMENT);
        const media = mockMatchMedia(doc);
        const palette: CupTintPalette = {
            light: "#112233",
            dark: "#ddeeff",
            lightHighContrast: "#334455",
            darkHighContrast: "#ffeedd",
        };

        service.setTint(palette);
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#112233");

        media.setHighContrast(true);
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#334455");

        service.setTheme("dark");
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#ffeedd");

        media.setHighContrast(false);
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#ddeeff");
    });

    it("keeps single hex tints stable across contrast changes", () => {
        const service = TestBed.inject(ThemeService);
        const doc = TestBed.inject(DOCUMENT);
        const media = mockMatchMedia(doc);

        service.setTint("#123456");
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#123456");

        media.setHighContrast(true);
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#123456");

        service.setTheme("dark");
        expect(doc.documentElement.style.getPropertyValue("--cup-tint")).toBe("#123456");
    });

    it("exposes typed config selectors and merges nested updates", () => {
        TestBed.configureTestingModule({
            providers: [
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
        TestBed.configureTestingModule({
            providers: [provideCupertino()],
        });

        const doc = TestBed.inject(DOCUMENT);
        mockMatchMedia(doc, { colorSchemeDark: true });

        TestBed.inject(ThemeService).setTheme("auto");
        TestBed.inject(SurfaceStyleService).syncDom();

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
            ],
        });

        TestBed.inject(ThemeService);
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
        TestBed.configureTestingModule({
            providers: [provideCupertino()],
        });

        const surface = TestBed.inject(SurfaceStyleService);
        const glass = TestBed.inject(LiquidGlassService);
        const config = TestBed.inject(CupConfigService);
        const root = TestBed.inject(DOCUMENT).documentElement;

        glass.setVariant("clear");
        glass.setPreferredLook("tinted");

        expect(config.liquidGlassVariant()).toBe("clear");
        expect(config.liquidGlassPreferredLook()).toBe("tinted");
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["liquidGlassVariant"]).toBeUndefined();

        surface.useLiquidGlass();

        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["surfaceStyle"]).toBe("liquid-glass");
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["liquidGlassVariant"]).toBe("clear");
        // biome-ignore lint/complexity/useLiteralKeys: TS requires bracket access for custom data-* attributes
        expect(root.dataset["liquidGlassLook"]).toBe("tinted");

        surface.useBase();

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
});
