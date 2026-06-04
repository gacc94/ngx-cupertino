import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CupIcon } from "@ngx-cupertino/icons";
import { beforeEach, describe, expect, it } from "vitest";
import { CupTextField } from "./cup-text-field";

describe("CupTextField", () => {
    let fixture: ComponentFixture<CupTextField>;
    let component: CupTextField;

    beforeEach(() => {
        TestBed.overrideComponent(CupTextField, {
            add: { schemas: [CUSTOM_ELEMENTS_SCHEMA] },
            remove: { imports: [CupIcon] },
        });
        fixture = TestBed.createComponent(CupTextField);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should render input element", () => {
        const input = fixture.nativeElement.querySelector(".cup-text-field-input");
        expect(input).toBeTruthy();
    });

    it("should render label when provided", () => {
        fixture.componentRef.setInput("label", "Email");
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".cup-text-field-label");
        expect(label?.textContent?.trim()).toBe("Email");
    });

    it("should set placeholder on input", () => {
        fixture.componentRef.setInput("placeholder", "Enter text");
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-text-field-input");
        expect(input!.getAttribute("placeholder")).toBe("Enter text");
    });

    it("should set input type", () => {
        fixture.componentRef.setInput("type", "email");
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-text-field-input");
        expect(input!.getAttribute("type")).toBe("email");
    });

    it("should update value model on input", () => {
        const input = fixture.nativeElement.querySelector(".cup-text-field-input") as HTMLInputElement;
        input.value = "hello";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(component.value()).toBe("hello");
    });

    it("should call onChange on input", () => {
        let changed: string | null = null;
        component.registerOnChange((v) => (changed = v));
        const input = fixture.nativeElement.querySelector(".cup-text-field-input") as HTMLInputElement;
        input.value = "test";
        input.dispatchEvent(new Event("input"));
        expect(changed).toBe("test");
    });

    it("should show clear button when clearable and has value", () => {
        fixture.componentRef.setInput("clearable", true);
        component.writeValue("text");
        fixture.detectChanges();
        const clearBtn = fixture.nativeElement.querySelector(".cup-text-field-clear");
        expect(clearBtn).toBeTruthy();
    });

    it("should not show clear button when value is empty", () => {
        fixture.componentRef.setInput("clearable", true);
        component.writeValue("");
        fixture.detectChanges();
        const clearBtn = fixture.nativeElement.querySelector(".cup-text-field-clear");
        expect(clearBtn).toBeNull();
    });

    it("should clear value on clear button click", () => {
        fixture.componentRef.setInput("clearable", true);
        component.writeValue("text");
        fixture.detectChanges();
        const clearBtn = fixture.nativeElement.querySelector(".cup-text-field-clear") as HTMLElement;
        clearBtn.click();
        fixture.detectChanges();
        expect(component.value()).toBe("");
    });

    it("should disable input", () => {
        component.setDisabledState(true);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-text-field-input") as HTMLInputElement;
        expect(input.disabled).toBe(true);
    });

    it("should set readonly on input", () => {
        fixture.componentRef.setInput("readonly", true);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-text-field-input") as HTMLInputElement;
        expect(input.readOnly).toBe(true);
    });

    it("should set aria-label from label", () => {
        fixture.componentRef.setInput("label", "Username");
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-text-field-input");
        expect(input!.getAttribute("aria-label")).toBe("Username");
    });

    it("should set aria-label from placeholder when no label", () => {
        fixture.componentRef.setInput("placeholder", "Search...");
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-text-field-input");
        expect(input!.getAttribute("aria-label")).toBe("Search...");
    });

    it("should call writeValue", () => {
        component.writeValue("updated");
        expect(component.value()).toBe("updated");
    });

    it("should call setDisabledState", () => {
        component.setDisabledState(true);
        expect(component.disabled()).toBe(true);
    });
});
