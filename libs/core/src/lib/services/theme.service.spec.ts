import { BreakpointObserver } from "@angular/cdk/layout";
import { DOCUMENT } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { afterEach, describe, expect, it } from "vitest";
import type { CupTintPalette } from "../constants/colors";
import { type MockBreakpointObserver, mockBreakpointObserver, resetRoot } from "../testing";
import { CUP_CONFIG } from "../tokens/cup-config.token";
import { CupConfigService } from "./config.service";
import { ThemeService } from "./theme.service";

describe("ThemeService", () => {
    afterEach(() => {
        resetRoot(TestBed.inject(DOCUMENT));
        TestBed.resetTestingModule();
    });

    function provideThemeService(media: MockBreakpointObserver): ThemeService {
        TestBed.configureTestingModule({
            providers: [
                ThemeService,
                CupConfigService,
                { provide: CUP_CONFIG, useValue: {} },
                { provide: BreakpointObserver, useValue: media.observer },
            ],
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
});
