import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
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

@Component({
    template: '<cup-toggle labelPosition="start">AirDrop</cup-toggle>',
    imports: [CupToggle],
})
class ToggleLabelStart {}

describe("CupToggle", () => {
    it("should render with default state (unchecked)", () => {
        const fixture = TestBed.createComponent(CupToggle);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".track");
        expect(btn).toBeTruthy();
        expect(btn.getAttribute("aria-checked")).toBe("false");
    });

    it("should render checked via model.set(true)", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.checked.set(true);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".track");
        expect(btn.getAttribute("aria-checked")).toBe("true");
    });

    it("should render label text via ng-content", () => {
        const fixture = TestBed.createComponent(ToggleWithLabel);
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".label");
        expect(label?.textContent?.trim()).toBe("Wi-Fi");
    });

    it("should toggle on click", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component.checked()).toBe(false);
        const btn = fixture.nativeElement.querySelector(".track") as HTMLElement;
        btn.click();
        fixture.detectChanges();
        expect(component.checked()).toBe(true);
    });

    it("should not toggle when disabled", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".track") as HTMLElement;
        btn.click();
        expect(component.checked()).toBe(false);
    });

    it('should have role="switch"', () => {
        const fixture = TestBed.createComponent(CupToggle);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".track");
        expect(btn.getAttribute("role")).toBe("switch");
    });

    it("should set aria-checked to true when checked", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        component.checked.set(true);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".track");
        expect(btn.getAttribute("aria-checked")).toBe("true");
    });

    it("should set aria-disabled when disabled", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".track");
        expect(btn.getAttribute("aria-disabled")).toBe("true");
    });

    it("should set aria-label when provided", () => {
        const fixture = TestBed.createComponent(ToggleAriaLabel);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".track");
        expect(btn.getAttribute("aria-label")).toBe("Wi-Fi");
    });

    it("should apply cup-small class for sm size", () => {
        const fixture = TestBed.createComponent(ToggleSmall);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-toggle");
        expect(host.classList.contains("sm")).toBe(true);
    });

    it("should apply cup-large class for lg size", () => {
        const fixture = TestBed.createComponent(ToggleLarge);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-toggle");
        expect(host.classList.contains("lg")).toBe(true);
    });

    it("should apply label-start class when labelPosition is start", () => {
        const fixture = TestBed.createComponent(ToggleLabelStart);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-toggle");
        expect(host.classList.contains("label-start")).toBe(true);
    });

    it("should call onChange when toggled", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        let changedValue: boolean | null = null;
        component.registerOnChange((v) => (changedValue = v));
        const btn = fixture.nativeElement.querySelector(".track") as HTMLElement;
        btn.click();
        expect(changedValue).toBe(true);
    });

    it("should write value via writeValue", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.writeValue(true);
        expect(component.checked()).toBe(true);
    });

    it("should update checked state when writeValue changes from true to false", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.writeValue(true);
        component.writeValue(false);
        expect(component.checked()).toBe(false);
    });

    it("should apply cup-disabled class when disabled", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("disabled")).toBe(true);
    });

    it("should not call onChange when disabled", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        let onChangeCalled = false;
        component.registerOnChange(() => (onChangeCalled = true));
        const btn = fixture.nativeElement.querySelector(".track") as HTMLElement;
        btn.click();
        expect(onChangeCalled).toBe(false);
    });

    it("should apply cup-checked class when checked", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.checked.set(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("checked")).toBe(true);
    });

    it("should disable the button element when disabled", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".track");
        expect(btn.disabled).toBe(true);
    });

    it("should toggle on Space keydown", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        fixture.debugElement.query(By.css(".track")).triggerEventHandler("keydown", {
            key: " ",
            preventDefault() {},
        });
        fixture.detectChanges();

        expect(component.checked()).toBe(true);
    });

    it("should call onTouched when toggled", () => {
        const fixture = TestBed.createComponent(CupToggle);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        let touched = false;
        component.registerOnTouched(() => {
            touched = true;
        });

        const btn = fixture.nativeElement.querySelector(".track") as HTMLElement;
        btn.click();

        expect(touched).toBe(true);
    });
});
