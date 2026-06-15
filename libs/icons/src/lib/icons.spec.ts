import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CupIcon } from "./cup-icon";
import { LUCIDE_ICONS } from "./lucide-icon-map";
import { provideCupIcons } from "./provide-icons";
import { SF_SYMBOL_MAP } from "./sf-symbol-map";

afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
});

describe("SF_SYMBOL_MAP", () => {
    it("should not be empty", () => {
        expect(Object.keys(SF_SYMBOL_MAP).length).toBeGreaterThan(0);
    });

    it("should have all values as non-empty strings", () => {
        for (const [key, value] of Object.entries(SF_SYMBOL_MAP)) {
            expect(typeof value, `Value for "${key}" should be a string`).toBe("string");
            expect(value.length, `Value for "${key}" should not be empty`).toBeGreaterThan(0);
        }
    });

    it("should map every .fill key to the same Lucide icon as its exact base key (same geometry)", () => {
        // Fill is applied by the component, not by swapping the glyph — so when an exact base key
        // exists, base and fill MUST resolve to the same Lucide icon. Compound symbols whose base is
        // not itself a key (e.g. "xmark.circle.fill" → base "xmark.circle") are skipped: they are
        // distinct symbols, not a fill of the simple base.
        const map = SF_SYMBOL_MAP as Record<string, string>;
        for (const fillKey of Object.keys(map).filter((k) => k.endsWith(".fill"))) {
            const baseKey = fillKey.slice(0, -".fill".length);
            if (!(baseKey in map)) continue;
            expect(
                map[fillKey],
                `"${fillKey}" → "${map[fillKey]}" must match its base "${baseKey}" → "${map[baseKey]}" (geometry drift)`,
            ).toBe(map[baseKey]);
        }
    });
});

describe("LUCIDE_ICONS", () => {
    it("should not be empty", () => {
        expect(Object.keys(LUCIDE_ICONS).length).toBeGreaterThan(0);
    });

    it("should have entry for every SF_SYMBOL_MAP value", () => {
        const values = new Set(Object.values(SF_SYMBOL_MAP));
        for (const name of values) {
            expect(
                LUCIDE_ICONS[name as keyof typeof LUCIDE_ICONS],
                `SF_SYMBOL_MAP references "${name}" but missing in LUCIDE_ICONS`,
            ).toBeDefined();
        }
    });
});

describe("CupIcon", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideCupIcons()],
        });
    });

    it("should render with SF Symbol name", () => {
        @Component({
            template: `<cup-icon name="star" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const svg = fixture.nativeElement.querySelector("svg");
        expect(svg).toBeTruthy();
    });

    it("should render with Lucide name", () => {
        @Component({
            template: `<cup-icon name="home" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const svg = fixture.nativeElement.querySelector("svg");
        expect(svg).toBeTruthy();
    });

    it("should resolve .fill variant with isFilled", () => {
        @Component({
            template: `<cup-icon name="star.fill" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const svg = fixture.nativeElement.querySelector("svg");
        expect(svg).toBeTruthy();
        expect(svg.getAttribute("fill")).toBe("currentColor");
    });

    it("should activate isFilled via fill input without .fill in name", () => {
        @Component({
            template: `<cup-icon name="star" [fill]="true" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const svg = fixture.nativeElement.querySelector("svg");
        expect(svg.getAttribute("fill")).toBe("currentColor");
    });

    it("should set role and aria-label when ariaLabel is provided", () => {
        @Component({
            template: `<cup-icon name="bell" ariaLabel="Notifications" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-icon");
        expect(host.getAttribute("role")).toBe("img");
        expect(host.getAttribute("aria-label")).toBe("Notifications");
    });

    it("should set aria-hidden when no ariaLabel", () => {
        @Component({
            template: `<cup-icon name="bell" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-icon");
        expect(host.getAttribute("aria-hidden")).toBe("true");
        expect(host.getAttribute("role")).toBeNull();
    });

    it("should apply cup-small host class for sm size and not forward a CSS var to the SVG", () => {
        @Component({
            template: `<cup-icon name="star" size="sm" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-icon");
        expect(host.classList.contains("cup-small")).toBe(true);
        // Named sizes are dimensioned by the host (token CSS); the SVG must not receive a var() width.
        const svg = fixture.nativeElement.querySelector("svg");
        expect(svg.getAttribute("width") ?? "").not.toContain("var(");
    });

    it("should not forward a CSS var to the SVG for lg size (host owns dimension)", () => {
        @Component({
            template: `<cup-icon name="star" size="lg" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-icon");
        expect(host.classList.contains("cup-large")).toBe(true);
        const svg = fixture.nativeElement.querySelector("svg");
        expect(svg.getAttribute("width") ?? "").not.toContain("var(");
    });

    it("should not apply size host classes for md size", () => {
        @Component({
            template: `<cup-icon name="star" size="md" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-icon");
        expect(host.classList.contains("cup-small")).toBe(false);
        expect(host.classList.contains("cup-large")).toBe(false);
    });

    it("should apply cup-large host class for lg size", () => {
        @Component({
            template: `<cup-icon name="star" size="lg" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-icon");
        expect(host.classList.contains("cup-large")).toBe(true);
    });

    it("should default strokeWidth to 1.75", () => {
        @Component({
            template: `<cup-icon name="star" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const svg = fixture.nativeElement.querySelector("svg");
        expect(svg.getAttribute("stroke-width")).toBe("1.75");
    });

    it("should support numeric size as an HTML attribute and keep host/svg in sync", () => {
        @Component({
            template: `<cup-icon name="star" size="32" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-icon") as HTMLElement;
        const svg = fixture.nativeElement.querySelector("svg");

        expect(host.style.width).toBe("32px");
        expect(host.style.height).toBe("32px");
        expect(svg.getAttribute("width")).toBe("32");
        expect(svg.getAttribute("height")).toBe("32");
    });

    it("should pass color through to the rendered icon", () => {
        @Component({
            template: `<cup-icon name="star" color="rebeccapurple" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const svg = fixture.nativeElement.querySelector("svg");
        expect(svg.getAttribute("stroke")).toBe("rebeccapurple");
    });

    it("should warn when a built-in icon is omitted from a subset registration", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

        TestBed.configureTestingModule({
            imports: [CupIcon],
            providers: [provideCupIcons({ names: ["heart"] })],
        });

        @Component({
            template: `<cup-icon name="star" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        expect(() => fixture.detectChanges()).toThrowError("Unable to resolve icon 'star'");

        expect(warn).toHaveBeenCalledWith(
            '[cup-icon] "star" resolved to built-in icon "star", but it was not registered by provideCupIcons(). Include it in provideCupIcons({ names: [...] }) or register it manually via provideLucideIcons().',
        );
    });
});

describe("provideCupIcons", () => {
    it("should return a provider without errors", () => {
        const result = provideCupIcons();
        expect(result).toBeDefined();
    });

    it("should support registering a subset of built-in icons", () => {
        const result = provideCupIcons({ names: ["star", "heart"] });
        expect(result).toBeDefined();
    });

    it("should warn for unknown icon names passed through the subset option", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

        const result = provideCupIcons({ names: ["star", "not-real" as never] });

        expect(result).toBeDefined();
        expect(warn).toHaveBeenCalledWith(
            '[cup-icon] provideCupIcons() received unknown built-in icon name "not-real".',
        );
    });
});
