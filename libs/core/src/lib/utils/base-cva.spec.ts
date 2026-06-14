import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { afterEach, describe, expect, it } from "vitest";
import { CupFormControl, CupModelControl } from "./base-cva";

class TestControl extends CupFormControl<number> {
    emit(value: number): void {
        this.value.set(value);
        this.onChange(value);
    }

    touch(): void {
        this.onTouched();
    }
}

@Component({
    selector: "test-model-control",
    template: "<span>{{ value() }}</span>",
})
class ModelControlHost extends CupModelControl<number> {}

describe("base-cva", () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it("keeps CupFormControl as a reusable signal-based CVA base", () => {
        const control = new TestControl();
        let changed: number | null = null;
        let touched = false;

        control.registerOnChange((value) => {
            changed = value;
        });
        control.registerOnTouched(() => {
            touched = true;
        });

        control.writeValue(12);
        control.setDisabledState(true);
        control.emit(24);
        control.touch();

        expect(control.value()).toBe(24);
        expect(control.disabled()).toBe(true);
        expect(changed).toBe(24);
        expect(touched).toBe(true);
    });

    it("exposes a signal-first two-way model via CupModelControl", () => {
        const fixture = TestBed.createComponent(ModelControlHost);
        const control = fixture.componentInstance;
        fixture.detectChanges();

        expect(control.value()).toBeNull();
        expect(control.disabled()).toBe(false);

        control.value.set(42);
        fixture.detectChanges();
        expect(control.value()).toBe(42);
    });
});
