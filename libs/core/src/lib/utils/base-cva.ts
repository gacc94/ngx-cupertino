import { Directive, input, model, signal } from "@angular/core";
import type { ControlValueAccessor } from "@angular/forms";

/**
 * Legacy `ControlValueAccessor` base for form controls.
 *
 * @deprecated Use {@link CupModelControl} for new Angular 21 components. This base relies on the
 * pre-v17 `ControlValueAccessor` contract with mutable `onChange`/`onTouched` callbacks; it is
 * retained only for interop with `ngModel` / `ReactiveFormsModule`-driven consumers.
 */
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

/**
 * Signal-first base for two-way bound form controls (Angular 21).
 *
 * Components extend this base and bind through `model()`'s native two-way syntax
 * (`<cup-toggle [(value)]="enabled" />`) instead of wiring a `ControlValueAccessor`. The active
 * value and disabled state are plain signals, so templates, `computed`, and `effect` can react
 * to them directly.
 */
@Directive()
export abstract class CupModelControl<T = string> {
    /** Two-way bound control value. */
    readonly value = model<T | null>(null);
    /** Whether the control is disabled. */
    readonly disabled = input(false);
}
