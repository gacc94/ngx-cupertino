import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { describe, expect, it } from "vitest";
import { CupProgress } from "./cup-progress";

@Component({
    template: '<cup-progress [value]="65" label="Downloading..." showPercentage />',
    imports: [CupProgress],
})
class LinearDeterminateHost {}

@Component({
    template: '<cup-progress indeterminate label="Loading..." />',
    imports: [CupProgress],
})
class LinearIndeterminateHost {}

@Component({
    template: '<cup-progress type="circular" [value]="75" label="Storage" />',
    imports: [CupProgress],
})
class CircularHost {}

@Component({
    template: '<cup-progress type="spinner" />',
    imports: [CupProgress],
})
class SpinnerHost {}

@Component({
    template: '<cup-progress type="spinner" ariaLabel="Loading content" />',
    imports: [CupProgress],
})
class SpinnerAriaLabelHost {}

describe("CupProgress", () => {
    it("should create", () => {
        const fixture = TestBed.createComponent(CupProgress);
        expect(fixture.componentInstance).toBeTruthy();
    });

    it("should apply cup-indeterminate class when indeterminate", () => {
        const fixture = TestBed.createComponent(CupProgress);
        fixture.componentRef.setInput("indeterminate", "");
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("indeterminate")).toBe(true);
    });

    it("should apply cup-small class for sm size", () => {
        const fixture = TestBed.createComponent(CupProgress);
        fixture.componentRef.setInput("size", "sm");
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("sm")).toBe(true);
    });

    it("should apply cup-large class for lg size", () => {
        const fixture = TestBed.createComponent(CupProgress);
        fixture.componentRef.setInput("size", "lg");
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("lg")).toBe(true);
    });

    it("should compute percentage correctly", () => {
        const fixture = TestBed.createComponent(LinearDeterminateHost);
        fixture.detectChanges();
        const component = fixture.debugElement.query((d) => d.componentInstance instanceof CupProgress)
            ?.componentInstance as CupProgress;
        expect(component.percentage()).toBe(65);
    });

    it("should compute percentage 0 at value 0", () => {
        const fixture = TestBed.createComponent(CupProgress);
        fixture.detectChanges();
        expect(fixture.componentInstance.percentage()).toBe(0);
    });

    it("should compute percentage 100 at value equals max", () => {
        const fixture = TestBed.createComponent(CupProgress);
        fixture.componentRef.setInput("value", 100);
        fixture.detectChanges();
        expect(fixture.componentInstance.percentage()).toBe(100);
    });

    it("should clamp percentage at 100 when value exceeds max", () => {
        const fixture = TestBed.createComponent(CupProgress);
        fixture.componentRef.setInput("value", 150);
        fixture.detectChanges();
        expect(fixture.componentInstance.percentage()).toBe(100);
    });

    it("should return 0 percentage when max is 0", () => {
        const fixture = TestBed.createComponent(CupProgress);
        fixture.componentRef.setInput("max", 0);
        fixture.componentRef.setInput("value", 50);
        fixture.detectChanges();
        expect(fixture.componentInstance.percentage()).toBe(0);
    });

    it("should compute circumference as 2πr", () => {
        const fixture = TestBed.createComponent(CupProgress);
        fixture.detectChanges();
        const c = fixture.componentInstance.circumference();
        expect(c).toBeCloseTo(2 * Math.PI * 15.5, 1);
    });

    it("should compute offset for filled progress", () => {
        const fixture = TestBed.createComponent(CupProgress);
        fixture.componentRef.setInput("value", 50);
        fixture.detectChanges();
        const component = fixture.componentInstance;
        const expected = component.circumference() * 0.5;
        expect(component.offset()).toBeCloseTo(expected, 0);
    });

    it("should compute offset 0 at max", () => {
        const fixture = TestBed.createComponent(CupProgress);
        fixture.componentRef.setInput("value", 100);
        fixture.detectChanges();
        expect(fixture.componentInstance.offset()).toBe(0);
    });

    it("should render spinner with 12 lines", () => {
        const fixture = TestBed.createComponent(SpinnerHost);
        fixture.detectChanges();
        const lines = fixture.nativeElement.querySelectorAll(".spinner-line");
        expect(lines.length).toBe(12);
    });

    it("should have spinner lines with 30-degree rotation increments", () => {
        const fixture = TestBed.createComponent(SpinnerHost);
        fixture.detectChanges();
        const lines = fixture.nativeElement.querySelectorAll(".spinner-line");
        expect(lines[0].style.transform).toContain("0deg");
        expect(lines[1].style.transform).toContain("30deg");
        expect(lines[11].style.transform).toContain("330deg");
    });

    it("should have staggered animation-delay on spinner lines", () => {
        const fixture = TestBed.createComponent(SpinnerHost);
        fixture.detectChanges();
        const lines = fixture.nativeElement.querySelectorAll(".spinner-line");
        expect(Number.parseFloat(lines[0].style.animationDelay)).toBeCloseTo(-1.2, 1);
        expect(Number.parseFloat(lines[1].style.animationDelay)).toBeCloseTo(-1.1, 1);
        expect(Number.parseFloat(lines[11].style.animationDelay)).toBeCloseTo(-0.1, 1);
    });

    it("should render linear track and fill", () => {
        const fixture = TestBed.createComponent(LinearDeterminateHost);
        fixture.detectChanges();
        const track = fixture.nativeElement.querySelector(".track");
        const fill = fixture.nativeElement.querySelector(".fill");
        expect(track).toBeTruthy();
        expect(fill).toBeTruthy();
    });

    it("should show label and percentage when both provided", () => {
        const fixture = TestBed.createComponent(LinearDeterminateHost);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector(".label")?.textContent?.trim()).toBe("Downloading...");
        expect(fixture.nativeElement.querySelector(".percentage")?.textContent?.trim()).toBe("65%");
    });

    it("should not show percentage when indeterminate", () => {
        const fixture = TestBed.createComponent(LinearIndeterminateHost);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector(".percentage")).toBeNull();
    });

    it("should render circular SVG with track and fill circles", () => {
        const fixture = TestBed.createComponent(CircularHost);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector(".circular")).toBeTruthy();
        expect(fixture.nativeElement.querySelector(".circular-track")).toBeTruthy();
        expect(fixture.nativeElement.querySelector(".circular-fill")).toBeTruthy();
    });

    it("should set role progressbar on linear", () => {
        const fixture = TestBed.createComponent(LinearDeterminateHost);
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('[role="progressbar"]');
        expect(el).toBeTruthy();
        expect(el.getAttribute("aria-valuenow")).toBe("65");
        expect(el.getAttribute("aria-valuemin")).toBe("0");
        expect(el.getAttribute("aria-valuemax")).toBe("100");
    });

    it("should set role progressbar on circular", () => {
        const fixture = TestBed.createComponent(CircularHost);
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('[role="progressbar"]');
        expect(el).toBeTruthy();
    });

    it("should set role status on spinner", () => {
        const fixture = TestBed.createComponent(SpinnerHost);
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('[role="status"]');
        expect(el).toBeTruthy();
        expect(el.getAttribute("aria-label")).toBe("Loading");
    });

    it("should omit aria-valuenow when indeterminate", () => {
        const fixture = TestBed.createComponent(LinearIndeterminateHost);
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('[role="progressbar"]');
        expect(el.getAttribute("aria-valuenow")).toBeNull();
        expect(el.getAttribute("aria-valuemax")).toBeNull();
    });

    it("should use ariaLabel input on spinner", () => {
        const fixture = TestBed.createComponent(SpinnerAriaLabelHost);
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('[role="status"]');
        expect(el.getAttribute("aria-label")).toBe("Loading content");
    });
});
