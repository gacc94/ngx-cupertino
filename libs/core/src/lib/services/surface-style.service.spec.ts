import { BreakpointObserver } from "@angular/cdk/layout";
import { DOCUMENT } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { afterEach, describe, expect, it } from "vitest";
import { provideCupertino } from "../providers/cupertino.provider";
import { mockBreakpointObserver, resetRoot } from "../testing";
import { CupConfigService } from "./config.service";
import { LiquidGlassService } from "./liquid-glass.service";
import { SurfaceStyleService } from "./surface-style.service";

describe("SurfaceStyleService / LiquidGlassService", () => {
    afterEach(() => {
        resetRoot(TestBed.inject(DOCUMENT));
        TestBed.resetTestingModule();
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
});
