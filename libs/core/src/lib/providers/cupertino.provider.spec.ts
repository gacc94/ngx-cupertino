import { BreakpointObserver } from "@angular/cdk/layout";
import { DOCUMENT } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeService } from "../services/theme.service";
import { mockBreakpointObserver, resetRoot } from "../testing";
import { provideCupertino } from "./cupertino.provider";

describe("provideCupertino", () => {
    afterEach(() => {
        resetRoot(TestBed.inject(DOCUMENT));
        TestBed.resetTestingModule();
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
});
