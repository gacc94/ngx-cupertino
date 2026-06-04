import { ChangeDetectionStrategy, Component, computed, input, model } from "@angular/core";
import { CupFormControl } from "@ngx-cupertino/core";
import { CupIcon } from "@ngx-cupertino/icons";

@Component({
    selector: "cup-stepper",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CupIcon],
    host: {
        "[class.cup-disabled]": "disabled()",
    },
    template: `
        <div class="cup-stepper-container">
            @if (label()) {
                <label class="cup-stepper-label">{{ label() }}</label>
            }
            <div class="cup-stepper-controls">
                @if (showButtons()) {
                    <button type="button"
                            class="cup-stepper-decrement"
                            [disabled]="disabled() || atMin()"
                            (click)="decrement()"
                            aria-label="Decrease">
                        <cup-icon name="minus" />
                    </button>
                }
                <input type="number"
                       [min]="min()"
                       [max]="max()"
                       [step]="step()"
                       [value]="value()"
                       [disabled]="disabled()"
                       [attr.aria-label]="label() || null"
                       role="spinbutton"
                       [attr.aria-valuemin]="min()"
                       [attr.aria-valuemax]="max()"
                       [attr.aria-valuenow]="value()"
                       (input)="onInput($event)"
                       (blur)="onTouched()"
                       (keydown)="onKeyDown($event)"
                       class="cup-stepper-input" />
                @if (showButtons()) {
                    <button type="button"
                            class="cup-stepper-increment"
                            [disabled]="disabled() || atMax()"
                            (click)="increment()"
                            aria-label="Increase">
                        <cup-icon name="plus" />
                    </button>
                }
            </div>
        </div>
    `,
    styleUrl: "./cup-stepper.scss",
})
export class CupStepper extends CupFormControl<number> {
    override readonly value = model(0);
    readonly min = input(0);
    readonly max = input(100);
    readonly step = input(1);
    readonly label = input<string>();
    readonly showButtons = input(true);

    readonly atMin = computed(() => this.value() <= this.min());
    readonly atMax = computed(() => this.value() >= this.max());

    increment(): void {
        if (this.disabled() || this.atMax()) return;
        this.setValue(this.value() + this.step());
    }

    decrement(): void {
        if (this.disabled() || this.atMin()) return;
        this.setValue(this.value() - this.step());
    }

    onInput(event: Event): void {
        const val = Number((event.target as HTMLInputElement).value);
        if (!Number.isNaN(val)) {
            this.setValue(val);
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            this.increment();
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            this.decrement();
        }
    }

    private setValue(v: number): void {
        const clamped = Math.max(this.min(), Math.min(this.max(), v));
        this.value.set(clamped);
        this.onChange(clamped);
    }

    override writeValue(v: number): void {
        this.value.set(v ?? this.min());
    }
}
