import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { afterEach, describe, expect, it } from "vitest";
import type { CupLiquidGlassVariant } from "../types/cupertino-config.types";
import { LiquidGlassDirective } from "./liquid-glass.directive";

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

describe("LiquidGlassDirective", () => {
    afterEach(() => {
        TestBed.resetTestingModule();
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
