import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CupIcon } from "@ngx-cupertino/icons";
import { beforeEach, describe, expect, it } from "vitest";
import { CupButton } from "./cup-button";

describe("CupButton", () => {
    let fixture: ComponentFixture<CupButton>;
    let component: CupButton;

    beforeEach(() => {
        TestBed.overrideComponent(CupButton, {
            add: { schemas: [CUSTOM_ELEMENTS_SCHEMA] },
            remove: { imports: [CupIcon] },
        });
        fixture = TestBed.createComponent(CupButton);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should apply variant class via host binding", () => {
        fixture.componentRef.setInput("variant", "tinted");
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("tinted")).toBe(true);
    });

    it("should default to filled variant", () => {
        expect(fixture.nativeElement.classList.contains("filled")).toBe(true);
    });

    it("should apply disabled class via host binding", () => {
        fixture.componentRef.setInput("disabled", true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("disabled")).toBe(true);
        expect(fixture.nativeElement.getAttribute("aria-disabled")).toBe("true");
        expect(fixture.nativeElement.getAttribute("tabindex")).toBe("-1");
    });

    it("should apply loading class and show spinner", () => {
        fixture.componentRef.setInput("loading", true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("loading")).toBe(true);
        expect(fixture.nativeElement.getAttribute("aria-busy")).toBe("true");
        const spinner = fixture.nativeElement.querySelector(".spinner");
        expect(spinner).toBeTruthy();
    });

    it("should apply size classes", () => {
        fixture.componentRef.setInput("size", "sm");
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("sm")).toBe(true);
    });

    it("should apply full-width class", () => {
        fixture.componentRef.setInput("fullWidth", true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("full-width")).toBe(true);
    });

    it("should support icon-only buttons with accessible labeling", () => {
        fixture.componentRef.setInput("icon", "play.fill");
        fixture.componentRef.setInput("iconOnly", true);
        fixture.componentRef.setInput("ariaLabel", "Play");
        fixture.detectChanges();

        expect(fixture.nativeElement.classList.contains("icon-only")).toBe(true);
        expect(fixture.nativeElement.classList.contains("has-icon")).toBe(true);
        expect(fixture.nativeElement.getAttribute("aria-label")).toBe("Play");
        expect(fixture.nativeElement.querySelector(".label")).toBeNull();
    });

    it("should resolve icon-only auto shape to circle", () => {
        fixture.componentRef.setInput("icon", "play.fill");
        fixture.componentRef.setInput("iconOnly", true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("shape-circle")).toBe(true);
    });

    it("should not apply a shape class for a default text button (auto)", () => {
        expect(fixture.nativeElement.classList.contains("shape-circle")).toBe(false);
        expect(fixture.nativeElement.classList.contains("shape-rounded")).toBe(false);
        expect(fixture.nativeElement.classList.contains("shape-capsule")).toBe(false);
    });

    it("should apply an explicit shape class", () => {
        fixture.componentRef.setInput("shape", "rounded");
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("shape-rounded")).toBe(true);

        fixture.componentRef.setInput("shape", "capsule");
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("shape-capsule")).toBe(true);
    });

    it("should let an explicit shape override icon-only circle default", () => {
        fixture.componentRef.setInput("icon", "play.fill");
        fixture.componentRef.setInput("iconOnly", true);
        fixture.componentRef.setInput("shape", "rounded");
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("shape-rounded")).toBe(true);
        expect(fixture.nativeElement.classList.contains("shape-circle")).toBe(false);
    });

    it("should emit clicked output on click", () => {
        let emitted = false;
        const sub = component.clicked.subscribe(() => (emitted = true));
        fixture.nativeElement.click();
        expect(emitted).toBe(true);
        sub.unsubscribe();
    });

    it("should emit clicked on Enter key", () => {
        let emitted = false;
        const sub = component.clicked.subscribe(() => (emitted = true));
        fixture.nativeElement.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
        expect(emitted).toBe(true);
        sub.unsubscribe();
    });

    it("should not emit clicked when disabled", () => {
        fixture.componentRef.setInput("disabled", true);
        fixture.detectChanges();
        let emitted = false;
        const sub = component.clicked.subscribe(() => (emitted = true));
        fixture.nativeElement.click();
        expect(emitted).toBe(false);
        sub.unsubscribe();
    });

    it("should not emit clicked when loading", () => {
        fixture.componentRef.setInput("loading", true);
        fixture.detectChanges();
        let emitted = false;
        const sub = component.clicked.subscribe(() => (emitted = true));
        fixture.nativeElement.click();
        expect(emitted).toBe(false);
        expect(fixture.nativeElement.getAttribute("tabindex")).toBe("-1");
        sub.unsubscribe();
    });
});
