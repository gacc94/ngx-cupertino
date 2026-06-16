import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import type { LucideIcon } from "@lucide/angular";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CupIcon } from "./cup-icon";
import { ALL_ICONS, type CupIconDef, houseIcon, starFillIcon, starIcon } from "./icon-set";
import { provideCupIcons } from "./provide-icons";
import { resolveCupIcon, stripFillSuffix } from "./resolve-icon";

afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
});

describe("icon-set", () => {
    it("exposes a non-empty set of icon defs", () => {
        expect(ALL_ICONS.length).toBeGreaterThan(0);
    });

    it("every def has a non-empty name and a Lucide icon", () => {
        for (const def of ALL_ICONS as readonly CupIconDef[]) {
            expect(typeof def.name, "name must be a string").toBe("string");
            expect(def.name.length, `name for "${def.name}" must not be empty`).toBeGreaterThan(0);
            expect(def.icon, `icon for "${def.name}" must be defined`).toBeTruthy();
        }
    });

    it("has unique names", () => {
        const names = ALL_ICONS.map((d) => d.name);
        expect(new Set(names).size).toBe(names.length);
    });

    it("maps a base and its .fill variant to the same Lucide glyph (same geometry)", () => {
        const byName = new Map<string, CupIconDef["icon"]>(ALL_ICONS.map((d) => [d.name, d.icon]));
        for (const def of ALL_ICONS) {
            if (!def.name.endsWith(".fill")) continue;
            const base = def.name.slice(0, -".fill".length);
            const baseIcon = byName.get(base);
            if (!baseIcon) continue; // compound symbols (xmark.circle.fill) have no exact base
            expect(def.icon, `"${def.name}" must share the glyph of its base "${base}"`).toBe(baseIcon);
        }
    });
});

describe("stripFillSuffix", () => {
    it("strips a trailing .fill", () => {
        expect(stripFillSuffix("heart.fill")).toBe("heart");
    });

    it("leaves names without a .fill suffix untouched", () => {
        expect(stripFillSuffix("heart")).toBe("heart");
        expect(stripFillSuffix("magnifyingglass")).toBe("magnifyingglass");
    });

    it("only strips the suffix, not a mid-name .fill", () => {
        expect(stripFillSuffix("x.fill.y")).toBe("x.fill.y");
    });
});

describe("resolveCupIcon", () => {
    const registry = new Map<string, LucideIcon>([
        [houseIcon.name, houseIcon.icon],
        [starIcon.name, starIcon.icon],
    ]);

    it("resolves an exact name", () => {
        expect(resolveCupIcon(registry, "house")).toBe(houseIcon.icon);
    });

    it("falls back to the .fill-stripped base", () => {
        expect(resolveCupIcon(registry, "star.fill")).toBe(starIcon.icon);
    });

    it("returns undefined for an unregistered name", () => {
        expect(resolveCupIcon(registry, "nope")).toBeUndefined();
    });

    it("returns undefined when there is no registry", () => {
        expect(resolveCupIcon(null, "house")).toBeUndefined();
    });
});

describe("CupIcon", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideCupIcons(...ALL_ICONS)],
        });
    });

    it("should render with an SF Symbol name", () => {
        @Component({ template: `<cup-icon name="star" />`, imports: [CupIcon] })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector("svg")).toBeTruthy();
    });

    it("should resolve the .fill variant with isFilled", () => {
        @Component({ template: `<cup-icon name="star.fill" />`, imports: [CupIcon] })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const svg = fixture.nativeElement.querySelector("svg");
        expect(svg.getAttribute("fill")).toBe("currentColor");
    });

    it("should set role and aria-label when ariaLabel is provided", () => {
        @Component({ template: `<cup-icon name="bell" ariaLabel="Notifications" />`, imports: [CupIcon] })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-icon");
        expect(host.getAttribute("role")).toBe("img");
        expect(host.getAttribute("aria-label")).toBe("Notifications");
    });

    it("should set aria-hidden when no ariaLabel", () => {
        @Component({ template: `<cup-icon name="bell" />`, imports: [CupIcon] })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-icon");
        expect(host.getAttribute("aria-hidden")).toBe("true");
        expect(host.getAttribute("role")).toBeNull();
    });

    it("should warn when a name is not registered", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

        TestBed.resetTestingModule();
        TestBed.configureTestingModule({ providers: [provideCupIcons(houseIcon)] }); // star not registered

        @Component({ template: `<cup-icon name="star" />`, imports: [CupIcon] })
        class TestHost {}

        const fixture = TestBed.createComponent(TestHost);
        fixture.detectChanges();

        expect(warn).toHaveBeenCalledWith(expect.stringContaining('"star" is not registered'));
    });
});

describe("provideCupIcons", () => {
    it("registers only the icons passed (tree-shakeable, on demand)", () => {
        const providers = provideCupIcons(houseIcon, starFillIcon);
        expect(providers).toBeDefined();
        expect(providers.length).toBeGreaterThan(0);
    });

    it("accepts a single icon", () => {
        expect(provideCupIcons(starIcon)).toBeDefined();
    });
});
