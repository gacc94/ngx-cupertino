import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { provideCupIcons } from "@ngx-cupertino/icons";
import { describe, expect, it } from "vitest";
import { CupSlider } from "./cup-slider";

class PointerEvent extends Event {
    declare clientX: number;
    pointerId = 1;

    constructor(type: string, init?: { clientX?: number }) {
        super(type);
        if (init?.clientX) this.clientX = init.clientX;
    }
}
(window as any).PointerEvent = PointerEvent;

@Component({
    template: '<cup-slider label="Volume" />',
    imports: [CupSlider],
})
class LabelHost {}

@Component({
    template: "<cup-slider showValue />",
    imports: [CupSlider],
})
class ShowValueHost {}

@Component({
    template: '<cup-slider minIcon="search" />',
    imports: [CupSlider],
})
class MinIconHost {}

@Component({
    template: '<cup-slider maxIcon="envelope" />',
    imports: [CupSlider],
})
class MaxIconHost {}

@Component({
    template: '<cup-slider ticks="5" />',
    imports: [CupSlider],
})
class TicksHost {}

@Component({
    template: '<cup-slider ariaLabel="Font size" min="12" max="48" />',
    imports: [CupSlider],
})
class AriaLabelHost {}

@Component({
    template: '<cup-slider ariaValueText="75 percent" />',
    imports: [CupSlider],
})
class AriaValueTextHost {}

