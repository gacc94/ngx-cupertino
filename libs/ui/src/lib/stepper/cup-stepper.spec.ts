import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CupIcon } from "@ngx-cupertino/icons";
import { beforeEach, describe, expect, it } from "vitest";
import { CupStepper } from "./cup-stepper";

describe("CupStepper", () => {
    let fixture: ComponentFixture<CupStepper>;
    let component: CupStepper;

    beforeEach(() => {
        TestBed.overrideComponent(CupStepper, {
            remove: { imports: [CupIcon] },
        });
        fixture = TestBed.createComponent(CupStepper);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should render input element", () => {
        const input = fixture.nativeElement.querySelector(".cup-stepper-input");
        expect(input).toBeTruthy();
    });

    it("should render increment and decrement buttons", () => {
        const inc = fixture.nativeElement.querySelector(".cup-stepper-increment");
        const dec = fixture.nativeElement.querySelector(".cup-stepper-decrement");
        expect(inc).toBeTruthy();
        expect(dec).toBeTruthy();
    });

    it("should have default value of 0", () => {
        expect(component.value()).toBe(0);
    });

    it("should increment value on button click", () => {
        const inc = fixture.nativeElement.querySelector(".cup-stepper-increment") as HTMLElement;
        inc.click();
        fixture.detectChanges();
        expect(component.value()).toBe(1);
    });

    it("should decrement value on button click", () => {
        component.writeValue(5);
        fixture.detectChanges();
        const dec = fixture.nativeElement.querySelector(".cup-stepper-decrement") as HTMLElement;
        dec.click();
        fixture.detectChanges();
        expect(component.value()).toBe(4);
    });

    it("should not decrement below min", () => {
        const dec = fixture.nativeElement.querySelector(".cup-stepper-decrement") as HTMLButtonElement;
        expect(dec.disabled).toBe(true);
        dec.click();
        expect(component.value()).toBe(0);
    });

    it("should not increment above max", () => {
        fixture.componentRef.setInput("max", 5);
        component.writeValue(5);
        fixture.detectChanges();
        const inc = fixture.nativeElement.querySelector(".cup-stepper-increment") as HTMLButtonElement;
        expect(inc.disabled).toBe(true);
    });

    it("should compute atMin correctly", () => {
        expect(component.atMin()).toBe(true);
        component.writeValue(5);
        fixture.detectChanges();
        expect(component.atMin()).toBe(false);
    });

    it("should compute atMax correctly", () => {
        fixture.componentRef.setInput("max", 10);
        component.writeValue(10);
        fixture.detectChanges();
        expect(component.atMax()).toBe(true);
    });

    it("should hide buttons when showButtons is false", () => {
        fixture.componentRef.setInput("showButtons", false);
        fixture.detectChanges();
        const inc = fixture.nativeElement.querySelector(".cup-stepper-increment");
        const dec = fixture.nativeElement.querySelector(".cup-stepper-decrement");
        expect(inc).toBeNull();
        expect(dec).toBeNull();
    });

    it("should render label when provided", () => {
        fixture.componentRef.setInput("label", "Quantity");
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".cup-stepper-label");
        expect(label?.textContent?.trim()).toBe("Quantity");
    });

    it("should call onChange on input event", () => {
        let changed: number | null = null;
        component.registerOnChange((v) => (changed = v));
        const input = fixture.nativeElement.querySelector(".cup-stepper-input") as HTMLInputElement;
        input.value = "42";
        input.dispatchEvent(new Event("input"));
        expect(changed).toBe(42);
    });

    it("should call onChange on increment", () => {
        let changed: number | null = null;
        component.registerOnChange((v) => (changed = v));
        const inc = fixture.nativeElement.querySelector(".cup-stepper-increment") as HTMLElement;
        inc.click();
        expect(changed).toBe(1);
    });

    it("should clamp value to max on input", () => {
        fixture.componentRef.setInput("max", 10);
        const input = fixture.nativeElement.querySelector(".cup-stepper-input") as HTMLInputElement;
        input.value = "999";
        input.dispatchEvent(new Event("input"));
        expect(component.value()).toBe(10);
    });

    it("should handle ArrowUp key", () => {
        const input = fixture.nativeElement.querySelector(".cup-stepper-input");
        input!.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
        expect(component.value()).toBe(1);
    });

    it("should handle ArrowDown key", () => {
        component.writeValue(5);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-stepper-input");
        input!.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
        expect(component.value()).toBe(4);
    });

    it("should have ARIA spinbutton role", () => {
        const input = fixture.nativeElement.querySelector(".cup-stepper-input");
        expect(input!.getAttribute("role")).toBe("spinbutton");
        expect(input!.getAttribute("aria-valuemin")).toBe("0");
        expect(input!.getAttribute("aria-valuemax")).toBe("100");
        expect(input!.getAttribute("aria-valuenow")).toBe("0");
    });

    it("should set aria-label from label input", () => {
        fixture.componentRef.setInput("label", "Quantity");
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-stepper-input");
        expect(input!.getAttribute("aria-label")).toBe("Quantity");
    });

    it("should call writeValue", () => {
        component.writeValue(25);
        expect(component.value()).toBe(25);
    });

    it("should call setDisabledState", () => {
        component.setDisabledState(true);
        expect(component.disabled()).toBe(true);
    });

    it("should apply disabled class via host", () => {
        component.setDisabledState(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("cup-disabled")).toBe(true);
    });
});
