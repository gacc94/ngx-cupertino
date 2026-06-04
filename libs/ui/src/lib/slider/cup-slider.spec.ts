import { ComponentFixture, TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { CupSlider } from "./cup-slider";

describe("CupSlider", () => {
    let fixture: ComponentFixture<CupSlider>;
    let component: CupSlider;

    beforeEach(() => {
        fixture = TestBed.createComponent(CupSlider);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should render track and thumb", () => {
        const track = fixture.nativeElement.querySelector(".cup-slider-track");
        const fill = fixture.nativeElement.querySelector(".cup-slider-fill");
        const thumb = fixture.nativeElement.querySelector(".cup-slider-thumb");
        expect(track).toBeTruthy();
        expect(fill).toBeTruthy();
        expect(thumb).toBeTruthy();
    });

    it("should render native range input", () => {
        const native = fixture.nativeElement.querySelector(".cup-slider-native");
        expect(native).toBeTruthy();
        expect(native!.getAttribute("type")).toBe("range");
    });

    it("should have default value of 0", () => {
        expect(component.value()).toBe(0);
    });

    it("should have default min/max/step", () => {
        expect(component.min()).toBe(0);
        expect(component.max()).toBe(100);
        expect(component.step()).toBe(1);
    });

    it("should set min/max/step on native input", () => {
        fixture.componentRef.setInput("min", 10);
        fixture.componentRef.setInput("max", 90);
        fixture.componentRef.setInput("step", 5);
        fixture.detectChanges();
        const native = fixture.nativeElement.querySelector(".cup-slider-native");
        expect(native!.getAttribute("min")).toBe("10");
        expect(native!.getAttribute("max")).toBe("90");
        expect(native!.getAttribute("step")).toBe("5");
    });

    it("should calculate percentage correctly", () => {
        fixture.componentRef.setInput("min", 0);
        fixture.componentRef.setInput("max", 200);
        component.writeValue(50);
        fixture.detectChanges();
        expect(component.percentage()).toBe(25);
    });

    it("should update fill width from percentage", () => {
        component.writeValue(50);
        fixture.detectChanges();
        const fill = fixture.nativeElement.querySelector(".cup-slider-fill") as HTMLElement;
        expect(fill.style.width).toBe("50%");
    });

    it("should call onChange via native input", () => {
        let changed: number | null = null;
        component.registerOnChange((v) => (changed = v));
        const native = fixture.nativeElement.querySelector(".cup-slider-native") as HTMLInputElement;
        native.value = "75";
        native.dispatchEvent(new Event("input"));
        expect(changed).toBe(75);
    });

    it("should handle ArrowRight key on thumb", () => {
        component.writeValue(50);
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".cup-slider-thumb");
        thumb!.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
        expect(component.value()).toBe(51);
    });

    it("should handle ArrowLeft key on thumb", () => {
        component.writeValue(50);
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".cup-slider-thumb");
        thumb!.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
        expect(component.value()).toBe(49);
    });

    it("should handle Home key on thumb", () => {
        component.writeValue(50);
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".cup-slider-thumb");
        thumb!.dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }));
        expect(component.value()).toBe(0);
    });

    it("should handle End key on thumb", () => {
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".cup-slider-thumb");
        thumb!.dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));
        expect(component.value()).toBe(100);
    });

    it("should have ARIA slider attributes on thumb", () => {
        const thumb = fixture.nativeElement.querySelector(".cup-slider-thumb");
        expect(thumb!.getAttribute("role")).toBe("slider");
        expect(thumb!.getAttribute("aria-valuemin")).toBe("0");
        expect(thumb!.getAttribute("aria-valuemax")).toBe("100");
        expect(thumb!.getAttribute("aria-valuenow")).toBe("0");
    });

    it("should render label when provided", () => {
        fixture.componentRef.setInput("label", "Volume");
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".cup-slider-label");
        expect(label?.textContent?.trim()).toBe("Volume");
    });

    it("should apply disabled class", () => {
        component.setDisabledState(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("cup-disabled")).toBe(true);
    });

    it("should call writeValue", () => {
        component.writeValue(42);
        expect(component.value()).toBe(42);
    });

    it("should call setDisabledState", () => {
        component.setDisabledState(true);
        expect(component.disabled()).toBe(true);
    });
});
