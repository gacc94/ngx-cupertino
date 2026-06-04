import { ComponentFixture, TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { CupToggle } from "./cup-toggle";

describe("CupToggle", () => {
    let fixture: ComponentFixture<CupToggle>;
    let component: CupToggle;

    beforeEach(() => {
        fixture = TestBed.createComponent(CupToggle);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should render switch button", () => {
        const btn = fixture.nativeElement.querySelector(".cup-toggle-switch");
        expect(btn).toBeTruthy();
    });

    it("should render label when provided", () => {
        fixture.componentRef.setInput("label", "Wi-Fi");
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".cup-toggle-label-text");
        expect(label?.textContent?.trim()).toBe("Wi-Fi");
    });

    it("should not render label when not provided", () => {
        const label = fixture.nativeElement.querySelector(".cup-toggle-label-text");
        expect(label).toBeNull();
    });

    it("should toggle checked on click", () => {
        expect(component.checked()).toBe(false);
        const btn = fixture.nativeElement.querySelector(".cup-toggle-switch");
        (btn as HTMLElement).click();
        fixture.detectChanges();
        expect(component.checked()).toBe(true);
    });

    it("should not toggle when disabled", () => {
        component.setDisabledState(true);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-toggle-switch") as HTMLElement;
        btn.click();
        expect(component.checked()).toBe(false);
    });

    it("should have ARIA switch role", () => {
        const btn = fixture.nativeElement.querySelector(".cup-toggle-switch");
        expect(btn!.getAttribute("role")).toBe("switch");
    });

    it("should set aria-checked when toggled", () => {
        const btn = fixture.nativeElement.querySelector(".cup-toggle-switch");
        expect(btn!.getAttribute("aria-checked")).toBe("false");
        (btn as HTMLElement).click();
        fixture.detectChanges();
        expect(btn!.getAttribute("aria-checked")).toBe("true");
    });

    it("should set aria-disabled when disabled", () => {
        component.setDisabledState(true);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-toggle-switch");
        expect(btn!.getAttribute("aria-disabled")).toBe("true");
    });

    it("should call onChange when toggled", () => {
        let changedValue: boolean | null = null;
        component.registerOnChange((v) => (changedValue = v));
        const btn = fixture.nativeElement.querySelector(".cup-toggle-switch");
        (btn as HTMLElement).click();
        expect(changedValue).toBe(true);
    });

    it("should call writeValue to update checked", () => {
        component.writeValue(true);
        expect(component.checked()).toBe(true);
    });

    it("should call setDisabledState", () => {
        component.setDisabledState(true);
        expect(component.disabled()).toBe(true);
    });
});