describe("CupSlider", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideCupIcons()],
        });
    });

    it("should create", () => {
        const fixture = TestBed.createComponent(CupSlider);
        expect(fixture.componentInstance).toBeTruthy();
    });

    it("should render track element", () => {
        const fixture = TestBed.createComponent(CupSlider);
        fixture.detectChanges();
        const track = fixture.nativeElement.querySelector(".track");
        expect(track).toBeTruthy();
    });

    it("should render thumb element with role slider", () => {
        const fixture = TestBed.createComponent(CupSlider);
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".thumb");
        expect(thumb).toBeTruthy();
        expect(thumb.getAttribute("role")).toBe("slider");
    });

    it("should render fill element", () => {
        const fixture = TestBed.createComponent(CupSlider);
        fixture.detectChanges();
        const fill = fixture.nativeElement.querySelector(".fill");
        expect(fill).toBeTruthy();
    });

    it("should render hidden native range input", () => {
        const fixture = TestBed.createComponent(CupSlider);
        fixture.detectChanges();
        const native = fixture.nativeElement.querySelector(".native");
        expect(native).toBeTruthy();
        expect(native.type).toBe("range");
    });

    it("should render label when provided", () => {
        const fixture = TestBed.createComponent(LabelHost);
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".label");
        expect(label?.textContent?.trim()).toBe("Volume");
    });

    it("should not render label when not provided", () => {
        const fixture = TestBed.createComponent(CupSlider);
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".label");
        expect(label).toBeNull();
    });

    it("should render value display when showValue", () => {
        const fixture = TestBed.createComponent(ShowValueHost);
        fixture.detectChanges();
        const value = fixture.nativeElement.querySelector(".value");
        expect(value).toBeTruthy();
    });

    it("should not render header without label or showValue", () => {
        const fixture = TestBed.createComponent(CupSlider);
        fixture.detectChanges();
        const header = fixture.nativeElement.querySelector(".header");
        expect(header).toBeNull();
    });

    it("should compute percentage correctly at 50", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        component.value.set(50);
        fixture.detectChanges();
        expect(component.percentage()).toBe(50);
    });

    it("should compute percentage 0 at min", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        component.value.set(0);
        fixture.detectChanges();
        expect(component.percentage()).toBe(0);
    });

    it("should compute percentage 100 at max", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        component.value.set(100);
        fixture.detectChanges();
        expect(component.percentage()).toBe(100);
    });

    it("should clamp value to max", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        component.writeValue(150);
        expect(component.value()).toBe(100);
    });

    it("should clamp value to min", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        component.writeValue(-10);
        expect(component.value()).toBe(0);
    });

    it("should snap value to step", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        fixture.componentRef.setInput("step", 5);
        component.writeValue(23);
        expect(component.value()).toBe(25);
    });

    it("should increment on ArrowRight", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".thumb") as HTMLElement;
        component.value.set(10);
        thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
        fixture.detectChanges();
        expect(component.value()).toBe(11);
    });

    it("should decrement on ArrowLeft", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".thumb") as HTMLElement;
        component.value.set(10);
        thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
        fixture.detectChanges();
        expect(component.value()).toBe(9);
    });

    it("should go to min on Home", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".thumb") as HTMLElement;
        component.value.set(50);
        thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }));
        fixture.detectChanges();
        expect(component.value()).toBe(0);
    });

    it("should go to max on End", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".thumb") as HTMLElement;
        component.value.set(50);
        thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));
        fixture.detectChanges();
        expect(component.value()).toBe(100);
    });

    it("should increment by 10% on PageUp", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".thumb") as HTMLElement;
        component.value.set(10);
        thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "PageUp" }));
        fixture.detectChanges();
        expect(component.value()).toBe(20);
    });

    it("should decrement by 10% on PageDown", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".thumb") as HTMLElement;
        component.value.set(50);
        thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "PageDown" }));
        fixture.detectChanges();
        expect(component.value()).toBe(40);
    });

    it("should not respond to keyboard when disabled", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".thumb") as HTMLElement;
        expect(thumb.getAttribute("tabindex")).toBe("-1");
    });

    it("should call onTouched on keyboard interaction", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        let touched = false;
        component.registerOnTouched(() => (touched = true));
        const thumb = fixture.nativeElement.querySelector(".thumb") as HTMLElement;
        thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
        expect(touched).toBe(true);
    });

    it("should emit slideStart on pointerdown", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        let started = false;
        component.slideStart.subscribe(() => (started = true));
        const container = fixture.nativeElement.querySelector(".track-container") as HTMLElement;
        container.getBoundingClientRect = () => ({
            left: 0,
            width: 200,
            right: 200,
            top: 0,
            bottom: 44,
            height: 44,
            x: 0,
            y: 0,
            toJSON: () => "",
        });
        (container as any).setPointerCapture = () => {};
        container.dispatchEvent(new PointerEvent("pointerdown", { clientX: 50 }));
        expect(started).toBe(true);
    });

    it("should emit slideEnd on pointerup", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        let ended = false;
        component.slideEnd.subscribe(() => (ended = true));
        const container = fixture.nativeElement.querySelector(".track-container") as HTMLElement;
        container.getBoundingClientRect = () => ({
            left: 0,
            width: 200,
            right: 200,
            top: 0,
            bottom: 44,
            height: 44,
            x: 0,
            y: 0,
            toJSON: () => "",
        });
        (container as any).setPointerCapture = () => {};
        container.dispatchEvent(new PointerEvent("pointerdown", { clientX: 50 }));
        container.dispatchEvent(new PointerEvent("pointerup"));
        expect(ended).toBe(true);
    });

    it("should not respond to pointer when disabled", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        component.writeValue(0);
        fixture.detectChanges();
        const container = fixture.nativeElement.querySelector(".track-container") as HTMLElement;
        container.getBoundingClientRect = () => ({
            left: 0,
            width: 200,
            right: 200,
            top: 0,
            bottom: 44,
            height: 44,
            x: 0,
            y: 0,
            toJSON: () => "",
        });
        (container as any).setPointerCapture = () => {};
        container.dispatchEvent(new PointerEvent("pointerdown", { clientX: 100 }));
        expect(component.value()).toBe(0);
    });

    it("should render N ticks when ticks > 0", () => {
        const fixture = TestBed.createComponent(TicksHost);
        fixture.detectChanges();
        const ticks = fixture.nativeElement.querySelectorAll(".tick");
        expect(ticks.length).toBe(5);
    });

    it("should not render ticks when ticks = 0", () => {
        const fixture = TestBed.createComponent(CupSlider);
        fixture.detectChanges();
        const ticks = fixture.nativeElement.querySelectorAll(".tick");
        expect(ticks.length).toBe(0);
    });

    it("should compute tick positions evenly", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        fixture.componentRef.setInput("ticks", 5);
        fixture.detectChanges();
        const positions = component.tickPositions();
        expect(positions).toEqual([0, 25, 50, 75, 100]);
    });

    it("should render minIcon when provided", () => {
        const fixture = TestBed.createComponent(MinIconHost);
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector(".min-icon");
        expect(icon).toBeTruthy();
    });

    it("should render maxIcon when provided", () => {
        const fixture = TestBed.createComponent(MaxIconHost);
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector(".max-icon");
        expect(icon).toBeTruthy();
    });

    it("should not render icons when not provided", () => {
        const fixture = TestBed.createComponent(CupSlider);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector(".min-icon")).toBeNull();
        expect(fixture.nativeElement.querySelector(".max-icon")).toBeNull();
    });

    it("should set aria-valuemin, aria-valuemax, aria-valuenow", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        component.writeValue(50);
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".thumb");
        expect(thumb.getAttribute("aria-valuemin")).toBe("0");
        expect(thumb.getAttribute("aria-valuemax")).toBe("100");
        expect(thumb.getAttribute("aria-valuenow")).toBe("50");
    });

    it("should set aria-label from label", () => {
        const fixture = TestBed.createComponent(LabelHost);
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".thumb");
        expect(thumb.getAttribute("aria-label")).toBe("Volume");
    });

    it("should set aria-label from ariaLabel when no label", () => {
        const fixture = TestBed.createComponent(AriaLabelHost);
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".thumb");
        expect(thumb.getAttribute("aria-label")).toBe("Font size");
    });

    it("should set aria-valuetext when provided", () => {
        const fixture = TestBed.createComponent(AriaValueTextHost);
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".thumb");
        expect(thumb.getAttribute("aria-valuetext")).toBe("75 percent");
    });

    it("should set tabindex 0 when enabled", () => {
        const fixture = TestBed.createComponent(CupSlider);
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".thumb");
        expect(thumb.getAttribute("tabindex")).toBe("0");
    });

    it("should set tabindex -1 and aria-disabled when disabled", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        fixture.detectChanges();
        const thumb = fixture.nativeElement.querySelector(".thumb");
        expect(thumb.getAttribute("tabindex")).toBe("-1");
        expect(thumb.getAttribute("aria-disabled")).toBe("true");
    });

    it("should sync native input min/max/step/value", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        component.writeValue(50);
        fixture.componentRef.setInput("min", 10);
        fixture.componentRef.setInput("max", 90);
        fixture.componentRef.setInput("step", 5);
        fixture.detectChanges();
        const native = fixture.nativeElement.querySelector(".native") as HTMLInputElement;
        expect(Number(native.min)).toBe(10);
        expect(Number(native.max)).toBe(90);
        expect(Number(native.step)).toBe(5);
        expect(Number(native.value)).toBe(50);
    });

    it("should apply disabled class when disabled", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("disabled")).toBe(true);
    });

    it("should apply dragging class when dragging", () => {
        const fixture = TestBed.createComponent(CupSlider);
        fixture.detectChanges();
        const container = fixture.nativeElement.querySelector(".track-container") as HTMLElement;
        container.getBoundingClientRect = () => ({
            left: 0,
            width: 200,
            right: 200,
            top: 0,
            bottom: 44,
            height: 44,
            x: 0,
            y: 0,
            toJSON: () => "",
        });
        (container as any).setPointerCapture = () => {};
        container.dispatchEvent(new PointerEvent("pointerdown", { clientX: 100 }));
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("dragging")).toBe(true);
    });

    it("should register onChange", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        let changed = false;
        component.registerOnChange(() => (changed = true));
        const thumb = fixture.nativeElement.querySelector(".thumb") as HTMLElement;
        thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
        expect(changed).toBe(true);
    });

    it("should register onTouched", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        let touched = false;
        component.registerOnTouched(() => (touched = true));
        const thumb = fixture.nativeElement.querySelector(".thumb") as HTMLElement;
        fixture.detectChanges();
        thumb.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
        expect(touched).toBe(true);
    });

    it("should call setDisabledState", () => {
        const fixture = TestBed.createComponent(CupSlider);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        expect(component.disabled()).toBe(true);
    });
});
