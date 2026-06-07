import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { provideCupIcons } from "@ngx-cupertino/icons";
import { describe, expect, it } from "vitest";
import { CupTextField } from "./cup-text-field";

@Component({
    template: '<cup-text-field label="Username" placeholder="Enter name" />',
    imports: [CupTextField],
})
class LabelPlaceholderHost {}

@Component({
    template: '<cup-text-field prefixIcon="magnifyingglass" />',
    imports: [CupTextField],
})
class PrefixHost {}

@Component({
    template: '<cup-text-field suffixIcon="envelope" />',
    imports: [CupTextField],
})
class SuffixHost {}

@Component({
    template: '<cup-text-field error="Required" />',
    imports: [CupTextField],
})
class ErrorHost {}

@Component({
    template: '<cup-text-field helper="Enter name" />',
    imports: [CupTextField],
})
class HelperHost {}

@Component({
    template: '<cup-text-field error="Invalid" helper="Help" />',
    imports: [CupTextField],
})
class ErrorPriorityHost {}

@Component({
    template: '<cup-text-field size="sm" />',
    imports: [CupTextField],
})
class SmallHost {}

@Component({
    template: '<cup-text-field size="lg" />',
    imports: [CupTextField],
})
class LargeHost {}

@Component({
    template: '<cup-text-field type="email" />',
    imports: [CupTextField],
})
class EmailHost {}

@Component({
    template: '<cup-text-field ariaLabel="Email address" />',
    imports: [CupTextField],
})
class AriaLabelHost {}

@Component({
    template: '<cup-text-field name="username" autocomplete="username" />',
    imports: [CupTextField],
})
class NameAutocompleteHost {}

@Component({
    template: "<cup-text-field readonly />",
    imports: [CupTextField],
})
class ReadonlyHost {}

