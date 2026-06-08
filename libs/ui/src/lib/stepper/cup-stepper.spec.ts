import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { provideCupIcons } from "@ngx-cupertino/icons";
import { describe, expect, it } from "vitest";
import { CupStepper } from "./cup-stepper";

class PointerEvent extends Event {
    pointerId = 1;
}

@Component({
    template: '<cup-stepper label="Quantity" />',
    imports: [CupStepper],
})
class LabelHost {}

@Component({
    template: '<cup-stepper [showInput]="false" />',
    imports: [CupStepper],
})
class NoShowInputHost {}

describe("CupStepper", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideCupIcons()],
        });
    });

    it("should create", () => {
        const fixture = TestBed.createComponent(CupStepper);
        expect(fixture.componentInstance).toBeTruthy();
    });

    it("should render decrement button", () => {
        const fixture = TestBed.createComponent(CupStepper);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-decrement");
        expect(btn).toBeTruthy();
        expect(btn.getAttribute("aria-label")).toBe("Decrease");
    });

    it("should render increment button", () => {
        const fixture = TestBed.createComponent(CupStepper);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-increment");
        expect(btn).toBeTruthy();
        expect(btn.getAttribute("aria-label")).toBe("Increase");
    });

    it("should render input when showInput is true (default)", () => {
        const fixture = TestBed.createComponent(CupStepper);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input");
        expect(input).toBeTruthy();
        expect(input.getAttribute("role")).toBe("spinbutton");
    });

    it("should render value display when showInput is false", () => {
        const fixture = TestBed.createComponent(NoShowInputHost);
        fixture.detectChanges();
        const display = fixture.nativeElement.querySelector(".cup-value-display");
        expect(display).toBeTruthy();
        expect(display.getAttribute("aria-live")).toBe("polite");
        expect(fixture.nativeElement.querySelector(".cup-input")).toBeNull();
    });

    it("should render label when provided", () => {
        const fixture = TestBed.createComponent(LabelHost);
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".cup-label");
        expect(label?.textContent?.trim()).toBe("Quantity");
    });

    it("should not render label when not provided", () => {
        const fixture = TestBed.createComponent(CupStepper);
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".cup-label");
        expect(label).toBeNull();
    });

    it("should increment value by step on increment click", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(5);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-increment") as HTMLElement;
        btn.dispatchEvent(new PointerEvent("pointerdown"));
        fixture.detectChanges();
        expect(component.value()).toBe(6);
    });

    it("should decrement value by step on decrement click", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(5);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-decrement") as HTMLElement;
        btn.dispatchEvent(new PointerEvent("pointerdown"));
        fixture.detectChanges();
        expect(component.value()).toBe(4);
    });

    it("should clamp value to max on increment", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(99);
        fixture.componentRef.setInput("step", 5);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-increment") as HTMLElement;
        btn.dispatchEvent(new PointerEvent("pointerdown"));
        fixture.detectChanges();
        expect(component.value()).toBe(100);
    });

    it("should clamp value to min on decrement", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(1);
        fixture.componentRef.setInput("step", 5);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-decrement") as HTMLElement;
        btn.dispatchEvent(new PointerEvent("pointerdown"));
        fixture.detectChanges();
        expect(component.value()).toBe(0);
    });

    it("should disable decrement at min", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(0);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-decrement") as HTMLButtonElement;
        expect(btn.disabled).toBe(true);
    });

    it("should disable increment at max", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(100);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-increment") as HTMLButtonElement;
        expect(btn.disabled).toBe(true);
    });

    it("should wrap from max to min on increment with wrap", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        fixture.componentRef.setInput("wrap", "");
        component.writeValue(100);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-increment") as HTMLElement;
        btn.dispatchEvent(new PointerEvent("pointerdown"));
        fixture.detectChanges();
        expect(component.value()).toBe(0);
    });

    it("should wrap from min to max on decrement with wrap", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        fixture.componentRef.setInput("wrap", "");
        component.writeValue(0);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-decrement") as HTMLElement;
        btn.dispatchEvent(new PointerEvent("pointerdown"));
        fixture.detectChanges();
        expect(component.value()).toBe(100);
    });

    it("should not disable decrement at min when wrap", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        fixture.componentRef.setInput("wrap", "");
        component.writeValue(0);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-decrement") as HTMLButtonElement;
        expect(btn.disabled).toBe(false);
    });

    it("should update value on input typing", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.value = "42";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(component.value()).toBe(42);
    });

    it("should clamp empty input to min", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(10);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.value = "";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(component.value()).toBe(0);
    });

    it("should call onTouched on blur", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        let touched = false;
        component.registerOnTouched(() => (touched = true));
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.dispatchEvent(new Event("blur"));
        expect(touched).toBe(true);
    });

    it("should call onTouched on input", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        let touched = false;
        component.registerOnTouched(() => (touched = true));
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.value = "5";
        input.dispatchEvent(new Event("input"));
        expect(touched).toBe(true);
    });

    it("should call onTouched on button release", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        let touched = false;
        component.registerOnTouched(() => (touched = true));
        const btn = fixture.nativeElement.querySelector(".cup-increment") as HTMLElement;
        btn.dispatchEvent(new Event("pointerup"));
        expect(touched).toBe(true);
    });

    it("should increment on ArrowUp", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(5);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
        expect(component.value()).toBe(6);
    });

    it("should decrement on ArrowDown", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(5);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
        expect(component.value()).toBe(4);
    });

    it("should increment by 10x on Shift+ArrowUp", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(5);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", shiftKey: true }));
        expect(component.value()).toBe(15);
    });

    it("should decrement by 10x on Shift+ArrowDown", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(50);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", shiftKey: true }));
        expect(component.value()).toBe(40);
    });

    it("should not respond to keyboard when disabled", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        component.writeValue(5);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
        expect(component.value()).toBe(5);
    });

    it("should set aria attributes on input", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(50);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input");
        expect(input.getAttribute("aria-valuemin")).toBe("0");
        expect(input.getAttribute("aria-valuemax")).toBe("100");
        expect(input.getAttribute("aria-valuenow")).toBe("50");
    });

    it("should set aria-label from ariaLabel input", () => {
        const fixture = TestBed.createComponent(CupStepper);
        fixture.componentRef.setInput("ariaLabel", "Item count");
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input");
        expect(input.getAttribute("aria-label")).toBe("Item count");
    });

    it("should apply cup-disabled class when disabled", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("cup-disabled")).toBe(true);
    });

    it("should apply cup-at-min class at min", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(0);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("cup-at-min")).toBe(true);
    });

    it("should apply cup-at-max class at max", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(100);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("cup-at-max")).toBe(true);
    });

    it("should block interaction when disabled", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(5);
        component.setDisabledState(true);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-increment") as HTMLElement;
        btn.dispatchEvent(new PointerEvent("pointerdown"));
        expect(component.value()).toBe(5);
    });

    it("should register onChange via CVA", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        let changed = false;
        component.registerOnChange(() => (changed = true));
        const btn = fixture.nativeElement.querySelector(".cup-increment") as HTMLElement;
        btn.dispatchEvent(new PointerEvent("pointerdown"));
        expect(changed).toBe(true);
    });

    it("should writeValue with clamp", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(150);
        expect(component.value()).toBe(100);
    });

    it("should not call onChange on writeValue", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        let changed = false;
        component.registerOnChange(() => (changed = true));
        component.writeValue(50);
        expect(changed).toBe(false);
    });

    it("should call setDisabledState", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        expect(component.disabled()).toBe(true);
    });

    it("should show rounded value in input for integer step", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(42);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        expect(input.value).toBe("42");
    });

    it("should show decimal value in input for fractional step", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        fixture.componentRef.setInput("step", 0.5);
        component.writeValue(3.5);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        expect(input.value).toBe("3.5");
    });

    it("should auto-repeat on pointerdown", () => {
        const fixture = TestBed.createComponent(CupStepper);
        const component = fixture.componentInstance;
        component.writeValue(0);
        fixture.detectChanges();
        const btn = fixture.nativeElement.querySelector(".cup-increment") as HTMLElement;
        btn.dispatchEvent(new PointerEvent("pointerdown"));
        expect(component.value()).toBe(1);
    });
});
