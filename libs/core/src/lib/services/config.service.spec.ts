import { TestBed } from "@angular/core/testing";
import { afterEach, describe, expect, it } from "vitest";
import { DEFAULT_CUP_CONFIG } from "../constants/cupertino-default-config";
import { CUP_CONFIG } from "../providers/cupertino.provider";
import { CupConfigService } from "./config.service";

describe("CupConfigService", () => {
    afterEach(() => {
        TestBed.resetTestingModule();
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
});
