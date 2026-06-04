import { Directive, signal } from "@angular/core";
import type { ControlValueAccessor } from "@angular/forms";

@Directive()
export abstract class CupFormControl<T = string> implements ControlValueAccessor {
    readonly value = signal<T | null>(null);
    readonly disabled = signal(false);

    writeValue(v: T): void {
        this.value.set(v);
    }

    registerOnChange(fn: (v: T | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(d: boolean): void {
        this.disabled.set(d);
    }

    protected onChange: (v: T | null) => void = () => {};
    protected onTouched: () => void = () => {};
}