describe("CupTextField", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideCupIcons()],
        });
    });

    it("should create", () => {
        const fixture = TestBed.createComponent(CupTextField);
        expect(fixture.componentInstance).toBeTruthy();
    });

    it("should render input element", () => {
        const fixture = TestBed.createComponent(CupTextField);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input");
        expect(input).toBeTruthy();
    });

    it("should render label when provided", () => {
        const fixture = TestBed.createComponent(LabelPlaceholderHost);
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".cup-label");
        expect(label?.textContent?.trim()).toBe("Username");
    });

    it("should not render label when not provided", () => {
        const fixture = TestBed.createComponent(CupTextField);
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".cup-label");
        expect(label).toBeNull();
    });

    it("should associate label for with input id", () => {
        const fixture = TestBed.createComponent(LabelPlaceholderHost);
        fixture.detectChanges();
        const label = fixture.nativeElement.querySelector(".cup-label") as HTMLLabelElement;
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        expect(label.getAttribute("for")).toBe(input.id);
        expect(input.id).toMatch(/^cup-tf-/);
    });

    it("should render placeholder", () => {
        const fixture = TestBed.createComponent(LabelPlaceholderHost);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        expect(input.placeholder).toBe("Enter name");
    });

    it("should render prefix icon", () => {
        const fixture = TestBed.createComponent(PrefixHost);
        fixture.detectChanges();
        const prefix = fixture.nativeElement.querySelector(".cup-prefix");
        expect(prefix).toBeTruthy();
    });

    it("should not render prefix when not provided", () => {
        const fixture = TestBed.createComponent(CupTextField);
        fixture.detectChanges();
        const prefix = fixture.nativeElement.querySelector(".cup-prefix");
        expect(prefix).toBeNull();
    });

    it("should render suffix icon", () => {
        const fixture = TestBed.createComponent(SuffixHost);
        fixture.detectChanges();
        const suffix = fixture.nativeElement.querySelector(".cup-suffix");
        expect(suffix).toBeTruthy();
    });

    it("should not render suffix when not provided", () => {
        const fixture = TestBed.createComponent(CupTextField);
        fixture.detectChanges();
        const suffix = fixture.nativeElement.querySelector(".cup-suffix");
        expect(suffix).toBeNull();
    });

    it("should update value on input event", () => {
        const fixture = TestBed.createComponent(CupTextField);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.value = "hello";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(component.value()).toBe("hello");
    });

    it("should call onChange on input", () => {
        const fixture = TestBed.createComponent(CupTextField);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        let changedValue: string | null = null;
        component.registerOnChange((v) => (changedValue = v));
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.value = "hello";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(changedValue).toBe("hello");
    });

    it("should sync value via writeValue", () => {
        const fixture = TestBed.createComponent(CupTextField);
        const component = fixture.componentInstance;
        component.writeValue("test");
        expect(component.value()).toBe("test");
    });

    it("should handle empty writeValue", () => {
        const fixture = TestBed.createComponent(CupTextField);
        const component = fixture.componentInstance;
        component.writeValue(null as unknown as string);
        expect(component.value()).toBe("");
    });

    it("should show clear button when clearable and has value", () => {
        const fixture = TestBed.createComponent(CupTextField);
        fixture.componentRef.setInput("clearable", "");
        fixture.componentInstance.value.set("text");
        fixture.detectChanges();
        const clear = fixture.nativeElement.querySelector(".cup-clear");
        expect(clear).toBeTruthy();
    });

    it("should hide clear button when value is empty", () => {
        const fixture = TestBed.createComponent(CupTextField);
        fixture.componentRef.setInput("clearable", "");
        fixture.detectChanges();
        const clear = fixture.nativeElement.querySelector(".cup-clear");
        expect(clear).toBeNull();
    });

    it("should clear value on clear button click", () => {
        const fixture = TestBed.createComponent(CupTextField);
        fixture.componentRef.setInput("clearable", "");
        fixture.componentInstance.value.set("text");
        fixture.detectChanges();
        const clear = fixture.nativeElement.querySelector(".cup-clear") as HTMLElement;
        clear.click();
        expect(fixture.componentInstance.value()).toBe("");
    });

    it("should call onChange with empty string on clear", () => {
        const fixture = TestBed.createComponent(CupTextField);
        const component = fixture.componentInstance;
        fixture.componentRef.setInput("clearable", "");
        component.value.set("text");
        let clearedValue: string | null = "not null";
        component.registerOnChange((v) => (clearedValue = v));
        fixture.detectChanges();
        const clear = fixture.nativeElement.querySelector(".cup-clear") as HTMLElement;
        clear.click();
        expect(clearedValue).toBe("");
    });

    it("should hide suffix when clear is visible", () => {
        const fixture = TestBed.createComponent(CupTextField);
        const component = fixture.componentInstance;
        fixture.componentRef.setInput("clearable", "");
        fixture.componentRef.setInput("suffixIcon", "envelope");
        component.value.set("text");
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector(".cup-clear")).toBeTruthy();
        expect(fixture.nativeElement.querySelector(".cup-suffix")).toBeNull();
    });

    it("should show error message", () => {
        const fixture = TestBed.createComponent(ErrorHost);
        fixture.detectChanges();
        const error = fixture.nativeElement.querySelector(".cup-error-text");
        expect(error?.textContent?.trim()).toBe("Required");
    });

    it("should show helper message", () => {
        const fixture = TestBed.createComponent(HelperHost);
        fixture.detectChanges();
        const helper = fixture.nativeElement.querySelector(".cup-helper:not(.cup-error-text)");
        expect(helper?.textContent?.trim()).toBe("Enter name");
    });

    it("should prioritize error over helper", () => {
        const fixture = TestBed.createComponent(ErrorPriorityHost);
        fixture.detectChanges();
        const error = fixture.nativeElement.querySelector(".cup-error-text");
        expect(error?.textContent?.trim()).toBe("Invalid");
        const helpers = fixture.nativeElement.querySelectorAll(".cup-helper:not(.cup-error-text)");
        expect(helpers.length).toBe(0);
    });

    it("should apply cup-error class when error", () => {
        const fixture = TestBed.createComponent(ErrorHost);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-text-field");
        expect(host.classList.contains("cup-error")).toBe(true);
    });

    it("should set aria-invalid when error", () => {
        const fixture = TestBed.createComponent(ErrorHost);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        expect(input.getAttribute("aria-invalid")).toBe("true");
    });

    it("should set aria-describedby to error id", () => {
        const fixture = TestBed.createComponent(ErrorHost);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        const errorEl = fixture.nativeElement.querySelector(".cup-error-text");
        expect(input.getAttribute("aria-describedby")).toBe(errorEl?.id);
    });

    it("should set aria-describedby to helper id", () => {
        const fixture = TestBed.createComponent(HelperHost);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        const helperEl = fixture.nativeElement.querySelector(".cup-helper:not(.cup-error-text)");
        expect(input.getAttribute("aria-describedby")).toBe(helperEl?.id);
    });

    it("should set aria-label from ariaLabel input", () => {
        const fixture = TestBed.createComponent(AriaLabelHost);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        expect(input.getAttribute("aria-label")).toBe("Email address");
    });

    it("should not set aria-label when label exists", () => {
        const fixture = TestBed.createComponent(LabelPlaceholderHost);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        expect(input.getAttribute("aria-label")).toBeNull();
    });

    it("should set disabled attribute on input", () => {
        const fixture = TestBed.createComponent(CupTextField);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        expect(input.disabled).toBe(true);
    });

    it("should set readonly attribute on input", () => {
        const fixture = TestBed.createComponent(ReadonlyHost);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        expect(input.readOnly).toBe(true);
    });

    it("should apply cup-focused on focus", () => {
        const fixture = TestBed.createComponent(CupTextField);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.dispatchEvent(new Event("focus"));
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("cup-focused")).toBe(true);
    });

    it("should remove cup-focused on blur", () => {
        const fixture = TestBed.createComponent(CupTextField);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.dispatchEvent(new Event("focus"));
        fixture.detectChanges();
        input.dispatchEvent(new Event("blur"));
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("cup-focused")).toBe(false);
    });

    it("should call onTouched on blur", () => {
        const fixture = TestBed.createComponent(CupTextField);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        let touched = false;
        component.registerOnTouched(() => (touched = true));
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.dispatchEvent(new Event("blur"));
        fixture.detectChanges();
        expect(touched).toBe(true);
    });

    it("should apply cup-disabled when disabled", () => {
        const fixture = TestBed.createComponent(CupTextField);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("cup-disabled")).toBe(true);
    });

    it("should apply cup-readonly when readonly", () => {
        const fixture = TestBed.createComponent(ReadonlyHost);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-text-field");
        expect(host.classList.contains("cup-readonly")).toBe(true);
    });

    it("should apply cup-filled when value", () => {
        const fixture = TestBed.createComponent(CupTextField);
        const component = fixture.componentInstance;
        component.value.set("text");
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("cup-filled")).toBe(true);
    });

    it("should apply cup-small for size sm", () => {
        const fixture = TestBed.createComponent(SmallHost);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-text-field");
        expect(host.classList.contains("cup-small")).toBe(true);
    });

    it("should apply cup-large for size lg", () => {
        const fixture = TestBed.createComponent(LargeHost);
        fixture.detectChanges();
        const host = fixture.nativeElement.querySelector("cup-text-field");
        expect(host.classList.contains("cup-large")).toBe(true);
    });

    it("should not apply size class for md", () => {
        const fixture = TestBed.createComponent(CupTextField);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains("cup-small")).toBe(false);
        expect(fixture.nativeElement.classList.contains("cup-large")).toBe(false);
    });

    it("should register onChange", () => {
        const fixture = TestBed.createComponent(CupTextField);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        let called = false;
        component.registerOnChange(() => (called = true));
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.value = "x";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(called).toBe(true);
    });

    it("should register onTouched", () => {
        const fixture = TestBed.createComponent(CupTextField);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        let touched = false;
        component.registerOnTouched(() => (touched = true));
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        input.dispatchEvent(new Event("blur"));
        fixture.detectChanges();
        expect(touched).toBe(true);
    });

    it("should call setDisabledState", () => {
        const fixture = TestBed.createComponent(CupTextField);
        const component = fixture.componentInstance;
        component.setDisabledState(true);
        expect(component.disabled()).toBe(true);
    });

    it("should set input type attribute", () => {
        const fixture = TestBed.createComponent(EmailHost);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        expect(input.type).toBe("email");
    });

    it("should default to type text", () => {
        const fixture = TestBed.createComponent(CupTextField);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        expect(input.type).toBe("text");
    });

    it("should set name and autocomplete attributes", () => {
        const fixture = TestBed.createComponent(NameAutocompleteHost);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector(".cup-input") as HTMLInputElement;
        expect(input.getAttribute("name")).toBe("username");
        expect(input.getAttribute("autocomplete")).toBe("username");
    });
});
