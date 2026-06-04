import { ComponentFixture, TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { CupProgress } from "./cup-progress";

describe("CupProgress", () => {
    let fixture: ComponentFixture<CupProgress>;
    let component: CupProgress;

    beforeEach(() => {
        fixture = TestBed.createComponent(CupProgress);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should render linear progress by default", () => {
        const linear = fixture.nativeElement.querySelector(".cup-progress-linear");
        expect(linear).toBeTruthy();
    });

    it("should render circular progress when type is circular", () => {
        fixture.componentRef.setInput("type", "circular");
        fixture.detectChanges();
        const circular = fixture.nativeElement.querySelector(".cup-progress-circular");
        expect(circular).toBeTruthy();
    });

    it("should have default value of 0", () => {
        expect(component.value()).toBe(0);
    });

    it("should have default max of 100", () => {
        expect(component.max()).toBe(100);
    });

    it("should calculate percentage correctly", () => {
        fixture.componentRef.setInput("value", 50);
        fixture.detectChanges();
        expect(component.percentage()).toBe(50);
    });

    it("should round percentage to integer", () => {
        fixture.componentRef.setInput("value", 33);
        fixture.componentRef.setInput("max", 100);
        fixture.detectChanges();
        expect(component.percentage()).toBe(33);
    });

    it("should update fill width from percentage", () => {
        fixture.componentRef.setInput("value", 75);
        fixture.detectChanges();
        const fill = fixture.nativeElement.querySelector(".cup-progress-fill") as HTMLElement;
        expect(fill.style.width).toBe("75%");
    });

    it("should render label with percentage when provided", () => {
        fixture.componentRef.setInput("value", 30);
        fixture.componentRef.setInput("label", "Uploading");
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".cup-progress-label");
        expect(label?.textContent?.trim()).toBe("Uploading — 30%");
    });

    it("should not render label when not provided", () => {
        fixture.componentRef.setInput("value", 30);
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".cup-progress-label");
        expect(label).toBeNull();
    });

    it("should have ARIA progressbar role on linear", () => {
        const bar = fixture.nativeElement.querySelector(".cup-progress-linear");
        expect(bar!.getAttribute("role")).toBe("progressbar");
        expect(bar!.getAttribute("aria-valuenow")).toBe("0");
        expect(bar!.getAttribute("aria-valuemin")).toBe("0");
        expect(bar!.getAttribute("aria-valuemax")).toBe("100");
    });

    it("should have ARIA progressbar role on circular", () => {
        fixture.componentRef.setInput("type", "circular");
        fixture.componentRef.setInput("value", 50);
        fixture.detectChanges();
        const circle = fixture.nativeElement.querySelector(".cup-progress-circular");
        expect(circle!.getAttribute("role")).toBe("progressbar");
        expect(circle!.getAttribute("aria-valuenow")).toBe("50");
    });

    it("should set aria-label on progress element", () => {
        fixture.componentRef.setInput("label", "Loading");
        fixture.detectChanges();
        const bar = fixture.nativeElement.querySelector(".cup-progress-linear");
        expect(bar!.getAttribute("aria-label")).toBe("Loading");
    });

    it("should have default aria-label without label input", () => {
        const bar = fixture.nativeElement.querySelector(".cup-progress-linear");
        expect(bar!.getAttribute("aria-label")).toBe("Progress");
    });

    it("should update SVG stroke-dashoffset for circular", () => {
        fixture.componentRef.setInput("type", "circular");
        fixture.componentRef.setInput("value", 25);
        fixture.detectChanges();
        const fill = fixture.nativeElement.querySelector(".cup-progress-circular-fill");
        expect(fill).toBeTruthy();
    });

    it("should not extend CupFormControl", () => {
        expect(component).not.toHaveProperty("writeValue");
    });
});
