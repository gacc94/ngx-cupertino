import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { describe, expect, it } from "vitest";
import { CupToggle } from "./cup-toggle";

@Component({
    template: "<cup-toggle>Wi-Fi</cup-toggle>",
    imports: [CupToggle],
})
class ToggleWithLabel {}

@Component({
    template: '<cup-toggle ariaLabel="Wi-Fi" />',
    imports: [CupToggle],
})
class ToggleAriaLabel {}

@Component({
    template: '<cup-toggle size="sm" />',
    imports: [CupToggle],
})
class ToggleSmall {}

@Component({
    template: '<cup-toggle size="lg" />',
    imports: [CupToggle],
})
class ToggleLarge {}

describe("CupToggle", () => {
    it("should render with default state (unchecked)", () => {
        const fixture = TestBed.createComponent(CupToggle);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-track");
        expect(btn).toBeTruthy();
        expect(btn.getAttribute("aria-checked")).toBe("false");
    });

    it("should render checked via model.set(true)", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.checked.set(true);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-track");
        expect(btn.getAttribute("aria-checked")).toBe("true");
    });

    it("should render label text via ng-content", () => {
        const fixture = TestBed.createComponent(ToggleWithLabel);
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".cup-label");
        expect(label?.textContent?.trim()).toBe("Wi-Fi");
    });

    it("should toggle on click", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.checked()).toBe(false);
        const btn = fixture.nativeElement.querySelector(".cup-track") as HTMLElement;
        btn.click();
        fixture.detectChanges();
        expect(component.checked()).toBe(true);
    });

    it("should not toggle when disabled", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-track") as HTMLElement;
        btn.click();
        expect(component.checked()).toBe(false);
    });

    it('should have role="switch"', () => {
        const fixture = TestBed.createComponent(CupToggle);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-track");
        expect(btn.getAttribute("role")).toBe("switch");
    });

    it("should set aria-checked to true when checked", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        component.checked.set(true);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-track");
        expect(btn.getAttribute("aria-checked")).toBe("true");
    });

    it("should set aria-disabled when disabled", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-track");
        expect(btn.getAttribute("aria-disabled")).toBe("true");
    });

    it("should set aria-label when provided", () => {
        const fixture = TestBed.createComponent(ToggleAriaLabel);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-track");
        expect(btn.getAttribute("aria-label")).toBe("Wi-Fi");
    });

    it("should apply cup-small class for sm size", () => {
        const fixture = TestBed.createComponent(ToggleSmall);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-toggle");
        expect(host.classList.contains("cup-small")).toBe(true);
    });

    it("should apply cup-large class for lg size", () => {
        const fixture = TestBed.createComponent(ToggleLarge);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-toggle");
        expect(host.classList.contains("cup-large")).toBe(true);
    });

    it("should call onChange when toggled", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        let changedValue: boolean | null = null;
        component.registerOnChange((v) => (changedValue = v));
        const btn = fixture.nativeElement.querySelector(".cup-track") as HTMLElement;
        btn.click();
        expect(changedValue).toBe(true);
    });

    it("should write value via writeValue", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.writeValue(true);
        expect(component.checked()).toBe(true);
    });

    it("should apply cup-disabled class when disabled", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("cup-disabled")).toBe(true);
    });

    it("should not call onChange when disabled", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        let onChangeCalled = false;
        component.registerOnChange(() => (onChangeCalled = true));
        const btn = fixture.nativeElement.querySelector(".cup-track") as HTMLElement;
        btn.click();
        expect(onChangeCalled).toBe(false);
    });

    it("should apply cup-checked class when checked", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.checked.set(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("cup-checked")).toBe(true);
    });

    it("should disable the button element when disabled", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-track");
        expect(btn.disabled).toBe(true);
    });
});
