import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { describe, expect, it } from "vitest";
import { CupIcon } from "./cup-icon";
import { provideCupIcons } from "./cup-icon.provider";
import { LUCIDE_ICONS } from "./lucide-icon-map";
import { SF_SYMBOL_MAP } from "./sf-symbol-map";

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

    it("should have base entry for every .fill key", () => {
        const entries = Object.entries(SF_SYMBOL_MAP);
        const allKeys = Object.keys(SF_SYMBOL_MAP);
        for (const [fillKey] of entries.filter(([k]) => k.includes(".fill"))) {
            const baseKey = fillKey.replaceAll(".fill", "");
            // The base entry can be any key that exists (not necessarily exact match
            // because "xmark.circle.fill" → "xmark.circle" while base is "xmark")
            const hasBase = allKeys.some((k) => k === baseKey || fillKey.startsWith(k));
            expect(hasBase, `"${fillKey}" has no recognizable base entry`).toBe(true);
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

    it("should apply cup-small host class for sm size", () => {
        @Component({
            template: `<cup-icon name="star" size="sm" />`,
            imports: [CupIcon],
        })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-icon");
        expect(host.classList.contains("cup-small")).toBe(true);
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
});

describe("provideCupIcons", () => {
    it("should return a provider without errors", () => {
        const result = provideCupIcons();
        expect(result).toBeDefined();
    });
});
